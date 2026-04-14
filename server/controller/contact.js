const Contact = require('../models/Contact');
const User = require('../models/User');


const add = async (req, res) => {
    try {
        const { name, phone, email, address, company, title, tags, notes, image } = req.body;

        // Check for duplicates
        const orConditions = [];
        if (phone) orConditions.push({ phone, createdBy: req.user._id });
        if (email) orConditions.push({ email, createdBy: req.user._id });

        let duplicate = null;
        if (orConditions.length > 0) {
            duplicate = await Contact.findOne({ $or: orConditions });
        }

        if (duplicate) {
            return res.status(409).json({
                message: 'Duplicate contact found',
                duplicate: {
                    _id: duplicate._id,
                    name: duplicate.name,
                    phone: duplicate.phone,
                    email: duplicate.email
                }
            });
        }

        const contact = await Contact.create({
            name,
            phone,
            email,
            address,
            company,
            title,
            tags,
            notes,
            image: image || null,
            createdBy: req.user._id
        });

        res.status(201).json({ message: "new contact added", contact });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// @route   GET /api/auth/contacts?search=&tag=&sort=name&page=&limit=
const searchContacts = async (req, res) => {
    try {
        const { search, tag, sort = 'name', page = 1, limit = 10 } = req.query;

        const query = { createdBy: req.user._id };

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { company: { $regex: search, $options: 'i' } }
            ];
        }

        if (tag) {
            query.tags = tag;
        }

        const sortOptions = {};
        sortOptions[sort] = 1;

        const contacts = await Contact.find(query)
            .sort(sortOptions)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Contact.countDocuments(query);

        res.json({
            contacts,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page),
            total: count
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Get single contact by ID
const getContact = async (req, res) => {
    try {
        const contact = await Contact.findOne({
            _id: req.params.id,
            createdBy: req.user._id
        });

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.json(contact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Dashboard statistics
const getDashboardStats = async (req, res) => {
    try {
        const userId = req.user._id;

        // Total contacts
        const totalContacts = await Contact.countDocuments({ createdBy: userId });

        // Contacts added in last 24 hours
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const recentActivity = await Contact.countDocuments({
            createdBy: userId,
            createdAt: { $gte: oneDayAgo }
        });

        // Tag distribution
        const tagDistribution = await Contact.aggregate([
            { $match: { createdBy: userId } },
            { $unwind: '$tags' },
            { $group: { _id: '$tags', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Recent contacts (last 5)
        const recentContacts = await Contact.find({ createdBy: userId })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('name email phone company title image tags createdAt');

        // Contact growth (last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const contactGrowth = await Contact.aggregate([
            {
                $match: {
                    createdBy: userId,
                    createdAt: { $gte: sixMonthsAgo }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]);

        res.json({
            totalContacts,
            recentActivity,
            tagDistribution,
            recentContacts,
            contactGrowth
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const contacts = await User.find()
            .select('name email role -_id')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await User.countDocuments();

        res.json({
            contacts,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            total: count
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const Update = async (req, res) => {
    try {
        const { phone, email, image } = req.body;
        
        const orConditions = [];
        if (phone) orConditions.push({ phone });
        if (email) orConditions.push({ email });

        let duplicate = null;
        if (orConditions.length > 0) {
            duplicate = await Contact.findOne({
                _id: { $ne: req.params.id }, 
                createdBy: req.user._id,
                $or: orConditions
            });
        }

        if (duplicate) {
            return res.status(409).json({
                message: 'Duplicate contact found',
                duplicate
            });
        }

        const { name, phone: phoneNum, email: emailAddr, address, company, title, tags, notes } = req.body;

        // Build update object
        const updateData = {
            name,
            phone: phoneNum,
            email: emailAddr,
            address,
            company,
            title,
            tags,
            notes
        };

        // Only update image if a new base64 string is provided
        if (image && typeof image === 'string' && image.includes('data:image')) {
            updateData.image = image;
        }

        const contact = await Contact.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user._id },
            updateData,
            { new: true, runValidators: true }
        );

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.json(contact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({ message: 'Contact deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { add, Update, deleteContact, getAllUsers, searchContacts, getContact, getDashboardStats };

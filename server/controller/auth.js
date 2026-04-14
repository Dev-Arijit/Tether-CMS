const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields required' });
        }

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ name, email, password, role });

        res.status(201).json({
            message: 'User registered successfully',
            data: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token: generateToken(user._id)
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email ID' });
        }
        if (!(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.json({
            message: 'Login successful',
            data: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token: generateToken(user._id)
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email already in use' });
            }
            user.email = email;
        }

        if (name) user.name = name;

        await user.save();

        res.json({
            message: 'Profile updated',
            data: {
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { register, login, getProfile, updateProfile };

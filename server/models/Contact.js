const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    phone: {
        type: String,
        required: true,
        match: [/^[0-9]{10,15}$/, 'Invalid phone number'],
        index: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
        index: true
    },
    address: {
        type: String,
        default: ''
    },
    company: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    tags: [{
        type: String,
        enum: ['work', 'family', 'friend', 'emergency', 'other'],
        default: []
    }],
    notes: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: null
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }
}, { timestamps: true });

ContactSchema.index({ name: 'text', email: 'text' });
ContactSchema.index({ phone: 1, createdBy: 1 });
ContactSchema.index({ email: 1, createdBy: 1 });

module.exports = mongoose.model('Contact', ContactSchema);

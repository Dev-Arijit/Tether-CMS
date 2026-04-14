const express = require('express');
const { protect, admin } = require('../middleware/auth');
const { register, login, getProfile, updateProfile } = require('../controller/auth');
const { add, deleteContact, Update, getAllUsers, searchContacts, getContact, getDashboardStats } = require('../controller/contact');

const router = express.Router();

// @route   /api/auth
router.route("/register").post(register);
router.route("/login").post(login);

// Protected user routes
router.route("/user/profile").get(protect, getProfile);
router.route("/user/profile").put(protect, updateProfile);

// Protected contact routes
router.route("/contact/add").post(protect, add);
router.route("/contact/:id").get(protect, getContact);
router.route("/contact/update/:id").put(protect, Update);
router.route("/contact/delete/:id").delete(protect, deleteContact);
router.route("/contacts").get(protect, searchContacts);

// Dashboard
router.route("/dashboard").get(protect, getDashboardStats);

// Admin
router.route("/admin/users").get(protect, admin, getAllUsers);

module.exports = router;
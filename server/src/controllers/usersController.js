const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');


// @desc    Register User
// @route   POST /api/users
// @acess   Public
const registerUser = (req, res) => {
    res.status(200).json({message: 'Register User'});
};

// @desc    Login User
// @route   POST /api/users/login
// @acess   Public
const loginUser = (req, res) => {
    res.status(200).json({message: 'Login User'});
};

// @desc    Get user data
// @route   GET /api/users/me
// @acess   Public
const getUser = (req, res) => {
    res.status(200).json({message: 'Display user data'});
};

module.exports = { registerUser, loginUser, getUser };
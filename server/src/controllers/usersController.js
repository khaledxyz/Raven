const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

// @desc    Register User
// @route   POST /api/users
// @acess   Public
const registerUser = asyncHandler(async(req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body)

    // Check if user exists
    const userExists = userModel.findOne({email});
    if(!userExists) {
        res.status(409);
        throw new Error('Account already exists.');
        return;
    };
    
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    // Push user to the DB
    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    });

    if(user) return res.status(201).json({user});

    res.status(400)
    throw new Error('Something went wrong. Try again.')
});

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
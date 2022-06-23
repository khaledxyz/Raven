const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register User
// @route   POST /api/users
// @acess   Public
const registerUser = asyncHandler(async(req, res) => {
    const { username, email, password } = req.body;

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

    if(user) 
    return res.status(200).json({
        message: 'Registered an account',
        token: generateJWT(user._id)
    });

    res.status(400)
    throw new Error('Something went wrong. Try again.')
});

// @desc    Login User
// @route   POST /api/users/login
// @acess   Public
const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    // Finds the user
    const user = await userModel.findOne({ email });

    // Checks password with bcrypt.compare()
    if(user && await bcrypt.compare(password, user.password)) 
    return res.status(200).json({
        message: 'Logged in',
        token: generateJWT(user._id)
    });

    res.status(401).json({message: 'Wrong Email or Password'});
});

// @desc    Get user data
// @route   GET /api/users/me
// @acess   Public
const getUser = (req, res) => {
    res.status(200).json({message: 'Display user data'});
};


const generateJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
};

module.exports = { registerUser, loginUser, getUser };
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const authenticate = asyncHandler(async (req, res, next) => {
    let token;
    const bearerToken = req.headers.authorization;

    if(bearerToken && bearerToken.startsWith('Bearer')) {
        try {
            // Gets the token from header
            token = bearerToken.split(' ')[1];
            console.log(token)
            
            // Verifies the token
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decodedToken)

            // Gets the user data
            req.user = await userModel.findById(decodedToken.id).select('-password');
            next();
        } 
        catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized. Invalid token signature.');
        }
    }
    if(!token) throw new Error('Not authorized. No token.');
});

module.exports = { authenticate };
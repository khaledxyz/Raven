const asyncHandler = require('express-async-handler');
const goalModel = require('../models/goalModel');
const userModel = require('../models/userModel');

// * FETCH GOALS * //
// @desc    Get Goal
// @route   GET /api/goals
// @acess   Private
const getGoals = asyncHandler(async(req, res) => {
    const goals = await goalModel.find({user: req.user.id});
    res.status(200).json({goals})
});

// * CREATE GOALS * //
// @desc    set Goal
// @route   POST /api/goals
// @acess   Private
const setGoal = asyncHandler(async(req, res) => {
    if(!req.body) {
        res.status(400);
        throw new Error('Empty Fields')
        return;
    }
    const goal = await goalModel.create({
        title: req.body.title,
        user: req.user.id
    });

    res.status(200).json({goal})
});

// * UPDATE GOALS * //
// @desc    update Goal
// @route   PUT /api/goals/:id
// @acess   Private
const updateGoal = asyncHandler(async(req, res) => {
    const goal = await goalModel.findById(req.params.id);

    if(!goal) {
        res.status(404);
        throw new Error('Goal not found!');
        return;
    }
    
    // Checks for user
    const user = await userModel.findById(req.user.id);
    if(!user) {
        res.status(401);
        throw new Error('Not authorized. No user.');
        return;
    }

    // Checks if logged-in user matches the goal's user
    if(goal.user.toString() !== user.id){
        res.status(401);
        throw new Error('Not authorized. Not your goal.');
        return;
    }

    // Updates goal
    const updatedGoal = await goalModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedGoal)
});

// * UPDATE GOALS * //
// @desc    delete Goal
// @route   DELETE /api/goals/:id
// @acess   Private
const deleteGoal = asyncHandler(async(req, res) => {
    const goal = await goalModel.findById(req.params.id);
    if(!goal) {
        res.status(404);
        throw new Error('Goal not found!');
        return;
    }

    // Checks for user
    const user = await userModel.findById(req.user.id);
    if(!user) {
        res.status(401);
        throw new Error('Not authorized. No user.');
        return;
    }

    // Checks if logged-in user matches the goal's user
    if(goal.user.toString() !== user.id){
        res.status(401);
        throw new Error('Not authorized. Not your goal.');
        return;
    }

    // Deletes goal
    await goal.remove();
    res.status(200).json({message: `Deleted Goal ${req.params.id}`})
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal }
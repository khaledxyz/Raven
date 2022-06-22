const asyncHandler = require('express-async-handler');

const goalModel = require('../models/goalModel');

// @desc    Get Goal
// @route   GET /api/goals
// @acess   Private
const getGoals = asyncHandler(async(req, res) => {
    const goals = await goalModel.find();
    res.status(200).json({goals})
});

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
        title: req.body.title
    });

    res.status(200).json({goal})
});

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

    const updatedGoal = await goalModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedGoal)
});

// @desc    delete Goal
// @route   DELETE /api/goals/:id
// @acess   Private
const deleteGoal = asyncHandler(async(req, res) => {
    const goal = await goalModel.findByIdAndDelete(req.params.id);

    if(!goal) {
        res.status(404);
        throw new Error('Goal not found!');
        return;
    }

    await goal.remove();

    res.status(200).json({message: `Delete Goal ${req.params.id}`})
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal }
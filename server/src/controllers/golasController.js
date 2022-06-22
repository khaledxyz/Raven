const asyncHandler = require('express-async-handler');

// @desc    Get Goal
// @route   GET /api/goals
// @acess   Private
const getGoals = asyncHandler(async(req, res) => {
    res.status(200).json({message: 'Get Goals'})
});

// @desc    set Goal
// @route   POST /api/goals
// @acess   Private
const setGoal = asyncHandler(async(req, res) => {
    if(!req.body.text) {
        res.status(400);
        throw new Error('Empty Fields')
        return;
    }
    res.status(200).json({message: 'Set Goal'})
});

// @desc    update Goal
// @route   PUT /api/goals/:id
// @acess   Private
const updateGoal = asyncHandler(async(req, res) => {
    res.status(200).json({message: `Set Goal ${req.params.id}`})
});

// @desc    delete Goal
// @route   DELETE /api/goals/:id
// @acess   Private
const deleteGoal = asyncHandler(async(req, res) => {
    res.status(200).json({message: `Delete Goal ${req.params.id}`})
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal }
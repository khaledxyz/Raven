const express = require('express');
const router = express.Router();

const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/golasController');
const { authenticate } = require('../middleware/authMiddleware');

router.route('/')
    .get(authenticate, getGoals)
    .post(authenticate, setGoal)
;

router.route('/:id')
    .put(authenticate, updateGoal)
    .delete(authenticate, deleteGoal)
;



module.exports = router;
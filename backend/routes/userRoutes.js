const express = require('express');
const userRouter = express.Router()

const { loginUser, updateUser } = require('../controllers/users');

userRouter.post('/login', loginUser);

userRouter.put('/updateUser', updateUser);


module.exports = userRouter;
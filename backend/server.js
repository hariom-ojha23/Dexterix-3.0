const express = require('express')
const { connectDB } = require('./db');
require('dotenv').config()
const userRouter = require('./routes/userRoutes');
const app = express()
app.use(express.json())
app.use('/user', userRouter);
// app.use(express.urlencoded())

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port ${process.env.PORT}`)
})
connectDB();

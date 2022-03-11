const express = require('express')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(express.urlencoded(true))

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port ${process.env.PORT}`)
})

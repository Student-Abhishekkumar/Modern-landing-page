const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./config/db')
connectDB()
const userRoutes = require('./routes/user.routes')
const homeroutes = require('./routes/home.routes')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', userRoutes)
app.use('/home', homeroutes)

app.listen(3000, () => {
    console.log("server is running on port 3000");
})
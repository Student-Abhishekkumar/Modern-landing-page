const express = require('express')
const app = express()

const { body, validationResult } = require('express-validator')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./config/db')
connectDB()
const userModel = require('./models/user.model')


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/login', (req, res) => {
    res.render('index')
})

app.post('/',
    body('name').trim().isLength(3),
    body('email').trim().isEmail().isLength(10),
    body('password').trim().isLength(5),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid input'
            })
        }
        const { name, email, password } = req.body
        await userModel.create({
            name: name,
            email: email,
            password: password
        })
        console.log({
            name,
            email,
            password
        });

        res.render('index')

    })

app.post('/login',
    body('email').trim().isEmail().isLength(10),
    body('password').trim().isLength(5),
    async (req, res) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({
                errors: error.array(),
                message: 'invalid input'
            })
        }

        const { email, password } = req.body
        const user = userModel.findOne({
            email: email
        })
        if (!user) {
            return res.status(400).json({
                errors: [{ msg: 'Invalid email or password' }],
            })
        }
        const isMatch = await userModel.findOne({
            password: password
        })
        if (!isMatch) {
            return res.status(400).json({
                errors: [{ msg: 'Invalid email or password' }],
            })
        }
        console.log({
            email,
            password
        });

        res.render('home')
    })


app.listen(3000, () => {
    console.log("server is running on port 3000");

})
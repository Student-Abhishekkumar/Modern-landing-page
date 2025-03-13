const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator')
const userModel = require('../models/user.model');

router.get('/login', (req, res) => {
    res.render('index')
})

router.post('/',
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

router.post('/login',
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
    }
)

module.exports = router;
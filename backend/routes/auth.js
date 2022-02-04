// /api/auth is handled here 
const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const { body, validationResult } = require('express-validator');

// Create User : POST '/api/auth/createUser'
router.post('/createUser/',
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    async (req, res) => {
        //catch validation errors if any
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //check unique email.
        try {
            const emailExists = await User.findOne({ email: req.body.email });
            if (emailExists) {
                res.status(400).json({ error: 'User with this email already exists' });
                return;
            }
            let user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })
            res.send(user);

        } catch (error) {
            console.error(error);
            res.status(500).json({error:'Internal server error'})
        }

    })

module.exports = router;
// /api/auth is handled here 
const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create User : POST '/api/auth/createUser'
router.post('/createUser',
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    async (req, res) => {
        //catch validation errors if any
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            //check unique email.
            const emailExists = await User.findOne({ email: req.body.email });
            if (emailExists) {
                return res.status(400).json({ error: 'User with this email already exists' });
            }
            //encrypt password using brcrypt hash
            const hash_password = await bcrypt.hash(req.body.password, 10);
            let user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash_password,
            })
            //generate auth token.
            const tokenPayload = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(tokenPayload, 'secreteStringisGod');
            res.json({ authToken });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' })
        }

    })

// login : POST '/api/auth/login'
router.post('/login',
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password required').exists(),
    async (req, res) => {
        //catch validation errors if any
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        
        try {
            //check unique email.
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }
            //encrypt password using brcrypt hash
            const checkPassword = await bcrypt.compare(req.body.password,user.password)
            if(!checkPassword){
                return res.status(400).json({ error: 'Invalid credentials' });
            }
            //generate auth token.
            const tokenPayload = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(tokenPayload, 'secreteStringisGod');
            res.json({ authToken });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' })
        }

    })
module.exports = router;
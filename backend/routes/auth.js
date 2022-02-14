// /api/auth is handled here 
const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../constants/secrets');
const getUser = require('../middleware/getuser')

// Create User : POST '/api/auth/createUser' login not required
router.post('/createUser',
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    async (req, res) => {
        //catch validation errors if any
        const errors = validationResult(req);
        let success =false;
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }

        try {
            //check unique email.
            const emailExists = await User.findOne({ email: req.body.email });
            if (emailExists) {
                return res.status(400).json({success, error: 'User with this email already exists' });
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
            const authToken = jwt.sign(tokenPayload, jwtSecret);
            success=true;
            res.json({success, authToken });

        } catch (error) {
            console.error(error);
            res.status(500).json({success, error: 'Internal server error' })
        }

    })

// login : POST '/api/auth/login' . login not required
router.post('/login',
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password required').exists(),
    async (req, res) => {
        //catch validation errors if any
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success,errors: errors.array() });
        }

        
        try {
            //check unique email.
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ success,error: 'Invalid credentials' });
            }
            //encrypt password using brcrypt hash
            const checkPassword = await bcrypt.compare(req.body.password,user.password)
            if(!checkPassword){
                return res.status(400).json({ success,error: 'Invalid credentials' });
            }
            //generate auth token.
            const tokenPayload = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(tokenPayload, jwtSecret);
            success = true;
            res.json({ success, authToken });

        } catch (error) {
            console.error(error);
            res.status(500).json({ success, error: 'Internal server error' })
        }

    })

// getUser : POST '/api/auth/getUser' get user details post login
router.post('/getUser',
getUser,
async (req, res) => {
    try {
        //check unique email.
        const user = await User.findById(req.user.id).select("-password");
        res.json({ user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' })
    }

})
module.exports = router;
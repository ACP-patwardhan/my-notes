// /api/auth is handled here 
const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const { body, validationResult } = require('express-validator');

// Create User : POST '/api/auth/'
router.post('/',
    body('email','Enter a valid Email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({min:5}),
    (req,res)=>{
        const errors=validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        User.create({
            name: req.body.name,
            email:req.body.email,
            password: req.body.password,
        }).then(user => res.json(user)).catch(err=>{
            console.log(err)
            res.json({error:'this email already exists',message:err.message})
        });
    })

module.exports = router;
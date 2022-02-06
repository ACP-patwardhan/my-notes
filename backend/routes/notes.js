// /api/notes is handled here 
const express = require('express');
const router = express.Router();
const Notes = require('../database/models/Notes');
const { body, validationResult } = require('express-validator');
const getUser = require('../middleware/getuser')
const verifyUser = require('../middleware/verifyuser');
// add a note : /api/notes/addNote adds notes to a user post login.
router.post('/addNote',
    getUser,
    body('title', 'Please enter a title to your note').exists(),
    body('description', 'Please enter a description in your note').exists(),
    body('tag', 'Please enter a suitable tag in your note').exists(),
    async (req, res) => {
        //catch validation errors if any
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let note = await Notes.create({
                user: req.user.id,
                title: req.body.title,
                description: req.body.description,
                tag: req.body.tag
            });
            res.send(note);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' })
        }
    }
)

//fetch all notes of a user. /api/notes/fetchAll fetched all notes of a user post login
router.get('/fetchAll',
    getUser,
    async (req, res) => {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    })
//update a note of a user. /api/notes/update/:id updates a note of a user post login
router.put('/update/:id',
    getUser,
    verifyUser,
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const newNote = {};
            if (title) newNote.title = title;
            if (description) newNote.description = description;
            if (tag) newNote.tag = tag;
            const note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json(note);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' })
        }
    })
// delete a note of a user. /api/notes/delete/:id deletes the note from db post login
router.delete('/delete/:id',
    getUser,
    verifyUser,
    async (req, res) => {
        try {
            const note = await Notes.findByIdAndDelete(req.params.id);
            res.json({message:"successfully deleted the note",note});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' })
        }
    })
module.exports = router;
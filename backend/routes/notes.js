// /api/notes is handled here 
const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    const obj={
    }
    res.json(obj);
})

module.exports = router;
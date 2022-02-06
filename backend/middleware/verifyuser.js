const Notes = require('../database/models/Notes');
//If a note is modified, we check that the note belongs to the user that has logged in.
const verifyuser = async (req,res,next)=>{
    try {
        const note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).json({error:"Note not found!"});
        }
        if(req.user.id !== note.user.toString()){
            return res.status(401).json({error:"Access denied"});
        }
        next();
    } catch (error) {
        return res.status(500).json({error:"Internal server error"})
    }
}
module.exports = verifyuser;
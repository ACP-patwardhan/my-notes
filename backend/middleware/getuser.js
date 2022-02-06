const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../constants/secrets')
// add user to req if valid auth-token is passed in header.
const getuser = (req,res,next)=>{
    const token =req.header('auth-token');
    if(!token){
        return res.status(401).json({error:"Bad token,Access denied"})
    }
    try {
        const decodeToken = jwt.verify(token,jwtSecret);
        req.user=decodeToken.user;
        next();
    } catch (error) {
        return res.status(500).json({error:"Internal server error"})
    }
}
module.exports = getuser;
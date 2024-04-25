const jwt = require('jsonwebtoken')


async function verifyToken(req,res,next){

    try {
        
        let token = req.header('Authorization')
        if(!token)
        {
            return res.status(400).send('access denied')
        }
    
            if(token.startsWith('Bearer ')){
                token = token.slice(7,token.length).trimLeft();
            }

            const verified = jwt.verify(token,process.env.JWT_SECRETE)
            req.user = verified;
            next()

    } catch (error) { 
        res.status(500).json({error:error.message})
    }
}

module.exports =verifyToken;
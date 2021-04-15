require('dotenv').config();

// NO USE, NO TEST YET
module.exports = (req, res, next) => {
    if(req.headers["authorization"]){
        const token = req.headers["authorization"].split(" ")[1];
        if(token){
            const jwt = require('jsonwebtoken');
            jwt.verify(token, process.env.tokenkey, (err, result) => {
                if(err){
                    res.status(401).json({error: "Unauthorized" });
                }
                else{
                    req.token = result; /* To access account information in controllers */
                    next();
                }
            })
        }
        else{
            res.status(401).json({error: "Unauthenticated : no token" });
        }
    }
    else{
        res.status(401).json({error: "Unauthenticated : no headers" });
    }
};

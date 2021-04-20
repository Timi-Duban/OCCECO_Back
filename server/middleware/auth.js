require('dotenv').config();

// NO USE, NO TEST YET
module.exports = (req, res, next) => {
    console.log(req.headers)
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
            console.log('no token')
            res.status(401).json({error: "Unauthenticated : no token" });
        }
    }
    else{
        console.log("no headers")
        res.status(401).json({error: "Unauthenticated : no headers" });
    }
};

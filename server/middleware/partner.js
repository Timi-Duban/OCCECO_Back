require('dotenv').config();

/**
 * Middleware that check is the account is at least a partner.
 */
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
                    if(result && (result.accountType == "partner" || result.accountType == "admin")){
                        next();
                    }else{
                        res.status(401).json({error: "Unauthorized" });
                    }
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

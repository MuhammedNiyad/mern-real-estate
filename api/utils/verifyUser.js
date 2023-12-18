import { errorHandler } from "./error.js";
import  jwt  from "jsonwebtoken";

export const verifyToken = ( req, res, next) => {
    /*if we want get any data from cookie first we need install a package named \cookie-parser\ ! 
    and import index.js and initialize as a middlewere..!*/

    const token = req.cookies.access_token;

    if(!token) return next(errorHandler(401, 'Unauthorized'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(errorHandler(403, 'Token forbidden'));

        req.user = user;
        next();
    });

}
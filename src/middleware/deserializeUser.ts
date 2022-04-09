import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt.utils";

const deserializeUser = (req: Request, res: Response, next: NextFunction)=>{
    // get akses token
    const accessToken = get(req, "headers.authorization", '').replace(/^Bearer\s/,"")
    if (!accessToken){
        return next()
    }
    const {decoded, expired} = verifyJwt(accessToken)
    // console.log("decoded ", decoded)
    if(decoded){
        // simpan token yg telah didecode ke local user
        res.locals.user = decoded
        return next()
    }
    return next()
}

export default deserializeUser
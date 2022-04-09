import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { reIssueAccessToken } from "../service/session.service";
import { verifyJwt } from "../utils/jwt.utils";

const deserializeUser = async (req: Request, res: Response, next: NextFunction)=>{
    // get akses token
    const accessToken = get(req, "headers.authorization", '').replace(/^Bearer\s/,"")
    // get refresh token
    const refreshToken = get(req, "headers.x-refresh")
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
    // jika token sdh kadaluarsa tp masih punya refresh token
    if(expired && refreshToken){
        // kita perlu reIssue accessToken karena sdh kadaluarsa refresh token msh aktif, maka di service (session.service.ts) buat func reIssueAccessToken
        const newAccessToken = await reIssueAccessToken({ refreshToken });
        if (newAccessToken){
            res.setHeader("x-access-token", newAccessToken);
        }
        const result = verifyJwt(newAccessToken as string);
        res.locals.user = result.decoded
        return next()
    }
    return next()
}

export default deserializeUser
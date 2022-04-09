import { Request, Response } from "express";
import { createSession, findSession, updateSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";
import config from 'config'
export async function createUserSessionHandler(req:Request, res: Response) {
    //1. validasi password user
    const user = await validatePassword(req.body)
    if(!user) {
        return res.status(401).send("invalid email or password")
    }
    //2. buat session
    const session = await createSession(user._id, req.get("user-agent") || "")
    // 3. buat akses token
    const accessToken = signJwt({
        // payload nya
        ...user, session : session._id},
        {
            // option
            expiresIn: config.get("accessTokenTtl")
        }
    )
    // 4. buat refresh token
    const refreshToken = signJwt({
        // payload nya
        ...user, session : session._id},
        {
            // option
            expiresIn: config.get("refreshTokenTtl")
        }
    )
    // 5. return akses & refresh token
    return res.send({accessToken, refreshToken})
}

export async function getUserSessionHandler(req:Request, res: Response) {
    // get id user dr token. untuk mencegah jika id user tdk ada buat middleware 
    const userId = res.locals.user._id
    // console.log(userId)//debug
    // jika data session tidak ingin ditampilkan / dikirim maka set valid : false
    const sessions = await findSession({user: userId, valid: true })
    // console.log({sessions}) //debug
    return res.send(sessions)
}

export async function deleteSessionHandler(req:Request, res: Response){
    // kita perlu id session yg ingin dihapus
    const sessionId = res.locals.user.session
    await updateSession({_id: sessionId},{valid: false})
    return res.send({
        accessToken: null,
        refreshToken: null
    })
}
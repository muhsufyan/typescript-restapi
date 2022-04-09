import SessionModel, { SessionDocument } from "../models/session.model";
import {FilterQuery, UpdateQuery} from 'mongoose';
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { get } from "lodash";
import { findUser } from "./user.service";
import config from 'config';

export async function createSession(userId:string, userAgent: string) {
    const session = await SessionModel.create({user: userId, userAgent})
    return session.toJSON()
}

export async function findSession(query: FilterQuery<SessionDocument>) {
    // lean artinya get semua data dlm object (json)
    return SessionModel.find(query).lean();
}
// untuk update session
export async function updateSession(query:FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
    return SessionModel.updateOne(query, update)
}

export async function reIssueAccessToken({refreshToken}:{refreshToken: string}) {
    // lakukan decode untuk refresh token
    const{decoded} = verifyJwt(refreshToken)
    // decode & user id tdk ada
    if(!decoded|| !get(decoded,'session')) return false
    // get session
    const session = await SessionModel.findById(get(decoded,'session'))
    // jika tdk ada session dan valid-nya false maka kita tdk punya issue tentang access token
    if(!session || !session.valid) return false;
    // temukan user dg id, untuk melakukan ini buat func findUser di user.service.ts
    const user = await findUser({_id: session.user})
    // jika user-nya tdk ada
    if(!user) return false
    // jika user-nya ada buat access token yg baru
    // buat akses token
    const accessToken = signJwt({
        // payload nya
        ...user, session : session._id},
        {
            // option
            expiresIn: config.get("accessTokenTtl")
        }
    )
    return accessToken
}
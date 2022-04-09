import config from 'config';
import jwt from 'jsonwebtoken';
const privateKey = config.get<string>("privateKey")
const publicKey = config.get<string>("publicKey")
// buat/generate token
export function signJwt(object:Object, options?: jwt.SignOptions | undefined) {
    // object = payload, privateKey = secret key, option sprti algoritma, expire time, dll
    return jwt.sign(object, privateKey, {
        // jika undefined maka kita perlu option sprt brkt jika hanya ...options maka akan error
        ...(options && options),
        algorithm: 'RS256',
    })
}
// verifikasi token
export function verifyJwt(token:string) {
    try {
        const decode = jwt.verify(token, publicKey)
        return {
            valid: true,
            expire: false,
            decode 
        }
    } catch (error: any) {
        return {
            valid: false,
            expire: error.message === 'token is expire',
            decode: null 
        }
    }
}
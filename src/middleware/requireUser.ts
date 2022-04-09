import { NextFunction, Request, Response } from "express"

const requireUser = (req: Request, res: Response, next: NextFunction)=> {
    // get data user dari payload token
    const user = res.locals.user
    if(!user){
        return res.sendStatus(403)
    }
    return next()
}
export default requireUser
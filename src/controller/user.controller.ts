import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import logger from "../utils/logger"
// handler create user
export async function createUserHandler(req:Request<{},{},CreateUserInput['body']>, res: Response) {
    try {
        // call create user service 
        const user = await createUser(req.body)
        // agar password tdk muncul saat response gunakan omit
        return res.send(omit(user.toJSON(), "password"))
    } catch (e: any) {
        logger.error(e)
        // conflict, misal email tlh digunakan
        return res.status(409).send(e.message)
    }
}
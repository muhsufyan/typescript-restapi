import { Response, Request, NextFunction } from "express"
// for schema
import { AnyZodObject } from "zod"
// schema as param and validate will return another func
const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) =>{
    try {
        schema.parse({
            // handle body (data diinput user)
            body: req.body,
            // handle query misal localhost?tag="satu" for catch tag="satu"
            query: req.query,
            // handle url param misal localhost/:id for catch id
            param: req.params
        })
        next()
    } catch (error: any) {
        return res.status(400).send(error.errors)
    }
} 

export default validate
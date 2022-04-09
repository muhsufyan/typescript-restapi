import { object,string, TypeOf } from "zod";

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required'
        }),
        password: string({
            required_error: 'Password is required'
        }).min(6, "Password too short - min 6 character"),
        passwordConfirm: string({
            required_error: 'Password Confirm is required'
        }),
        email: string({
            required_error: "email is required"
        }).email('email is not valid'),
    }).refine((data)=>data.password == data.passwordConfirm, {
        message: "password not match",
        path: ['passwordConfirm']
    })
})

// kita perlu tambah omit
export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>,"body.passwordConfirm">
import mongoose from 'mongoose'
import supertest from 'supertest'
import { createUserSessionHandler } from '../controller/session.controller'
import * as UserService from '../service/user.service'
import createServer from '../utils/server'
import * as SessionService from "../service/session.service";
const app = createServer()
const userId = new mongoose.Types.ObjectId().toString()
const userPayload = {
    _id: userId,
    email:"email1@email.com",
    name:"name 1"
}
const userInput = {
    email:"email1@email.com",
    password:"password",
    passwordConfirm:"password",
    name:"name 1"
}
const sessionPayload = {
    _id: new mongoose.Types.ObjectId().toString(),
    user: userId,
    valid: true,
    userAgent: "PostmanRuntime/7.28.4",
    createdAt: new Date("2021-09-30T13:31:07.674Z"),
    updatedAt: new Date("2021-09-30T13:31:07.674Z"),
    __v: 0,
  };
describe('user', () =>{
    // register
    describe('user register',()=>{
        describe('given username & password are valid', () =>{
            it('should return the user payload',async ()=>{
                const createUserServiceMock = jest
                                            .spyOn(UserService,'createUser')
                                            // @ts-ignore
                                            .mockReturnValueOnce(userPayload)
                
                const {statusCode, body} = await supertest(app).post('/api/users').send(userInput)
                expect(statusCode).toBe(200)
                expect(body).toEqual(userPayload)
                expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
            })
        })
        describe('given the password not match',()=>{
            it('should return status 400', async ()=>{
                const createUserServiceMock = jest
                                            .spyOn(UserService,'createUser')
                                            // @ts-ignore
                                            .mockReturnValueOnce(userPayload)
                
                const {statusCode} = await supertest(app).post('/api/users').send({...userInput, passwordConfirm: 'wrongpassword'})
                expect(statusCode).toBe(400)
                expect(createUserServiceMock).not.toHaveBeenCalled();
            })
        })
        // agar test ini berjln maka set resetMocks: true & restoreMocks: true di jest.config.js
        describe('given user service throws',()=>{
            it('should handle the error, return 409 error',async ()=>{
                const createUserServiceMock = jest
                                            .spyOn(UserService,'createUser')
                                            .mockRejectedValue('tidakkk')
                
                const {statusCode} = await supertest(app).post('/api/users').send(userInput)
                expect(statusCode).toBe(409)
                expect(createUserServiceMock).toHaveBeenCalled();
            })
            })
        })
    })
    describe('create user session',()=>{
        describe('given the username & password are valid',()=>{
            it('should return access token & refresh token', async ()=>{
                jest
                    .spyOn(UserService,'validatePassword')
                    // @ts-ignore
                    .mockReturnValue(userPayload)
                
                jest.spyOn(SessionService, 'createSession')
                    // @ts-ignore
                    .mockReturnValue(sessionPayload);

                const req = {
                    get:()=>{
                        return 'a user agent'
                    },
                    body:{
                        email:"email1@email.com",
                        password:"password",
                    }
                }
                const send = jest.fn()
                const res = {
                    send
                }
                // @ts-ignore
                await createUserSessionHandler(req, res)
                expect(send).toHaveBeenCalledWith({
                    accessToken: expect.any(String),
                    refreshToken: expect.any(String),
                })
            })
        })
    })
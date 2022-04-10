import supertest from "supertest"
import createServer from "../utils/server"
// mock untuk operasi ke db saat test
import {MongoMemoryServer }from "mongodb-memory-server";
import mongoose from "mongoose";
const app = createServer()
describe('product',()=>{
    // before all test run this
    beforeAll(async ()=>{
        const mongoServer = await MongoMemoryServer.create()
        await mongoose.connect(mongoServer.getUri())
    })
    // after all test run this
    afterAll(async ()=>{
        await mongoose.disconnect()
        await mongoose.connection.close()
    })
    describe('get product route',()=>{
        describe('given the product does not exist',()=>{
            // test logic
            it('should return 404',async ()=>{
                const productId = 'product-123'
                // kita perlu app di app.ts as arg supertest so export it
                await supertest(app).get(`/api/products/${productId}`).expect(404)
            })
        })
    })
})
import supertest from "supertest"
import createServer from "../utils/server"
// mock untuk operasi ke db saat test
import {MongoMemoryServer }from "mongodb-memory-server";
import mongoose from "mongoose";
import { createProduct } from "../service/product.service";
import { signJwt } from "../utils/jwt.utils";
const app = createServer()
const userId = new mongoose.Types.ObjectId().toString()
export const productPayload = {
    user: userId,
    title:"title updated",
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel massa enim. Maecenas sapien libero, sodales at lectus eget, auctor condimentum sapien. Quisque consectetur, magna convallis porttitor dignissim, ante turpis pharetra nunc, vel scelerisque nisl justo eget ligula. Nulla laoreet quam ut accumsan auctor. Suspendisse nisl ex, sollicitudin vitae aliquam et, ornare in velit. Phasellus et lorem accumsan, congue augue id, auctor arcu. Nulla facilisi. Nam porttitor augue quis dignissim vehicula. Cras id bibendum neque. Donec sit amet tellus at lorem vestibulum bibendum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras gravida tristique urna vitae interdum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean porta pulvinar lacus vitae eleifend.",
    price:100.000,
    image:"https://cdn.shopify.com/s/files/1/0070/7032/files/new-product-development-process.jpg"
}
export const userPayload = {
    _id: userId,
    email:'email1@email.com',
    name:'name 1'
}
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
        }),
        // test get product with product id
        describe('given the product does exist',()=>{
            // test logic
            it('should return 200',async ()=>{
                // save to mock db
                const product = await createProduct(productPayload);
                // kita perlu app di app.ts as arg supertest so export it
                const { body, statusCode } = await supertest(app).get(
                    `/api/products/${product.productId}`
                  );
                  expect(statusCode).toBe(200);
                  expect(body.productId).toBe(product.productId);
            });
        });
    });
    // 
    describe('create product route',()=>{
        // test 1
        describe('given the user is not logged in', ()=>{
            it('should return 403',async ()=>{
                const {statusCode} = await supertest(app).post('/api/products')
                expect(statusCode).toBe(403)
            })
        })
        // test 2
        describe('given the user is logged in', ()=>{
            it('should return 200 and create new product',async ()=>{
                const jwt = signJwt(userPayload)

                const {statusCode, body} = await supertest(app).post('/api/products')
                            .set('Authorization',`Bearer ${jwt}`)
                            .send(productPayload)

                expect(statusCode).toBe(200)
                // expect(body).toEqual({}) //debug 
                expect(body).toEqual({
                    __v: 0,
                    _id: expect.any(String),
                    createdAt: expect.any(String),
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel massa enim. Maecenas sapien libero, sodales at lectus eget, auctor condimentum sapien. Quisque consectetur, magna convallis porttitor dignissim, ante turpis pharetra nunc, vel scelerisque nisl justo eget ligula. Nulla laoreet quam ut accumsan auctor. Suspendisse nisl ex, sollicitudin vitae aliquam et, ornare in velit. Phasellus et lorem accumsan, congue augue id, auctor arcu. Nulla facilisi. Nam porttitor augue quis dignissim vehicula. Cras id bibendum neque. Donec sit amet tellus at lorem vestibulum bibendum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras gravida tristique urna vitae interdum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean porta pulvinar lacus vitae eleifend.",
                    image: "https://cdn.shopify.com/s/files/1/0070/7032/files/new-product-development-process.jpg",
                    price: 100,
                    productId: expect.any(String),
                    title: "title updated",
                    updatedAt: expect.any(String),
                    user: expect.any(String),
                })
            })
        })
    })
})
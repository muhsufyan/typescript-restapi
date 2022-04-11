import { Express, Request, Response } from "express";
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "./controller/product.controller";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler } from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "./schema/product.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {
    // komen ini dlm bntk yml dan akan digenerate jd swagger ui
    /**
     * @openapi
     * /halo:
     *  get:
     *     tags:
     *     - test route
     *     description: route ini hanya untuk mengetes bahwa typescript express telah jalan
     *     responses:
     *       200:
     *         description: aplikasi telah berjalan
     */
    app.get("/halo",(req: Request, res: Response)=>res.sendStatus(200))

    /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
    app.post("/api/users", validateResource(createUserSchema) ,createUserHandler)
    app.post("/api/sessions", validateResource(createSessionSchema) ,createUserSessionHandler)
    app.get("/api/sessions", requireUser , getUserSessionHandler)
    app.delete("/api/sessions", requireUser, deleteSessionHandler)
    // kita perlu menerapkan banyak middleware sehingga middleware dimasukkan kedlm array
    app.post('/api/products', [requireUser, validateResource(createProductSchema)], createProductHandler)
    app.put('/api/products/:productId', [requireUser, validateResource(updateProductSchema)], updateProductHandler)
    /**
    * @openapi
    * '/api/products/{productId}':
    *  get:
    *     tags:
    *     - Products
    *     summary: Get a single product by the productId
    *     parameters:
    *      - name: productId
    *        in: path
    *        description: The id of the product
    *        required: true
    *     responses:
    *       200:
    *         description: Success
    *         content:
    *          application/json:
    *           schema:
    *              $ref: '#/components/schema/Product'
    *       404:
    *         description: Product not found
    */
    app.get('/api/products/:productId', validateResource(getProductSchema), getProductHandler)
    app.delete('/api/products/:productId', [requireUser, validateResource(deleteProductSchema)], deleteProductHandler)
    app.get("/tes/:productId", (req: Request, res: Response)=>res.send(req.params.productId))
}
export default routes
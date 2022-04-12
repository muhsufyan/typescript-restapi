import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";
import log from "./logger";
const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Dokumentasi Rest Api",
            version
        },
        // set up untuk otentifikasi
        components:{
            securitySchemes: {
                bearerAuth:{
                    type:'http',
                    scheme:'bearer',
                    bearerFormat:'JWT'
                }
            }
        },
        security:[{
            bearerAuth: []
        }]
    },
    // path to open api (route our api )
    apis:['./src/routes.ts','./src/schema/*.ts']
}

// buat spec
const swaggerSpec = swaggerJsdoc(options)
// fungsi ini akan expose endpoint
function swaggerDocs(app:Express, port:number) {
    // endpoint untuk swagger page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    // Docs in json format
    app.get('docs.json',(req: Request, res: Response)=>{
        res.setHeader('Content-Type','application/json')
        res.send(swaggerSpec)
    })
    log.info(`Docs available  at http://localhost:${port}/docs`)
}

export default swaggerDocs
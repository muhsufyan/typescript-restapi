import express from "express";
import config from 'config';
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";
// get() bertipe T yaitu genertic (dpt bertipe apapun), sehingga kita set tipenya number
const port = config.get<number>('port')
const app = express()
app.use(express.json())
// gunakan middleware yg kita buat
app.use(deserializeUser)
// karena terkoneksi ke db jd asynchronous
app.listen(port, async ()=>{
    logger.info(`running at http://localhost:${port}`)
    await connect()

    routes(app)
})
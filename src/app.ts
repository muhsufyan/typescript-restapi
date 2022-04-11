import config from 'config';
import connect from "./utils/connect";
import logger from "./utils/logger";
import createServer from "./utils/server";
import swaggerDocs from './utils/swagger';
// get() bertipe T yaitu genertic (dpt bertipe apapun), sehingga kita set tipenya number
const port = config.get<number>('port')
const app = createServer()
// karena terkoneksi ke db jd asynchronous
app.listen(port, async ()=>{
    logger.info(`running at http://localhost:${port}`)
    await connect()
    // swagger
    swaggerDocs(app, port)
})
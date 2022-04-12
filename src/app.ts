// memakai custom-environment-variables.ts yg semua nilainya dari .env uncommet 2 kode dibawah ini dan comment 2 buah  dibawah config
// import dotenv from 'dotenv';
// dotenv.config();
import config from 'config';
// memakai default.ts nilai useDatabase di set di .env
import dotenv from 'dotenv';
dotenv.config();
import connect from "./utils/connect";
import logger from "./utils/logger";
import createServer from "./utils/server";
import swaggerDocs from './utils/swagger';
// get() bertipe T yaitu genertic (dpt bertipe apapun), sehingga kita set tipenya number
const port = config.get<number>('port')
console.log(config.get("privateKey"))
console.log("Use database", typeof config.get("useDatabase"))
const app = createServer()
// karena terkoneksi ke db jd asynchronous
app.listen(port, async ()=>{
    logger.info(`running at http://localhost:${port}`)
    await connect()
    // swagger
    swaggerDocs(app, port)
})
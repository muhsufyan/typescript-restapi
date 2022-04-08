import mongoose from "mongoose";
import config from 'config';
// // CARA1 single code
// export default function connect() {
//     const dbUri = config.get<string>("dbUri")
//     return mongoose.connect(dbUri).then(()=>{console.log("connected to db")}).catch((error)=>{
//         console.log("connected failed")
//         console.log(error)
//         process.exit(1)
//     })
// }
// // CARA 2 REFACTOR CARA 1
// async function connect() {
//     const dbUri = config.get<string>("dbUri")
//     try {
//         await mongoose.connect(dbUri) 
//         console.log("connected to db")
//     } catch (error) {
//         console.log("connected failed")
//         console.log(error)
//         process.exit(1)
//     }
   
// }

// export default connect;
import logger from "./logger";
// CARA 3 DG LOGGER 
async function connect() {
    const dbUri = config.get<string>("dbUri")
    try {
        await mongoose.connect(dbUri) 
        logger.info("connected to db")
    } catch (error) {
        logger.error("connected failed")
        logger.error(error)
        process.exit(1)
    }
   
}

export default connect;
import mongoose from "mongoose";
import config from 'config';
import logger from "./logger";
// CARA 3 + LOGGER 
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
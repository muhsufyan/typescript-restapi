import express from "express";
import config from 'config';
// get() bertipe T yaitu genertic (dpt bertipe apapun), sehingga kita set tipenya number
const port = config.get<number>('port')
const app = express()

app.listen(port,()=>{
    console.log("tes")
})
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import listEndpoints from 'express-list-endpoints'

const server=express()
const port=process.env.PORT||3001

//*______________________________________________ MIDDLEWARES
const corsOptions={
    origin:process.env.FE_DEV_URL
}
server.use(cors())
server.use(express.json())

//*______________________________________________ ROUTES

//*______________________________________________ ERROR HANDLERS

//*______________________________________________ CONNECTION
mongoose.connect(process.env.MONGO_CONNECTION)
mongoose.connection.on('connected',()=>{
    console.log('CONNECTED TO MONGO')
    server.listen(port,()=>{
        console.table(listEndpoints(server))
        console.log(`PORT ${port}`)
    })
})
mongoose.connection.on('error',(err)=>{
    console.log(err)
})
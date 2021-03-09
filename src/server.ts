import express from 'express'
import mongoose from 'mongoose'
import http from 'http'
import dotenv from 'dotenv'
import app from './router/index'


dotenv.config()
const port = process.env.port || 3000

http.createServer(app).listen(port, ()=>{
    console.log(`server running to  ${port}`)
})

mongoose.connect(`mongodb+srv://vutrong:${process.env.MG_pass}@cluster0.sllrw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
        if (err) {

            throw err
        }
        console.log('connect database succerfull')

    }
)
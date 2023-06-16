require('dotenv').config()

const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const productRoutes= require('./routes/products')
const userRoutes= require('./routes/user')

//express app
const app = express() 

// Enable CORS for all routes
app.use(cors());
// middleware
app.use(express.json())

app.use((req, res, next)=> {
    console.log(req.path,req.method)
    next()
})

//routes
app.use('/api/products',productRoutes)
app.use('/api/user',userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
 .then(() => {
// listen for requests 
 app.listen(process.env.PORT,()=> {
 console.log('connected to DB and listening on port',process.env.PORT) 
})

 })
 .catch((error) => {
    console.log(error)
 })




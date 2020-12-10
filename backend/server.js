

import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import productRouter from './routes/productRoutes.js'
import {notFound, errorHandler} from './middleware/errorHandlers.js'

dotenv.config()
connectDb()
const app = express()
app.use('/api/products', productRouter)

app.use(notFound)

app.use(errorHandler)



const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log('App listening  on port 5000!'.yellow.bold);
});
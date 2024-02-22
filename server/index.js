import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import productRoutes from './routes/product-routes.js'
import userRoutes from './routes/user-routes.js'
import { errorHandler, notFound } from './middleware/error-middleware.js'

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()
// Database Connection
connectDB()
// middlewares
app.use(cors())
// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Cookie Pareser
app.use(cookieParser())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

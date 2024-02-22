import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/product-routes.js'
import userRoutes from './routes/user-routes.js'
import { errorHandler, notFound } from './middleware/error-middleware.js'

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()
connectDB()
app.use(cors())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

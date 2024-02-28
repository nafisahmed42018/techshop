import path from 'path'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import productRoutes from './routes/product-routes.js'
import userRoutes from './routes/user-routes.js'
import orderRoutes from './routes/order-routes.js'
import uploadRoutes from './routes/upload-routes.js'
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
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID }),
)

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve()
  app.use('/uploads', express.static('/var/data/uploads'))
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')),
  )
} else {
  const __dirname = path.resolve()
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

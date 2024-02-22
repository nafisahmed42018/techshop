import jwt from 'jsonwebtoken'
import asyncHandler from './async-handler.js'
import User from '../models/user-schema.js'

// Protect Routes

const protect = asyncHandler(async (req, res, next) => {
  let token

  //  Read the JWT from cookie
  token = req.cookies.jwt

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  } else {
    res.status(401)
    throw new Error('Not authorized, no token found')
  }
})

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as admin')
  }
}

export { protect, admin }

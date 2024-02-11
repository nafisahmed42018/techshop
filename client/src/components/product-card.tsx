import React, { FC } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './rating'

interface Product {
  _id: string
  name: string
  image: string
  rating: number
  numReviews: number
  price: number
}

interface ProductCardProps {
  product: Product
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <Card>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={`${product.image}`} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title
            as="h6"
            className="product-title"
            title={`${product.name}`}
          >
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h4">
          <div>{product.price}</div>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ProductCard

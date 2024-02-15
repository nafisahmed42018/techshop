import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import Rating from '../components/rating'
import { useGetProductDetailsQuery } from '../slices/products-api-slice'
import Loader from '../components/loader'
import Message from '../components/message'

interface Product {
  _id: string
  name: string
  image: string
  description: string
  price: number
  countInStock: number
  rating: number
  numReviews: number
}

const ProductScreen: React.FC = () => {
  const { id: productId } = useParams<{ id: string }>()

  const { data: product, isLoading, error } = useGetProductDetailsQuery(
    productId,
  )

  return (
    <>
      {/* Back Button */}
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {/* Product Details Display */}
      {isLoading ? (
        <Loader />
      ) : error && 'error' in error ? (
        <Message variant="danger">{error.error || 'An error occurred'}</Message>
      ) : (
        <>
          <Row>
            <Col md={5}>
              {/* Product Image */}
              <Image
                src={(product as Product).image}
                alt={(product as Product).name}
                fluid
              />
            </Col>
            <Col md={4}>
              {/* Product Information */}
              <ListGroup variant="flush">
                {/* Product Name */}
                <ListGroup.Item>
                  <h3>{(product as Product).name}</h3>
                </ListGroup.Item>
                {/* Product Rating */}
                <ListGroup.Item>
                  <Rating
                    value={(product as Product).rating}
                    text={`${(product as Product).numReviews} reviews`}
                  />
                </ListGroup.Item>
                {/* Product Price */}
                <ListGroup.Item>
                  Price: ${(product as Product).price}
                </ListGroup.Item>
                {/* Product Description */}
                <ListGroup.Item>
                  Description: {(product as Product).description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              {/* Product Price and Stock Status */}
              <Card>
                <ListGroup variant="flush">
                  {/* Price */}
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${(product as Product).price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {/* Stock Status */}
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {(product as Product).countInStock > 0
                          ? 'In Stock'
                          : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {/* Add to Cart Button */}
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={(product as Product).countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen

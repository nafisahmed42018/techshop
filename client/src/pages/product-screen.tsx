import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import Rating from '../components/rating'
import { useGetProductDetailsQuery } from '../slices/products-api-slice'
import Loader from '../components/loader'
import Message from '../components/message'
import { Product } from '../types'
import { addToCart } from '../slices/cart-slice'
import { useDispatch } from 'react-redux'

const ProductScreen: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id: productId } = useParams<{ id: string }>()

  const [quantity, setQuantity] = useState(1)

  const { data: product, isLoading, error } = useGetProductDetailsQuery(
    productId,
  )

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity }))
    navigate('/cart')
  }

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
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as={'select'}
                            value={quantity}
                            onChange={(e) =>
                              setQuantity(Number(e.target.value))
                            }
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ),
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  {/* Add to Cart Button */}
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={(product as Product).countInStock === 0}
                      onClick={addToCartHandler}
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

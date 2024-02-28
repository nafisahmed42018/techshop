import { Link, useNavigate, useParams } from 'react-router-dom'
import { FormEventHandler, useState } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import Rating from '../components/rating'
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../slices/products-api-slice'
import Loader from '../components/loader'
import Message from '../components/message'
import { Product } from '../types'
import { addToCart } from '../slices/cart-slice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
const ProductScreen: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id: productId } = useParams<{ id: string }>()

  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId)

  const [
    createReview,
    { isLoading: loadingProductReview },
  ] = useCreateReviewMutation()

  const { userInfo } = useSelector((state: any) => state.auth)
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap()
      refetch()
      toast.success('Review created successfully')
      setRating(0)
      setComment('')
    } catch (err) {
      // @ts-ignore
      toast.error(err?.data?.message || err.error)
    }
  }
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
          <Row className="review">
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review: any) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>

                  {loadingProductReview && <Loader />}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group className="my-2" controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          required
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className="my-2" controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen

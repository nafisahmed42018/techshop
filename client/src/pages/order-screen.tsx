import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import Message from '../components/message'
import Loader from '../components/loader'
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from '../slices/orders-api-slice'

const OrderScreen = () => {
  const { id: orderId } = useParams()
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(
    orderId,
  )
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation()

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
  const [
    deliverOrder,
    { isLoading: loadingDeliver },
  ] = useDeliverOrderMutation()

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery({})
  const { userInfo } = useSelector((state: any) => state.auth)
  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          // @ts-ignore
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          },
        })
        // @ts-ignore

        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
      }
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript()
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch])

  function onApprove(data: any, actions: any) {
    return actions.order.capture().then(async function (details: any) {
      try {
        await payOrder({ orderId, details })
        refetch()
        toast.success('Payment Successful')
      } catch (error) {
        // @ts-ignore
        toast.error(error?.data.message)
      }
    })
  }
  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } })
    refetch()

    toast.success('Order is paid')
  }
  function onError(err: any) {
    toast.error(err.message)
  }
  function createOrder(data: any, actions: any) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderId: string) => {
        return orderId
      })
  }
  const deliverHandler = async () => {
    await deliverOrder(orderId)
    refetch()
  }

  return isLoading ? (
    <Loader />
  ) : error ? (
    // @ts-ignore
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item: any, index: number) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x ${item.price} = $
                          {item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      {/* THIS BUTTON IS FOR TESTING! REMOVE BEFORE PRODUCTION! */}
                      {/* <Button
                        style={{ marginBottom: '10px' }}
                        onClick={onApproveTest}
                      >
                        Test Pay Order
                      </Button> */}

                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}
              {/* Mark as Delivered Placeholder */}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen

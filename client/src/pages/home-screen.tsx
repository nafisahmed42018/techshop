import { Col, Row } from 'react-bootstrap'
import ProductCard from '../components/product-card'
import { useGetProductsQuery } from '../slices/products-api-slice'
import Loader from '../components/loader'
import Message from '../components/message'
import { Product } from '../types'

const HomeScreen: React.FC = () => {
  const { data: products, isLoading, error } = useGetProductsQuery({})

  return (
    <>
      <h1>Welcome to TechShop</h1>

      {isLoading ? (
        <Loader />
      ) : error && 'error' in error ? (
        <Message variant="danger">{error.error || 'An error occurred'}</Message>
      ) : (
        <>
          <h2>Latest Products</h2>
          <Row className="row-gap-4">
            {products.map((product: Product, index: number) => (
              <Col sm={12} md={6} lg={4} xl={3} key={index}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}

export default HomeScreen

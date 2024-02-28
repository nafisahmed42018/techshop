import { Col, Row } from 'react-bootstrap'
import ProductCard from '../components/product-card'
import { useGetProductsQuery } from '../slices/products-api-slice'
import Loader from '../components/loader'
import Message from '../components/message'
import { Product } from '../types'
import { useParams } from 'react-router-dom'
import Paginate from './paginate'

const HomeScreen: React.FC = () => {
  const { pageNumber } = useParams()
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber })

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
            {data.products.map((product: Product, index: number) => (
              <Col sm={12} md={6} lg={4} xl={3} key={index}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={data.page} pages={data.pages} />
        </>
      )}
    </>
  )
}

export default HomeScreen

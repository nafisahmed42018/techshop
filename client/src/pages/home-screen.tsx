import { Col, Row } from 'react-bootstrap'
import ProductCard from '../components/product-card'
import { useGetProductsQuery } from '../slices/products-api-slice'
import Loader from '../components/loader'
import Message from '../components/message'
import { Product } from '../types'
import { Link, useParams } from 'react-router-dom'
import Paginate from './paginate'

const HomeScreen: React.FC = () => {
  const { pageNumber, keyword } = useParams()
  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber,
    keyword,
  })

  return (
    <>
      {keyword ? (
        <Link to={`/`} className="btn btn-light my-4">
          Go Back
        </Link>
      ) : (
        <h1>Welcome to TechShop</h1>
      )}

      {isLoading ? (
        <Loader />
      ) : error && 'error' in error ? (
        <Message variant="danger">{error.error || 'An error occurred'}</Message>
      ) : (
        <>
          <h2>{keyword ? 'Search Results' : 'Latest Products'}</h2>
          <Row className="row-gap-4">
            {data.products.map((product: Product, index: number) => (
              <Col sm={12} md={6} lg={4} xl={3} key={index}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            page={data.page}
            pages={data.pages}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen

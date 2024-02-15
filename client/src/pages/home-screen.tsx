import { Col, Row } from 'react-bootstrap'
import ProductCard from '../components/product-card'
import { useGetProductsQuery } from '../slices/products-api-slice'

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

const HomeScreen: React.FC = () => {
  const { data: products, isLoading, error } = useGetProductsQuery({})

  return (
    <>
      {isLoading ? (
        <h2>Loading....</h2>
      ) : error && 'error' in error ? (
        <div>{error.error || 'An error occurred'}</div>
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

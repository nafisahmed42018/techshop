import { Col, Row } from 'react-bootstrap'
import products from '../products'
import ProductCard from '../components/product-card'

const HomeScreen = () => {
  return (
    <>
      <h2>Latest Products</h2>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <ProductCard
              id={product._id}
              name={product.name}
              img={product.image}
              price={product.price.toString()}
            />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen

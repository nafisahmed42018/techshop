import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import ProductCard from '../components/product-card'
import axios from 'axios'

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
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get<Product[]>(
          'http://localhost:5000/api/products',
        )
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  return (
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
  )
}

export default HomeScreen

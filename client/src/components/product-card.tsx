import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './rating'

interface ProductCardProps {
  id: string
  img: string
  name: string
  price: number
  rating: number
  numReviews: number
}

const ProductCard = ({
  id,
  name,
  price,
  img,
  rating,
  numReviews,
}: ProductCardProps) => {
  return (
    <Card>
      <Link to={`/product/${id}`}>
        <Card.Img src={`${img}`} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating value={rating} text={`${numReviews} reviews`} />
        </Card.Text>
        <Card.Text as="h4">
          <div>{price}</div>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ProductCard

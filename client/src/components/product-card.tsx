import { Card } from 'react-bootstrap'

interface ProductCardProps {
  id: string
  img: string
  name: string
  price: string
}

const ProductCard = ({ id, name, price, img }: ProductCardProps) => {
  return (
    <Card>
      <a href={`/product/${id}`}>
        <Card.Img src={`${img}`} variant="top" />
      </a>
      <Card.Body>
        <a href={`/product/${id}`}>
          <Card.Title as="div">
            <strong>{name}</strong>
          </Card.Title>
        </a>
        <Card.Text as="h4">
          <div>{price}</div>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ProductCard

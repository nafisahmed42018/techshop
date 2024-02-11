import { Col, Container, Row } from 'react-bootstrap'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3 ">
            <p>TechSop &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer

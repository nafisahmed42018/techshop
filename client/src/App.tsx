import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router'
import Header from './components/header'
import Footer from './components/footer'

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1>Welcome to TechShop</h1>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App

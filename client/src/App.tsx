import { Container } from 'react-bootstrap'
import Header from './components/header'
import Footer from './components/footer'
import HomeScreen from './pages/home-screen'

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1>Welcome to TechShop</h1>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App

import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router'
import Header from './components/header'
import Footer from './components/footer'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container className="py-4">
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App

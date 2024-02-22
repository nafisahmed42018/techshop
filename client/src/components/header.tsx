import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useLogoutMutation } from '../slices/users-api-slice'
import { logout } from '../slices/auth-slice'
import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { cartItems } = useSelector((state: any) => state.cart)
  const { userInfo } = useSelector((state: any) => state.auth)

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall({}).unwrap()
      dispatch(logout({}))
      // NOTE: here we need to reset cart state for when a user logs out so the next
      // user doesn't inherit the previous users cart and shipping
      // dispatch(resetCart())
      navigate('/login')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>TechShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge
                      pill
                      bg="success"
                      style={{
                        marginLeft: '5px',
                      }}
                    >
                      {cartItems.reduce((a: any, c: any) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser /> Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header

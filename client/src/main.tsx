import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import './assets/styles/bootstrap.custom.css'
import './assets/styles/index.css'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import HomeScreen from './pages/home-screen.tsx'
import ProductScreen from './pages/product-screen.tsx'
import { Provider } from 'react-redux'
import store from './store'
import CartScreen from './pages/cart-screen.tsx'
import LoginScreen from './pages/login-screen.tsx'
import RegisterScreen from './pages/register-screen.tsx'
import ShippingScreen from './pages/shipping-screen.tsx'
import PrivateRoute from './components/private-route.tsx'
import PaymentScreen from './pages/payment-screen.tsx'
import PlaceOrderScreen from './pages/place-order-screen.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
      </Route>
    </Route>,
  ),
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)

import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Router,
  RouterProvider,
} from 'react-router-dom'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
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
import OrderScreen from './pages/order-screen.tsx'
import ProfileScreen from './pages/profile-screen.tsx'
import AdminRoute from './components/admin-route.tsx'
import OrderListScreen from './pages/admin/order-list-screen.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
      </Route>
    </Route>,
  ),
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* @ts-ignore */}
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>,
)

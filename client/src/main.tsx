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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
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

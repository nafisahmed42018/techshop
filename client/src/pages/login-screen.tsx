import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/form-container'
import Loader from '../components/loader'
import { useLoginMutation } from '../slices/users-api-slice'
import { setCredentials } from '../slices/auth-slice'
import { toast } from 'react-toastify'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()

  const { userInfo } = useSelector((state: any) => state.auth)

  const { search } = useLocation()

  const searchParams = new URLSearchParams(search)
  const redirect = searchParams.get('redirect') || '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])

  const submitHandler = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate(redirect)
    } catch (err) {
      // @ts-ignore
      toast.error(err?.data?.message || err?.error)
    }
  }
  return (
    <FormContainer>
      <h2>Sign In</h2>
      <Form onSubmit={submitHandler}>
        {/* Email */}
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* Password */}
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isLoading}
        >
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>
            <strong>Register</strong>
          </Link>
        </Col>{' '}
      </Row>
      {isLoading && <Loader />}
    </FormContainer>
  )
}

export default LoginScreen

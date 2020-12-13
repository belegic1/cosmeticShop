import React, { useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Row, Button, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Message from './Message'
import Loader from './Loader'
import {register} from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const RegisterScreen = ({ history, location}) => {
    const  [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const {loading, userInfo, error} = userRegister
    const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])
    const handleRegistration=(e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords not match')
        }else{
        dispatch(register(name, email, password))
        }
    }
    return (
        <FormContainer>
            <h1>Register</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={handleRegistration}>
                <Form.Group controlId='name'>
                    <Form.Label>  Name </Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter Your Name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>  Email </Form.Label>
                    <Form.Control
                    type='email'
                    placeholder='Enter Your Email Address'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    ></Form.Control>
                    </Form.Group>
                     <Form.Group controlId='password'>
                    <Form.Label>  Password </Form.Label>
                    <Form.Control
                    type='password'
                    placeholder='Enter Your Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                     <Form.Group controlId='confirmPassword'>
                    <Form.Label>  Confirm Password </Form.Label>
                    <Form.Control
                    type='password'
                    placeholder='Confirm Your Password'
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Register</Button>
            </Form>
            <Row className="py-3">
                <Col>
                Already ave Account? ? 
                <Link to={redirect ? `/login?redirect=${redirect}`
                : '/login'}>Log In</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen

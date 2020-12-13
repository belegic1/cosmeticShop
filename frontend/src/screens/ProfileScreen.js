import React, { useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Row,Col, Button} from 'react-bootstrap'
import Message from './Message'
import Loader from './Loader'
import {getUserDetails,
        updateUserProfile
} from '../actions/userActions'

const ProfileScreen = ({history}) => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const {loading,error, user} = userDetails
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }else{
            if (!user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch,history, userInfo, user])

    const submitHandler=(e)=>{
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords not match')
        } else {
            dispatch(updateUserProfile({id: user._id, name,email,password}))
        }
    }

    return (
        <Row>
            <Col md={3}>

             <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {success && <Message variant='success'>Profile updated</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
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
                <Button type='submit' variant='primary'>Update</Button>
            </Form>

            </Col>
            <Col md={9}>
                <h3>Orders</h3>
            </Col>
        </Row>
    )
}

export default ProfileScreen
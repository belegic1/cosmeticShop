import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Button,Col} from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import {savePaymentMethod} from '../actions/cartActions'

const PaymentScreen = ({history}) => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    if(!shippingAddress){
        history.push('/shipping')
    }
    const dispatch = useDispatch()
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group as='legend'>
                    <Form.Label>Payment Method</Form.Label>
                    <Col>
                    <Form.Check type='radio'
                    label='PayPal or Credit Card'
                    value='PayPale'
                    onChange={e => setPaymentMethod(e.target.value)}
                    name='paymentMethod'
                    checked
                    id='PayPAl'
                    >

                    </Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Next</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen

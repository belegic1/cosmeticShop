import React, { useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Button} from 'react-bootstrap'
import {listProductDetails, updateProduct} from '../actions/productActions'
import {Link} from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import Loader from './Loader'
import Message from './Message'
import {PRODUCT_UPDATE_RESET} from '../constants/productConstants'
import axios from 'axios'

const ProductEditScreen = ({match, history}) => {
    const productId = match.params.id
    const dispatch= useDispatch() 

    const [name,setName] = useState('')
    const [price,setPrice] = useState(0)
    const [brand,setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {
        loading: loadingUpdate, 
        error: errorUpdate,
        success: successUpdate,
    } = productUpdate

    useEffect(()=>{
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        } else {
             if (!product.name  || product._id !== productId) {
            dispatch(listProductDetails(productId))
        }else{
            setName(product.name)
            setPrice(product.price)
            setDescription(product.description)
            setImage(product.image)
            setCountInStock(product.countInStock)
            setBrand(product.brand)
            setCategory(product.category)
        }
        }
       
    }, [dispatch, product,successUpdate, productId, history])

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(updateProduct({
            _id: product._id,name, price, category,brand,description,image,
            countInStock
        }))
    }

    const uploadFileHandler = async (e)=>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)

        } catch (error) {
            console.error(error)
            setUploading(false)
        }

    }

    return (
        <>
            <Link to='/admin/productlist' className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>:
                (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>  Name </Form.Label>
                            <Form.Control 
                            type='text'
                            value={name}
                            onChange={e =>setName(e.target.value)}
                            placeholder='Enter Product Name'></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='price'>
                            <Form.Label>  Price </Form.Label>
                            <Form.Control 
                            type='number'
                            value={price}
                            onChange={e =>setPrice(e.target.value)}
                            placeholder='Enter Product Price'></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='image'>
                            <Form.Label>  Image </Form.Label>
                            <Form.Control 
                            type='text'
                            value={image}
                            onChange={e =>setImage(e.target.value)}
                            placeholder='Enter Product Image'></Form.Control>
                            <Form.File
                            id='image-file'
                            label='Chose File'
                            custom
                            onChange={uploadFileHandler}
                            >
                            </Form.File>
                            {uploading && <Loader />}
                        </Form.Group>
                        <Form.Group controlId='brand'>
                            <Form.Label>  Brand </Form.Label>
                            <Form.Control 
                            type='text'
                            value={brand}
                            onChange={e =>setBrand(e.target.value)}
                            placeholder='Enter Product Brand'></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='category'>
                            <Form.Label>  Category </Form.Label>
                            <Form.Control 
                            type='text'
                            value={category}
                            onChange={e =>setCategory(e.target.value)}
                            placeholder='Enter Product Category'></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='countInStock'>
                            <Form.Label>  Count in stock </Form.Label>
                            <Form.Control 
                            type='number'
                            value={countInStock}
                            onChange={e =>setCountInStock(e.target.value)}
                            placeholder='Enter Number of Products in Stock'></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='description'>
                            <Form.Label>  Description </Form.Label>
                            <Form.Control 
                            type='text'
                            value={description}
                            onChange={e =>setDescription(e.target.value)}
                            placeholder='Description'></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>

                    </Form>
                )
            }
            </FormContainer>

        </>
    )
}

export default ProductEditScreen

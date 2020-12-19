import {PRODUCT_LIST_REQUIRED,
        PRODUCT_LIST_SUCCESS,
        PRODUCT_LIST_FAILED,
    
        PRODUCT_DETAILS_REQUIRED,
        PRODUCT_DETAILS_SUCCESS,
        PRODUCT_DETAILS_FAILED,
        PRODUCT_DELETE_REQUIRED,
        PRODUCT_DELETE_SUCCESS,
        PRODUCT_DELETE_FAILED,
        PRODUCT_CREATE_REQUIRE,
        PRODUCT_CREATE_SUCCESS,
        PRODUCT_CREATE_FAIL,
        PRODUCT_UPDATE_REQUIRE,
        PRODUCT_UPDATE_SUCCESS,
        PRODUCT_UPDATE_FAIL,
        PRODUCT_CREATE_REVIEW_REQUIRE,
        PRODUCT_CREATE_REVIEW_SUCCESS,
        PRODUCT_CREATE_REVIEW_FAIL,

        PRODUCT_TOP_SUCCESS,
        PRODUCT_TOP_REQUIRE,
        PRODUCT_TOP_FAIL
    } from '../constants/productConstants'
import axios from 'axios'

        export const listProducts = (keyword = '', pageNumber= '') =>async  (dispatch) =>{
            try {
                dispatch({type: PRODUCT_LIST_REQUIRED})

                const {data} = await
                 axios.get( `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
                dispatch({
                    type: PRODUCT_LIST_SUCCESS,
                    payload: data
                })
            } catch (error) {
                dispatch({
                    type: PRODUCT_LIST_FAILED,
                    payload: error.response && error.response.data.message ?
                    error.response.data.message : error.message
                })
            }
        }

        export const listProductDetails = (id)=> async (dispatch) =>{
            try {
                dispatch({type: PRODUCT_DETAILS_REQUIRED})

                const {data} = await axios.get(`/api/products/${id}`)

                dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data})
            } catch (error) {
                dispatch({
                    type: PRODUCT_DETAILS_FAILED,
                    payload: error.response && error.response.data.message ?
                    error.response.data.message : error.message
                })
            }
        }

        export const deleteProduct = (id) => async( dispatch,getState) =>{
            try{
                dispatch({type: PRODUCT_DELETE_REQUIRED})
                const {userLogin: {userInfo}} = getState()

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
                await axios.delete(`/api/products/${id}`, config)
                dispatch({type: PRODUCT_DELETE_SUCCESS})
            }
            
            catch(error){
                dispatch({
                    type: PRODUCT_DELETE_FAILED,
                    payload: error.response && error.response.data.message ?
                    error.response.data.message : error.message
                })
            }
        }

        export const createProduct = () =>async (dispatch, getState) =>{
            try {
                dispatch({type:PRODUCT_CREATE_REQUIRE})
                const {userLogin: {userInfo}} = getState()
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
                const {data} = await axios.post('/api/products',{}, config)
                dispatch({
                    type: PRODUCT_CREATE_SUCCESS,
                    payload: data
                })

            } catch (error) {
                dispatch({
                    type: PRODUCT_CREATE_FAIL,
                    payload: error.response && error.response.data.message ?
                    error.response.data.message: error.message
                })
            }
        }

        export const updateProduct= (product) => async ( dispatch,getState)=>{
            try {
                dispatch({type: PRODUCT_UPDATE_REQUIRE})
                const {userLogin: {userInfo}} = getState()
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
                    const { data} = await axios.put(`/api/products/${product._id}`,
                    product,
                     config)
                    dispatch({
                        type: PRODUCT_UPDATE_SUCCESS,
                        payload: data
                    })
            } catch (error) {
                dispatch({
                    type: PRODUCT_UPDATE_FAIL,
                    payload: error.response && error.response.data.message ?
                    error.response.data.message : error.message
                })
            }
        }

        export const createProductReview = (productId, review) => async ( dispatch,getState)=>{
            try {
                dispatch({type: PRODUCT_CREATE_REVIEW_REQUIRE})
                const {userLogin: {userInfo}} = getState()
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
                await axios.post(`/api/products/${productId}/reviews`,
                review, config)
                dispatch({
                    type: PRODUCT_CREATE_REVIEW_SUCCESS
                })
            } catch (error) {
                  dispatch({
                    type: PRODUCT_CREATE_REVIEW_FAIL,
                    payload: error.response && error.response.data.message ?
                    error.response.data.message : error.message
                })
            }
        }

        export const listTopProducts = ()=>async dispatch =>{
            try {
                dispatch({type: PRODUCT_TOP_REQUIRE})
                const {data} = await axios.get('/api/products/top')
                dispatch({
                    type: PRODUCT_TOP_SUCCESS,
                    payload: data
                })
            } catch (error) {
                 dispatch({
                    type: PRODUCT_TOP_FAIL,
                    payload: error.response && error.response.data.message ?
                    error.response.data.message : error.message
                })
            }
        }
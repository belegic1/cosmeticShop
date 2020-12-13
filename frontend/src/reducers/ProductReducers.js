import {PRODUCT_LIST_REQUIRED,
        PRODUCT_LIST_SUCCESS,
        PRODUCT_LIST_FAILED,    
    
        PRODUCT_DETAILS_REQUIRED,
        PRODUCT_DETAILS_SUCCESS,
        PRODUCT_DETAILS_FAILED} from '../constants/productConstants'

export const productListReducer = (state = {products: []}, action)=>{
    switch(action.type){
        case PRODUCT_LIST_REQUIRED:
            return {loading: true, products: []}
        case PRODUCT_LIST_SUCCESS:
            return {loading: false, products: action.payload}
        case PRODUCT_LIST_FAILED:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const productDetailsReducer = (state= {product: {reviews: []}},
     action) =>{

    switch(action.type){
        case PRODUCT_DETAILS_REQUIRED:
            return {loading: true ,...state}
        case PRODUCT_DETAILS_SUCCESS:
            return {loading: false, product: action.payload}
        case PRODUCT_DETAILS_FAILED:
            return {loading: false , error: action.payload}
        default:
        return state
    }
}
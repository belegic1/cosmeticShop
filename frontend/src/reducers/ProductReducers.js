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
        PRODUCT_CREATE_RESET,
        PRODUCT_UPDATE_REQUIRE,
        PRODUCT_UPDATE_SUCCESS,
        PRODUCT_UPDATE_RESET,
        PRODUCT_UPDATE_FAIL,
        PRODUCT_CREATE_REVIEW_REQUIRE,
        PRODUCT_CREATE_REVIEW_SUCCESS,
        PRODUCT_CREATE_REVIEW_FAIL,
        PRODUCT_CREATE_REVIEW_RESET,

        PRODUCT_TOP_SUCCESS,
        PRODUCT_TOP_REQUIRE,
        PRODUCT_TOP_FAIL
    } from '../constants/productConstants'

export const productListReducer = (state = {products: []}, action)=>{
    switch(action.type){
        case PRODUCT_LIST_REQUIRED:
            return {loading: true, products: []}
        case PRODUCT_LIST_SUCCESS:
            return { loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,}
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

export const productDeleteReducer = (state = {},action) =>{
    switch(action.type){
          case PRODUCT_DELETE_REQUIRED:
            return {loading: true}
        case PRODUCT_DELETE_SUCCESS:
            return {loading: false, success: true}
        case PRODUCT_DELETE_FAILED:
            return {loading: false, error: action.payload}
        default:
            return state
    }

}

export const productCreateReducer = (state = {}, action)=>{
    switch(action.type){
        case PRODUCT_CREATE_REQUIRE:
            return {loading: true}
        case PRODUCT_CREATE_SUCCESS:
            return {loading: false, success: true, product: action.payload}
        case PRODUCT_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const productUpdateReducer = (state = {product: {}}, action) =>{
    switch(action.type){
        case PRODUCT_UPDATE_REQUIRE:
            return {loading: true}
        case PRODUCT_UPDATE_SUCCESS:
            return {loading: false, success: true, product: action.payload}
        case PRODUCT_UPDATE_FAIL:
            return {loading:false, error: action.payload}
        case PRODUCT_UPDATE_RESET:
            return {product: {}}
        default:
            return state
    }
}

export const productReviewCreateReducer = (state= {}, action)=>{
    switch(action.type){
        case PRODUCT_CREATE_REVIEW_REQUIRE: 
            return {loading: true}
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {loading: false, success: true}
        case PRODUCT_CREATE_REVIEW_FAIL:
            return {loading: false, error: action.payload}
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}
        default:
            return state
    }
}

export const productTopRatedReducer = (state={products: []}, action)=>{
    switch(action.type){
        case PRODUCT_TOP_REQUIRE:
            return {loading: true, products: []}
        case PRODUCT_TOP_SUCCESS:
            return {loading: false,  products: action.payload}
        case PRODUCT_TOP_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}
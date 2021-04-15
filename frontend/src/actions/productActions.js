import {
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
} from "../constants/productConstants";

export const listProduct = (keyword="", pageNumber=1) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const res = await fetch(`http://localhost:8080/api/products?keyword=${keyword}&page=${pageNumber}`);
        const data = await res.json();

        if (res.status !== 200) throw new Error(data.message);

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const res = await fetch(`http://localhost:8080/api/products/${id}`);
        const data = await res.json();

        if (res.status !== 200) throw new Error(data.message);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteProducts = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const res = await fetch(`http://localhost:8080/api/products/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${userInfo.token} `,
            },
        });

        const orders = await res.json();
        console.log(orders);
        if (res.status !== 200) throw new Error(orders.message);

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const res = await fetch(`http://localhost:8080/api/products/`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${userInfo.token} `,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        });

        const orders = await res.json();
        if (res.status !== 200) throw new Error(orders.message);

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: orders,
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const res = await fetch(`http://localhost:8080/api/products/${product._id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${userInfo.token} `,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        });

        const returnedProduct = await res.json();
        if (res.status !== 200) throw new Error(returnedProduct.message);

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: returnedProduct,
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const res = await fetch(`http://localhost:8080/api/products/${productId}/reviews`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${userInfo.token} `,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(review)
        });

        const result = await res.json();
        if (res.status !== 201) throw new Error(result.message);

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listTopProducts = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_TOP_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const res = await fetch(`http://localhost:8080/api/products/top`);

        const result = await res.json();
        if (res.status !== 200) throw new Error(result.message);

        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: result,
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
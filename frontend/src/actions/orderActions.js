import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_ADMIN_FAIL,
    ORDER_LIST_ADMIN_REQUEST,
    ORDER_LIST_ADMIN_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
} from "../constants/orderConstants";

export const createOrder = (orderData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const res = await fetch(
            `https://nathan-mern-site.herokuapp.com/api/orders/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token} `,
                },
                body: JSON.stringify(orderData),
            }
        );

        const order = await res.json();

        if (res.status !== 201) throw new Error(order.message);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: order,
        });
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const res = await fetch(
            `https://nathan-mern-site.herokuapp.com/api/orders/${orderId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token} `,
                },
            }
        );

        const order = await res.json();

        if (res.status !== 200) throw new Error(order.message);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: order,
        });
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const payOrder = (orderId, paymentResult) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const res = await fetch(
            `https://nathan-mern-site.herokuapp.com/api/orders/${orderId}/pay`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token} `,
                },
                body: JSON.stringify(paymentResult),
            }
        );

        const order = await res.json();

        if (res.status !== 200) throw new Error(order.message);

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: order,
        });
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const res = await fetch(
            `https://nathan-mern-site.herokuapp.com/api/orders/myorders`,
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token} `,
                },
            }
        );

        const orders = await res.json();
        if (res.status !== 200) throw new Error(orders.message);

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: orders,
        });
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listAllOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_ADMIN_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const res = await fetch(
            `https://nathan-mern-site.herokuapp.com/api/orders/`,
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token} `,
                },
            }
        );

        const orders = await res.json();
        if (res.status !== 200) throw new Error(orders.message);

        dispatch({
            type: ORDER_LIST_ADMIN_SUCCESS,
            payload: orders,
        });
    } catch (error) {
        dispatch({
            type: ORDER_LIST_ADMIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const res = await fetch(
            `https://nathan-mern-site.herokuapp.com/api/orders/${order._id}/delivered`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${userInfo.token} `,
                },
            }
        );

        const orderRes = await res.json();

        if (res.status !== 200) throw new Error(orderRes.message);

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: orderRes,
        });
    } catch (error) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

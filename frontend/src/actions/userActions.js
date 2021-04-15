import { ORDER_LIST_RESET } from "../constants/orderConstants";
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_DETAILS_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_ADMIN_REQUEST,
    USER_UPDATE_ADMIN_SUCCESS,
    USER_UPDATE_ADMIN_FAIL,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });

        const res = await fetch(
            "https://nathan-mern-site.herokuapp.com/api/users/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            }
        );

        const user = await res.json();

        if (res.status !== 200) throw new Error(user.message);

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: user,
        });

        localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: ORDER_LIST_RESET });
    dispatch({ type: USER_LIST_RESET });
};

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        });

        const res = await fetch(
            "https://nathan-mern-site.herokuapp.com/api/users",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            }
        );

        const user = await res.json();

        if (res.status !== 200) throw new Error(user.message);

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: user,
        });

        localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const res = await fetch(
            `https://nathan-mern-site.herokuapp.com/api/users/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token} `,
                },
            }
        );

        const user = await res.json();

        if (res.status !== 200) throw new Error(user.message);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: user,
        });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateUserProfile = (userData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const res = await fetch(
            `https://nathan-mern-site.herokuapp.com/api/users/`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token} `,
                },
                body: JSON.stringify(userData),
            }
        );

        const user = await res.json();

        if (res.status !== 200) throw new Error(user.message);

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: user,
        });
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const res = await fetch(
            `https://nathan-mern-site.herokuapp.com/api/users/`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token} `,
                },
            }
        );

        const users = await res.json();

        if (res.status !== 200) throw new Error(users.message);

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: users,
        });
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteUser = (userId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const res = await fetch(
            `https://nathan-mern-site.herokuapp.com/api/users/${userId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token} `,
                },
            }
        );

        const users = await res.json();

        if (res.status !== 200) throw new Error(users.message);

        dispatch({
            type: USER_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateUserAdmin = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_ADMIN_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const res = await fetch(
            `https://nathan-mern-site.herokuapp.com/api/users/${user._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token} `,
                },
                body: JSON.stringify(user),
            }
        );

        const userRes = await res.json();

        if (res.status !== 200) throw new Error(userRes.message);

        dispatch({
            type: USER_UPDATE_ADMIN_SUCCESS,
        });

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: userRes,
        });
    } catch (error) {
        dispatch({
            type: USER_UPDATE_ADMIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

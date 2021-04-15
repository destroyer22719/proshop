import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import cartReducers from "./reducers/cartReducers";
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderListReducer,
    orderPayReducer,
    orderListAdminReducer,
    orderDeliverReducer
} from "./reducers/orderReducers";
import {
    productCreateReducer,
    productDeleteReducer,
    productDetailsReducer,
    productListReducer,
    productReviewCreateReducer,
    productTopReducer,
    productUpdateReducer,
} from "./reducers/productReducers";
import {
    userDeleteReducer,
    userDetailReducer,
    userListReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateAdmin,
    userUpdateReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopReducer,
    cart: cartReducers,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailReducer,
    userUpdateProfile: userUpdateReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateAdmin,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderList: orderListReducer,
    orderAdminList: orderListAdminReducer,
    orderDeliver: orderDeliverReducer,
});

const cartItemsLocal = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const userInfoLocal = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const shippingAddressLocal = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};

const initialState = {
    cart: {
        cartItems: cartItemsLocal,
        shippingAddress: shippingAddressLocal,
    },
    userLogin: {
        userInfo: userInfoLocal,
    },
};

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;

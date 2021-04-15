import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

const PaymentScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress) history.push("/shipping");

    const [paymentMethod, setPaymentMethod] = useState("");
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        dispatch({ type: ORDER_CREATE_RESET });
        history.push("/placeorder");
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                        <Form.Check type="radio" label="Paypal or Credit Card" id="Paypal" name="paymentMethod" value="PayPal" onChange={(e) => {setPaymentMethod(e.target.value)}} />
                    </Col>
                </Form.Group>
                <Button type="submit">Continue</Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;

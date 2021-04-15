import React, { useEffect } from "react";
import {
    Button,
    Card,
    Col,
    Form,
    Image,
    ListGroup,
    ListGroupItem,
    Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Message from "../components/Message";

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id;

    const query = new URLSearchParams(location.search);
    const qty = query.get("qty") ? query.get("qty") : 1;

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const { cartItems } = cart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [location, dispatch, qty, productId]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = (e) => {
        console.log("checked out!");
    };

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message>Your Cart is Empty</Message>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map((item) => (
                            <ListGroupItem key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            rounded
                                            fluid
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/products/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as="select"
                                            value={item.qty}
                                            onChange={(e) => {
                                                dispatch(
                                                    addToCart(
                                                        item.product,
                                                        +e.target.value
                                                    )
                                                );
                                            }}
                                        >
                                            {[
                                                ...Array(
                                                    item.countInStock
                                                ).keys(),
                                            ].map((x) => (
                                                <option
                                                    key={x + 1}
                                                    value={x + 1}
                                                >
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                        <Button
                                            type="button"
                                            variant="light"
                                            onClick={() =>
                                                removeFromCartHandler(
                                                    item.product
                                                )
                                            }
                                        >
                                            <i className="fa fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>
                                Subtotal (
                                {cartItems.reduce(
                                    (acc, cur) => acc + +cur.qty,
                                    0
                                )}
                                ) items
                            </h2>
                            $
                            {cartItems
                                .reduce(
                                    (acc, cur) => acc + +cur.qty * cur.price,
                                    0
                                )
                                .toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link to={userInfo ? "/shipping" : "/login?redirect=shipping"}>
                                <Button
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                    className="btn-block"
                                >
                                    Checkout
                                </Button>
                            </Link>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};

export default CartScreen;

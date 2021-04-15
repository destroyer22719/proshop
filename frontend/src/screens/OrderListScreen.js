import React, { useEffect, useState } from "react";
import { Button, Card, Col, Image, ListGroup, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrderDetails, listAllOrders, payOrder } from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../constants/orderConstants";
import { LinkContainer } from "react-router-bootstrap";

const OrderListScreen = ({ match }) => {
    const dispatch = useDispatch();
    
    const orderMyList = useSelector((state) => state.orderAdminList);
    const { loading: loadingOrders, orders, error: errorOrders } = orderMyList;

    useEffect(() => {
        dispatch(listAllOrders());
    }, [dispatch]);

    return (
        <Col md={12}>
                <h2>My Orders</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant="danger">{errorOrders}</Message>
                ) : (
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="table-sm"
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                            <i
                                                className="fas fa-times"
                                                style={{ color: "red" }}
                                            ></i>
                                        )}
                                    </td>
                                    <td>
                                        {order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                            <i
                                                className="fas fa-times"
                                                style={{ color: "red" }}
                                            ></i>
                                        )}
                                    </td>
									<td>
										<LinkContainer to={`/order/${order._id}`}>
											<Button variant="light">Details</Button>
										</LinkContainer> 
									</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
    )

};

export default OrderListScreen;

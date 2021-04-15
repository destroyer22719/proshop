import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousol from "../actions/ProductCarousol";
import { Helmet } from "react-helmet";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";

const HomeScreen = ({ location }) => {
    const query = new URLSearchParams(location.search);
    const keyword = query.get("search") || undefined;
    const page = query.get("page") || null;
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);

    const {
        loading,
        error,
        products,
        page: pageNumber,
        pages: pageCount,
    } = productList;
    useEffect(() => {
        dispatch(listProduct(keyword, page));
    }, [dispatch, keyword, page]);

    return (
        <div>
            <Meta />
            {!keyword ? <ProductCarousol /> : <Link to="/" className="btn btn-light">Go Back</Link>}
            <h1>Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={13} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        pages={pageCount}
                        page={pageNumber}
                        keyword={keyword ? keyword : ""}
                    />
                </>
            )}
        </div>
    );
};

export default HomeScreen;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listTopProducts } from "./productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductCarousol = () => {
    const dispatch = useDispatch();

    const productTopRated = useSelector((state) => state.productTopRated);
    const { loading, error, products } = productTopRated;

    useEffect(() => {
        dispatch(listTopProducts());
    }, [dispatch]);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <Carousel pause="hover" className="bg-dark carousel-container">
            {products.map((product) => (
                <Carousel.Item>
                    <Link to={`/product/${product._id}`}>
                        <Image className="carosoul-image" src={product.image} alt={product.name} fluid />
                        <Carousel.Caption className="carousel-caption">
                            <h2>
                                {product.name} (${product.price})
                            </h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default ProductCarousol;

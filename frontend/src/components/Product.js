import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variante="top" />
            </Link>
            <Link to={`/product/${product._id}`}>
                <Card.Title>
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text as="div">
                <Rating
                    value={product.rating}
                    color="yellow"
                    text={` ${product.numReviews} reviews`}
                />
            </Card.Text>
            <Card.Text as="h3">${product.price}</Card.Text>
        </Card>
    );
};

export default Product;

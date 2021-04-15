import mongoose from "mongoose";
export const ObjectId = mongoose.Schema.Types.ObjectId;

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: String,
    },
    rating: {
        type: Number,
        required: String,
    },
    comment: {
        type: String,
        required: String,
    },
    user: {
        type: ObjectId,
        required: true,
        ref: "User",
    },
}, {
    timestamps: true,
})

const productSchema = mongoose.Schema(
    {
        user: {
            type: ObjectId,
            required: true,
            ref: "User",
        },
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            default: 4,
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0,
        },
        reviews: [reviewSchema]
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

import Product from "../models/productModel.js";

export const getProducts = async (req, res, next) => {
    const pageSize = 2;
    const page = +req.query.page || 1;

    try {
        const keyword = req.query.keyword
            ? {
                  name: {
                      $regex: req.query.keyword,
                      $options: "i",
                  },
              }
            : {};

        const productCount = await Product.countDocuments({ ...keyword });
        const products = await Product.find({ ...keyword })
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.send({products, page, pages: Math.ceil(productCount / pageSize) });
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const products = await Product.findById(req.params.id);
        if (!products) {
            res.status(404);
            throw new Error("cannot find product");
        }
        res.send(products);
    } catch (error) {
        next(error);
    }
};

export const deleteProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404);
            throw new Error("cannot find product");
        }

        await product.remove();
        res.send({ message: "Product deleted" });
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (req, res, next) => {
    try {
        const {
            name,
            image,
            brand,
            category,
            description,
            rating,
            price,
            countInStock,
        } = req.body;

        const newProduct = await Product.create({
            user: req.user._id,
            name,
            image,
            brand,
            category,
            description,
            rating,
            price,
            countInStock,
        });

        res.send(newProduct);
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const {
            name,
            price,
            description,
            image,
            rating,
            brand,
            category,
            countInStock,
        } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404);
            throw new Error("Product not found");
        }

        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.image = image || product.image;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        product.countInStock = countInStock || product.countInStock;
        product.rating = rating || product.rating;

        const updatedProduct = await product.save();
        res.send(updatedProduct);
    } catch (error) {
        next(error);
    }
};

export const createProductReview = async (req, res, next) => {
    try {
        const { rating, comment } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404);
            throw new Error("Product not found");
        }

        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400);
            throw new Error("User has already left review");
        }

        const review = {
            name: req.user.name,
            rating,
            comment,
            user: req.user._id,
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

        await product.save();
        res.status(201).send({ message: "Review successfully added" });
    } catch (error) {
        next(error);
    }
};

export const getTopProducts = async( req, res, next) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.send(products);
}
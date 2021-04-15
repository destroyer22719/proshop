import Order from "../models/orderModel.js";

export const addOrderItems = async (req, res, next) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error("No order items");
        } else {
            const order = new Order({
                orderItems,
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            });

            const createdOrder = await order.save();

            res.status(201).send(createdOrder);
        }
    } catch (error) {
        next(error);
    }
};

export const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );

        if (!order) {
            res.status(404);
            throw new Error("order not found");
        } else {
            res.json(order);
        }
    } catch (error) {
        next(error);
    }
};

export const updateOrderToPaid = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            res.status(404);
            throw new Error("order not found");
        }

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };
        const updatedOrder = await order.save();
        res.send(updatedOrder);
    } catch (error) {
        next(error);
    }
};

export const getUserOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.send(orders);
    } catch (error) {
        next(error);
    }
};

export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().populate("user", "id name");
        res.send(orders);
    } catch (error) {
        next(error);
    }
};

export const updateOrderToDelivered = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            res.status(404);
            throw new Error("order not found");
        } 

        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.send(updatedOrder);
    } catch (error) {
        next(error);
    }
};

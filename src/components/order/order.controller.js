// const { Cart, Order } = require("../daos/index");
const Cart = require("../cart/Cart.model");
const Order = require("./Order.model");

const { sendEmail } = require("../../utils/mailer");
const sendSMS = require("../../utils/sms");
const {
    AppError,
    httpStatusCodes,
} = require("../../config/error/error");
const env = require("../../config/env");

const getOrders = (req, res) => {};

const createOrder = async (req, res, next) => {
    const { deliveryAddress, deliveryDate, email } = req.body;

    // Get cart and validate it

    let cart;
    try {
        cart = await axios.get(`${env.API_URL}/cart`);
    } catch (error) {
        return next(
            new AppError(
                "Invalid cart",
                httpStatusCodes.INTERNAL_SERVER            )
        );
    }

    if (!cart) {
        throw new AppError(
            commonType.BadRequest,
            "Cart is empty",
            httpStatusCodes.BAD_REQUEST        );
    }

    // Create order
    const order = {
        email: email,
        products: cart.products,
        deliveryAddress,
        deliveryDate,
        total: cart.total,
    };

    // Save order
    try {
        await Order.save(order);

        Cart.delete(cart._id);

        sendEmail(
            `Nuevo pedido de ${req.user.name} - ${email}`,
            JSON.stringify(order)
        );

        sendSMS(req.user.phone, "Tu pedidod ya está en camino");
        res.status(201).json({ orderId: savedOrder._id });
    } catch (error) {
        throw new AppError(
            "Error creating order",
            httpStatusCodes.INTERNAL_SERVER,
        );
    }
};

module.exports = { getOrders, createOrder };

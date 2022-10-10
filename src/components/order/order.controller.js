const config = require("../../config/config")

const Order = require("./Order.services");
const Cart = require("../cart/Cart.services");

const sendEmail = require("../../utils/mailer");
const { AppError, httpStatusCodes } = require("../../config/error/error");
const routeHelper = require("../../utils/routeHelper");

const getOrders = () => { };

const createOrder = routeHelper(async (req, res, next) => {
    const { deliveryAddress, deliveryDate, email } = req.body;

    const cart = await Cart.getCart(email);

    const order = {
        email: email,
        products: cart.products,
        deliveryAddress,
        deliveryDate,
        total: cart.total,
    };

    try {
        const savedOrder = await Order.save(order);

        await Cart.findOneAndDelete({ email });

        // Email to customer
        try {
            sendEmail(
                req.user.email,
                "eCommerce shop - Compra registrada",
                JSON.stringify(order)
            );
        } catch (error) {
            console.log(error);
        }

        // Email to admin
        try {
            sendEmail(
                config.ADMIN_EMAIL,
                `Nuevo pedido de ${req.user.name}`,
                JSON.stringify(order)
            );

        } catch (error) {
            console.log(error);
        }

        res.status(201).json({ orderId: savedOrder.id });
    } catch (error) {
        throw new AppError(
            "Error creating order",
            httpStatusCodes.INTERNAL_SERVER
        );
    }
});

module.exports = { getOrders, createOrder };

const Order = require("./Order.services");
const Cart = require("../cart/Cart.services");

const { sendEmail } = require("../../utils/mailer");
const { AppError, httpStatusCodes } = require("../../config/error/error");
const routeHelper = require("../../utils/routeHelper");
//const sendSMS = require("../../utils/sms");

const getOrders = () => {};

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

        // sendEmail(
        //     `Nuevo pedido de ${req.user.name} - ${email}`,
        //     JSON.stringify(order)
        // );

        res.status(201).json({ orderId: savedOrder.id });
    } catch (error) {
        throw new AppError(
            "Error creating order",
            httpStatusCodes.INTERNAL_SERVER
        );
    }
});

module.exports = { getOrders, createOrder };

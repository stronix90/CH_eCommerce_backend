const { cartDao, orderDao } = require("../daos/index");
const { sendEmail } = require("../utils/mailer");
const sendSMS = require("../utils/sms");

const getOrders = (req, res) => {};

const createOrder = async (req, res) => {
    const { deliveryAddress, deliveryDate, email } = req.body;
    const userEmail = req.user.email;

    // Check if email is valid
    if (email !== userEmail) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    // Check if cart exist
    const cart = await cartDao.findByEmail(userEmail);
    if (!cart) {
        return res.status(404).json({
            message: "Cart not found",
        });
    }

    // Check if cart is empty
    if (cart.products.length === 0) {
        return res.status(400).json({
            message: "No hay productos en el carrito",
        });
    }

    // Check if data is valid
    if (!deliveryAddress || !deliveryDate) {
        return res.status(400).json({
            message: "Faltan datos",
        });
    }

    // Check if delivery date is in the future
    if (new Date(deliveryDate) < new Date()) {
        return res.status(400).json({
            message: "La fecha de entrega no puede ser anterior a la actual",
        });
    }

    // Generate order
    const order = {
        email: userEmail,
        products: cart.products,
        deliveryAddress,
        deliveryDate,
        total: cart.total,
    };

    orderDao
        .save(order)
        .then((savedOrder) => {
            cartDao.delete(cart._id)
            sendEmail(`Nuevo pedido de ${req.user.name} - ${email}`, JSON.stringify(order));
            sendSMS(req.user.phone, "Tu pedidod ya está en camino")
            // sendSMS("+541122549337", "Tu pedidod ya está en camino")
            res.status(201).json({ orderId: savedOrder._id })})
        .catch((error) => res.status(500).json(error));
};

module.exports = { getOrders, createOrder };

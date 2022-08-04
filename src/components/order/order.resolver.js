const { AppError, httpStatusCodes } = require("../../config/error/error");
const CartServices = require("../cart/Cart.services");
const OrderServices = require("./Order.services");

const resolvers = {
    Mutation: {
        postOrder: async (_, {order}) => {
            const {email, deliveryAddress, deliveryDate} = order;
            const cart = await CartServices.getCart(email);

            const newOrder= {
                email,
                products: cart.products,
                deliveryAddress,
                deliveryDate,
                total: cart.total,
            };

            if (cart.products.length === 0)
                throw new AppError(
                    "No hay productos en el carrito",
                    httpStatusCodes.BAD_REQUEST
                );

            try {
                const savedOrder = await OrderServices.save(newOrder);

                await CartServices.findOneAndDelete({ email });

                return savedOrder;
            } catch (error) {
                throw new AppError(
                    "Error creating order",
                    httpStatusCodes.INTERNAL_SERVER
                );
            }
        },
    },
};

module.exports = resolvers;

const ProductServices = require("../product/Product.services");
const { ProductForCartDto } = require("../product/ProductDto");
const CartServices = require("./Cart.services");

const resolvers = {

    Query: {
        getCart: async (_, { email }, ) => {
            return await CartServices.getCart(email);
        },
    },

    Mutation: {
        addProductToCart: async (_, { email, productId }) => {

            const product = await ProductServices.findById(productId);
            if (!product) return "Error";

            const productForCart = new ProductForCartDto(product);
            return await CartServices.addProductToCart(email, productForCart);
        },

        delProductFromCart: async (_, { email, productId }) => {
            return await CartServices.deleteProductFromCart(email, productId);
        },

        delCart: async (_, { email }) => {
            const filter = { email };

            await CartServices.findOneAndDelete(filter);
            return true;
        },
    },
};

module.exports = resolvers;

const ProductServices = require("./Product.services");

const resolvers = {
    Query: {
        getProduct: (_, { id }) => ProductServices.findById(id),
        getProducts: ProductServices.findAll,
    },
    Mutation: {
        postProduct: (_, { product }) =>
            ProductServices.save(product),

        putProduct: (_, { id, product }) =>
            ProductServices.findByIdAndUpdate(id, product),
            
        delProduct: (_, { id }) =>
            ProductServices.findByIdAndDelete(id),
    },
};

module.exports = resolvers;

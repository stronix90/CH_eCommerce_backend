const { makeExecutableSchema } = require("@graphql-tools/schema");
const merge = require("lodash.merge");

const productSchema = require("../components/product");
const orderSchema = require("../components/order");
const cartSchema = require("../components/cart");

// Multiple files to keep your project modularised
const schema = makeExecutableSchema({
    typeDefs: [
        productSchema.typeDefs,
        orderSchema.typeDefs,
        cartSchema.typeDefs,
    ],
    resolvers: merge(
        productSchema.resolvers,
        orderSchema.resolvers,
        cartSchema.resolvers
    ),
});

module.exports = schema;

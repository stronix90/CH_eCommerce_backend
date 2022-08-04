const gql = require("graphql-tag");

const typeDefs = gql`
    type Products {
        id: ID!
        title: String
        code: String
        price: Float
        quantity: Int
    }
    type Cart {
        id: ID!
        email: String
        products: [Products]
        deliveryAddress: String
        deliveryDate: String
        total: Float
        status: String
    }

    type Query {
        getCart(email: String!): Cart
    }

    type Mutation {
        addProductToCart(email: String, productId: String!): Cart
        delProductFromCart(email: String, productId: String!): Cart
        delCart(email: String!): Boolean
    }

`;
module.exports = typeDefs;

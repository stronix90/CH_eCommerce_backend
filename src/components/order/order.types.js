const gql = require("graphql-tag")

const typeDefs = gql`

    type Products {
        id: ID!
        title: String
        code: String
        price: Float
        quantity: Int
    }

    type Order {
        id: ID!
        email: String
        products: [Products]
        deliveryAddress: String
        deliveryDate: String
        total: Float
        status: String
    }

    input OrderInput {
        email: String!
        deliveryAddress: String
        deliveryDate: String
    }

    type Mutation {
        postOrder(order: OrderInput): Order
    }
`
module.exports = typeDefs
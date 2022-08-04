const gql = require("graphql-tag");

const typeDefs = gql`

    type Product {
        id: ID!
        title: String
        description: String
        code: String
        thumbnail: String
        price: Float
        stock: Int
    }
    input ProductInput {
        title: String
        description: String
        code: String
        thumbnail: String
        price: Float
        stock: Int
    }
    type Query {
        getProduct(id: ID!): Product
        getProducts: [Product]
    }
    type Mutation {
        postProduct(product: ProductInput): Product
        putProduct(id: ID!, product: ProductInput): Product
        delProduct(id: ID!): Boolean
    }
    
`;

module.exports = typeDefs;

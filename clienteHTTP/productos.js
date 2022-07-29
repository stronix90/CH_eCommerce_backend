const axios = require("axios");
const env = require("../src/config/env");

const axiosInstance = axios.create({ baseURL: env.API_FULL_PATH });

class productClient {
    constructor() {}

    async createProduct(product) {
        const res = axiosInstance.post("/productos", product);
        return res.data;
    }

    async readAllProducts() {
        const res = axiosInstance.get("/productos");
        return res.data;
    }

    async readOneProducts(id) {
        const res = axiosInstance.get("/productos", {
            params: { id },
        });
        return res.data;
    }

    async updateProduct(id, product) {
        const res = axiosInstance.put("/productos", {
            params: { id },
            data: product,
        });
        return res.data;
    }

    async deleteProduct(id) {
        const res = axiosInstance.delete("/productos", {
            params: { id },
        });
        return res.data;
    }
}

module.exports = productClient;

const ContainerFirebase = require("../../containers/ContainerFirebase");

class ProductDaoFirebase extends ContainerFirebase {
    constructor() {
        super("products");
    }
}

module.exports = ProductDaoFirebase;

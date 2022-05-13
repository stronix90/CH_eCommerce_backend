const ContainerFile = require("../../containers/ContainerFile");

class ProductDaoFile extends ContainerFile {
    constructor() {
        super("DB/product.json");
    }
}

module.exports = ProductDaoFile;

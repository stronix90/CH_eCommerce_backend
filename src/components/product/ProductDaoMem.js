const ContainerMemory = require("../../container/ContainerMem");

class ProductConstructor extends ContainerMemory {
    constructor() {
        super();
    }

    findByIdForCart = async (id) => {
        const product = await this.coll.findById(id);

        if (!product) return null;

        delete product.description;
        delete product.stock;
        delete product.thumbnail;

        return product;
    };
}

module.exports = new ProductConstructor();

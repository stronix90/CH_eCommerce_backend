const ContainerMemory = require("../../container/ContainerMem");

class ProductConstructor extends ContainerMemory {
    constructor() {
        super();
    }
}

module.exports = new ProductConstructor();

const env = require("../../config/env");
const ProductDto = require("./ProductDto");

let ProductDao;
if (env.PERSISTENCE === "mongo") ProductDao = require("./ProductDaoDB");
// else if
// ...
else ProductDao = require("./ProductDaoMem");

class ProductServices {
    constructor() {}

    findById = async (id) => {
        const product = await ProductDao.findById(id);
        return product ? new ProductDto(product) : null;
    };

    findAll = async () => {
        const productsList = await ProductDao.findAll();
        return productsList?.map((product) => new ProductDto(product));
    };

    save = async (elem) => {
        return new ProductDto(await ProductDao.save(elem));
    };

    findByIdAndUpdate = async (id, elem) => {
        const product = await ProductDao.findByIdAndUpdate(id, elem);
        return product ? new ProductDto(product) : null;
    };

    findByIdAndDelete = async (id) => {
        return ProductDao.findByIdAndDelete(id);
    };
}

module.exports = new ProductServices();

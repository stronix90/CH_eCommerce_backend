const config = require("../../config/config");
const ProductDto = require("./ProductDto");

let ProductDao;
if (config.PERSISTENCE === "mongo") ProductDao = require("./ProductDaoDB");
// else if
// ...
else ProductDao = require("./ProductDaoMem");

class ProductServices {
    constructor() {}

    findById = async (id) => {
        return new ProductDto(await ProductDao.findById(id));
    };

    findAll = async (filter) => {
        const productsList = await ProductDao.findAll(filter);
        return productsList?.map((product) => new ProductDto(product));
    };

    save = async (elem) => {
        return new ProductDto(await ProductDao.save(elem));
    };

    findByIdAndUpdate = async (id, elem) => {
        return new ProductDto(await ProductDao.findByIdAndUpdate(id, elem));
    };

    findByIdAndDelete = async (id) => {
        return ProductDao.findByIdAndDelete(id);
    };
}

module.exports = new ProductServices();

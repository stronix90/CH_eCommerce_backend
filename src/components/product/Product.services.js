const env = require("../../config/env");
const ProductDto = require("./ProductDto");

let ProductDao;
if (env.PERSISTENCE === "mongo") ProductDao = require("./ProductDaoDB");
// else if
// ...
else ProductDao = require("./ProductDaoMem");

class ProductServices {
    constructor() {}

    findById = async (id) => new ProductDto(await ProductDao.findById(id));

    findAll = async () => {
        const productsList = await ProductDao.findAll();
        return productsList?.map((product) => new ProductDto(product));
    };

    save = async (elem) => new ProductDto(await ProductDao.save(elem));

    findByIdAndUpdate = async (id, elem) =>
        new ProductDto(await ProductDao.findByIdAndUpdate(id, elem));

    findByIdAndDelete = async (id) => ProductDao.findByIdAndDelete(id);
}

module.exports = new ProductServices();

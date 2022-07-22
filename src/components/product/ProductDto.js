class ProductDto {
    constructor(product) {
        this._id = product._id;
        this.title = product.title;
        this.description = product.description;
        this.code = product.code;
        this.thumbnail = product.photo || product.thumbnail;
        this.price = product.price;
        this.stock = product.stock;
    }
}

class ProductForCartDto {
    constructor(product) {
        this._id = product._id;
        this.title = product.title;
        this.code = product.code;
        this.price = product.price;
    }
}

module.exports = ProductDto;

exports = module.exports;
exports.ProductForCartDto = ProductForCartDto;

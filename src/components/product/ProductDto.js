class ProductDto {
    constructor(product) {
        this.id = product._id;
        this.title = product.title;
        this.description = product.description;
        this.code = product.code;
        this.thumbnail = product.photo || product.thumbnail;
        this.price = product.price;
        this.stock = product.stock;
        this.category = product.category;
    }
}

class ProductForCartDto {
    constructor(product) {
        this.id = product._id ||product.id ;
        this.title = product.title;
        this.code = product.code;
        this.price = product.price;
    }
}

module.exports = ProductDto;

exports = module.exports;
exports.ProductForCartDto = ProductForCartDto;

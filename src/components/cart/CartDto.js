class CartDto {
    constructor(cart) {
        this.email = cart.email;
        this.products = cart.products;
        this.deliveryAddress = cart.deliveryAddress;
        this.deliveryDate = cart.deliveryDate;
        this.total = cart.total;
        this.status = cart.status;
    }
}

module.exports = CartDto
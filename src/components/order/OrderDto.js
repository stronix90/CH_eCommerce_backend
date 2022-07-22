class OrderDto {
    constructor (order){
        this.email = order.email;
        this.products = order.products;
        this.deliveryAddress = order.deliveryAddress;
        this.deliveryDate = order.deliveryDate;
        this.total = order.total;
        this.status = order.status;
    }
}

module.exports = OrderDto
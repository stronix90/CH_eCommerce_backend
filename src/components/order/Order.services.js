const env = require("../../config/env");
const OrderDto = require("./OrderDto");

let OrderDao;
if (env.PERSISTENCE === "mongo") OrderDao = require("./OrderDaoDb");
// else if
// ...
else OrderDao = require("./OrderDaoMem");

class OrderServices {
    constructor() {}

    save = async (elem) => {
        const order = await OrderDao.save(elem);
        return new OrderDto(order);
    };
}

module.exports = new OrderServices();

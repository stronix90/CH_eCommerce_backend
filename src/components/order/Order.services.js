const config = require("../../config/config");
const OrderDto = require("./OrderDto");

let OrderDao;
if (config.PERSISTENCE === "mongo") OrderDao = require("./OrderDaoDb");
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

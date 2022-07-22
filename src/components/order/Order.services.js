const env = require("../../config/env");
const OrderDto = require("./OrderDto");

let OrderDao;
if (env.PERSISTENCE === "mongo") OrderDao = require("./OrderDaoDb");
// else if
// ...
else OrderDao = require("./OrderDaoMem");

class OrderServices {
    constructor () {}

    save =
        async (elem) => new OrderDto(await OrderDao.save(elem));
}

module.exports = new OrderServices()
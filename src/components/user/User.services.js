const env = require("../../config/env");
const UserDto = require("./UserDto");

let UserDao;
// if (env.PERSISTENCE === "mongo") UserDao = require("./UserDaoDB");
// else if (env.PERSISTENCE === 'memory') UserDao = require('./UserDaoMem')
// else UserDao = require("../../components/user/UserDaoMem");
UserDao = require('./UserDaoMem')

class UserServices {
    constructor() { }

    findById =
        async (id) => new UserDto(await UserDao.findById(id));

    findOne =
        async (filter) => new UserDto(await UserDao.findOne(filter));

    save =
        async (elem) => new UserDto(await UserDao.saveUser(elem));

    checkPass =
        async (password, encryptedPassword) => await UserDao.checkPass(password, encryptedPassword);
}

module.exports = new UserServices();

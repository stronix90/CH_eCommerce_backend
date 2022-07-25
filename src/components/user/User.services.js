const env = require("../../config/env");
const UserDto = require("./UserDto");

let UserDao;
if (env.PERSISTENCE === "mongo") UserDao = require("./UserDaoDB");
// else if (env.PERSISTENCE === "memory") UserDao = require("./UserDaoMem");
else UserDao = require("./UserDaoMem");

class UserServices {
    constructor() {}

    findById = async (id) => {
        const user = await UserDao.findById(id);
        if (!user) return null;

        return new UserDto(user);
    };

    findOne = async (filter) => {
        const user = await UserDao.findOne(filter);
        if (!user) return null;

        return new UserDto(user);
    };

    save = async (elem) => new UserDto(await UserDao.saveUser(elem));

    checkPass = async (password, encryptedPassword) =>
        await UserDao.checkPass(password, encryptedPassword);
}

module.exports = new UserServices();

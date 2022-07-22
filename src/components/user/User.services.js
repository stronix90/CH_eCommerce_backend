const env = require("../../config/env");
const UserDto = require("./UserDto");

let UserDao;
if (env.PERSISTENCE === "mongo") UserDao = require("./UserDaoDB");
// else if
// ...
else UserDao = require("../../components/user/UserDaoMem");

class UserServices {
    constructor() {}
    
    findById =
        async (id) => new UserDto(await UserDao.findById(id));

    findOne =
        async (filter) => await UserDao.findOne(filter);

    save =
        async (elem) => new UserDto(await UserDao.save(elem));

    checkPass =
        async (password, encryptedPassword) => await UserDao.checkPass(password, encryptedPassword);
}

module.exports = new UserServices();

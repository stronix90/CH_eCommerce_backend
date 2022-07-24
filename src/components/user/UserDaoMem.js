const bcrypt = require("bcrypt");

const ContainerMemory = require("../../container/ContainerMem");

class UserConstructor extends ContainerMemory {
    constructor() {
        super()
    }

    async saveUser(elem) {
        console.log('creara un usuario')
        const hash = await bcrypt.hash(elem.password, 10);
        elem.password = hash;
        return await this.save(elem);
    }

    async checkPass(password, encryptedPassword) {
        return await bcrypt.compare(password, encryptedPassword);
    }
}

module.exports = new UserConstructor();

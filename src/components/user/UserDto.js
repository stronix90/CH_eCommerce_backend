class UserDto {
    constructor(user) {
        this.email = user.email;
        this.name = user.name;
        this.address = user.address;
        this.birthDate = user.birthDate;
        this.phone = user.phone;
        this.photo = user.photo;
    }
}

module.exports = UserDto;

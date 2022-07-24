class UserDto {
    constructor(user) {
        this.id = user._id;
        this.email = user.email;
        this.name = user.name;
        this.address = user.address;
        this.birthDate = user.birthDate;
        this.phone = user.phone;
        this.photo = user.photo;
        this.password = user.password;
    }
}

module.exports = UserDto;

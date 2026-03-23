
export class UserDto {
    email
    isTwoFactorEnabled

    constructor(user) {
        this.email = user.email
        this.isTwoFactorEnabled = user.isTwoFactorEnabled
    }
}
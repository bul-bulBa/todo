
export class UserDto {
    id
    email
    isTwoFactorEnabled

    constructor(user) {
        this.id = user.id
        this.email = user.email
        this.isTwoFactorEnabled = user.isTwoFactorEnabled
    }
}
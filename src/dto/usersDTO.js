export class UsersDTO{
    constructor(user){
        this.firstName = user.nombre,
        this.lastName = user.apellido,
        this.fullName = `${this.firstName} ${this.lastName}`,
        this.email = user.correo,
        this.role = user.rol,
        this.username = usuario.email.split('@')[0]
    }
}
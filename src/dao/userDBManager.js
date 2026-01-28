import userModel from "./models/userModel.js";

class userDBManager {
    static async create(usuario) {
        let nuevoUsuario = await userModel.create(usuario);
        return nuevoUsuario;
    }

    static async getBy(filtro) {
        return await userModel.findOne(filtro).lean()
    }
}

export default userDBManager
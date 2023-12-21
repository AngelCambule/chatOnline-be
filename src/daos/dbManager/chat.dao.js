import { chatModel } from "../../models/chat.model.js"

class chatDao {
    constructor() { this.model = chatModel }

    async getAllMessages() {
        //Handlebars NO FUNCIONA con los objetos de mongoose
        //Poner .lean() es para que esté en un formato que sí los pueda usar
        return await this.model.find().lean()
    }

    async createMessage(message) {
        return await this.model.create(message)
    }

}

export default chatDao
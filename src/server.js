import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import viewRouter from "./routes/views.routes.js";
import { password, PORT, db_name } from './env.js'
import mongoose from 'mongoose'
import chatDao from './daos/dbManager/chat.dao.js';

import { Server } from 'socket.io'

const app = express()
const httpServer = app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`))

const socketServer = new Server(httpServer)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main'
}))

app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`)
app.use("/", viewRouter);
app.use(express.static(`${__dirname}/public`))

mongoose.connect(`mongodb+srv://jkzcs:${password}@cluster0.xnombsi.mongodb.net/${db_name}?retryWrites=true&w=majority`)
.then(() => console.log('DB Connect'))
.catch((err) => console.log(err))

const chatManager = new chatDao()

socketServer.on("connection", async (socketClient) => {

  socketClient.on("homemessage", async (data) => {
    console.log(data)
    const response = await chatManager.getAllMessages()
    console.log(response);
  });
  socketClient.on('livechatServer', async (msg) => {
    console.log(msg.user,'Escribio : ',msg.message);
    await chatManager.createMessage(msg)
    const response = await chatManager.getAllMessages()
    console.log(response);
    socketServer.emit('livechat', response)

  })
  socketServer.emit('livechat', await chatManager.getAllMessages())
  });
  
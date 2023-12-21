import { Router } from "express";
import chatDao from "../daos/dbManager/chat.dao.js";

const chatManager = new chatDao()

const router = Router();

router.get('/', (req, res) => {
  res.render("index", {
    title: "Inicio"
  });
});

router.get('/chat', (req,res) => {
  
  res.render("chat", {
    title: 'chat'
  })
  
})

export default router
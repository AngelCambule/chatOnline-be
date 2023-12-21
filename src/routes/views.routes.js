import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
  res.render("index", {
    title: "Inicio"
  });
});

router.get('/chat', (req,res) => {
  res.render("chat", {
    title: "Chat"
  })
})

export default router;
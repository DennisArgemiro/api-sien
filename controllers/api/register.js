const express = require("express");
const router = express.Router();
const mail = require("../../mail/mail")

router.post("/register", async (req, res)=>{
    const { nome, matricula, dataNasc, cell, email, curso, turma, senha } = req.body.content;
    
    res.json(await mail.validation(mail, nome, { nome, matricula, dataNasc, cell, email, curso, turma, senha }))   
})

module.exports = router
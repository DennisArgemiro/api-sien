const express = require("express");
const supabase = require("../../supabase/supabase")
const router = express.Router();


router.post("/request", async (req, res)=>{
    const { Aluno_matricula, Pedagogo_matricula, assunto, descricao, anexo, status } = req.body.content

    const response = await supabase.insertReclamacao({ Aluno_matricula, Pedagogo_matricula, assunto, descricao, anexo, status })
    res.json(response)   

})

module.exports = router;
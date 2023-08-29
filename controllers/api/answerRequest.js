const express = require("express");
const supabase = require("../../supabase/supabase")
const router = express.Router();


router.post("/answerRequest", async (req, res)=>{
    const { idSolicitacao, pedagogo, setor} = req.body.content

    const res = await supabase.answerSetor(idSolicitacao, setor, pedagogo)

    res.json(res)   

})

module.exports = router;
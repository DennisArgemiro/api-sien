const express = require("express");
const supabase = require("../../supabase/supabase")
const router = express.Router();


router.post("/answerPedagogo", async (req, res)=>{
    const {idSolicitacao, pedagogo, resposta} = content.content

      const res = await supabase.awnserPedagogo(idSolicitacao, pedagogo, resposta)
      
      res.json(res)   
})

module.exports = router;
const express = require("express");
const supabase = require("../../supabase/supabase")
const router = express.Router();


router.post("/answerPedagogo", async (req, res)=>{
    const {idSolicitacao, pedagogo, resposta} = req.body

      const response = await supabase.awnserPedagogo(idSolicitacao, pedagogo, resposta)
      
      res.json(response)   
})

module.exports = router;
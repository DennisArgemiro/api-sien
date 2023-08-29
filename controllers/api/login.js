const express = require("express");
const supabase = require("../../supabase/supabase")
const router = express.Router();

router.post("/login", async (req, res)=>{
    const { email, senha } = req.body.content;
    const data = await supabase.selectLogin(email, senha)

    res.json(data == undefined ? { status: 400 } : data)   
    
})

module.exports = router;
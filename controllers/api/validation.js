const express = require("express");
const supabase = require("../../supabase/supabase")
const router = express.Router();


router.post("/validation", async (req, res)=>{
    const res = await supabase.insertAluno(req.body)
    res != 200 ? { status: 400 } : { status: 200 }

    res.json(res != 200 ? { status: 400 } : { status: 200 })   

})

module.exports = router;
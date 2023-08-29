const express = require("express");
const supabase = require("../../supabase/supabase")
const router = express.Router();

router.post("/selectReclamacao", async (req, res) => {
    const { param, value } = req.body.content
    var res = undefined
    if (param == "id" || param == "matricula") {
        res = await supabase.selectReclamacao(value)
    } else if (param == "none") {
        res = await supabase.selectReclamacao(param)
    }
    res.json(res)
})

module.exports = router;
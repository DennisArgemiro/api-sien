const express = require("express");
const supabase = require("../../supabase/supabase")
const router = express.Router();

router.post("/selectReclamacao", async (req, res) => {
    const { param, value } = req.body
    var response = undefined
    if (param == "id" || param == "matricula") {
        response = await supabase.selectReclamacao(value)
    } else if (param == "none") {
        response = await supabase.selectReclamacao(param)
    }
    res.json(response)
})

module.exports = router;
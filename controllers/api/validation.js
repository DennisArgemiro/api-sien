const express = require("express");
const supabase = require("../../supabase/supabase")
const router = express.Router();


router.get("/validation", async (req, res) => {
    const response = await supabase.insertAluno({values: req.query.values})
    response != 200 ? { status: 400 } : { status: 200 }
    res.json(response != 200 ? { status: 400 } : { status: 200 })

})

module.exports = router;
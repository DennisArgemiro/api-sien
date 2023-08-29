const express = require("express");
const supabase = require("../../supabase/supabase")
const router = express.Router();


router.post("/selectAluno", async (req, res) => {
  const { matricula } = req.body.content
  const res = await supabase.selectAluno(matricula)
  res.json(res)
})

module.exports = router;
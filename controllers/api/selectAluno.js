const express = require("express");
const supabase = require("../../supabase/supabase")
const router = express.Router();


router.post("/selectAluno", async (req, res) => {
  const { matricula } = req.body
  const response = await supabase.selectAluno(matricula)
  res.json(response)
})

module.exports = router;
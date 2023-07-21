const express = require("express");
const router = express.Router();
const mail = require("./mail")
const supabase = require("./supabase/supabase")

router.get("/", (req, res) => {
})


router.post("/", async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const query = {
    //recebe uma requisição de cadastro e manda um Email para validação
    register: async (content) => {
      const { nome, matricula, dataNasc, cell, email, curso, turma, senha } = req.body.content;
      return await mail.validation(mail, nome, { nome, matricula, dataNasc, cell, email, curso, turma, senha })
    },

    login: async (content) => {
      const { email, senha } = content.content;
      const data = await supabase.selectLogin(email, senha)

      return data == undefined ? { status: 400 } : data
    },

    request: async (content) => {
      const { Aluno_matricula, Pedagogo_matricula, assunto, descricao, anexo, status } = content.content

      const response = await supabase.insertReclamacao({ Aluno_matricula, Pedagogo_matricula, assunto, descricao, anexo, status })
      return response
    },

    validation: async (content) => {
      const res = await supabase.insertAluno(content)
      // function decrypt(hash){     
      // }
      return res != 200 ? { status: 400 } : { status: 200 }
    },
    selectReclamacao: async (content) => {
      const { param, value } = content.content

      if (param == "id") {
        const res = await supabase.selectReclamacao(value)
        return res
      } else if (param == "matricula") {
        const res = await supabase.selectReclamacaoAll(value)
        return res
      } else if (param == "none") {
        const res = await supabase.selectReclamacao(param)
        return res
      }

    },
    selectAluno: async (content) => {
      const { matricula } = content.content
      const res = await supabase.selectAluno(matricula)
      return res
    },
    answerRequest: async (content)=>{
      const { idSolicitacao, pedagogo, setor} = content.content

      const res = await supabase.answerSetor(idSolicitacao, setor, pedagogo)

      return res
      
    },
    answerPedagogo: async (content)=>{
      const {idSolicitacao, pedagogo, resposta} = content.content

      const res = await supabase.awnserPedagogo(idSolicitacao, pedagogo, resposta)
      
      return res    
    }
  }
  const response = query[req.body.query](req.body);

  res.json(await response);


})

module.exports = router
const { createClient } = require('@supabase/supabase-js')

const CONFIG = require("./config")

const supabase = createClient(CONFIG.url, CONFIG.public)

module.exports = {
  insertAluno: async (content) => {
    const splited = content.values.split(",")
    const options = {
      nome: splited[0],
      matricula: splited[1],
      dataNasc: splited[2],
      cell: splited[3],
      email: splited[4],
      curso: splited[5],
      turma: splited[6],
      senha: splited[7],
    }

    const { error } = await supabase.from("Aluno").insert(options)
    const response = error ? 400 : 200
    return response
  },

  insertReclamacao: async (content) => {

    const { Aluno_matricula, Pedagogo_matricula, assunto, descricao, anexo, status } = content
    const options = {
      Aluno_matricula, Pedagogo_matricula, assunto, descricao, anexo, status
    }
    const { error } = await supabase.from("Reclamacao").insert(options)

    const response = error ? error : { status: 200 }
    return response
  },
  selectLogin: async (email, senha) => {
    const { data, error } = await supabase.from("Aluno").select().eq("email", `${email}`)
    if (error) {
      return { error, status: 400 }
    } else {
      if (data[0] == undefined) {
        return { msg: "undefined", status: 400 }
      } else {
        if (senha != data[0].senha) {
          return { msg: "senha divergente", status: 400 }
        } else {
          return { ...data[0], status: 200 }
        }
      }
    }
  },
  selectReclamacao: async (param, content) => {
    if (param == "id") {
      const { data, error } = await supabase.from("Reclamacao").select().eq("idReclamacao", content)
      if (error) {
        return error
      } else {
        return data[0]
      }
    } else if (param == "matricula") {
      const { data, error } = await supabase.from("Reclamacao").select().eq("Aluno_matricula", content)
      if (error) {
        return error
      } else {
        return data
      }
    }else {
      const { data, error } = await supabase.from("Reclamacao").select()
      if (error) {
        return error
      } else {
        return data
      }
    }
  },
  selectAluno: async (matricula) => {
    if (matricula != "none") {
      const { data, error } = await supabase.from("Aluno").select().eq("matricula", matricula)
      if (error) {
        return error
      } else {
        return data[0]
      }
    } else {
      const { data, error } = await supabase.from("Aluno").select()
      if (error) {
        return error
      } else {
        return data
      }
    }
  },
  selectReclamacaoAll: async (matricula) => {
    const { data, error } = await supabase.from("Reclamacao").select().eq("Aluno_matricula", `${matricula}`)
    if (error) {
      return error
    } else {
      return data
    }
  },
  answerSetor: async (idReclamacao, idSetor, pedagogoMatricula)=>{
    const {data, error} = await supabase.from("Setor").select().eq("idSetor", idSetor)
    
    if(!error){
      const {err} = await supabase.from("Reclamacao").update({
        status: `ENCAMINHADO PARA O SETOR RESPONSÁVEL`,
        resposta: `A SUA RECLAMAÇÃO FOI ENCAMINHADA PARA O SETOR ${data[0].nome}. ACOMPANHE O ANDAMENTO PELO SEU EMAIL OU ENTRE EM CONTATO COM O PEDAGOGO DO SEU CAMPUS.`,
        Pedagogo_matricula: pedagogoMatricula
      }).eq("idReclamacao",idReclamacao)
      
       if(err){
         return err
       }else{
         return { status: 200}
       }
    } else{
      return error
    }
  },
  awnserPedagogo: async (idReclamacao, idPedagogo, response)=>{
    const {error} = await supabase.from("Reclamacao").update({
      resposta: response,
      status: "CONCLUIDO"
    }).eq("idReclamacao", idReclamacao)

    if(!error){
      return {status: 200}
    } else{
      return error
    }
  }
}
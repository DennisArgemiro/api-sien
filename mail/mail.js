const nodemailer = require("nodemailer")
const CONFIG = require("../config")

const transporter = nodemailer.createTransport({
  host: CONFIG.host,
  port: CONFIG.port,
  secure: false, // true for 465, false for other ports
  auth: {
    user: CONFIG.address, // generated ethereal user
    pass: CONFIG.passAddress, // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false
  }
});

module.exports = {
  validation: async (reciever, requester, object) => {
    const { nome, matricula, dataNasc, cell, email, curso, turma, senha } = object

    const params = {
      query: "validation",
      values: `${nome},${matricula},${dataNasc},${cell} ,${email},${curso},${turma},${senha}`
    }
    
    const html = await require("./merge").txt(params, nome)
    const response = await transporter.sendMail({
      from: `"SIEN" <${CONFIG.address}>`, // sender address
      to: email, // list of receivers
      subject: `Finalize o seu cadastro, ${nome}!`, // Subject line
      // text:"",
      html // plain text body
    })
    console.log(response.messageId)
  },
  redirectToSector: async (content) => {
    const response = await transporter.sendMail({
      from: `"Protocolar.IFPA"<${CONFIG.address}>`,
      to: content.email,
      subject: `Uma nova requisição foi feita por ${content.sender}`,
      html: ""
    })

    return response
  }
}
//Sistema de Gestão de Ensino e Aprendizagem (SIGEA)
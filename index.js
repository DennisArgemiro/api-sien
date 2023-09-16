const Express = require("express");
// const api = require("./api")
const cors = require("cors");

//Controller's imports
const answerPedagogoController = require("./controllers/api/answerPedagogo")
const answerRequestController = require("./controllers/api/answerRequest")
const loginController = require("./controllers/api/login")
const registerController = require("./controllers/api/register")
const requestController = require("./controllers/api/request")
const selectAlunoController = require("./controllers/api/selectAluno")
const selectReclamacaoController = require("./controllers/api/selectReclamacao")
const validationController =require("./controllers/api/validation")

const app = Express();

//CORS
const corsOptions = {
    origin: "*",
    credentials: true,
    allowedHeaders:  ['Content-Type', 'Authorization'],
}
app.use(cors(corsOptions));
app.use((req, res, next)=>{
  res.header({"Access-Control-Allow-Origin": "*"})
  next()
})

//Server Config
app.use(Express.json());
app.use(Express.urlencoded());

//Controller's uses
app.use("/", answerPedagogoController)
app.use("/", answerRequestController)
app.use("/", loginController)
app.use("/", registerController)
app.use("/", requestController)
app.use("/", selectAlunoController)
app.use("/", selectReclamacaoController)
app.use("/", validationController)


// app.use("/", api);

app.listen(3000, () => {
  console.log("online");
})

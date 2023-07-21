const Express = require("express");
const api = require("./api")
const cors = require("cors");

const app = Express();
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
app.use(Express.json());
app.use(Express.urlencoded());
app.use("/", api);

app.listen("3000", () => {
  console.log("online");
})
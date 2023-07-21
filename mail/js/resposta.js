const fs = require("fs")

module.exports = {
  txt: async()=>{
    return fs.readFileSync(__dirname + "/../html/validation.html", "utf-8")
  }
}
const connect = require("./configs/db");

const app = require("./index");

app.listen(5000, async function () {
  await connect();
  console.log("Hello Validations");
});

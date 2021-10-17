const connect = require("./configs/db");

const app = require("./index");


app.listen(2345, async function () {
  await connect();
  console.log("Hello There");
});

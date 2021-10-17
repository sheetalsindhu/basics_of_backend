const app = require("./index");

const connect = require("./configs/db");

app.listen(5000, async () => {
  await connect();
  console.log("Hello to the port 5000");
});

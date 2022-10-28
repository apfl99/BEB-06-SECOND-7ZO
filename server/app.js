const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/index");

const PORT = 5000;
const app = express();

app.use(bodyParser.json());

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`[server]... http://localhost:${PORT}`);
});

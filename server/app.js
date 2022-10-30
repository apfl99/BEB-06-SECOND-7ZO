const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const PORT = 3001; // 5000번 포트 : KT 와이파이 포트랑 겹칠 수 있어서 수정
const app = express();

//외부 API를 사용하기 위한 CORS 추가
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//Logging 추가
const myLogger = function (req, res, next) {
  console.log(`http request method is ${req.method}, url is ${req.url}`);
  next(); // 안넣어주면 로그 이후로 안넘어감
};
app.use(myLogger);

//에러 처리 추가
app.use((req, res, next) => {
  res.status(404).send("Not Found!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: "Internal Server Error",
    stacktrace: err.toString(),
  });
});


app.use(bodyParser.json());

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`[server]... http://localhost:${PORT}`);
});

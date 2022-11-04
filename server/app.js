const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const PORT = 3001; // 5000번 포트 : KT 와이파이 포트랑 겹칠 수 있어서 수정
const app = express();

const { sequelize } = require("./models"); // require('./models/index.js')와 같음 - index.js는 require 시 이름 생략 가능

sequelize
  .sync({ force: false }) // 서버 실행 시 MySQL과 연동되도록 함, force: true면 서버 실행 시 마다 테이블을 재생성, 테이블을 잘못 만든 경우에 true로 설정
  .then(() => {
    console.log("DB connection Success!!");
  })
  .catch((err) => {
    console.error(err);
  });

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

//에러 처리 추가 : 테스트 시 사용 X, 기능 완료 후, 미들웨어를 통해 처리
// app.use((req, res, next) => {
//   res.status(404).send("Not Found!");
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send({
//     message: "Internal Server Error",
//     stacktrace: err.toString(),
//   });
// });

app.use(bodyParser.json());

app.use("/", routes);

module.exports = app.listen(PORT, () => {
  console.log(`[server]... http://localhost:${PORT}`);
});

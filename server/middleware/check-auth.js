const jwt = require("jsonwebtoken");

const { sequelize } = require("../models");
const db = require("../models");
const User = require("../models/user");
db.User = User;

module.exports = async (req, res, next) => {
  // 요청에 메타데이터로 첨부해서 토큰을 전송
  // headers.authorization 에 저장된 문자열이 포함
  // 첫번째 값 : 문자열, 두번째 값 : 토큰

  let getUserId;
  try {
    const token = req.headers.cookie.split("=")[1];
    if (!token) {
      throw new Error("로그인을 확인하세요");
    }
    // 검증결과는 불리언이 아닌 객체를 반환 : encoded 페이로드
    // 페이로드에서는 이 토큰이 속하는 사용자의 사용자 ID정보를 얻을 수 있다
    const decodedToken = await jwt.verify(
      token,
      process.env.REFRESH_SECRET,
      async (err, decoded) => {
        const user_id = await User.findOne({
          where: {
            login_id: decoded.login_id,
          },
        });
        getUserId = user_id.dataValues.id;
      }
    );
    // console.log(getUserId);
    req.userId = getUserId;
    next();
  } catch (err) {
    return res.status(401).send("인증에 실패하였습니다");
  }
  // console.log(req.userData);
};

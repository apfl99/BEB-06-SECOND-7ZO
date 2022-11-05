
const SevenZ721Token = artifacts.require("NFTLootBox");
const fs = require("fs");

module.exports = function (deployer) {
  deployer
    .deploy(SevenZ721Token) // contract
    .then(() => {
      //배포시 컨트랙 ABI와 Address를 파일 형태로 저장합니다.
      if (SevenZ721Token._json) {
        fs.writeFile(
          "721deployedABI",
          JSON.stringify(SevenZ721Token._json.abi),
          (err) => {
            if (err) throw err;
            console.log("파일에 ABI 입력 성공");
          }
        );
      }

      fs.writeFile("721deployedAddress", SevenZ721Token.address, (err) => {
        if (err) throw err;
        console.log("파일에 주소 입력 성공");
      });
    });
};


const SevenZ20Token = artifacts.require("SevenZtoken");
const fs = require("fs");


module.exports = function(deployer) {
    deployer.deploy(SevenZ20Token,"SevenZ20Token", "SZ2T") // contract, name , symbol
    .then(() => {
        //배포시 컨트랙 ABI와 Address를 파일 형태로 저장합니다.
        if (SevenZ20Token._json) {
          fs.writeFile(
            '20deployedABI',
            JSON.stringify(SevenZ20Token._json.abi),
            (err) => {
              if (err) throw err
              console.log("파일에 ABI 입력 성공");
            })
        }
  
        fs.writeFile(
          '20deployedAddress',
          SevenZ20Token.address,
          (err) => {
            if (err) throw err
            console.log("파일에 주소 입력 성공");
          })
      }) 
};

import axios from 'axios';
import {message} from 'antd';

/*
POST요청
req
{
”message” : “success”,
"data":{ user_id, password }
}

res
{message: "success", accessToken : accessToken, userInfo : userData}
userData  = { 
        login_id: user_id,
        nickname: nickname,
        password: password,
        address: "",
        token_amount : 0,
        eth_amount : 0 
    }

아이디 비밀번호를 통해 userInfo를 리턴 하는 함수
*/
export const logIn=async ({user_id,password})=>{
    try{
      const result = await axios({
        method: "post",
        url: `http://localhost:3001/user/login`,
        headers: {
          Accpet: "application/json",
        },
        withCredentials: true,
        data: { user_id, password },
      });
      const response=result.data;
      const userInfo={...response.userInfo,accessToken:response.accessToken};
      console.log(userInfo);
      return userInfo;
      
    }catch(err){
      message.error(`failed post  ${user_id}   ,     ${password}`);
      return null;
    }
  };
/*
POST요청
req
{
”message” : “success”,
"data":{ user_id, password ,nickname}
}

res
{message: "success", accessToken : accessToken, userInfo : userData}
userData  = { 
        login_id: user_id,
        nickname: nickname,
        password: password,
        address: "",
        token_amount : ,
        eth_amount :  
        privateKey :
    }

아이디 비밀번호 닉네임을 이용해 회원가입
*/
  export const signUp=async ({user_id,password,nickname})=>{
    try{
    const result = await axios({
        method: "post",
        url: `http://localhost:3001/user/join`,
        headers: {
        Accpet: "application/json",
        },
        withCredentials: true,
        data: { user_id, password ,nickname},
    });
    const response=result.data;
    const userInfo={...response.userInfo,accessToken:response.accessToken};
    return userInfo;
    
    }catch(err){
        message.error(`failed post${user_id}     ,     ${password}`);
        return null;
    }
};
/*
GET요청
res
{
”message” : “success” search,
”data” : {
”userData” : object,
”postData” : Array(각 요소는 object형식),
”nftData” : Array(각 요소는 object형식)
}} 
로그인된 id를 통해 유저 정보를 리턴
*/
export const userInfo = async (uid) => {
    try{
      const result = await axios({
        method: "get",
        url: `http://localhost:3001/user/${uid}`,
        headers: {
          Accpet: "application/json",
        },
        withCredentials: true,
      });
      const Info=result.data.data;
      return Info;
    }catch(err){
      message.error(`failed get`);
      return null;
    }
  };
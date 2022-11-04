import axios from 'axios';
import {message} from 'antd';
/*
POST요청
{
  ”title” : string,
  ”content” : string,
  ”image” : “ImgUrl”,
}

*/

export const createPost= async ({ title, content,imageUrl,accessToken})=>{
    try{
      const result = await axios({
        method: "post",
        url: "http://localhost:3001/new_topic",
        headers: {
          Accpet: "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
        data: { title, content,imageUrl },
      });
      message.success(`post create successfully.`);
    }catch(err){
      message.error(`failed post`);
    }
    

    
  };

import axios from 'axios';
import {message} from 'antd';



/**GET 요청
 * res
 * [post,post,...]
 * 
 * post의 형식은 아래와 같다
 * {
        "title": "www",
        "img_url": "kkk",
        "content": "aaa",
        "created_at": "2022-11-04T09:51:45.000Z",
        "user_id": 15
    }
    서버의 전체 포스트를 가져옴
 */
export const getallposts=async () => {
  try{
    const posts = await axios({
      method: "get",
      url: `http://localhost:3001/`,
      headers: {
        Accpet: "application/json",
      },
      withCredentials: true,
    });
    return posts.data;
  }catch(err){
    message.error(`failed post`);
    return null;
  }
};

/**GET 요청
 * res
 * {
”post_id” : Number,
”user_id” : String,
”title” : String,
”content” : String,
”image” : “Img URL”,
”created_at” : Date 
}
특정 postid를 통해 post의 정보를 가져옴
 */
export const getpost = async (pid) => {
  try{
    const result = await axios({
      method: "get",
      url: `http://localhost:3001/topic/${pid}`,
      headers: {
        Accpet: "application/json",
      },
      withCredentials: true,
    });
    const postInfo=result.data;
    return postInfo;
  }catch(err){
    message.error(`failed post`);
    return null;
  }
};
/*
POST요청
req
{
  ”title” : string,
  ”content” : string,
  ”image” : string,
  "accessToken":string
}
res
{
  message:
}
post을 생성함
*/
export const createPost= async (title, content,img_url,accessToken)=>{
    try{
      const result = await axios({
        method: "post",
        url: "http://localhost:3001/topic/new_topic",
        headers: {
          Accpet: "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
        data: { title, content,img_url },
      });
      message.success(`post create successfully.`);
    }catch(err){
      message.error(`failed post`);
    }
};
/*
POST요청
req
{
  ”post_id” : Number,
  ”user_id” : string,
  ”title” : string,
  ”content” : string,
  ”image” : “ImgURL”
}
res
{
  message:
}
post을 생성함
*/
export const updateTopic= async ({ title, content, img_url,pid,accessToken })=>{
  try{
    const result = await axios({
      method: "patch",
      url: `http://localhost:3001/topic/${pid}`,
      headers: {
        Accpet: "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
      data: { title, content,img_url },
    });
    message.success(`${result.message}`);
  }catch(err){
    message.error(`failed post`);
  }
};
/*
POST요청
req
{
  ”title” : string,
  ”content” : string,
  ”image” : string,
  "accessToken":string
}
res
{
  message:
}
post을 생성함
*/
export const deleteTopic= async ({pid,accessToken})=>{
  try{
    const result = await axios({
      method: "delete",
      url: `http://localhost:3001/topic/${pid}`,
      headers: {
        Accpet: "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
      
    });
    message.success(`${result.message}`);
  }catch(err){
    message.error(`failed post`);
  }
};


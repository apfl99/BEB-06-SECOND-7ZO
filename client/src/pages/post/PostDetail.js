import React, {  useState,useEffect } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
/*{
”message” : “
success”,
”data” : {
”post_id” : Number,
”user_id” : String,
”title” : String,
”content” : String,
”image” : “Img URL”,
”created_at” : Date 
}
} */
function PostCreate() {
  const {id}=useParams();
  console.log(id);
  const [post,setPost]=useState({
    post_id : id,
    user_id : 4,
    title : "더미타이틀",
    content : "이글은 테스트 더미데이터입니다.",
    image : "",
    created_at : "더미날짜"
  });
  /*detail 랜더시에 postId로 해당 post의 정보를 불려옴
    useEffect(() => {

    const fetchData = async () => {
      try{
        const result = await axios({
          method: "get",
          url: `http://localhost:8080/topic/${id}`,
          headers: {
            Accpet: "application/json",
          },
          withCredentials: true,
        });
        const postInfo=result.data;
        setPost(postInfo);
      }catch(err){
        message.error(`failed post`);
      }
    };

    fetchData();
  }, []);*/

  return (
    <div>
      <div style={{border:'1px solid blue',marginTop:'5vh'}}>{/**post filed */}

        <div style={{border:'1px solid red',marginTop:'3px'}}>
          <h2>Title:{post.title}</h2>
          <h3>post_id:{post.post_id}</h3>
          <h4>user_id:{post.user_id}</h4>
          <h4>created_at:{post.created_at}</h4>
        </div>
        
        <p>content:{post.content}</p>
      </div>


    </div>
  )
}

export default PostCreate;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Descriptions, Divider } from "antd";
import { FormOutlined, CloseOutlined } from "@ant-design/icons";
import { getpost, userInfo } from "../../api/apiindex";

import { useSelector } from "react-redux";

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
function PostDetail() {
  const { id } = useParams();

  const { login_id } = useSelector((state) => {
    return state.account;
  });

  const [owner, setOwner] = useState();
  const [post, setPost] = useState({
    id: id,
    user_id: 4,
    title: "더미타이틀",
    content: "이글은 테스트 더미데이터입니다.",
    img_url: "",
    created_at: "더미날짜",
  });
  /*detail 랜더시에 postId로 해당 post의 정보를 불려옴*/
  useEffect(() => {
    const fetchData = async () => {
      const postInfo = await getpost(id);
      const ownerInfo = await userInfo(login_id);
      setPost(postInfo);
      setOwner(ownerInfo.userData.id);
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <div className="topic-main" style={{ marginTop: "5vh" }}>
        {/**post filed */}

        <Descriptions
          title={post.title}
          size="small"
          column={{ xs: 4, sm: 8, md: 10 }}
        >
          <Descriptions.Item label="post_id">{post.id}</Descriptions.Item>
          <Descriptions.Item label="user_id">{post.user_id}</Descriptions.Item>
          <Descriptions.Item label="created_at">
            {post.created_at}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        {post.img_url !== null ? (
          <img className="topic-img" src={post.img_url}></img>
        ) : null}

        <p className="topic-content">{post.content}</p>
        <Divider />
      </div>
      {owner === post.user_id ? (
        <>
          <Button type="primary" icon={<FormOutlined />}>
            수정
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="primary" icon={<CloseOutlined />}>
            삭제
          </Button>
        </>
      ) : null}
    </div>
  );
}

export default PostDetail;

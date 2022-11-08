import React from "react";
import { useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, Upload, Button, message } from "antd";
import { createPost } from "../../api/Postapi";

import css from "../../assets/styles/topic/topic.css";

/*{
  ”title” : string,
  ”content” : string,
  ”image” : “ImgUrl”,
}*/

function PostCreate() {
  const accessToken = useSelector((state) => {
    return state.account.accessToken;
  });
  //타이틀 본문 이미지를 받는 함수
  const onFinish = async ({ content, title, upload }) => {
    const imageUrl = !upload
      ? null
      : "https://" +
        upload[0].response.value.cid +
        ".ipfs.nftstorage.link/" +
        upload[0].name;
    await createPost(title, content, imageUrl, accessToken);

    setTimeout(function () {
      window.location.href = `/`;
    }, 1000);
  };
  const normFile = (e) => {
    //console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="topic-main">
      <h1 className="newtopic-main_title">Create POST</h1>
      <Form name="validate_other" onFinish={onFinish}>
        {/*이미지 업로드 파트 */}
        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="file"
            action="https://api.nft.storage/upload"
            headers={{
              withCredentials: true,
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        {/*제목 파트 */}
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input title!",
              whitespace: true,
            },
          ]}
        >
          <Input showCount maxLength={50} />
        </Form.Item>
        {/*설명 파트 */}
        <Form.Item
          name="content"
          label="Content"
          rules={[
            {
              required: true,
              message: "Please input content",
            },
          ]}
        >
          <Input.TextArea showCount maxLength={1000} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default PostCreate;

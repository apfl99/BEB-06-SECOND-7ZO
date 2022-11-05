
import React, {  useState } from "react";
import axios from "axios"
import { useSelector } from 'react-redux';

import { Input ,message, Upload,Button,Alert} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const { Dragger } = Upload;


/*{
  ”title” : string,
  ”content” : string,
  ”image” : “ImgUrl”,
}*/


function PostCreate() {
  const [title,setTitle]=useState('');
  const [content,setContent]=useState('');
  const [imageUrl,setImageUrl]=useState('');
  const [isLoading,setIsLoading]=useState(false);
  const accessToken = useSelector((state) =>{
    return state.account.accessToken;
  });
  //타이틀 본문 이미지를 받는 함수
  function inputTitle(e) {
    setTitle(e.target.value); 
  }
  function inputContent(e) {
    setContent(e.target.value); 
  }

  const createPost= async ()=>{
    
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

  /**이미지 업로드를 위한 props
   * nft.storage의 HTTP를 통해 ipfs로 이미지 업로드
  */
  const props = {
    name: 'file',
    multiple: true,
    action: 'https://api.nft.storage/upload',
    headers:{withCredentials:true,"Authorization":`Bearer ${process.env.REACT_APP_API_KEY}`},
    maxCount:1,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        //console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        setImageUrl("https://"+info.file.response.value.cid+".ipfs.nftstorage.link/"+info.file.name);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      //console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <div style={{marginTop:'5vh'}}> 
      <div>title</div>
      <Input showCount maxLength={20} allowClear onChange={inputTitle} />
      <br />
      <div>{imageUrl}</div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
        </p>
      </Dragger>
      <br />
      <br />
      <div>content</div>
      <TextArea showCount maxLength={500} onChange={inputContent} />
      <Button type="primary" loading={isLoading} onClick={createPost}>Login</Button>
    </div>

  )
}
export default PostCreate;
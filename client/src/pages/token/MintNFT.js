import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Upload,
  Form,
  Input,
  message
} from 'antd';
import { mintingNFT } from '../../api/nftapi';
import { useSelector } from 'react-redux';
import "../../assets/styles/mintTable.css";
import React, { useState, useEffect } from "react";

function MintNFT() {
  const accessToken = useSelector((state) =>{
    return state.account.accessToken;
  });

  

  const onFinish = async ({description,name,upload,privateKey}) => {
    const imageUrl="https://"+upload[0].response.value.cid+".ipfs.nftstorage.link/"+upload[0].name;
    await mintingNFT(name, description,imageUrl,privateKey,accessToken);
    
    setTimeout(function() {
      window.location.href='/mypage';
    }, 1000);
    
  };
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return ( 
    <div className='container'>
      <h1 className='header'>Create Your NFT</h1>
      <br></br>
      <Form
        name="validate_other"
        onFinish={onFinish} 
      >
        {/*이미지 업로드 파트 */}
        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: 'Please input Image File!'
            },
          ]}
        >
          <Upload name="file" action='https://api.nft.storage/upload' headers={{withCredentials:true,"Authorization":`Bearer ${process.env.REACT_APP_API_KEY}`}}  maxCount={1}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        {/*이름 파트 */}
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input NFT name!',
              whitespace: true,
            },
          ]}
          className="pk"
        >
          <Input showCount maxLength={50}/>
        </Form.Item>
        {/*설명 파트 */}
        <Form.Item
          name="description"
          label="Description"
          className='description'
          rules={[
            {
              required: true,
              message: 'Please input description',
            },
          ]}
        >
          <Input.TextArea showCount maxLength={100} />
        </Form.Item>
        {/*privatekey 파트 */}
        <Form.Item
          name="privateKey"
          label="PrivateKey"
          className='pk'
          rules={[
            {
              required: true,
              message: 'Please input your privateKey',
              whitespace: true,
            },
          ]}
        >
          <Input/>
        </Form.Item>
        {/*버튼 */}
        <Form.Item >
          <Button type="primary" htmlType="submit"
          className='mintBtn'>
            Mint
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default MintNFT;
/*node:14104) [DEP_WEBPACK_DEV_SERVER_ON_AFTER_SETUP_MIDDLEWARE] DeprecationWarning: 'onAfterSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:14104) [DEP_WEBPACK_DEV_SERVER_ON_BEFORE_SETUP_MIDDLEWARE] DeprecationWarning: 'onBeforeSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.*/
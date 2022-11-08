import "../../assets/styles/MyPage.css";
import React, {  useState,useEffect } from "react";
import { useSelector } from 'react-redux';
import {Image, Button, Descriptions ,Collapse,Skeleton,Drawer,Form, Input, Row, Col} from 'antd';
import { userInfo } from "../../api/userapi";
import { transfer20 } from "../../api/userapi";
import { useNavigate } from "react-router-dom";



const { Panel } = Collapse;


/*
res
{
”message” : “success” search,
”data” : {
”userData” : object,
”postData” : Array(각 요소는 object형식),
”nftData” : Array(각 요소는 object형식)
}} 
*/

function MyPage() {
  const navigate=useNavigate();
  const [myInfo,setMyInfo]=useState({});
  const [loading,setLoading]=useState(true);
  const [open, setOpen] = useState(false);
  const {login_id,isLogin,accessToken} = useSelector((state) =>{
    return state.account;
  });



  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onFinish = async (values) => {
    const transInfo={...values,uid:login_id,accessToken:accessToken};
    await transfer20(transInfo);
    setTimeout(function() {
      window.location.href='/mypage';
    }, 1000);
    
  };
  /*mypage 랜더시에 userid로 해당 post의 정보를 불려옴*/
    useEffect(() => {

     const fetchData = async () => {
        const info=await userInfo(login_id);
        setMyInfo(info);
        setLoading(false);
      };
    
    fetchData();
  }, [login_id]);

  const clickPost =(pid)=>{
    navigate(`../detail/${pid}`);
  }




  return (
    
    <div > 
      {!isLogin?<div > 로그인을 하십쇼</div>:
      (loading?<div><Skeleton /><Skeleton /><Skeleton /></div>:
      <div>
        <button className="transferBtn" onClick={showDrawer}><h5 className="transferText">Token Transfer</h5></button>
        <Descriptions
          bordered
          title="User Info"
          size="middle"
        >
            <Descriptions.Item label="Login_id" span={1}>{myInfo.userData.login_id}</Descriptions.Item>
            <Descriptions.Item label="Nickname">{myInfo.userData.nickname}</Descriptions.Item>
            <Descriptions.Item label="Address">{myInfo.userData.address}</Descriptions.Item>
            <Descriptions.Item label="Eth_amount">{myInfo.userData.eth_amount}</Descriptions.Item>
            <Descriptions.Item label="Token_amount">{myInfo.userData.token_amount}</Descriptions.Item>
            <Descriptions.Item label="Created_at">{myInfo.userData.created_at.slice(0,10)}</Descriptions.Item>
            
        </Descriptions>
        <br></br>
        <h1>My Post</h1>
        <Collapse accordion>
        {myInfo.postData.map((post,idx)=>{
          const title = (<h3 style={{fontSize: '80px !important'}}>{idx+1+" : "+post.title + " / " + post.created_at.slice(0,10)}</h3>);
          return(
            <Panel header={title} key={post.id}>
              <div onClick={()=>clickPost(post.id)}>
                <img src={post.img_url}/>
                <p>{post.content}</p>
              </div>
            </Panel>
          );
          })}
        </Collapse>

        {/*NFTList */}
        <br></br>
        <h1>My NFTs : {myInfo.nftData.length}</h1>
        <div className="nftContainer">
          <Row className="row" gutter={24}>
            {myInfo.nftData.map(nft => {
              var nftDetail;
              
              let xhr = new XMLHttpRequest;
              xhr.open('GET', nft.token_uri,false);
              // xhr.responseType = 'json';
              xhr.onload = () => {
                nftDetail = xhr.response;
              }
              xhr.send();
              nftDetail = JSON.parse(nftDetail);
              console.log(nftDetail)
              
              return(
                
                <Col xs={8}> 
                  <br></br>               
                    <Image
                    src={nftDetail.image}
                    width={400}
                    />
                    <br></br>
                    <h2>{nftDetail.name}</h2>
                </Col>
              );
            })}
          </Row>
        </div>
          
        
        {/*드로우 페이지 토큰 보내기에 사용됨 */}
        <Drawer
          title="Token 보내기"
          placement="bottom"
          closable={true}
          onClose={onClose}
          open={open}
          key="bottom"
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="recipient"
              name="recipient"
              rules={[
                {
                  required: true,
                  message: 'Please input recipient!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="transfer_amount"
              name="transfer_amount"
              rules={[
                {
                  required: true,
                  message: 'Please input your transfer_amount!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="private_key"
              name="private_key"
              rules={[
                {
                  required: true,
                  message: 'Please input your private_key!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>

        </Drawer>
      </div>
      )}
    </div>
  )
}

export default MyPage
import React, {  useState,useEffect } from "react";
import { useSelector } from 'react-redux';
import { userInfo } from "../../api/userapi";

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
  const [myInfo,setMyInfo]=useState({//임시로 더미데이터 저장중
    userData:{
      login_id:"asdf",
      nickname:"dummyman",
      address:"0xTEST12321412",
      token_amount:1000000,
      eth_amount:12.564,
      created_at:"2012-12-12",
    },
    postData:[{
      id:	1,
	    user_id:	1,
	    title:"title1",
	    content:"test1",
	    img_url: "img1",
	    created_at: "2012-12-12",

    },{
      id:	2,
	    user_id:	1,
	    title:"title2",
	    content:"test2",
	    img_url: "img2",
	    created_at: "2012-12-12",
    }],
    nftData:[{
      id:1,
      user_id	:1,
      token_id:1,
      tx_hash	:"999999999",
      token_uri	:"http://test",
      price	: 100,
      isSelling:	1,
    },{
      id:2,
      user_id	:1,
      token_id:2,
      tx_hash	:"999999999",
      token_uri	:"http://test2",
      price	: 101,
      isSelling:	1,
    }],
  });
  const {login_id,isLogin} = useSelector((state) =>{
    return state.account;
  });
  /*mypage 랜더시에 userid로 해당 post의 정보를 불려옴*/
    useEffect(() => {

     const fetchData = async () => {
        const info=await userInfo(login_id);
        setMyInfo(info);
      };

    fetchData();
  }, [login_id]);

  return (
    
    <div > 
      {!isLogin?<div > 로그인을 하십쇼</div>:
      <div>
      <div style={{border:'1px solid red',marginTop:'3px'}}>{/*userInfo */}
        <p>{myInfo.userData.login_id}</p>
        <p>{myInfo.userData.nickname}</p>
        <p>{myInfo.userData.address}</p>
        <p>{myInfo.userData.created_at}</p>
      </div>
      <div style={{border:'1px solid red',marginTop:'3px'}}>{/*tokenInfo */}
        <p>{myInfo.userData.token_amount}</p>
        <p>{myInfo.userData.eth_amount}</p>
      </div>
      <div style={{border:'1px solid red',marginTop:'3px'}}>{/*postList */}
        {myInfo.postData.map((post,idx)=>{
          return(
            <article key={post.id} style={{border:'1px solid green',marginTop:'1px'}}>
              <h3>
                {post.id}. {post.title}
              </h3>
              <p>{post.img_url}</p>
              <p>{post.content}</p>
              <p>{post.created_at}</p>
            </article>
          );
        })}
      </div>
      <div style={{border:'1px solid red',marginTop:'3px'}}>{/*NFTList */}
        {myInfo.nftData.map((nft)=>{
          return(
            <article key={nft.id} style={{border:'1px solid green',marginTop:'1px'}}>
              <h3>
                {nft.id}. {nft.price}
              </h3>
              <p>{nft.token_uri}</p>
            </article>
          );
        })}
      </div>
      </div>}
    </div>
  )
}

export default MyPage
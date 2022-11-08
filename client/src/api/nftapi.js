import axios from 'axios';
import {message} from 'antd';

/*
POST요청
req
{
  ”title” : string,
  ”content” : string,
  ”image” : “ImgUrl”,
}
res
{
    token_id : newNFTData.token_id, 
    token_amount : tokenBalance }
post을 생성함
*/
export const mintingNFT= async (name, description,imgUrl,privateKey,accessToken)=>{
  
    try{
      const result = await axios({
        method: "post",
        url: "http://localhost:3001/nft_market/mint",
        headers: {
          Accpet: "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
        data: { name, description,imgUrl ,privateKey},
      })
      message.success(`NFT create successfully.`);      
    }catch(err){
      message.error(err.response.data.message);
    }
};
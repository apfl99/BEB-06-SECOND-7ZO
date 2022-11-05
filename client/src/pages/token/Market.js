import { Button, Card, Col, Row, Image } from "antd";
import Meta from 'antd/lib/card/Meta';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';


function Market() {
  const [collectionData, setCollectionData] = useState([]);
  const navigate=useNavigate();
  { /*
    const [Img, setImg] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  
  useEffect(() => {}, [collectionData]);
  useEffect(() => {
    getNFTInfo();
  }, [collectionData]);

  const getNFTInfo = async () => {
    const response = await Axios.get(collectionData.token_uri);

    setImg(`https://ipfs.io/ipfs/${response.data.image.split('//')[1]}`);
    setName(response.data.name);
    setDesc(response.data.description);
  };
  
  const getNFTs = async () => {
    axios.get('http://localhost:3000/token/market').then((res) => {
      setCollectionData(res.data.data);
    });
  };
  */}

  return (
    <div> 
      <header>
        <h1>NFT Market</h1>
      </header>

      <main>
        <div id="NFTmarket-page">
          <Button 
            className="mint-btn" 
            type="button" 
            onClick={()=>navigate('/MintNFT')}>MINT</Button>
          <div className="site-card-wrapper">
            <Row gutter={[16, 16]}>
              { collectionData.map((_, idx) => {
                return (
                  <Col xs={12} xl={6}> {/*key={Symbol(idx + 1).toString()}/Row>*/}
                    <Card
                      //key={collectionData.name}
                      hoverable
                      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                  {/*    cover={<Image alt="collection-card" src={Img} preview={false} style={{ height: 500 }} />}
                    >
                <Meta title={name} description={desc} /> */}
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Market
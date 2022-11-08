import React, {  useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getallposts } from "../../api/Postapi";
import { Pagination ,Button,Card,Col, Row,Image,Space} from 'antd';
import {EditOutlined} from '@ant-design/icons';
const { Meta } = Card;

function Home() {
  const [posts,setPosts]=useState([]);
  const [pageInfo, setPageInfo] = useState({limit:12,page:1});
  const offset = (pageInfo.page - 1) * pageInfo.limit;
  const navigate=useNavigate();

  const pageSelect = (page,limit) => {
    const newInfo={page,limit};

    setPageInfo(newInfo);
  };
  const clickPost =(pid)=>{
    navigate(`detail/${pid}`);
  }

  /*main 랜더시에  post리스트를 불려옴*/
    useEffect(() => {

    const fetchData = async () => {
      const postlist=await getallposts();
      setPosts(postlist);
    };

    fetchData();
  }, []);

  return (
    <div> 
      
      
      <h1 style={{margin:"5vh"}} align="center">Topic List</h1>
      <header style={{marginLeft:"15vh",marginRight:"15vh"}} align="end">
      
      <Button type="button" onClick={()=>navigate('/create')}><EditOutlined />create</Button>
      </header>
      <Row gutter={14} style={{marginLeft:"15vh",marginRight:"15vh",marginBottom:"5vh"}}>
        {posts.slice(offset, offset + pageInfo.limit).map(({ id, title, content,img_url,created_at }) => (
          <Col flex="auto" key={id} onClick={()=>clickPost(id)}>
            <Card
              hoverable
              style={{
                marginTop: "5px",
                width: 250,
              }}
              cover={<Image
                height={240}
                src={img_url}
                
              />}
            >
              <Meta align="start" title={title} description={created_at} />
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination defaultPageSize={12} pageSizeOptions={[12,24,48]} total={posts.length} onChange={pageSelect}/>
    </div>
  )
}

export default Home;
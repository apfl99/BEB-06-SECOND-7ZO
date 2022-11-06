import React, {  useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getallposts } from "../../api/Postapi";
import { Pagination ,Button} from 'antd';

function Home() {
  const [posts,setPosts]=useState([]);
  const [pageInfo, setPageInfo] = useState({limit:10,page:1});
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
      <header>
        <h1>게시물 목록</h1>
      </header>

      
      <Button type="button" onClick={()=>navigate('/create')}>create</Button>
      <main>
        {posts.slice(offset, offset + pageInfo.limit).map(({ id, title, content,img_url,created_at }) => (
          <article key={id} style={{border:"1px solid red",cursor:"pointer"}} onClick={()=>clickPost(id)}>
            <h3>
              {id}. {title}
            </h3>
            <p>{content}</p>
            <p>{img_url}</p>
            <p>{created_at}</p>
          </article>
        ))}
      </main>
      <Pagination defaultCurrent={1} total={posts.length} onChange={pageSelect}/>
    </div>
  )
}

export default Home;
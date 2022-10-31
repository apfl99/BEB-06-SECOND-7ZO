import React, {  useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { message,Pagination ,Button} from 'antd';

function Home() {
  const [posts,setPosts]=useState([]);
  const [pageInfo, setPageInfo] = useState({limit:10,page:1});
  const offset = (pageInfo.page - 1) * pageInfo.limit;
  const navigate=useNavigate();
  const pageSelect = (page,limit) => {
    const newInfo={page,limit};

    setPageInfo(newInfo);
  };
  /*main 랜더시에  post리스트를 불려옴*/
    useEffect(() => {

    const fetchData = async () => {
      try{
        const result = await axios({
          method: "get",
          url: `https://jsonplaceholder.typicode.com/posts`,
          headers: {
            Accpet: "application/json",
          },
          withCredentials: true,
        });
        const postList=result.data;
        setPosts(postList);
      }catch(err){
        message.error(`failed post`);
      }
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
        {posts.slice(offset, offset + pageInfo.limit).map(({ id, title, body }) => (
          <article key={id}>
            <h3>
              {id}. {title}
            </h3>
            <p>{body}</p>
          </article>
        ))}
      </main>
      <Pagination defaultCurrent={1} total={posts.length} onChange={pageSelect}/>
    </div>
  )
}

export default Home;
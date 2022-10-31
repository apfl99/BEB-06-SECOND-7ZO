import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Home, Market, MintNFT, MyPage, PostCreate, PostDetail, Signin, Signup } from './pages/index'
import { Navbar } from './components'
import 'antd/dist/antd.min.css';
import './assets/styles/App.css';

function App() {
  return (
    <div className="App stop-dragging">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home  />} />
          <Route path="/MintNFT" element={<MintNFT  />} />
          <Route path="/market" element={<Market   />} />
          <Route path="/create" element={<PostCreate   />} />
          <Route path="/detail/:id" element={<PostDetail />} />
          <Route path="/mypage" element={<MyPage   />} />
          {/* <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

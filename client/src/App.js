import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Home, Market, MintNFT, MyPage, PostCreate, PostDetail, Signin, Signup } from './pages/index'
import { Navbar } from './components'
import 'antd/dist/antd.min.css';
import './assets/styles/App.css';

function App() {
  let account = useSelector((state) => state.account)
  return (
    <div className="App stop-dragging">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home account={account} />} />
          <Route path="/MintNFT" element={<MintNFT account={account} />} />
          <Route path="/market" element={<Market account={account}  />} />
          <Route path="/create" element={<PostCreate account={account}  />} />
          {/* <Route path="/detail/:id" element={<PostDetail account={account}  />} /> */}
          <Route path="/mypage" element={<MyPage account={account}  />} />
          {/* <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

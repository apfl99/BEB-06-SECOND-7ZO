import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Button ,message} from "antd";
import stores from "../../redux";
import '../../assets/styles/tabs/Navbar.css';
import axios from "axios";

// eslint-disable-next-line
function Navbar({ }) {
    const {isLogin,nickname,address,accessToken}=useSelector((state) =>{
        return state.account;
      });
    const navigate=useNavigate();
    /**로그아웃시 redux의 account state를 초기화 */
    const purge = () => {
        stores.persistor.purge();
        console.log("Factory reset performed.")
    }
    const faucet=async ()=>{
        try{
            const result = await axios({
              method: "get",
              url: `http://localhost:3001/faucet/${address}`,
              headers: {
                Accpet: "application/json",
                authorization: `Bearer ${accessToken}`,
              },
              withCredentials: true,
            });
            message.success('get faucet');
          }catch(err){
            message.error(`failed get`);
            console.log(accessToken);
          }
    }
    return (
        <div className="Navbar">
            <nav className="navbar navbar-expand-lg" id="navbar">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand" id="nav-brand">
                        7ZO
                    </Link>
                    <div className="navbar-items">
                        <Link to="/" className="nav-item">Home</Link>
                        <Link to="/MintNFT" className="nav-item">Mint</Link>
                        <Link to="/market" className="nav-item">Market</Link>
                        
                        {isLogin?
                        <div  >
                            <Link to="/mypage" className="nav-item">MyPage</Link>
                            {nickname}
                            <Button className="nav-btn" type="button" onClick={()=>purge()}>Logout</Button>
                            <Button className="nav-btn" type="button" onClick={faucet}>faucet</Button>
                        </div> :
                            <Link to="/signin">
                                <Button className="nav-btn" type="button" onClick={()=>{navigate("/signin")}}>Login</Button>
                            </Link>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar

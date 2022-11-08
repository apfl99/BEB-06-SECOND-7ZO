import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Button ,message,Breadcrumb, Layout, Menu} from "antd";
import {RocketOutlined,UserOutlined,SkinOutlined,ImportOutlined,ExportOutlined,UserAddOutlined,ThunderboltOutlined} from '@ant-design/icons';
import stores from "../../redux";
import '../../assets/styles/tabs/Navbar.css';
import axios from "axios";
const { Header } = Layout;



// eslint-disable-next-line
function Navbar({ }) {
    const {isLogin,nickname,address,accessToken}=useSelector((state) =>{
        return state.account;
      });
    const items=[//네비 메뉴
            {
                label: 'Mint',
                key: 'mint',
                icon: <RocketOutlined />,
            },
            {
                label: 'Faucet',
                key: 'faucet',
                icon: <ThunderboltOutlined />,
            },
            {
                label: nickname,
                key: 'user',
                icon: <UserOutlined />,
                children:[
                    {
                        label: 'MyPage',
                        key: 'mypage',
                        icon: <SkinOutlined />,
                    },
                    {
                        label: 'LogOut',
                        key: 'logout',
                        icon: <ExportOutlined />,
                    },
                ],
            },

        ];
    const navigate=useNavigate();
    const selectKey={
        login:()=>{
            navigate("/signin");
        },
        signup:()=>{
            navigate("/signup");
        },
        mypage:()=>{
            navigate("/mypage");
        },
        mint:()=>{
            navigate("/MintNFT");
        },
        faucet:async ()=>{
            Faucet();
        },
        logout:()=>{
            purge();
        }
    };
    const selectMenu = (e) => {
        selectKey[e.key]();
      };
    
    /**로그아웃시 redux의 account state를 초기화 */
    const purge = () => {
        stores.persistor.purge();
        window.location.replace("/");
    }
    const Faucet=async ()=>{
        try{
            message.loading('getting faucet');
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
        <Header >
            <h1 align="center" onClick={()=>navigate("/")} style={{float: "left",color: "#6bf0c4d7",fontWeight:"bolder",fontSize:40}}>
                7ZO
            </h1>
            <Menu
                style={{display: "flex",justifyContent:"end"}}
                theme="dark"
                mode="horizontal"
                onClick={selectMenu}
                items={!isLogin?[{
                    label: 'User',
                    key: 'user',
                    icon: <UserOutlined />,
                    children:[{
                        label: 'LogIn',
                        key: 'login',
                        icon: <ImportOutlined />,
                        },
                        {
                            label: 'SignUp',
                            key: 'signup',
                            icon: <UserAddOutlined />,
                        }]
                    }]
                    :items}
            />
            {/*<div className="Navbar">
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
                            <Button className="nav-item" type="button" onClick={()=>purge()}>Logout</Button>
                            <Button className="nav-item" type="button" onClick={faucet}>faucet</Button>
                        </div> :
                            <Link to="/signin">
                                <Button className="nav-btn" type="button" onClick={()=>{navigate("/signin")}}>Login</Button>
                            </Link>
                        }
                    </div>
                </div>
            </nav>
        </div>*/}
        </Header>
        
    )
}

export default Navbar

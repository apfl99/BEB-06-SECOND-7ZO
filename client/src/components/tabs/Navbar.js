
import { Link } from "react-router-dom";
import { Button } from "antd";
import '../../assets/styles/tabs/Navbar.css';

// eslint-disable-next-line
function Navbar({ }) {
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
                        <Link to="/mypage" className="nav-item">MyPage</Link>
                        <Link to="/create" className="nav-item">create</Link>
                        {
                            <Link to="/signin">
                                <Button className="nav-btn" type="button">Login</Button>
                            </Link>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
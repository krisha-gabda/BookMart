import '../index.css';
import '../styles/nav-bar.css';

import {Link} from 'react-router-dom';
import logo from "../assets/logo.png";
import {CgProfile} from "react-icons/cg";

function NavBar() {
    return (
        <nav className='NavBar'>
            <div className='left-section'>
                <img src={logo} alt="Website Logo" className="website-logo" />
                <h1>BookMart</h1>
            </div>
            <div className='right-section'>
                <ul className='menu'>
                    <li>Recommended Books</li>
                    <li>Categories</li>
                    <li>Trending</li>
                </ul>
            </div>
            <div className='profile'>
                <div className="icon"><CgProfile /></div>
                <p>User123</p>
            </div>
        </nav>
    )
}

export default NavBar;
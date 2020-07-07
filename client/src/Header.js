import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="Header">
            <h2 className="Header-title">
                <Link to="/">
                    <button className="Header-title">Food With Friends</button>
                </Link>
            </h2>

            <ul>
                <Link>
                    <li className="Navigation-buttons-header">
                        <Link to="/HomePage">
                            <button className="Navigation-buttons">Home</button>
                        </Link>
                        <Link to="/AboutPage">
                            <button className="Navigation-buttons">
                                About
                            </button>
                        </Link>
                        <Link to="/Cart">
                            <button className="Navigation-buttons">Cart</button>
                        </Link>
                        <Link to="/Profile">
                            <button className="Navigation-buttons">
                                Profile
                            </button>
                        </Link>
                        <Link to="/Signin">
                            <button className="Navigation-buttons">
                                Sign in
                            </button>
                        </Link>
                    </li>
                </Link>
            </ul>
        </div>
    );
}

export default Header;

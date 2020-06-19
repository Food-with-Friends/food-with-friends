import React from 'react';
import './Header.css';

function Header() {
    return (
        <div className="Header">
            <h2 className="Header-title">Food With Friends</h2>
            <ul>
                <li className="Navigation-buttons-header">
                    <button className="Navigation-buttons">Home</button>
                    <button className="Navigation-buttons">About</button>
                    <button className="Navigation-buttons">Cart</button>
                    <button className="Navigation-buttons">Profile</button>
                    <button className="Navigation-buttons">Sign in</button>
                </li>
            </ul>
        </div>
    );
}

export default Header;

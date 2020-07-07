import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Cart from './Cart';
import Header from './Header';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import LandingPage from './LandingPage';

// const initialItems = [
//     { id: 1, name: 'Taco Seasoning', price: 2.25, qty: 2 },
//     { id: 2, name: 'Pinto Beans', price: 1.99, qty: 3 },
//     { id: 3, name: 'Sour Cream', price: 3.5, qty: 1 },
// ];

function App() {
    return (
        <Router>
            <div className="theme-dark">
                <Header />
                <Switch>
                    <Route path="/" exact component={LandingPage} />
                    <Route path="/HomePage" exact component={HomePage} />
                    <Route path="/AboutPage" exact component={AboutPage} />
                    <Route path="/Cart" exact component={Cart} />
                    {/* <Route path="/Profile" component={Profile} /> */}
                    {/* <Cart initialItems={initialItems} /> */}
                </Switch>
            </div>
        </Router>
    );
}

export default App;

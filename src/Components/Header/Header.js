import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './header.css';


const Header = () =>( 
    <nav className="navbar navbar-expand-lg navbar-dark bg-header">
        <div className="container">
            <Link to="/post" className="navbar-brand">
                React CRUD & Routing Smash
            </Link>

            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink
                        to="/post"
                        className="nav-link"
                        activeClassName="active"
                    >
                        Posts
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/new-post"
                        className="nav-link"
                        activeClassName="active"
                    >
                        Nuevo Post
                    </NavLink>
                </li>
                
            </ul>

        </div>
    </nav>
 );

 
export default Header;
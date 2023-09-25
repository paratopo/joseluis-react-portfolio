import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class NavigationComponent extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <NavLink exact to="/" activeClassName="nav-link-active">HOME</NavLink>
                <NavLink to="/blog">BLOG</NavLink>
                { false ? <button>ADD BLOG</button> : null }
                <NavLink to="/about">ABOUT</NavLink>
                <NavLink to="/contact">CONTACT</NavLink>
            </div>
        );
    }
}


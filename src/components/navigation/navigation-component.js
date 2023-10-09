import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class NavigationComponent extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className='nav-wrapper'>
                <div className='left-side'>
                    <div className='nav-link'>
                        <NavLink exact to="/" activeClassName="nav-link-active">HOME</NavLink>
                    </div>
                    <div className='nav-link'>
                        <NavLink to="/blog" activeClassName="nav-link-active">BLOG</NavLink>
                    </div>

                    { false ? <button>ADD BLOG</button> : null }

                    <div className='nav-link'>
                        <NavLink to="/about" activeClassName="nav-link-active">ABOUT</NavLink>
                    </div>
                    <div className='nav-link'>
                        <NavLink to="/contact" activeClassName="nav-link-active">CONTACT</NavLink>
                    </div>
                </div>

                <div className='right-side'>José Luis González</div>
            </div>
        );
    }
}


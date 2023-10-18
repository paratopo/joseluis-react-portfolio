import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavigationComponent = props => {
    const dynamicLink = (route, linkText) => {
        return (
            <div className='nav-link'>
                <NavLink to="/portfolio-manager" activeClassName="nav-link-active">{linkText}</NavLink>
            </div>
        );
    };

    const handleSignOut = () => {
        axios.delete("https://api.devcamp.space/logout", {withCredentials: true})
        .then(response => {
            if (response.status === 200) {
              props.history.push("/");
              props.handleSuccessfulLogout();
            }
            return response.data;
        })
        .catch(error => {
            console.log("Error signing out", error);
        });
    };
        
    return (
        <div className='nav-wrapper'>
            <div className='left-side'>
                <div className='nav-link'>
                    <NavLink exact to="/" activeClassName="nav-link-active">HOME</NavLink>
                </div>
                <div className='nav-link'>
                    <NavLink to="/blog" activeClassName="nav-link-active">BLOG</NavLink>
                </div>
                <div className='nav-link'>
                    <NavLink to="/about" activeClassName="nav-link-active">ABOUT</NavLink>
                </div>
                <div className='nav-link'>
                    <NavLink to="/contact" activeClassName="nav-link-active">CONTACT</NavLink>
                </div>
                { props.loggedInStatus === "LOGGED_IN" ? (dynamicLink("/portfolio-manager", "PORTFOLIO MANAGER")) : null }
            </div>

            <div className='right-side'>
                José Luis González
                {props.loggedInStatus === "LOGGED_IN" ? <a onClick={handleSignOut}>
                    <FontAwesomeIcon icon="sign-out-alt" />
                </a> : null}
            </div>
        </div>
    );
}
export default withRouter(NavigationComponent);



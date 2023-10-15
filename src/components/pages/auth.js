import React, { Component } from 'react';

import Login from "../auth/login"
import loginImg from "../../../static/assets/images/login.jpg";

export default class Auth extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulAuth= this.handleSuccessfulAuth.bind(this); 
        this.handleUnSuccessfulAuth= this.handleUnSuccessfulAuth.bind(this);
    }
    handleSuccessfulAuth() {
        this.props.handleSuccessfulLogin();
        this.props.history.push("/");
        console.log(this.props.handleSuccessfulLogin);
    }
    handleUnSuccessfulAuth() {
        this.props.handleUnSuccessfulLogin();
    }
    render() {
        return (
            <div className='auth-page'>
                <div className='left-side' 
                    style={{backgroundImage: `url(${loginImg})`}
                    } />
                <div className='right-side'>
                    <Login 
                        handleSuccessfulAuth={this.handleSuccessfulAuth}
                        handleUnSuccessfulAuth={this.handleUnSuccessfulAuth} 
                    />
                </div>
            </div>
        );
    }
}


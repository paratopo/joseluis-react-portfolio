import React, { Component } from 'react';

export default class PortfolioManager extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='portfolio-manager'>
                <div className='left-side'>
                    <h1>Portfolio Form</h1> 
                </div>
                
                <div className='right-side'>
                    <h1>Blog Sidebar</h1>
                </div>
            </div>
        );
    }
}

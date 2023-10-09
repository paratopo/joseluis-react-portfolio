import { Component } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

export default class PortfolioItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolioItemClass: ""
        };
    }
        //background: thumb_image_url
        //logo: logo_url
        //description: description
        //id: id
    handleMouseEnter() {
        this.setState({portfolioItemClass: "image-blur"})
    }
    handleMouseLeave() {
        this.setState({portfolioItemClass: ""})
    }
    render() {
        const {id, description, thumb_image_url, logo_url} = this.props.item;
        return(    
            <div className='portfolio-item' 
            onMouseEnter={() => this.handleMouseEnter()} 
            onMouseLeave={() => this.handleMouseLeave()}>
                <div
                    className= {'portfolio-background ' + this.state.portfolioItemClass}
                    style={{
                        backgroundImage: "url("+thumb_image_url+")"
                    }}
                />
                <div className='logo-description'>
                    <div className='logo'>
                        <img src={logo_url} />
                    </div>
                    <div className='description'>{description}</div>
                </div>
            </div>
        );
    }
}
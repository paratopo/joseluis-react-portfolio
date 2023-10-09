import React, { Component } from 'react';
import axios from 'axios';

import PortfolioItem from './portfolio-item.js';
export default class PortfolioContainer extends Component {
    constructor() {
        super();

        this.state = {
            pageTitle: "Bienvenido a mi Portfolio",
            isLoading: false,
            data: []
        };

        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(filter) {
        this.setState({
            data : this.state.data.filter(item => {
                return item.category === filter
            }) 
        })
    }

    getPortfolioItems() {
        axios.get('https://joseluis.devcamp.space/portfolio/portfolio_items')
      .then(response => {
        console.log("datos API", response);
        this.setState({
            data: response.data.portfolio_items
        });
      })
      .catch(error => {
        console.log(error);
      })
    }

    componentDidMount() {
        this.getPortfolioItems();
    }

    portfolioItems() {

        return this.state.data.map(item => {
            //debugger;
            console.log("item API", item);
            return (<PortfolioItem 
                key={item.id} 
                item={item} />);
        });
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <button className="btn" 
                onClick={() => this.handleFilter("comercio")}>Empresas Comerciales</button>
                <button className="btn">""</button>
                <button className="btn" 
                onClick={() => this.handleFilter("gestoria")}>Empresas Gestoras</button>
                <div className='portfolio-container'>
                    {this.portfolioItems()}
                </div>
            </div>
        );
    }
}
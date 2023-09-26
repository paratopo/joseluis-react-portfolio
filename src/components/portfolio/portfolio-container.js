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
            data: response.data.portfolioItems
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
            console.log("item API", item);
            return <PortfolioItem title={item.name} url={item.url} permalink={item.id} />;
        });
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <h2>{this.state.pageTitle}</h2>
                <br/>
                <hr/>
                <br/>
                <button onClick={() => this.handleFilter("Comercio")}>Empresas Comerciales</button>
                <button onClick={() => this.handleFilter("Gestoria")}>Empresas Gestoras</button>
                <br/>
                {this.portfolioItems()}

            </div>
        );
    }
}
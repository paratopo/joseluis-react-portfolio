import React, { Component } from 'react';

import PortfolioItem from './portfolio-item.js';
export default class PortfolioContainer extends Component {
    constructor() {
        super();
        
        this.state = {
            pageTitle : "Bienvenido a mi Portfolio",
            isLoading: false,
            data : [
                {title : "empresa 1", category : "Comercio", permalink : "empresa_1"},
                {title : "empresa 2", category : "Gestoria", permalink : "empresa_2"},
                {title : "empresa 3", category : "Comercio", permalink : "empresa_3"},
                {title : "empresa 4", category : "Gestoria", permalink : "empresa_4"}
            ]
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

    portfolioItems() {

        return this.state.data.map(empresa => {
            return <PortfolioItem title={empresa.title} url="xxx.com" permalink={empresa.permalink} />;
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
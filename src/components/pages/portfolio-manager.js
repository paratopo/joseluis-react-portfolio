import React, { Component } from 'react';
import axios from 'axios';

import PortfolioForm from '../portfolio/portfolio-form';
import PortfolioSidebar from '../portfolio/portfolio-sidebar';

export default class PortfolioManager extends Component {
    constructor() {
        super();

        this.state = {
            portfolioItems: [],
            portfolioToEdit: {}
        }

        this.handleSucessfulFormSubmission= this.handleSucessfulFormSubmission.bind(this);
        this.handleFormSubmissionError= this.handleFormSubmissionError.bind(this);
        this.handleEditItem= this.handleEditItem.bind(this);
        this.handleDeleteItem= this.handleDeleteItem.bind(this);
        this.clearPortfolioToEdit= this.clearPortfolioToEdit.bind(this);
    }

    clearPortfolioToEdit() {
        this.setState({
            portfolioToEdit: {}
        });
    }

    handleSucessfulFormSubmission(portfolioItem) {
        this.setState({
            portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
        })
        console.log("Form Submision done", portfolioItem);
    }

    handleFormSubmissionError(error) {
        console.log("Form Submission Error", error);
    }

    handleEditItem(portfolioItem) {
        this.setState({
            portfolioToEdit: portfolioItem
        });
        console.log(portfolioToEdit)
    }

    handleDeleteItem(portfolioItem) {
        axios
          .delete(
            `https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`,
            { withCredentials: true }
          )
          .then(response => {
            this.setState({
              portfolioItems: this.state.portfolioItems.filter(item => {
                return item.id !== portfolioItem.id;
              })
            });
    
            return response.data;
          })
          .catch(error => {
            console.log("handleDeleteClick error", error);
          });
      }

    getPortfolioItems() {
        axios.get("https://joseluis.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc", {withCredentials: true})
        .then(response => {
            this.setState({
                portfolioItems: [...response.data.portfolio_items]
            })
        })
        .catch(error => {console.log("error in getPortfolioItems", error)})
    }

    componentDidMount() {
        this.getPortfolioItems();
    }


    render() {
        return (
            <div className='portfolio-manager'>
                <div className='left-side'>
                    <PortfolioForm 
                        handleSucessfulFormSubmission= {this.handleSucessfulFormSubmission} 
                        handleFormSubmissionError= {this.handleFormSubmissionError} 
                        clearPortfolioToEdit= {this.clearPortfolioToEdit}
                        portfolioToEdit= {this.state.portfolioToEdit}
                    /> 
                </div>
                
                <div className='right-side'>
                    <PortfolioSidebar 
                        handleDeleteItem= {this.handleDeleteItem} 
                        data={this.state.portfolioItems}
                        handleEditItem= {this.handleEditItem}
                     />
                </div>
            </div>
        );
    }
}

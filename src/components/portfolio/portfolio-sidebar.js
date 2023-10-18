import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PortfolioSidebar = (props) => {
    const portfolioList = props.data.map(portfolioItem => {
        return (
            <div className="sidebar-item" key={portfolioItem.id}>
                <div className="sidebar-img">
                    <img src={portfolioItem.thumb_image_url} />
                </div>
                <div className="item-text">
                    <div className="sidebar-name">{portfolioItem.name}</div>
                    <div className="click-actions">
                        <a className="click-icon" onClick={() => props.handleEditItem(portfolioItem)}>
                            <FontAwesomeIcon icon="edit" />
                        </a>
                        <a className="click-icon" onClick={() => props.handleDeleteItem(portfolioItem)}>
                            <FontAwesomeIcon icon="trash" />
                        </a>
                    </div>
                </div>
            </div>
        )
    })
    
    return <div className="manager-sidebar-list">{portfolioList}</div>
}

export default PortfolioSidebar;
import React, { Component } from 'react';
import axios from 'axios';
import { DropzoneComponent } from 'react-dropzone-component';

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default class PortfolioForm extends Component {
    constructor(props) {
        super(props);

        this.state= {
            name: "",
            description: "",
            category: "comercio",
            position: "",
            url: "",
            thumb_image: "",
            banner_image: "",
            logo: ""
        }

        this.handleChange= this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.componentConfig= this.componentConfig.bind(this);
        this.djsConfig= this.djsConfig.bind(this);
        this.handleThumbDrop= this.handleThumbDrop.bind(this);
        this.handleBannerDrop= this.handleBannerDrop.bind(this);
        this.handleLogoDrop= this.handleLogoDrop.bind(this);

        this.thumbRef= React.createRef();
        this.bannerRef= React.createRef();
        this.logoRef= React.createRef();
    }

    componentDidUpdate() {
        if (Object.keys(this.props.portfolioToEdit).length > 0) {
            const {
                id,
                name,
                description,
                category,
                position,
                url, 
                thumb_image_url,
                banner_image_url, 
                logo_url
            }= this.props.portfolioToEdit;
            this.props.clearPortfolioToEdit();
            this.state= {
                id: id,
                name: name || "",
                description: description || "",
                category: category || "comercio",
                position: position || "",
                url: url || "",
            }
        }
    }

    handleThumbDrop() {
        return {
            addedFile: file => this.setState({thumb_image: file})
        }
    }

    handleBannerDrop() {
        return {
            addedFile: file => this.setState({banner_image: file})
        }
    }

    handleLogoDrop() {
        return {
            addedFile: file => this.setState({logo: file})
        }
    } 

    componentConfig() {
        return {
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true, 
            postUrl: "https://httpbin.org/post"
        }
    }

    djsConfig() {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    buildForm() {
        let formData = new FormData();
    
        formData.append("portfolio_item[name]", this.state.name);
        formData.append("portfolio_item[description]", this.state.description);
        formData.append("portfolio_item[url]", this.state.url);
        formData.append("portfolio_item[category]", this.state.category);
        formData.append("portfolio_item[position]", this.state.position);
    
        if (this.state.thumb_image) {
          formData.append("portfolio_item[thumb_image]", this.state.thumb_image);
        }
    
        if (this.state.banner_image) {
          formData.append("portfolio_item[banner_image]", this.state.banner_image);
        }
    
        if (this.state.logo) {
          formData.append("portfolio_item[logo]", this.state.logo);
        }
        console.log(formData);
        return formData;
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        console.log("submit event", event)
       
        axios
          .post(
            "https://joseluis.devcamp.space/portfolio/portfolio_items",
            this.buildForm(), {withCredentials: true})
          .then(response => {
            console.log("response data", response)
            this.props.handleSucessfulFormSubmission(response.data.portfolio_item);

            this.setState({
              name: "",
              description: "",
              category: "comercio",
              position: "",
              url: "",
              thumb_image: "",
              banner_image: "",
              logo: ""
            });
    
            [this.thumbRef, this.bannerRef, this.logoRef].forEach(ref => {
              ref.current.dropzone.removeAllFiles();
            });
          })
          .catch(error => {
            console.log("portfolio form handleSubmit error", error);
          });
    
        event.preventDefault();
      }

    render() {
        return (
            <div>
                <h1>FORMULARIO PORTFOLIO</h1>
                <form onSubmit={this.handleSubmit} className='portfolio-form'>
                    <div className='two-column'>
                        <input
                            type='text' 
                            name='name'
                            placeholder='Introduce el nombre'
                            value={this.state.name}
                            onChange={this.handleChange}
                         />
                        <input
                            type='text' 
                            name='url'
                            placeholder='Introduce url'
                            value={this.state.url}
                            onChange={this.handleChange}
                         />
                    </div>
                    <div className='two-column'>
                        <input
                            type='text'
                            inputMode='numeric' 
                            name='position'
                            placeholder='Introduce posicion'
                            value={this.state.position}
                            onChange={this.handleChange}
                         />
                        <select name='category' className='form-select' value={this.state.category} onChange={this.handleChange}>
                            <option value="comercio">COMERCIO</option>
                            <option value="gestoria">GESTORIA</option>
                        </select>
                    </div>
                    <div className='one-column'>
                        <textarea
                            type='text' 
                            name='description'
                            placeholder='Introduce la descripcion...' 
                            className='form-textarea' 
                            value={this.state.description}
                            onChange={this.handleChange}
                         />
                    </div>
                    <div className='image-uploaders three-column'>
                        <DropzoneComponent 
                        ref= {this.thumbRef} 
                        config= {this.componentConfig()} 
                        djsConfig= {this.djsConfig()} 
                        eventHandlers= {this.handleThumbDrop()}>
                            <div className='dz-message'>THUMBNAIL</div>
                        </DropzoneComponent>


                        <DropzoneComponent 
                        ref= {this.bannerRef}
                        config= {this.componentConfig()} 
                        djsConfig= {this.djsConfig()} 
                        eventHandlers= {this.handleBannerDrop()}>
                            <div className='dz-message'>BANNER</div>
                        </DropzoneComponent>


                        <DropzoneComponent 
                        ref= {this.logoRef}
                        config= {this.componentConfig()} 
                        djsConfig= {this.djsConfig()} 
                        eventHandlers= {this.handleLogoDrop()}>
                            <div className='dz-message'>LOGO</div>
                        </DropzoneComponent>

                        
                    </div>
                    <div>
                        <button className='btn' type='submit'>GUARDAR</button>
                    </div>
                </form>
            </div>
        );
    }
}


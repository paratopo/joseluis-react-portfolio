import React, { Component } from 'react';
import axios from 'axios';


export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errorText: ""
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value, 
            errorText: ""
        });
    }
    handleSubmit(event) {
        axios.post("https://api.devcamp.space/sessions", {
            client: {
                email: this.state.email,
                password: this.state.password
            }
        },{withCredentials: true})
        .then(response => {
            if (response.data.status === "created") {
                this.props.handleSuccessfulAuth()
            } else {
                this.setState({
                    errorText: "Email o Password Incorrectos"
                });
                this.props.handleUnSuccessfulAuth();
            } 
        }).catch(error => {
            this.setState({
                errorText: "Ha Ocurrido Un Error"
            });
            this.props.handleUnSuccessfulAuth();
        });
        event.preventDefault();
    }
    render() {
        return (
            <div>
                <h1>ACCESO AL PANEL DE CONTROL</h1>
                <div>{this.state.errorText}</div>
                <form onSubmit={this.handleSubmit}>
                    <input type='email' 
                        name='email' 
                        placeholder='introduce e-mail' 
                        value={this.state.email} 
                        onChange={this.handleChange} />
                    <input type='password' 
                        name='password'  
                        placeholder='introduce contraseña' 
                        value={this.state.password} 
                        onChange={this.handleChange} />
                    <div>
                        <button type="submit">Validar</button>
                    </div>
                </form>
            </div>
        );
    }
}


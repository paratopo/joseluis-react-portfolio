import React, { Component } from 'react';
import moment from 'moment';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import NavigationComponent from './navigation/navigation-component.js';
import PortfolioDetail from './portfolio/portfolio-detail.js';

import Home from './pages/home.js';
import Blog from './pages/blog.js';
import About from './pages/about.js';
import Contact from './pages/contact.js';
import Auth from './pages/auth.js';
import NoMatch from './pages/no-match.js';


export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state= {
      loggedInStatus: "NOT_LOGGED_IN"
    }

    this.handleSuccessfulLogin= this.handleSuccessfulLogin.bind(this);
    this.handleUnSuccessfulLogin= this.handleUnSuccessfulLogin.bind(this);
    this.handleSuccessfulLogout= this.handleSuccessfulLogout.bind(this);
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    })
  }

  handleUnSuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  checkLoginStatus() {
    return axios
      .get("https://api.devcamp.space/logged_in", {
        withCredentials: true
      })
      .then(response => {
        const loggedIn = response.data.logged_in;
        const loggedInStatus = this.state.loggedInStatus;

        if (loggedIn && loggedInStatus === "LOGGED_IN") {
          return loggedIn;
        } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "LOGGED_IN"
          });
        } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN"
          });
        }
      })
      .catch(error => {
        console.log("Error", error);
      })
  }
  componentDidMount() {
    this.checkLoginStatus();
  }
  authorizedPages() {
    return 
      <Route path='/blog' component={ Blog } />
  }

  render() {

    return (
      <div className='container'>
        <div className='header-portfolio'>
          <h1>JoseLuis React Portfolio</h1>
          <div className='header-date'>
            {moment().format("dddd, D MMMM YYYY, h:mm a")}
          </div>
        </div>

        <Router>
            <NavigationComponent loggedInStatus= {this.state.loggedInStatus} 
            handleSuccessfulLogout= {this.handleSuccessfulLogout} />

            <Switch>
              <Route exact path='/' component={ Home } />
              <Route path='/auth' 
                render= { props => (
                  <Auth 
                    {...props} 
                    handleSuccessfulLogin= {this.handleSuccessfulLogin}
                    handleUnSuccessfulLogin= {this.handleUnSuccessfulLogin} 
                    />
              )} />
              {this.state.loggedInStatus ? (this.authorizedPages()) : null}
              <Route exact path='/portfolio/:permalink' component={ PortfolioDetail } />
              <Route path='/about' component={ About } />
              <Route path='/contact' component={ Contact } /> 
              <Route component={ NoMatch } /> 
            </Switch>
        </Router>

      </div>
    );
  }
}

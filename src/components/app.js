import React, { Component } from 'react';
import moment from 'moment';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavigationComponent from './navigation/navigation-component.js';
import PortfolioDetail from './portfolio/portfolio-detail.js';

import Home from './pages/home.js';
import Blog from './pages/blog.js';
import About from './pages/about.js';
import Contact from './pages/contact.js';
import NoMatch from './pages/no-match.js';


export default class App extends Component {
  constructor() {
    super();

  }
  
  render() {
    return (
      <div className='app'>
        <h1>JoseLuis React Portfolio</h1>
        <h3>React Redux Router</h3>

        <div>
          {moment().format("dddd, D MMMM YYYY, h:mm a")}
        </div>

        <Router>
            <NavigationComponent />
            <Switch>
              <Route exact path='/' component={ Home } />
              <Route path='/blog' component={ Blog } />
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

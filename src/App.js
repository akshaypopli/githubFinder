import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import User from './components/users/User';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

class App extends Component {
  state={
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  }
  // fetch some users initially
  // async componentDidMount(){
  //   this.setState({loading: true});
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   this.setState({users: res.data, loading: false});
  // }

  //find specific user
  searchUser = async text => {
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({users: res.data.items, loading: false});
  }

  // get single user details
  getUserDetails = async (username) => {
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({user: res.data, loading: false});
  }

  // get user repos
  getUserRepos = async username => {
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({repos: res.data, loading: false});    
  }

  // clear users 
  clearUsers = () => {
    this.setState({loading: false, users: []});
  }

  // alert if nothing entered and click serach
  setAlert = (msg, type) => {
    this.setState({alert: {msg: msg, type: type}});

    setTimeout(() => {
      this.setState({alert: null});
    }, 2000);
  }

  render(){
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path="/" render={props =>(
                <Fragment>
                  <Search  
                    searchUser={this.searchUser} 
                    clearUsers={this.clearUsers} 
                    showClearBtn={this.state.users.length > 0 ? true: false}
                    setAlert={this.setAlert}/>
                  <Users users={this.state.users} loading={this.state.loading}/>
                </Fragment>
              )} />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" render={props=>(
                <User 
                  {...props} 
                  getUserDetails={this.getUserDetails} 
                  user={this.state.user} 
                  loading={this.state.loading}
                  getUserRepos={this.getUserRepos}
                  repos={this.state.repos} />
              )} />
            </Switch>
            
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

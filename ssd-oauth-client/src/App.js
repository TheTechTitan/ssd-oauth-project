import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';

import Login from './components/login/login';
import Authorization from './components/login/authorization'
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import UploadSection from './components/upload/UploadSection'

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      isAuth : false,
      token : null
    }
  }

  authenticateUser = (token) =>{
    this.setState({
      isAuth: true,
      token : token
    })
  }

  getAuthDetails = () =>{
    return {isAuth : this.state.isAuth, token: this.state.token};
  }

  logoutUser = () =>{
    localStorage.removeItem("token");
    this.setState({
      isAuth: false,
      token : null
    })
  }

  componentDidMount(){
    let token = localStorage.getItem("token");
    console.log(JSON.parse(token))

    if(token){
      this.authenticateUser(JSON.parse(token))
    }
  }

  render(){
    const {isAuth, token} = this.state;
    const AppRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props => (
        <div>
          <Header logOutUser={this.logoutUser} isAuth={isAuth} token={token}/>
          <Component  authenticateUser={this.authenticateUser} {...props} />
          <Footer/>
        </div>
      )}/>
    )

    const LoginRoute = ({ component: Component, ...rest }) => {
      if(isAuth){
        return <Redirect to="/" />;
      } else {
        return <Route {...rest} render={props => (
          <div>
            <Header logOutUser={this.logoutUser} isAuth={isAuth} token={token}/>
            <Component {...props}/>
            <Footer/>
          </div>
        )}/>
      }
    }

    const UploadRoute = ({ component: Component, ...rest }) => {
      if(!isAuth){
        return <Redirect to="/login" />;
      } else {
        return <Route {...rest} render={props => (
          <div>
            <Header logOutUser={this.logoutUser} isAuth={isAuth} token={token}/>
            <Component {...props}/>
            <Footer/>
          </div>
        )}/>
      }
    }
    return (
      <div className="App">
        <Router>
          <Switch>
            {/* If the current URL is /about, this route is rendered
                while the rest are ignored */}
            <LoginRoute path="/login" exact component={Login}/>
            <AppRoute path="/oauth" component={Authorization}/>
            <UploadRoute path="/" exact component={UploadSection}/>
            {/* <Route path="/" exact>
              <Header logOutUser={this.logoutUser} isAuth={isAuth} token={token}/>
              <UploadSection/>
            </Route> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

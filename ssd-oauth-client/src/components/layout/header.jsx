import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom'
import './layout.css';
import logo from '../../cloudup.svg';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            isAuth : false,
            token : null
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.isAuth != prevState.isAuth){
            return{
                isAuth : nextProps.isAuth,
                token : nextProps.token
            }
        }

        return null;
    }
    componentDidUpdate(prevProps){
        console.log(prevProps.isAuth)
        console.log(this.props.isAuth)
        if(this.props.isAuth !== prevProps.isAuth){
            console.log(this.props)
            this.setState({
                isAuth : this.props.isAuth,
                token : this.props.token
            })
        }
    }

    logOut = () =>{
        this.props.logOutUser();
        this.props.history.push('/login');
    }
    render(){
        let {isAuth} = this.state;
        return(
            <div className="nav-header">
                <header>
                    <div className="row justify-content-between no-horizontal-margin">
                        <div className="col-2">
                            <span className="logo-title"><img className="logo-image" src={logo} alt="logo" width="45px"/>CloudUp</span>
                        </div>
                        <div className="col-9 align-self-center text-right">
                            <p href="#" className="text-sub">Organize your Dropbox</p>
                        </div>
                        {isAuth ? 
                            <div className="col-1 align-self-center text-right">
                                <p class="text-button" type="button" onClick={this.logOut}>Logout</p>
                            </div>
                        : <Fragment/>}
                    </div>
                </header>
            </div>
        )
    }
}

export default withRouter(Header);
import React, {Component} from 'react';
import './login.css';

import HeroImage from '../../undraw_going_up_ttm5.svg'
import DropBoxLogo from '../../DropboxGlyph_Blue.svg'

class Login extends Component{

    signIn(){
        window.location.replace("https://www.dropbox.com/oauth2/authorize?response_type=code&client_id=t15yf3j1ns5uc50&redirect_uri="+encodeURI("http://localhost:3000/oauth"))
    }
    render(){
        return(
            <div className="container">
                <div className="row landing-div no-horizontal-margin">
                    <div className="col-md-6 col-sm-12 landing-center-div left-align">
                        <div>
                            <h1 className="banner-title">Dropbox<br/>made<br/>easy.</h1>
                            <p className="banner-sub">Organize your files in Dropbox with ease.<br/>All you got to do is drop and rest is ours to worry!
                            </p>
                            <div type="button" className="dropbox-button" onClick={this.signIn}>
                                <div id="logo"><img src={DropBoxLogo} alt="DropBox made easy" width="55px"/></div>
                                <div id="sub-text">Sign in to</div>
                                <div id="main-text">Dropbox</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 landing-center-div" onClick={this.signIn}>
                        <img className="logo-image" src={HeroImage} alt="DropBox made easy" width="600px"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
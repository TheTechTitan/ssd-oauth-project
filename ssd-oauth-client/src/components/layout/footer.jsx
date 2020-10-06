import React, {Component} from 'react';
import './layout.css';

class Footer extends Component{
    render(){
        return(
            <div className="footer">
                <div className="row justify-content-between no-horizontal-margin">
                    <p className="footer-text">Sri Lanka Institute of Information Technology | SSD Project | Year 4 | SE</p>
                </div>
            </div>
        )
    }
}

export default Footer;
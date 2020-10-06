import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom'

class Authorization extends Component{
    constructor(props){
        super(props);
        this.state={
            loading : true,
            error : false,
            message : ""
        }
    }
    async componentDidMount(){
        let queryString = new URLSearchParams(window.location.search);
        let bodyObject = {
            code : queryString.get('code')
        }

        console.log(queryString.get('code'));

        // Call api
        const response = await fetch("/api/getToken", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyObject)
        }).then(response => response.json())
        .then(data => {return data});

        if(response.error){
            this.setState({
                loading : false,
                error : true,
                message : response.response
            })
        } else {
            localStorage.setItem("token", JSON.stringify(response.response));
            this.props.authenticateUser(response.response)
            this.setState({
                loading : false,
                error : false
            })
            this.props.history.push('/');
        }
    }

    render(){
        let {loading, error, message} = this.state;
        return(
            <div className="landing-center-div">
                {!loading?
                    error ? 
                    <div style={{display:"grid", justifyItems: "center"}}>
                        <h3>Authorization Unsuccessful.</h3>
                        <p style={{color:"grey"}}>{message}</p>
                        <Link to="/login">Go back to Login Page</Link>
                    </div>
                :
                    <div style={{display:"grid", justifyItems: "center"}}>
                        <h3>Redirecting to App</h3>
                        <p style={{color:"grey"}}>Please wait..</p>
                    </div>
                : 
                    <div style={{display:"grid", justifyItems: "center"}}>
                        <div>
                            <div style={{margin:"10px"}} class="spinner-grow  spinner-grow-sm" role="status"></div>
                            <div style={{margin:"10px"}} class="spinner-grow  spinner-grow-sm" role="status"></div>
                            <div style={{margin:"10px"}} class="spinner-grow  spinner-grow-sm" role="status"></div>
                            <div style={{margin:"10px"}} class="spinner-grow  spinner-grow-sm" role="status"></div>
                            <div style={{margin:"10px"}} class="spinner-grow  spinner-grow-sm" role="status"></div>
                            <div style={{margin:"10px"}} class="spinner-grow  spinner-grow-sm" role="status"></div>
                        </div>
                        <h3 style={{paddingTop:"20px"}}>Authorizing User</h3>
                        <p style={{color:"grey"}}>You will be redirected on success.</p>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(Authorization);
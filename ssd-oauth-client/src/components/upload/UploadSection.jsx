import React, {Component, Fragment} from 'react';
import Dropzone from 'react-dropzone';
import "./upload.css";

import UploadIcon from '../../upload.svg';

class UploadSection extends Component{

    constructor(props){
        super(props);
        this.state = {
            files : [],
            folderName : '',
            success : {alert:false},
            error : {alert:false},
            loading: false
        }
    }

    addFile = file => {
        console.log(file);
        // let filesArray = this.state.files.concat(file);
        this.setState({
          files: file
        });
      };

    handleChange = (event) => {
        this.setState({folderName: event.target.value});
    }

    async createFolder(token){
        const createFolderUrl = "https://api.dropboxapi.com/2/files/create_folder_v2"
        const response = await fetch(createFolderUrl, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json', 
                'Authorization' : 'Bearer ' + token.access_token
            },
            body: JSON.stringify({"path" : "/"+this.state.folderName, "autorename" : false})
        }).then(response => response.json)
        .then(data => {return data})
        .catch((error)=>{
            console.log(error)
        })

        return response;
    }

    async uploadFile(token,folderName,file, callback){
        console.log(file)
        const createFolderUrl = "https://content.dropboxapi.com/2/files/upload"
        const response = await fetch(createFolderUrl, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/octet-stream', 
                'Authorization' : 'Bearer ' + token.access_token,
                'Dropbox-API-Arg' : JSON.stringify({path: "/" + folderName +"/" + file.name,mode: "add", autorename: true, mute: false})
            },
            body: file
        }).then(response => response.json)
        .then(data => {callback(null, data)})
        .catch((error)=>{
            callback(error, null)
        })

    }

    createAndUpload = async () => {
        const token = localStorage.getItem('token')
        this.setState({loading: true})
        var self = this;
        if(token && this.state.files.length > 0){
            let tokenJson = JSON.parse(token)
            // console.log(this.state.files)
            // const createFolderResponse = this.createFolder(tokenJson)
            this.uploadFile(tokenJson, this.state.folderName, this.state.files[0], function(error, success){
                if(success){
                    self.setState(
                        {
                            success : {alert: true, fileName : self.state.files[0].name, folderName : self.state.folderName},
                            files : [],
                            folderName : "",
                            loading: false
                        })
        
                    setTimeout(function () {
                        self.setState({success : {alert:false}})
                    }, 5000);

                } else {
                    self.setState(
                        {
                            error : {alert: true, message: "Error while trying to Upload "+ self.state.files[0].name + " to " + self.state.folderName},
                            files : [],
                            folderName : "",
                            loading: false
                        })
        
                    setTimeout(function () {
                        self.setState({error : {alert:false}})
                    }, 5000);
                }
            })
            // console.log(createFolderResponse)
        } else {
            let errorMessage = ""
            if(!token){
                errorMessage = "Invalid access token. Please logout and login again"
            } else {
                errorMessage = "No files detected for upload."
            }
            self.setState(
                {
                    error : {alert: true, message: errorMessage},
                    loading: false
                })

            setTimeout(function () {
                self.setState({error : {alert:false}})
            }, 5000);
        }
    }

    render(){
        const {files, folderName, success, error, loading} = this.state;
        return(
            <div className="container upload-center">
                <h3 style={{paddingBottom: "50px"}}><span style={{color:"#0061ff"}}>Dropbox</span> Upload Center</h3>
                {success.alert ? 
                <div class="alert alert-success" role="alert">
                    Successfully Uploaded {success.fileName} to {success.folderName}.
                </div>
                : error.alert ? 
                <div class="alert alert-danger" role="alert">
                    {error.message}
                </div>
                : <Fragment/>
                }
                <div className="row">
                    <div className="col-md-6">
                        <p style={{fontSize: "20px"}}>Simply name a folder and upload files to proceed.</p>
                        <div class="form-group">
                            <label style={{color: "grey"}} for="exampleFormControlInput1">Folder Name</label>
                            <input value={folderName} onChange={this.handleChange} class="form-control form-control-lg" type="text" placeholder="e.g : folder/subfolder"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div class="drop-zone">
                        <Dropzone onDrop={acceptedFiles => this.addFile(acceptedFiles)}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                            <div class="drop-zone-area" {...getRootProps()}>
                                <input {...getInputProps()} />
                                <img src={UploadIcon} width="40px"/>
                                <p style={{paddingTop:"10px"}}>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                            </section>
                        )}
                        </Dropzone>
                        </div>
                        <div style={{marginTop : "10px"}}>
                            {
                                files.map((file, index) => {
                                return <p key={index}><span className="file-name">{file.path}</span> added to upload.</p>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div style={{marginTop:"100px"}}>
                    <button disabled={!folderName || loading} type="button" className="btn btn-lg btn-primary" onClick={this.createAndUpload}>
                        {loading? <span style={{padding: "7px"}} class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <Fragment/>}
                        <span style={{paddingLeft: "10px"}}>Create &amp; Upload</span>
                    </button>
                </div>
            </div>
        )
    }
}

export default UploadSection;
var express = require('express');
const axios = require('axios');
let config = require('../config.json');
var router = express.Router();

router.post('/getToken', function(req, res){
    console.log("Requesting Token from Dropbox")
    var reqData = "grant_type=authorization_code&redirect_uri="+ config.redirect_uri +
        "&client_id="+ config.client_id +
        "&client_secret="+config.client_secret +
        "&code="+req.body.code;
    getTokenFromDropbox(reqData, function(error, result){
        if(result){
            res.send(result)
        } else {
            res.send(error)
        }
    })
});

async function getTokenFromDropbox(reqData, callback){
    try{
        const result = await axios({
            method: 'post',
            url: 'https://api.dropboxapi.com/oauth2/token',
            data: (reqData),   
            headers: { 
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
            }
        })
        callback(null, {error:false, response: result.data})
    } catch(error){
        console.log(error.response.data)
        callback({error:true, response:error.response.data.error_description}, null)
    }
}

module.exports = router;
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const AWS = require('aws-sdk');
const request = require('request');
const {generateErrorJSON, generateSuccessJSON} = require('../shared/common');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
const poolData = {
    UserPoolId: process.env.userPoolId,
    ClientId: process.env.clientID
};
const pool_region = 'us-west-2';

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

var userData = {
    Username : 'test@gmail.com',
    Pool : userPool
};
var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
exports.RegisterUser=(body, done) =>{
    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"gender",Value:body.gender}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"birthdate",Value:body.birthdate}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"address",Value:body.address}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:body.email}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"phone_number",Value:body.phone_number}));
    // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"family name",Value:"aaa Jayashanka"}));
    // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"given name",Value:"pj"}));
    // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"locale",Value:"1991-06-21"}));
     attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"middle_name",Value:body.middle_name}));
     attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name",Value:body.name}));
    //attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"updated at",Value:"2017-06-21"}));

    userPool.signUp(body.email, body.password, attributeList, null, function(err, result){
        if (err) {
            console.log(err);
            done(generateErrorJSON(err.message, err));
        }
        //cognitoUser = result.user;
        done(null,generateSuccessJSON(200, result));

        //console.log('user name is ' + cognitoUser.getUsername());
    });
}
exports.LoginUser=(body, done) =>{
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username : body.email,
        Password : body.password,
    });
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
            console.log('id token + ' + result.getIdToken().getJwtToken());
            console.log('refresh token + ' + result.getRefreshToken().getToken());
            done(null,generateSuccessJSON(200, result));
        },
        onFailure: function(err) {
            done(generateErrorJSON(err.message, err));
        },
    });
}

exports.confirmSignup=(id, done) =>{
    cognitoUser.confirmRegistration(id, true, function(err, result) {
        if (err) {
            done(generateErrorJSON(err.message, err));
        }
        done(null,generateSuccessJSON(200, result));
    });
}

exports.ValidateToken=(bodydata, done) =>{
    request({
        url: `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            pems = {};
            var keys = body['keys'];
            for(var i = 0; i < keys.length; i++) {
                //Convert each key to PEM
                var key_id = keys[i].kid;
                var modulus = keys[i].n;
                var exponent = keys[i].e;
                var key_type = keys[i].kty;
                var jwk = { kty: key_type, n: modulus, e: exponent};
                var pem = jwkToPem(jwk);
                pems[key_id] = pem;
            }
            let token = bodydata.jwtToken;
            //validate the token
            var decodedJwt = jwt.decode(token, {complete: true});
            if (!decodedJwt) {
                done(generateErrorJSON("Not a valid JWT token", 'err'));

                console.log("Not a valid JWT token");
                return;
            }

            var kid = decodedJwt.header.kid;
            var pem = pems[kid];
            if (!pem) {
                done(generateErrorJSON('Invalid token', 'err'));
            }

            jwt.verify(token, pem, function(err, payload) {
                if(err) {
                    done(generateErrorJSON(err.message, err));
                } else {
                    done(null,generateSuccessJSON(200, payload));
                    console.log("Valid Token.");
                    console.log(payload);
                }
            });
        } else {
            console.log("Error! Unable to download JWKs");
        }
    });
}

exports.authenticateUser=(id, done) =>{
    var authenticationData = {
        Username : 'test@gmail.com',
        Password : 'SamplePassword@123'
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            var accessToken = result.getAccessToken().getJwtToken();

            AWS.config.region = 'us-east-1';

            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId : '', // your identity pool id here
                Logins : {
                    'cognito-idp.us-east-1.amazonaws.com/us-west-2_9jXU9UbYR' : result.getIdToken().getJwtToken()
                }
            });

            AWS.config.credentials.refresh((err,result) => {
                if (err) {
                    done(generateErrorJSON(err.message, err));
                } else {
                    done(null,generateSuccessJSON(200, result));
                }
            });
        },
        onFailure: function(err) {
            done(generateErrorJSON(err.message, err));
        }
    });
}


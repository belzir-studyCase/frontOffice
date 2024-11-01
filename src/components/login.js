import axios from "axios";
import GoogleLogin from "react-google-login";
import { gapi } from 'gapi-script';
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
const clientId = "27111715816-0c4sv24r2uublsg9m5irehg31jme95dm.apps.googleusercontent.com";

function Login() {

    const navigate = useNavigate();
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            }).then(() => {
                console.log("GAPI client initialized");
            }).catch((error) => {
                console.error("Error initializing GAPI client", error);
            });
        };

        if (gapi) {
            gapi.load('client:auth2', start);
        } else {
            console.error("GAPI script not loaded");
        }
    });
    const onSuccess = (req) => {
        console.log(req.profileObj);
        const userData = {
            googleId: req.profileObj.googleId,
            imageUrl: req.profileObj.imageUrl,
            email: req.profileObj.email,
            name: req.profileObj.name,
            givenName: req.profileObj.givenName,
            familyName: req.profileObj.familyName
        };

        // Change axios request to POST and send userData in the body
        axios.post('http://localhost:3000/account/login', userData)
            .then(response => {
                console.log("Login successful:", response.data);
                localStorage.setItem('user', JSON.stringify(userData));
                navigate('/requests');
            })
            .catch(error => {
                console.error("Error fetching login data:", error);
            });
    };

    const onFailure = () => {
        console.log("Login Failed");
    };

    return (
        <div id="signInButton">
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy="single_host_origin"
                isSignedIn={true}
            />
        </div>
    );
}

export default Login;

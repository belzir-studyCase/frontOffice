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
            familyName: req.profileObj.familyName,
        };

        // Change axios request to POST and send userData in the body
        axios.post('http://localhost:3000/account/login', userData)
            .then(response => {
               
                localStorage.setItem('user', JSON.stringify(userData));
                if (response.data.role === "Admin") {
                    navigate('/all/requests');
                } else {
                    navigate('/requests');
                }

            })
            .catch(error => {
                console.error("Error fetching login data:", error);
            });
    };

    const onFailure = () => {
        console.log("Login Failed");
    };

    return (
        <div id="signInButton"><center>
            <h3> Hello Again .</h3>
            <GoogleLogin
                clientId={clientId}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy="single_host_origin"
                isSignedIn={true}
                render={(props) => (
                    <button
                        onClick={props.onClick}
                        disabled={props.disabled}
                        style={{
                            backgroundColor: "#4285F4",
                            color: "#fff",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "4px",
                            fontSize: "16px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                        }}
                    >

                        Login with Google
                    </button>)} />
                </center>
        </div>
    );
}

export default Login;

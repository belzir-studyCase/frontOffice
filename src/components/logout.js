import axios from "axios";
import { GoogleLogout } from "react-google-login"
import { useNavigate } from "react-router-dom";


const clientId = "27111715816-0c4sv24r2uublsg9m5irehg31jme95dm.apps.googleusercontent.com"


function Logout() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; 

    const navigate = useNavigate();
    const onSuccess = async() => {
        console.log("Log out Success !");
        const user = JSON.parse(localStorage.getItem("user"));
        await axios.post(`https://localhost:3000/notification/closesession/${user.email}`);

        navigate('/login')
    }
    return (
        <div id ="signoutButton">
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}/>
        </div>
    )
}

export default Logout ; 
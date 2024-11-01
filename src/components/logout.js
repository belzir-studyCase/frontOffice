import { GoogleLogout } from "react-google-login"
import { useNavigate } from "react-router-dom";


const clientId = "27111715816-0c4sv24r2uublsg9m5irehg31jme95dm.apps.googleusercontent.com"


function Logout() {
    const navigate = useNavigate();
    const onSuccess = () => {
        console.log("Log out Success !");
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
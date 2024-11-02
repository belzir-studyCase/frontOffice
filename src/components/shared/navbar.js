import React from 'react'
import Logout from '../logout'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate();

    const GoToRequest = () => {
        navigate("/all/requests")
    }
    const GoToUsers = () => {
        navigate("/all/users")
    }
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="#" onClick={GoToUsers}>Users</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="#" onClick={GoToRequest}>Requests</a>
                        </li>
                    </ul>
                    <span className="navbar-text me-3">
                        {user.email}
                    </span>
                    <Logout />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
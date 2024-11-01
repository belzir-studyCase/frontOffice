import React, { useEffect, useState } from 'react'
import Logout from './logout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RequestListe() {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const GotoCreate = () =>{
        navigate("/requests/create")
    }
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')); // Get user data from localStorage
        if (user && user.email) {
            // Fetch requests associated with the user's email
            axios.get(`http://localhost:3000/request/user/${user.email}`)
                .then(response => {
                    setRequests(response.data); // Set the fetched requests to state
                })
                .catch(err => {
                    console.error("Error fetching requests:", err);
                    setError("Failed to fetch requests."); // Handle error
                });
        } else {
            setError("User not logged in."); // Handle case where user data is not available
        }
    }, []); // Run this effect only once on component mount
    const handleUpdate = (id) => {
        navigate(`/requests/${id}`); // Redirect to UpdateRequest component with request ID
    };

    return (
        <>
            <Logout />
            <div>
                <h2>Request List</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if any */}
                <ul>
                    {requests.map(request => (
                          <li key={request._id} onClick={() => handleUpdate(request._id)} style={{ cursor: 'pointer' }}>
                            <strong>Title:</strong> {request.title}<br />
                            <strong>Description:</strong> {request.description}<br />
                            <strong>Status :</strong> {request.stats}
                        </li>
                    ))}
                </ul>
                <button onClick={GotoCreate}> Craete new Request </button>
            </div>
        </>
    );
}

export default RequestListe
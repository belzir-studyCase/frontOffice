import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Logout from './logout';
import axios from 'axios';

function AllRequests() {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const GotoCreate = () => {
        navigate("/requests/create")
    }
    const updateStateRequest = async (id, stats) => {
        try {
            const response = await axios.put(`http://localhost:3000/request/update-status/${id}`, { stats });
            console.log("Request status updated:", response.data);
        } catch (err) {
            console.error("Error updating request status:", err);
            setError('Failed to update request status.');
        }
    };
    
    useEffect(() => {

        axios.get(`http://localhost:3000/request`)
            .then(response => {
                setRequests(response.data); // Set the fetched requests to state
            })
            .catch(err => {
                console.error("Error fetching requests:", err);
                setError("Failed to fetch requests."); 
            });

    }, []); 
    const handleUpdate = (id) => {
        navigate(`/requests/${id}`); // Redirect to UpdateRequest component with request ID
    };

    return (
        <div>
            <Logout />
            <div>
                <h2>Request List</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if any */}
                <ul>
                    {requests.map(request => (
                        <li key={request._id}  style={{ cursor: 'pointer' }}>
                            <strong>Title:</strong> <a onClick={() => handleUpdate(request._id)}>{request.title}</a><br />
                            <strong>Description:</strong> {request.description}<br />
                            <strong>Status:</strong> {request.stats}<br />
                            <strong>Email :</strong> {request.email}
                            {request.stats === "Pending" && (
                                <>
                                    <button onClick={() => updateStateRequest(request._id , "Accept")}>Accept</button>
                                    <button onClick={() => updateStateRequest(request._id , "Reject")}>Reject</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div></div>
    )
}

export default AllRequests
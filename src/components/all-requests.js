import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Logout from './logout';
import axios from 'axios';
import Navbar from './shared/navbar';

function AllRequests() {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);
    const [reloadData, setRelaod] = useState(false);
    const updateStateRequest = async (id, stats) => {
        try {
            // https://gateway-9pxx.onrender.com
            const response = await axios.put(`https://gateway-9pxx.onrender.com/request/update-status/${id}`, { stats });
            
            console.log("Request status updated:", response.data);
            setRelaod(!reloadData)
        } catch (err) {
            console.error("Error updating request status:", err);
            setError('Failed to update request status.');
        }
    };

    useEffect(() => {

        axios.get(`https://gateway-9pxx.onrender.com/request`)
            .then(response => {
                setRequests(response.data); // Set the fetched requests to state
            })
            .catch(err => {
                console.error("Error fetching requests:", err);
                setError("Failed to fetch requests.");
            });

    }, [reloadData]);

    return (
        <div>
            <Navbar></Navbar>

            <div>
                <h2> <strong>Request List</strong></h2>
                {error &&
                    <div class="alert alert-danger" role="alert">
                        No Request Found !
                    </div>}

                <table class="table   table-striped">
                    <thead className='table-success'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">owner</th>
                            <th scope="col">Description</th>
                            <th scope="col">Request Date </th>
                            <th scope="col">State</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(request => (
                            <tr>
                                <th scope="row">{request._id}</th>
                                <td>{request.title}</td>
                                <td>{request.email}</td>
                                <td>{request.description}</td>
                                <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                                <td><span
                                    className={`badge ${request.stats === 'Accept' ? 'text-bg-success' :
                                            request.stats === 'Pending' ? 'text-bg-warning' :
                                                'text-bg-danger'
                                        }`}
                                >{request.stats}</span></td>
                                {request.stats === "Pending" ? (
                                    <td>
                                        <button className='btn btn-success btn-sm mx-2' onClick={() => updateStateRequest(request._id, "Accept")}>Accept</button>
                                        <button className='btn btn-danger btn-sm' onClick={() => updateStateRequest(request._id, "Reject")}>Reject</button>
                                    </td>
                                ) : (<td></td>)}
                            </tr>))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllRequests
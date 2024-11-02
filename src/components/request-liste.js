import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavbarClient from './shared/navbarClient';
import CreateRequestModal from './shared/createRequestModal';

function RequestListe() {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.email) {
            // Fetch requests associated with the user's email
            axios.get(`http://localhost:3000/request/user/${user.email}`)
                .then(response => {
                    setRequests(response.data);
                })
                .catch(err => {
                    console.error("Error fetching requests:", err);
                    setError("Failed to fetch requests.");
                });
        } else {
            setError("User not logged in.");
        }
    }, [refresh]);
    const handleUpdate = (id) => {
        navigate(`/requests/${id}`);
    };

    return (
        <>
            <NavbarClient></NavbarClient>
            <div>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-10'>   <h2> <strong>Request List</strong></h2> </div>
                        <div className='col-2'>  <button onClick={handleShow} className="btn btn-danger"> Create new Request </button></div>
                    </div>
                </div>
                {error &&
                    <div class="alert alert-danger" role="alert">
                        No Requests Found !
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
                            <tr key={request._id}>
                                <th
                                    scope="row"
                                    onClick={() => {
                                        if (request.stats === 'Pending') {
                                            handleUpdate(request._id);
                                        }
                                    }}
                                    style={{ cursor: request.stats === 'Pending' ? 'pointer' : 'not-allowed' }}
                                >
                                    {request._id}
                                </th>
                                <td>{request.title}</td>
                                <td>{request.email}</td>
                                <td>{request.description}</td>
                                <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <span
                                        className={`badge ${request.stats === 'Accept' ? 'text-bg-success' :
                                            request.stats === 'Pending' ? 'text-bg-warning' :
                                                'text-bg-danger'}`}
                                    >
                                        {request.stats}
                                    </span>
                                </td>
                                <td> <button className='btn btn-danger btn-sm' disabled={request.stats != 'Pending'}>Delete </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <CreateRequestModal show={showModal} onClose={handleClose} refresh={refresh} setRefresh={setRefresh} />

            </div>
        </>
    );
}

export default RequestListe
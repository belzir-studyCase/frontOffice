import React, { useEffect, useState } from 'react'
import Navbar from './shared/navbar'
import axios from 'axios';

function Notification() {
    const [error , setError] = useState()
    const [notifications , setNotifications] = useState([])
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; 

    useEffect(() => {
            // Fetch requests associated with the user's email
            axios.get(`https://localhost:3000/notification/all`)
                .then(response => {
                    console.log(response.data.notifications);
                    
                    setNotifications(response.data.notifications);
                })
                .catch(err => {
                    console.error("Error fetching requests:", err);
                    setError("Failed to fetch requests.");
                });
    }, []);
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
                            <th scope="col">owner</th>
                            <th scope="col">text</th>
                        </tr>
                    </thead>
                    <tbody>
                            {notifications?.map(notif => (
                                <tr>
                                    <th scope="row">{notif._id}</th>
                                    <td>{notif.owner}</td>
                                    <td>{notif.text}</td>
                                
                                </tr>))}

                    </tbody>
                </table>
            </div>
        </div>
  )
}

export default Notification
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from './shared/navbar';

function AllUsers() {
    //https://localhost:3000/account/all/users/
    const [users , setUser] = useState([]); 
    const [error , setError] = useState(null); 
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; 

    useEffect(() => {

        axios.get(`https://localhost:3000/account/all/users/`)
            .then(response => {
                setUser(response.data); 
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
        <h2> <strong>Users List</strong></h2>
        {error &&
        <div class="alert alert-danger" role="alert">
            No Request Found ! 
        </div>}

        <table class="table   table-striped">
            <thead className='table-success'>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">givenName</th>
                    <th scope="col">email</th>
                    <th scope="col">name</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr>
                        <th scope="row">{user._id}</th>
                        <td>{user.givenName}</td>
                        <td>{user.email}</td>
                        <td>{user.name}</td>
                    </tr>))}

            </tbody>
        </table>


    </div></div>
  )
}

export default AllUsers
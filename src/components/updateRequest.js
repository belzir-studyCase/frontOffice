import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateRequest() {
    const { id } = useParams(); // Get the request ID from the URL parameters
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the existing request details when the component mounts
        const fetchRequest = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/request/${id}`);
                const { title, description } = response.data;
                setTitle(title);
                setDescription(description);
            } catch (err) {
                console.error("Error fetching request:", err);
                setError('Failed to fetch request details.');
            }
        };

        fetchRequest();
    }, [id]); // Run this effect only once when id changes

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const user = JSON.parse(localStorage.getItem('user')); // Get user data from localStorage
        if (!user || !user.email) {
            setError('User is not logged in.');
            return;
        }

        const updatedRequestData = {
            title,
            description,
            userID: user.googleId, // Use the user's Google ID or any unique identifier
            email: user.email, // Include user's email for the request
        };

        try {
            const response = await axios.put(`http://localhost:3000/request/${id}`, updatedRequestData); // Update URL to your API endpoint
            setSuccess('Request updated successfully!');
            navigate('/requests'); // Redirect to the requests list after successful update
            console.log(response.data); // Optional: Log the response data
        } catch (error) {
            console.error("Error updating request:", error);
            setError('Failed to update request.');
        }
    };

    return (
        <div>
            <h2>Update Request</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Update Request</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            {success && <p style={{ color: 'green' }}>{success}</p>} {/* Display success message */}
        </div>
    );
}

export default UpdateRequest;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateRequest() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/request/${id}`);
                const { title, description, stats } = response.data;
                if (stats != 'Pending') {
                    navigate("/requests")
                } else {
                    setTitle(title);
                    setDescription(description);
                }

            } catch (err) {
                console.error("Error fetching request:", err);
                setError('Failed to fetch request details.');
            }
        };

        fetchRequest();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.email) {
            setError('User is not logged in.');
            return;
        }

        const updatedRequestData = {
            title,
            description,
            userID: user.googleId,
            email: user.email,
        };

        try {
            const response = await axios.put(`http://localhost:3000/request/${id}`, updatedRequestData);
            setSuccess('Request updated successfully!');
            navigate('/requests');
            console.log(response.data);
        } catch (error) {
            console.error("Error updating request:", error);
            setError('Failed to update request.');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Update Request</h2>
            <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea
                        id="description"
                        className="form-control"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Update Request</button>
            </form>

            {error && <p className="text-danger mt-3">{error}</p>}
            {success && <p className="text-success mt-3">{success}</p>}
        </div>
    );
}

export default UpdateRequest;

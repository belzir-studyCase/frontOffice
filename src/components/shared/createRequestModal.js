// CreateRequestModal.js
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CreateRequestModal({ show, onClose , refresh , setRefresh }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate(); 
    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem('user')); 
        if (!user || !user.email) {
            setError('User is not logged in.');
            return;
        }

        const requestData = {
            title,
            description,
            userID: user.googleId,
            email: user.email, 
        };

        try {
            const response = await axios.post('https://gateway-9pxx.onrender.com/request', requestData); // Update URL to your API endpoint
            setSuccess('Request created successfully!');
            setTitle(''); // Clear the title field
            setDescription(''); // Clear the description field
            console.log(response.data); // Optional: Log the response data
            setRefresh(!refresh)
            onClose(); 
        } catch (error) {
            console.error("Error creating request:", error);
            setError('Failed to create request.');
        }
    };
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Request</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <form onSubmit={handleSubmit} className="p-3">
    <div className="mb-3">
        <label htmlFor="title" className="form-label">Title:</label>
        <input
            type="text"
            className="form-control"
            id="title"
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
    
    <button type="submit" className="btn btn-primary">Create Request</button>
</form>

      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
    
      </Modal.Footer>
    </Modal>
  );
}

export default CreateRequestModal;

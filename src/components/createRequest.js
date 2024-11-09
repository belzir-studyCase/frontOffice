import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateRequest() {
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
            navigate("/requests");
        } catch (error) {
            console.error("Error creating request:", error);
            setError('Failed to create request.');
        }
    };

    return (
        
        <div>
            <h2>Create New Request</h2>
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
                <button type="submit">Create Request</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            {success && <p style={{ color: 'green' }}>{success}</p>} {/* Display success message */}
        </div>
    );
}

export default CreateRequest;
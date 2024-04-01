// FeedbackForm.js
import React, { useState } from 'react';
import styles from './FeedbackForm.module.css';
import { toast } from 'react-toastify';

function FeedbackForm() {
    const [feedbackType, setFeedbackType] = useState('');
    const [feedbackText, setFeedbackText] = useState('');

    const handleFeedbackTypeChange = (event) => {
        setFeedbackType(event.target.value);
    };

    const handleFeedbackTextChange = (event) => {
        setFeedbackText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // You can implement your feedback submission logic here
        console.log('Feedback Type:', feedbackType);
        console.log('Feedback Text:', feedbackText);
        // Show toast message
        toast.success('Feedback submitted successfully!');
        // Optionally, you can reset the form after submission
        setFeedbackType('');
        setFeedbackText('');
    };

    return (
        <div className={styles.container}>
            <h2>Feedback Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="feedbackType">Feedback Type:</label><br></br>
                <select id="feedbackType" name="feedbackType" value={feedbackType} onChange={handleFeedbackTypeChange} required>
                    <option value="" disabled hidden>Choose the type</option>
                    <option value="Bug">Bug</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Query">Query</option>
                </select>
                <br/><br/>
                <label htmlFor="feedbackText">Feedback:</label><br/>
                <textarea id="feedbackText" name="feedbackText" rows="4" cols="50" value={feedbackText} onChange={handleFeedbackTextChange} required></textarea>
                <br/><br/>
                <input type="submit" value="Submit" className={styles.submitButton} />
            </form>
        </div>
    );
}

export default FeedbackForm;

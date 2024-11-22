import React, { useState } from 'react';
import './Bottom.css';

function Bottom() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        try {
            const response = await fetch('http://localhost:3000/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            if (response.ok) {
                alert('Subscription successful! Check your email for a welcome message.');
                setEmail(''); // Clear the input field
            } else {
                alert('Subscription failed. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <form id='WebsitePage' onSubmit={handleSubscribe}>
            <div className='head'>
                <h1>SIGN UP FOR OUR DAILY INSIDER</h1>
                <input
                    type='email'
                    placeholder='Enter your Email here'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
            </div>
        </form>
    );
}

export default Bottom;

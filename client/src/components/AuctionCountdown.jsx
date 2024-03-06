import React, { useState, useEffect } from 'react';

const Countdown = ({ closingDate }) => {
    const [countdown, setCountdown] = useState('Calculating time...');

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            const closingDateObj = new Date(closingDate);
            const diff = closingDateObj - now;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            setCountdown(`Ends in ${days}d ${hours}h ${minutes}m ${seconds}s`);
        }, 1000);

        return () => clearInterval(intervalId); // Clean up on component unmount
    }, [closingDate]);

    return <>{countdown}</>;
};

export default Countdown;
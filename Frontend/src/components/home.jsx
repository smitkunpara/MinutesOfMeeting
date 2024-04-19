import React, { useState, useRef } from 'react';
import './home.css';
import 'react-toastify/dist/ReactToastify.css';
import UploadBox from './uploadbox';
import "./modal.scss";
const Home = () => {

    const [isOpen, setIsOpen] = useState(false);
    const handleDialogOpen = () => {
        setIsOpen(true);
    };
    return (
        <div className="container">
            <UploadBox isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <button onClick={handleDialogOpen}>Upload File</button>
        </div>
    );
};

export default Home;

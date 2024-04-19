import React, { useState, useRef } from 'react';
import axios from 'axios';
import logo from '../assets/logo.svg';
import './home.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Home = () => {
    const navigate = useNavigate(); // Initialize navigate function
    const [file, setFile] = useState(null);

    const fileInputRef = useRef();

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleFileDrop = (event) => {
        event.preventDefault();
        const selectedFile = event.dataTransfer.files[0];
        setFile(selectedFile);
    };

    const openFileDialog = () => {
        fileInputRef.current.click();
    };

    const handleFormSubmit = (event) => {
        console.log('submit');
        event.preventDefault();
        toast.promise(
            new Promise((resolve, reject) => {
                (async () => {
                    try {
                        const formData = new FormData();
                        formData.append('audio', file);
                        const responseID = {"ID": "1234"};
                        // const response = await axios.get('http://127.0.0.1:8000/transcript');
                        // const responseID = await axios.post('http://127.0.0.1:8000/upload', formData, {
                        //     headers: {
                        //         'Content-Type': 'multipart/form-data',
                        //     },
                        // });
                        navigate(`/transcript/`, { state: { file: URL.createObjectURL(file) } });
                        resolve();
                        // send audio and get responseID to transcript page
                    } catch (error) {
                        console.log(error);
                        reject();
                    }
                })();
            }),
            {
                pending: 'Uploading file...',
                success: 'File uploaded successfully!',
                error: 'Upload failed',
            },
            {
                position: "top-center",
                autoClose: 2000,
            }
        );
    };

    const handleClose = () => {
        setFile(null);
        fileInputRef.current.value = null;
    };

    return (
        <div className="container">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <h1>Upload Audio or Video File</h1>
            {!file && (
                <p className="instruction">Drag and drop MP3, M4A, WAV, or MP4 file here, or select files to upload.</p>
            )}
            <form id="UploadForm" onSubmit={handleFormSubmit} className="file-input">
                <div className="drop-area" onDrop={handleFileDrop} onDragOver={(e) => e.preventDefault()} onClick={openFileDialog}>
                    <input type="file" accept="audio/*,video/*" ref={fileInputRef} onChange={handleFileChange} />
                    {!file ? (
                        <p>Drag and drop MP3, M4A, WAV, or MP4 file here, or select files to upload.</p>
                    ) : <p onClick={handleClose} className="replace-file">Click here or drag and drop a new file to replace the current one.</p>
                    }
                </div>
                {file && (
                    <p onClick={handleClose} className="file-info">
                        {file.name}
                        <button className="close-button" onClick={handleClose}>X</button>
                    </p>
                )}
                {file && <button className='GreenButton' type="submit">Upload</button>}
            </form>
        </div>
    );
};

export default Home;

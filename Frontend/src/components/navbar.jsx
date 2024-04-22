import React, { useState } from 'react';
import './navbar.css';
import Logo from '../assets/logo2.png';
import UploadBox from './uploadbox';
// import Switch from 'react-input-switch';
const downloadFile = function (data, fileType, fileName = '') {
    const a = document.createElement('a');
    a.download = fileName;
    const mime_types = {
        'json': 'application/json',
        'csv': 'text/csv',
        'excel': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }
    a.href = `
        data:${mime_types[fileType]};charset=utf-8,${encodeURIComponent(data)}
    `;
    document.body.appendChild(a);
    a.click();
    a.remove();
}

const ExportasJSON = () => {
    let json_data = JSON.parse(localStorage.getItem('JSON_DATA'));
    json_data = json_data.map(item => ({
        speaker: item.speaker,
        text: item.text,
        start: item.start,
        end: item.end
    }));
    downloadFile(JSON.stringify(json_data), 'json', 'transcript.json');
}
const ExportasExcel = () => {
    let json_data = JSON.parse(localStorage.getItem('JSON_DATA'));
    json_data = json_data.map(item => ({
        speaker: item.speaker,
        text: item.text,
        start: item.start,
        end: item.end
    }));
    downloadFile(JSON.stringify(json_data), 'excel', 'transcript.xlsx');
}

const Navbar = ({ setNormalHighlight, setFollowHighligh }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [Normal, setNormal] = useState(false);
    const [Follow, setFollow] = useState(false);
    const handleDialogOpen = () => {
        setIsOpen(true);
    };
    const handleNormalHighlight = () => {
        setNormalHighlight(prevState => !prevState);
        setNormal(prevState => !prevState);
        setFollow(false);
        setFollowHighligh(false);
    };
    const handleFollowHighlight = () => {
        setFollowHighligh(prevState => !prevState);
        setFollow(prevState => !prevState);
        setNormal(false);
        setNormalHighlight(false);
    };
    
    return (
        <>
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src={Logo} alt="Logo" />
                </div>
                <div className="navbar-options">
                    <div className="navbar-option navbar-dropdown">
                        Text Highlight
                        <div className="navbar-dropdown-content">
                            <div onClick={handleNormalHighlight} className="dropdown-item">
                                Normal Highlight
                                {/* <Switch on={true} off={false} value={Normal}/> */}
                            </div>
                            <div onClick={handleFollowHighlight} className="dropdown-item">
                                Highlight & Follow
                                {/* <Switch on={true} off={false} value={Follow}/> */}
                            </div>
                        </div>
                    </div>
                    <div className="navbar-option navbar-dropdown">
                        Export File
                        <div className="navbar-dropdown-content">
                            {/* <div onClick={ExportasPDF} className="dropdown-item">Export as PDF</div> */}
                            <div onClick={ExportasJSON} className="dropdown-item">Export as JSON </div>
                            <div onClick={ExportasExcel} className="dropdown-item">Export as Excel</div>
                        </div>
                    </div>
                    <div className="navbar-option navbar-dropdown">
                        Upload
                        <div className="navbar-dropdown-content">
                            <div onClick={handleDialogOpen} className="dropdown-item">Upload new Audio File</div>
                            <UploadBox isOpen={isOpen} onClose={() => setIsOpen(false)} />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;

import React from 'react';
import './navbar.css'; // Import CSS file for styling
import Logo from '../assets/logo.png'; // Import logo image

const ExportasPDF = () => {
    // Function to export as PDF
}
const ExportasJSON = () => {
    // Function to export as JSON
}
const ExportasExcel = () => {
    // Function to export as Excel
}
const NormalHighlight = () => {
    // Function to highlight normal
}
const FollowHighligh = () => {
    // Function to highlight critical
}


const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src={Logo} alt="Logo" />
                </div>
                <div className="navbar-options">
                    <div className="navbar-option navbar-dropdown">
                        Export File
                        <div className="navbar-dropdown-content">
                            <div onClick={NormalHighlight} className="dropdown-item">Normal Highlight</div>
                            <div onClick={FollowHighligh} className="dropdown-item">Follow & Highlight</div>
                        </div>
                    </div>
                    <div className="navbar-option navbar-dropdown">
                        Export File
                        <div className="navbar-dropdown-content">
                            <div onClick={ExportasPDF} className="dropdown-item">Export as PDF</div>
                            <div onClick={ExportasJSON} className="dropdown-item">Export as JSON</div>
                            <div onClick={ExportasExcel} className="dropdown-item">Export as Excel</div>
                        </div>
                    </div>
                    <div className="navbar-option navbar-dropdown">
                        Upload
                        <div className="navbar-dropdown-content">
                            <div onClick={ExportasPDF} className="dropdown-item">Upload new Audio File</div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;

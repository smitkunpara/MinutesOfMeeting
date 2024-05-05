import React, { useState } from 'react';
import './navbar.css';
import Logo from '../assets/logo2.png';
import UploadBox from './uploadbox';

import Switch from '@mui/material/Switch';
import { Link } from 'react-router-dom';

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
        console.log(Normal);
    };
    const handleFollowHighlight = () => {
        setFollowHighligh(prevState => !prevState);
        setFollow(prevState => !prevState);
        setNormal(false);
        setNormalHighlight(false);
        console.log(Follow);
    };


    return (
        <>
            <nav className="navbar px-4">
                <Link to="/" className="navbar-logo flex items-center font-medium ">
                    <div className="navbar-logo flex items-center font-medium ">
                        <img className="logo" src={Logo} alt="Logo" />
                        <span className="logo-text mx-3 text-4xl font-bold">MOM.AI</span>
                    </div>
                </Link>
                <div className="navbar-options">
                    <div className="navbar-option navbar-dropdown">
                        <a
                            className="cursor-pointer appearance-none transition group inline-grid grid-flow-col p-3 justify-center items-center rounded-full  font-medium hover:bg-white text-neutral-1000  xl:gap-2">
                            Highlight
                            <svg strokeWidth="0" viewBox="0 0 448 512"
                                className="h-3 w-3 m-1 lg:m-0 text-neutral-500 transition group-hover:text-inherit" height="1em"
                                width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z">
                                </path>
                            </svg>
                        </a>
                        <div className="navbar-dropdown-content">
                            <div className="top-full -mt-4 pt-4 lg:-ml-12 lg:mr-6" bis_skin_checked="1">
                                <ul className="w-full" id="headlessui-menu-items-:Rjioom:" role="menu" tabIndex="0"
                                    data-headlessui-state="">
                                    <div className="rounded-2xl bg-white shadow-2xl lg:max-w-screen-xl" bis_skin_checked="1">
                                        <div className="p-2" bis_skin_checked="1">
                                            <div className="grid max-w-3xl  gap-2 rounded-xl bg-[#f7f7f8] p-4"
                                                bis_skin_checked="1">
                                                <a onClick={handleNormalHighlight}
                                                    className="appearance-none transition group grid-row-col grid gap-2 rounded-lg p-3 bg-[#f7f7f8] hover:bg-white md:gap-4 md:p-6">
                                                    <div className="grid grid-flow-col content-start items-center justify-start justify-items-start gap-3"
                                                        bis_skin_checked="1">
                                                        <div className="h-8 w-8" bis_skin_checked="1">
                                                            <img alt="Property 1=Blog.svg"
                                                                src="https://cdn-site-assets.veed.io/cdn-cgi/image/width=96,quality=75,format=auto/Property_1_Blog_9221a1ffab/Property_1_Blog_9221a1ffab.svg"
                                                                width="48" height="48" decoding="async" data-nimg="1"
                                                                loading="lazy" />
                                                        </div>
                                                        <h2 className="font-medium leading-tight tracking-tight">Normal Highlight
                                                        </h2>
                                                        <Switch checked={Normal} />
                                                    </div>
                                                </a>
                                                <a onClick={handleFollowHighlight}
                                                    className="appearance-none transition group grid-row-col grid gap-2 rounded-lg p-3 bg-[#f7f7f8] hover:bg-white md:gap-4 md:p-6">
                                                    <div className="grid grid-flow-col content-start items-center justify-start justify-items-start gap-3"
                                                        bis_skin_checked="1">
                                                        <div className="h-8 w-8" bis_skin_checked="1">
                                                            <img alt="Property 1=Blog.svg"
                                                                src="https://cdn-site-assets.veed.io/cdn-cgi/image/width=96,quality=75,format=auto/Articles_8171b5cd3a/Articles_8171b5cd3a.svg"
                                                                width="48" height="48" decoding="async" data-nimg="1"
                                                                loading="lazy" />
                                                        </div>
                                                        <h2 className="font-medium leading-tight tracking-tight">Highlight & Follow
                                                        </h2>
                                                        <Switch checked={Follow} />
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="navbar-option navbar-dropdown">
                        <a
                            className="cursor-pointer appearance-none transition group inline-grid grid-flow-col p-3 justify-center items-center rounded-full  font-medium hover:bg-white text-neutral-1000  xl:gap-2">
                            Export File
                            <svg strokeWidth="0" viewBox="0 0 448 512"
                                className="h-3 w-3 m-1 lg:m-0 text-neutral-500 transition group-hover:text-inherit" height="1em"
                                width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z">
                                </path>
                            </svg>
                        </a>
                        <div className="navbar-dropdown-content">
                            <div className="top-full -mt-4 pt-4 lg:-ml-12 lg:mr-6" bis_skin_checked="1">
                                <ul className="w-full" id="headlessui-menu-items-:Rjioom:" role="menu" tabIndex="0"
                                    data-headlessui-state="">
                                    <div className="rounded-2xl bg-white shadow-2xl lg:max-w-screen-xl" bis_skin_checked="1">
                                        <div className="p-2" bis_skin_checked="1">
                                            <div className="grid max-w-3xl  gap-2 rounded-xl bg-[#f7f7f8] p-4" bis_skin_checked="1">
                                                <a onClick={ExportasJSON}
                                                    className="appearance-none transition group grid-row-col grid gap-2 rounded-lg p-3 bg-[#f7f7f8] hover:bg-white md:gap-4 md:p-6">
                                                    <div className="grid grid-flow-col content-start items-center justify-start justify-items-start gap-3"
                                                        bis_skin_checked="1">
                                                        <div className="h-8 w-8" bis_skin_checked="1">
                                                            <img alt="Property 1=Blog.svg"
                                                                src="https://cdn-site-assets.veed.io/cdn-cgi/image/width=96,quality=75,format=auto/Property_1_Blog_9221a1ffab/Property_1_Blog_9221a1ffab.svg"
                                                                width="48" height="48" decoding="async" data-nimg="1"
                                                                loading="lazy" />
                                                        </div>
                                                        <h2 className="font-medium leading-tight tracking-tight">Export as JSON
                                                        </h2>
                                                    </div>
                                                </a>
                                                <a onClick={ExportasExcel}
                                                    className="appearance-none transition w-auto group grid-row-col grid gap-2 rounded-lg p-3 bg-[#f7f7f8] hover:bg-white md:gap-4 md:p-6">

                                                    <div className="grid grid-flow-col w-auto content-start items-center justify-start justify-items-start gap-3"
                                                        bis_skin_checked="1">
                                                        <div className="h-8 w-8" bis_skin_checked="1">
                                                            <img alt="Property 1=Blog.svg"
                                                                src="https://cdn-site-assets.veed.io/cdn-cgi/image/width=96,quality=75,format=auto/Property_1_Blog_9221a1ffab/Property_1_Blog_9221a1ffab.svg"
                                                                width="48" height="48" decoding="async" data-nimg="1"
                                                                loading="lazy" />
                                                        </div>
                                                        <h2 className="font-medium leading-tight tracking-tight text-2">Export as Excel
                                                        </h2>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                            {/* <div onClick={ExportasPDF} className="dropdown-item">Export as PDF</div>
                <div onClick={ExportasJSON} className="dropdown-item">Export as JSON </div>
                <div onClick={ExportasExcel} className="dropdown-item">Export as Excel</div> */}
                        </div>
                    </div>
                </div>
                <UploadBox isOpen={isOpen} onClose={() => setIsOpen(false)} />
                <button onClick={handleDialogOpen}
                    className="flex text-white items-center justify-center bg-blue-500 border-0 py-4 px-8 mr-6 focus:outline-none hover:bg-blue-600 rounded-full">
                    Upload
                    <div className="shadow-neutral-1000/25 -mr-[15px] grid items-center justify-center rounded-full p-1 mx-3 shadow-xl bg-white text-blue-600  rtl:-scale-x-100"
                        bis_skin_checked="1">
                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round"
                            strokeLinejoin="round" className="h-[18px] w-[18px]" height="1em" width="1em"
                            xmlns="http://www.w3.org/2000/svg">
                            <polyline points="16 16 12 12 8 16"></polyline>
                            <line x1="12" y1="12" x2="12" y2="21"></line>
                            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                            <polyline points="16 16 12 12 8 16"></polyline>
                        </svg>
                    </div>
                </button>
            </nav>
        </>
    );
};

export default Navbar;

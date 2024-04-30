import React, { useState } from 'react';
import './navbar.css';
import Logo from '../assets/logo2.png';
import UploadBox from './uploadbox';
import Switch from '@mui/material/Switch';

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
                <div className="navbar-logo flex items-center font-medium">
                    <img src={Logo} alt="Logo" />
                    <span className="ml-3 text-2xl">MoM AI</span>
                </div>
                <div className="navbar-options">
                    <div className="navbar-option navbar-dropdown">
                        Text Highlight
                        <div className="navbar-dropdown-content">
                            <div className="top-full -mt-4 pt-4 lg:-ml-12 lg:mr-6" bis_skin_checked="1" >
                                <ul className="w-full" id="headlessui-menu-items-:Rjioom:" role="menu" tabindex="0" data-headlessui-state="">
                                    <div className="rounded-2xl bg-white shadow-2xl lg:max-w-screen-xl" bis_skin_checked="1">
                                        <div className="p-2" bis_skin_checked="1"><div className="grid max-w-3xl  gap-2 rounded-xl bg-neutral-50 p-4" bis_skin_checked="1">
                                            <a onClick={handleNormalHighlight} className="appearance-none transition group grid-row-col grid gap-2 rounded-lg p-3 bg-neutral-50 hover:bg-white md:gap-4 md:p-6">
                                                <div className="grid grid-flow-col content-start items-center justify-start justify-items-start gap-3" bis_skin_checked="1">
                                                    <div className="h-12 w-12" bis_skin_checked="1">
                                                        <img alt="Property 1=Blog.svg" src="https://cdn-site-assets.veed.io/cdn-cgi/image/width=96,quality=75,format=auto/Property_1_Blog_9221a1ffab/Property_1_Blog_9221a1ffab.svg" width="48" height="48" decoding="async" data-nimg="1" loading="lazy" />
                                                    </div>
                                                    <h2 className="font-medium leading-tight tracking-tight">Normal Highlight</h2>
                                                    <Switch on={true} off={false} value={Normal} />
                                                </div>
                                            </a>
                                            <a onClick={handleFollowHighlight} className="appearance-none transition group grid-row-col grid gap-2 rounded-lg p-3 bg-neutral-50 hover:bg-white md:gap-4 md:p-6" >
                                                <div className="grid grid-flow-col content-start items-center justify-start justify-items-start gap-3" bis_skin_checked="1">
                                                    <div className="h-12 w-12" bis_skin_checked="1">
                                                        <img alt="Property 1=Blog.svg" src="https://cdn-site-assets.veed.io/cdn-cgi/image/width=96,quality=75,format=auto/Articles_8171b5cd3a/Articles_8171b5cd3a.svg" width="48" height="48" decoding="async" data-nimg="1" loading="lazy" />
                                                    </div>
                                                    <h2 className="font-medium leading-tight tracking-tight">Highlight & Follow</h2>
                                                    <Switch on={true} off={false} value={Follow} />
                                                </div>
                                            </a>
                                        </div>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                            {/* <div onClick={handleNormalHighlight} className="dropdown-item">
                                <span>Normal Highlight</span>
                                <Switch on={true} off={false} value={Normal}/>
                            </div>
                            <div onClick={handleFollowHighlight} className="dropdown-item">
                                Highlight & Follow
                                <Switch on={true} off={false} value={Follow}/>
                            </div> */}
                        </div>
                    </div>
                    <div className="navbar-option navbar-dropdown">
                        Export File
                        <div className="navbar-dropdown-content">
                            <div className="top-full -mt-4 pt-4 lg:-ml-12 lg:mr-6" bis_skin_checked="1" >
                                <ul className="w-full" id="headlessui-menu-items-:Rjioom:" role="menu" tabindex="0" data-headlessui-state="">
                                    <div className="rounded-2xl bg-white shadow-2xl lg:max-w-screen-xl" bis_skin_checked="1">
                                        <div className="p-2" bis_skin_checked="1"><div className="grid max-w-3xl  gap-2 rounded-xl bg-black-10 p-4" bis_skin_checked="1">
                                            <a onClick={ExportasJSON} className="transition group grid-row-col grid gap-2 rounded-lg p-3 hover:bg-black hover:text-white md:gap-4 md:p-6" >
                                                <div className="grid grid-flow-col content-start items-center justify-start justify-items-start gap-3" bis_skin_checked="1">
                                                    <div className="h-12 w-12" bis_skin_checked="1">
                                                        <img alt="Property 1=Blog.svg" src="https://cdn-site-assets.veed.io/cdn-cgi/image/width=96,quality=75,format=auto/Property_1_Blog_9221a1ffab/Property_1_Blog_9221a1ffab.svg" width="48" height="48" decoding="async" data-nimg="1" loading="lazy" />
                                                    </div>
                                                    <h2 className="font-medium leading-tight tracking-tight">Export as JSON </h2>
                                                </div>
                                            </a>
                                            <a onClick={ExportasExcel} className="appearance-none transition group grid-row-col grid gap-2 rounded-lg p-3 hover:bg-black hover:text-white md:gap-4 md:p-6" href="/blog">
                                                <div className="grid grid-flow-col content-start items-center justify-start justify-items-start gap-3" bis_skin_checked="1">
                                                    <div className="h-12 w-12" bis_skin_checked="1">
                                                        <img alt="Property 1=Blog.svg" src="https://cdn-site-assets.veed.io/cdn-cgi/image/width=96,quality=75,format=auto/Property_1_Blog_9221a1ffab/Property_1_Blog_9221a1ffab.svg" width="48" height="48" decoding="async" data-nimg="1" loading="lazy" />
                                                    </div>
                                                    <h2 className="font-medium leading-tight tracking-tight">Export as Excel</h2>
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
                    <div className="navbar-option navbar-dropdown">
                        Upload
                        <div className="navbar-dropdown-content">
                            <div className="top-full -mt-4 pt-4 lg:-ml-12 lg:mr-6" bis_skin_checked="1" >
                                <ul className="w-full" id="headlessui-menu-items-:Rjioom:" role="menu" tabindex="0" data-headlessui-state="">
                                    <div className="rounded-2xl bg-white shadow-2xl lg:max-w-screen-xl" bis_skin_checked="1">
                                        <div className="p-2" bis_skin_checked="1">
                                            <div className="grid max-w-3xl  gap-2 rounded-xl bg-black-10 p-4" bis_skin_checked="1">
                                                <a onClick={handleDialogOpen} className="transition group grid-row-col grid gap-2 rounded-lg p-3 hover:bg-black hover:text-white md:gap-4 md:p-6" >
                                                    <div className="grid grid-flow-col content-start items-center justify-start justify-items-start gap-3" bis_skin_checked="1">
                                                        <div className="h-12 w-12" bis_skin_checked="1">
                                                            <img alt="Property 1=Blog.svg" src="https://cdn-site-assets.veed.io/cdn-cgi/image/width=96,quality=75,format=auto/Property_1_Blog_9221a1ffab/Property_1_Blog_9221a1ffab.svg" width="48" height="48" decoding="async" data-nimg="1" loading="lazy" />
                                                        </div>
                                                        <h2 className="font-medium leading-tight tracking-tight">Upload new Audio File</h2>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                            <UploadBox isOpen={isOpen} onClose={() => setIsOpen(false)} />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;

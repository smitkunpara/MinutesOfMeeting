import React, { useState, useEffect } from 'react';
import './home.css';
import Logo from '../assets/logo2.png';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Login from './login';
import SideBar from './sidebar';
import axios from 'axios';
import { WarningNotification, ErrorNotification, SuccessNotification } from './notification';
import Switch from '@mui/material/Switch';
import {Link} from 'react-router-dom';


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


const Navbar1 = ({ onPage, setNormalHighlight, setFollowHighligh }) => {

    const [meetings, setMeetings] = useState([]);
    let token = localStorage.getItem('token');
    let email = localStorage.getItem('email');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOpenSideBar, setIsOpenSideBar] = useState(false);
    const [Normal, setNormal] = useState(false);
    const [Follow, setFollow] = useState(false);

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


    useEffect(() => {
        if (token) {
            axios.get('http://127.0.0.1:8000/get_meetings', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                console.log(res.data);
                setMeetings(res.data);
                setIsLoggedIn(true);
                localStorage.setItem('isLoggedIn', true);
                console.log(token);
            }).catch((err) => {
                WarningNotification("You have been logged out !!")
                console.log(token);
                localStorage.removeItem('token');
                localStorage.removeItem('email');
                localStorage.removeItem('isLoggedIn');
                setIsLoggedIn(false);
            });
        }
    }, [isLoggedIn]);

    const navigate = useNavigate();
    const Logout = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('JSON_DATA');
        setIsLoggedIn(false);
        try {
            const response = await axios.get('http://127.0.0.1:8000/logout', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            navigate('/');
            SuccessNotification("Logged Out Successfully !!");
        }
        catch (error) {
            console.log(error);
            ErrorNotification("Error Logging Out !!");
        }


    };



    const OpenSideBarSetter = () => {
        setIsOpenSideBar(!isOpenSideBar);
    };

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        section.scrollIntoView({ behavior: "smooth" });
    };

    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const handleDialogOpenLogin = () => {
        setIsOpenLogin(!isOpenLogin);

    };

    return (<>
        <SideBar isOpenSideBar={isOpenSideBar} isLoggedIn={isLoggedIn} meetings={meetings} />
        <header className="sticky top-0 bg-[#f7f7f8] flex w-full text-gray-600 body-font z-[2000]">
            <nav className="navbar px-4 ">
                <div className='flex w-full justify-between '>
                    <div className='flex w-full lg:justify-start'>
                        <button onClick={OpenSideBarSetter} className="flex text-white items-center justify-center pl-4 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 -960 960 960" width="36">
                                <path d="M160-240q-17 0-28.5-11.5T120-280q0-17 11.5-28.5T160-320h640q17 0 28.5 11.5T840-280q0 17-11.5 28.5T800-240H160Zm0-200q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h640q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H160Zm0-200q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h640q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H160Z" />
                            </svg>
                        </button>
                        <Link to='/' className="cursor-pointer navbar-logo flex items-center font-medium ">
                            <img className="logo" src={Logo} alt="Logo" />
                            <span className="logo-text mr-6 text-4xl font-bold">MOM.AI</span>
                        </Link>
                        {onPage == "home" ?
                            <div className="lg:flex md:flex hidden">
                                <a onClick={() => scrollToSection('s2')}
                                    className="appearance-none transition group inline-grid grid-flow-col p-3 justify-center items-center rounded-full  font-medium hover:bg-white cursor-pointer text-neutral-1000  xl:gap-2">
                                    Products
                                </a>
                                <a onClick={() => scrollToSection('s3')}
                                    className="appearance-none transition group inline-grid grid-flow-col p-3 justify-center items-center rounded-full  font-medium hover:bg-white cursor-pointer text-neutral-1000  xl:gap-2">
                                    Products
                                </a>
                                <a onClick={() => scrollToSection('s4')}
                                    className="appearance-none transition group inline-grid grid-flow-col p-3 justify-center items-center rounded-full  font-medium hover:bg-white cursor-pointer text-neutral-1000  xl:gap-2">
                                    Products
                                </a>
                            </div>
                            :
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
                        }

                    </div>
                    {/* <button onClick={handleDialogOpenUpload}
              className="lg:flex md:flex hidden text-white items-center justify-center bg-blue-500 border-0 py-4 px-6 mr-6 focus:outline-none hover:bg-blue-600 rounded-full">
              <div className="shadow-neutral-1000/25 -m-[15px] grid items-center justify-center rounded-full p-2.5  shadow-xl bg-white text-blue-600  rtl:-scale-x-100"
                bis_skin_checked="1">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round"
                  strokeLinejoin="round" className="h-[24px] w-[24px]" height="1em" width="1em"
                  xmlns="http://www.w3.org/2000/svg">
                  <polyline points="16 16 12 12 8 16"></polyline>
                  <line x1="12" y1="12" x2="12" y2="21"></line>
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                  <polyline points="16 16 12 12 8 16"></polyline>
                </svg>
              </div>
            </button> */}
                    <div className="navbar-option navbar-dropdown flex justify-center">
                        {/* <a
                className="cursor-pointer appearance-none transition group inline-grid grid-flow-col p-3 justify-center items-center rounded-full  font-medium hover:bg-white text-neutral-1000  xl:gap-2">
                Highlight
                <svg strokeWidth="0" viewBox="0 0 448 512"
                  className="h-3 w-3 m-1 lg:m-0 text-neutral-500 transition group-hover:text-inherit" height="1em"
                  width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z">
                  </path>
                </svg>
              </a> */}
                        <button className="text-white items-center justify-center mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32">
                                <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
                            </svg>
                        </button>
                        <div className="navbar-dropdown-content left-[-150px]">
                            <div className="top-full -mt-4 lg:-ml-12 lg:mr-6" bis_skin_checked="1">
                                <ul className="w-full" id="headlessui-menu-items-:Rjioom:" role="menu" tabIndex="0"
                                    data-headlessui-state="">
                                    <div className="rounded-2xl bg-white shadow-2xl lg:max-w-screen-xl" bis_skin_checked="1">
                                        <div className="p-2" bis_skin_checked="1">
                                            <div className="grid max-w-3xl  gap-2 rounded-xl bg-[#f7f7f8] p-4"
                                                bis_skin_checked="1">
                                                {isLoggedIn && (<a
                                                    className="appearance-none transition group grid-row-col grid gap-2 rounded-lg p-3 bg-[#f7f7f8] hover:bg-white md:gap-4 md:p-6">
                                                    <div className="grid grid-flow-col content-start items-center justify-start justify-items-start gap-3"
                                                        bis_skin_checked="1">
                                                        <svg fill='blue' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v58q0 59-40.5 100.5T740-280q-35 0-66-15t-52-43q-29 29-65.5 43.5T480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480v58q0 26 17 44t43 18q26 0 43-18t17-44v-58q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93h200v80H480Zm0-280q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z" /></svg>
                                                        <h2 className="font-medium leading-tight tracking-tight">{email}
                                                        </h2>
                                                    </div>
                                                </a>)}
                                                <a onClick={isLoggedIn ? Logout : handleDialogOpenLogin}
                                                    className="appearance-none transition group grid-row-col grid gap-2 rounded-lg p-3 bg-[#f7f7f8] hover:bg-white md:gap-4 md:p-6">
                                                    <div className="grid grid-flow-col content-start items-center justify-start justify-items-start gap-3"
                                                        bis_skin_checked="1">
                                                        <svg fill='blue' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                                            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h240q17 0 28.5 11.5T480-800q0 17-11.5 28.5T440-760H200v560h240q17 0 28.5 11.5T480-160q0 17-11.5 28.5T440-120H200Zm487-320H400q-17 0-28.5-11.5T360-480q0-17 11.5-28.5T400-520h287l-75-75q-11-11-11-27t11-28q11-12 28-12.5t29 11.5l143 143q12 12 12 28t-12 28L669-309q-12 12-28.5 11.5T612-310q-11-12-10.5-28.5T613-366l74-74Z" />
                                                        </svg>
                                                        <h2 className="font-medium leading-tight tracking-tight">{isLoggedIn ? 'Logout' : 'Login'}
                                                        </h2>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <Login isOpen={isOpenLogin} LoggedIn={() => setIsLoggedIn(true)} onClose={() => setIsOpenLogin(false)} />

                </div>
            </nav>
        </header>
    </>
    );
}

export default Navbar1;
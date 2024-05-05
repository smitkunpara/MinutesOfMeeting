import React from "react";
import Sidebar from "react-sidebar";
import { useNavigate } from 'react-router-dom';
const SideBar = ({ isOpenSideBar, isLoggedIn, meetings }) => {
    const navigate = useNavigate();
    return (
        <Sidebar
            sidebar={
                <>
                    <div className="h-full">
                        <div className="flex  items-center h-12 pl-6 bg-blue-500 text-white">
                            <div className="flex w-full  items-center">
                                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="logo" className="w-8 h-8" />
                                <h1 className="text-xl w-full mr-8 font-bold text-center">Meetings</h1>
                            </div>

                        </div>
                        {!isLoggedIn ? (<div className="flex flex-col item-center justify center h-full w-full" >
                            <div className="flex flex-col items-center justify-center h-full w-full">
                                <h1 className="text-xl font-bold text-center">Please Login</h1>
                            </div>

                        </div>) :
                            (
                                <ul>
                                    {meetings.map((item) => {
                                        return (
                                            <li key={item}>
                                                <button onClick={() => navigate(`/transcript/${item}`)} className="flex flex-col w-[95%] h-12 m-2 items-center hover:text-white text-xl justify-center bg-neutral-200 hover:bg-blue-500 rounded-lg">
                                                    {item}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>)}
                    </div>
                </>
            }
            open={isOpenSideBar}
            styles={{

                sidebar: {
                    zIndex: 2,
                    width: "20rem",
                    position: "fixed",
                    top: 0,
                    bottom: 0,
                    transition: "transform .3s ease-out",
                    WebkitTransition: "-webkit-transform .3s ease-out",
                    willChange: "transform",
                    overflowY: "auto",
                    backgroundColor: "rgb(246 243 243)",
                    boxShadow: "2px 0 6px rgba(0,0,0,.1)",
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: "5rem",
                    height: "100%",
                },
                content: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    overflowY: "auto",
                    WebkitOverflowScrolling: "touch",
                    transition: "left .3s ease-out, right .3s ease-out"
                },
                overlay: {
                    zIndex: 1,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0,
                    visibility: "hidden",
                    transition: "opacity .3s ease-out, visibility .3s ease-out",
                    backgroundColor: "rgba(0,0,0,.3)"
                }

            }}
        >

            <button onClick={() => this.onSetSidebarOpen(true)}>
                Open sidebar
            </button>
        </Sidebar>
    );
}


export default SideBar;
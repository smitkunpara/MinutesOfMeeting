import React from "react";
import Sidebar from "react-sidebar";
import { useNavigate } from 'react-router-dom';
import { rgbToHex, styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme, expanded }) => ({
    flexDirection: 'row-reverse',
    backgroundColor: expanded ? '#3b82f6' : 'inherit',
    color: expanded ? 'white' : 'inherit',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme, expanded }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    backgroundColor: expanded ? blue[500] : 'inherit',
    color: expanded ? 'white' : 'inherit',
}));



const SideBar = ({onPage,ExportasExcel,ExportasJSON ,setIsOpenSideBar,isOpenSideBar, isLoggedIn, meetings, handleNormalHighlight, Normal, Follow, handleFollowHighlight }) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = React.useState('panel3');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Sidebar
            sidebar={
                <>
                    <div className="h-full">

                        {!isLoggedIn ? (<div className="flex flex-col item-center justify center h-full w-full" >
                            <div className="flex flex-col items-center justify-center h-full w-full">
                                <h1 className="text-xl font-bold text-center">Please Login</h1>
                            </div>

                        </div>) :
                            (<>
                                <div>
                                    { onPage=="Transcript" ?(<>
                                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expanded={expanded === 'panel1'}>
                                            <Typography className="w-[90%]">
                                                <h1 className="w-full text-[1.2rem] text-center">Highlights</h1>
                                            </Typography>                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                            <a onClick={handleNormalHighlight}
                                                                className="appearance-none transition group grid-row-col grid gap-2 mb-2 rounded-lg p-3 bg-[#f7f7f8] hover:bg-neutral-200 md:gap-4 md:p-6">
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
                                                                className="appearance-none transition group grid-row-col grid gap-2 rounded-lg p-3 bg-[#f7f7f8] hover:bg-neutral-200 md:gap-4 md:p-6">
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
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" expanded={expanded === 'panel2'}>
                                            <Typography className="w-[90%]">
                                                <h1 className="w-full text-[1.2rem] text-center">Export File</h1>
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                            <a onClick={ExportasJSON}
                                                                className="appearance-none transition mb-2 group grid-row-col grid gap-2 rounded-lg p-3 bg-[#f7f7f8] hover:bg-neutral-200 md:gap-4 md:p-6">
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
                                                                className="appearance-none transition w-auto group grid-row-col grid gap-2 rounded-lg p-3 bg-[#f7f7f8] hover:bg-neutral-200 md:gap-4 md:p-6">

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
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                        </>):null}
                                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" expanded={expanded === 'panel3'}>
                                            <Typography className="w-[90%]">
                                                <h1 className="w-full text-[1.2rem] text-center">Meetings</h1>
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails >
                                            <Typography>
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
                                                </ul>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>

                            </>
                            )}
                    </div>
                </>
            }
            open={isOpenSideBar}
            onSetOpen={setIsOpenSideBar}
            // pullRight={true}
            touch={true}
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
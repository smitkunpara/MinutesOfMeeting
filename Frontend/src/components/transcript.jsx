import AudioPlayer from './AudioPlayer';
import Table from './table';
import "./transcript.css";
import Navbar from './navbar';
import { useState } from 'react';

function Transcript({ ResponseData }) {
  const [currentTime, setCurrentTime] = useState(0);
  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  };
  return (
    <>
        <Navbar />
        <AudioPlayer onTimeUpdate={handleTimeUpdate} />
        <Table currentTime={currentTime} />
    </>
  );
}

export default Transcript;
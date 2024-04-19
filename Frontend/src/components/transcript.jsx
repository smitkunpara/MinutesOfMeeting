import AudioPlayer from './AudioPlayer';
import Table from './table';
import "./transcript.css";
import Navbar from './navbar';
import { useState } from 'react';

function Transcript({ ResponseID }) {
  const [NormalHighlight, setNormalHighlight] = useState(false);
  const [FollowHighligh, setHighlightAndFollow] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  };
  return (
    <>
        <Navbar />
        <AudioPlayer onTimeUpdate={handleTimeUpdate} NormalHighlight={NormalHighlight} FollowHighligh={FollowHighligh}  />
        <Table currentTime={currentTime} NormalHighlight={NormalHighlight} FollowHighligh={FollowHighligh} />
    </>
  );
}

export default Transcript;
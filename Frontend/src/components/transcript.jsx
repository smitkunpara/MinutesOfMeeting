import AudioPlayer from './AudioPlayer';
import Table from './table';
import "./transcript.css";
import Navbar from './navbar';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function Transcript() {
  const { ResponseID } = useParams();
  const [NormalHighlight, setNormalHighlight] = useState(false);
  const [FollowHighligh, setFollowHighligh] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [AudioTime , setAudioTime ] = useState(0);
  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  };
  return (
    <>
        <Navbar setNormalHighlight={setNormalHighlight} setFollowHighligh={setFollowHighligh}/>
        <AudioPlayer onTimeUpdate={handleTimeUpdate} AudioTime={AudioTime} ResponseID={ResponseID}/>
        <Table setAudioTime={setAudioTime} ResponseID={ResponseID} currentTime={currentTime} NormalHighlight={NormalHighlight} FollowHighligh={FollowHighligh} />
    </>
  );
}

export default Transcript;
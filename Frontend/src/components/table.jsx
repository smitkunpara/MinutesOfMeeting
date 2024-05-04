// import "bootstrap/dist/css/bootstrap.min.css";
import { Skeleton } from '@mui/material';
import { useEffect, useState, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./table.css";
import Markdown from 'react-markdown';


const Table = ({ ResponseID, currentTime, NormalHighlight, FollowHighligh: FollowHighlight, setAudioTime }) => {
  const [search, setSearch] = useState('');
  const [SummaryLoading, setSummaryLoading] = useState(true);
  const [summaryData, setSummaryData] = useState('');
  const [LoadingTranscript, setLoadingTranscript] = useState(true);
  const [Transcript, setTranscript] = useState([]);
  const previousWordRef = useRef(null);
  useEffect(() => {
    toast.promise(
      new Promise((resolve, reject) => {
        (async () => {
          try {
            setLoadingTranscript(true);
            setSummaryLoading(true);
            console.log("fetching transcript");
            const response = await axios.get(`http://127.0.0.1:8000/transcript/${ResponseID}`,
              {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
              }
            );
            console.log("got it");
            resolve(response.data);
            localStorage.setItem('JSON_DATA', JSON.stringify(response.data));
            setTranscript(response.data);
            setLoadingTranscript(false);
          } catch (error) {
            reject();
            console.log(error);
            setLoadingTranscript(false);
          }
        })();
      }),
      {
        pending: "Generating transcript...",
        success: 'Transcript generated successfully!',
        error: 'Transcript generation failed',
      },
      {
        position: "top-center",
        autoClose: 2000,
      }
    ).then(() => {
      toast.promise(
        new Promise((resolve, reject) => {
          (async () => {
            try {
              const response = await axios.get(`http://127.0.0.1:8000/summary/${ResponseID}`,
              {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
              }
            );
              resolve(response.data);
              setSummaryData(response.data);
              setSummaryLoading(false);
            } catch (error) {
              reject();
              console.log(error);
              setSummaryLoading(false);
            }
          })();
        }),
        {
          pending: "Generating summary...",
          success: 'Summary generated successfully!',
          error: 'Summary generation failed',
        },
        {
          position: "top-center",
          autoClose: 2000,
        }
      );
    });
  }
    , [ResponseID])


  const filteredData = useMemo(() => {
    const searchLower = search.toLowerCase();
    return Transcript.filter(item =>
      item.words.some(word => word.text.toLowerCase().includes(searchLower))
    );
  }, [Transcript, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const adjustedTime = currentTime * 1000;
    let element;
    if (NormalHighlight || FollowHighlight) {
      ``
      for (let item of Transcript) {
        if (adjustedTime >= item.start && adjustedTime <= item.end) {
          for (let word of item.words) {
            if (adjustedTime >= word.start && adjustedTime <= word.end) {
              element = document.getElementById(word.start);
              if (element) {
                if (FollowHighlight) {
                  element.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
                }
                if (previousWordRef.current) {
                  previousWordRef.current.classList.remove('highlight');
                }
                element.classList.add('highlight');
                previousWordRef.current = element;
                break;
              }
            }
          }
        }
      }
    }
    else if (previousWordRef.current) {
      previousWordRef.current.classList.remove('highlight');
    }
  }, [currentTime, NormalHighlight, FollowHighlight]);


  return (
    <>
      <main className="table" id="customers_table">
        <section className="table__header">
          <h1 className='text-lg font-bold'>Minutes of Meeting</h1>
          <div className="input-group">
            {/* <input type="search" placeholder="Search Data..." /> */}
            <input type="search" value={search} onChange={handleSearch} placeholder="Search Data..." />
            {/* <img src={SearchIcon} alt="SearchIcon" /> */}
          </div>
        </section>
        <section className="table__body">
          <table>
            <thead>
              <tr>
                <th style={{ width: '4%' }}>Id</th>
                <th style={{ width: '10%' }}>Speaker</th>
                <th >Transcript</th>
              </tr>
            </thead>
            <tbody>
              {LoadingTranscript ? (
                Array.from({ length: 9 }).map((_, index) => (
                  <tr key={index}>
                    <td><Skeleton variant="text" /></td>
                    <td><Skeleton variant="text" /></td>
                    <td><Skeleton variant="text" /></td>
                  </tr>
                ))
              ) : (
                // data.map((item, index) => (
                filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{`Speaker ${item.speaker}`}</td>
                    <td>
                      {item.words.map((word, wordIndex) => (
                        <span onClick={() => setAudioTime(word.start)} key={`${index + 1}-${wordIndex}`} id={word.start}>
                          {/* style={{ backgroundColor: currentTime * 1000 >= word.start && currentTime * 1000 <= word.end && (NormalHighlight || FollowHighligh) ? 'yellow' : 'transparent' }}> */}
                          {word.text + ' '}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
        <section className="table__header">
          <h1 className='text-lg font-bold'>Summary</h1>
        </section>
        <section className="table__body">
          <div>
            {SummaryLoading ? (
              <>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </>
            ) : (
              <Markdown>{summaryData}</Markdown>
            )}

          </div>
        </section>
      </main>
    </>

  );
}

export default Table;
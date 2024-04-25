// import "bootstrap/dist/css/bootstrap.min.css";
import { Skeleton } from '@mui/material';
import { useEffect, useState, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./table.css";
import Markdown from 'react-markdown';

const FetchData = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    toast.promise(
      new Promise((resolve, reject) => {
        (async () => {
          try {
            console.log("fetching summary");
            const response = await axios.get('http://127.0.0.1:8000/transcript');
            console.log("got it");
            resolve();
            setData(response.data);
            localStorage.setItem('JSON_DATA', JSON.stringify(response.data));
            // setData(processTranscript(response.data));
            setLoading(false);
          } catch (error) {
            reject();
            console.log(error);
            setLoading(false);
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
    );
  }, []);
  return { loading, data };
};

const FetchSummary = () => {
  const [loding, setLoading] = useState(false);
  const [summaryData, setSummaryData] = useState(false);
  useEffect(() => {
    setLoading(true);
    toast.promise(
      new Promise((resolve, reject) => {
        (async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/summary');
            //sleep for 5 seconds
            // await new Promise(r => setTimeout(r, 5000));
            // const response = { data: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque voluptatem, adipisci saepe voluptate vitae asperiores dignissimos omnis laudantium fuga officiis architecto perspiciatis ea dolorum cupiditate placeat consectetur neque natus error. Natus quos consequatur est deleniti ullam quasi molestiae? Quisquam enim blanditiis ducimus praesentium commodi neque magni quas, ex asperiores provident iste veniam? Ipsum maxime ullam, nam neque dolor facilis temporibus voluptatum provident iusto, officia obcaecati, quis fuga ipsa nesciunt? Sequi cumque ad saepe tempore? Facere ratione enim placeat. Quo at excepturi a sunt, aliquid, repellat numquam aperiam voluptas perspiciatis inventore amet vitae recusandae et quae, minus reiciendis sit nihil natus?"}
            resolve();
            setSummaryData(response.data);
            setLoading(false);
          } catch (error) {
            reject();
            console.log(error);
            setLoading(false);
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
  }, []);
  return { loding, summaryData };
};


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
            const response = await axios.get(`http://127.0.0.1:8000/transcript/${ResponseID}`);
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
              const response = await axios.get(`http://127.0.0.1:8000/summary/${ResponseID}`);
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

    if (NormalHighlight || FollowHighlight) {
      ``
      for (let item of Transcript) {
        if (adjustedTime >= item.start && adjustedTime <= item.end) {
          for (let word of item.words) {
            if (adjustedTime >= word.start && adjustedTime <= word.end) {
              const element = document.getElementById(word.start);
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
  }, [currentTime, NormalHighlight, FollowHighlight]);


  return (
    <>
      <main className="table" id="customers_table">
        <section className="table__header">
          <h1>Minutes of Meeting</h1>
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
          <h1>Summary</h1>
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
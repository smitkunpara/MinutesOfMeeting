import "bootstrap/dist/css/bootstrap.min.css";
import { Skeleton } from '@mui/material';
import { useEffect, useState,useMemo  } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import SearchIcon from "../assets/SearchIcon.png";
import "./table.css";

// function processTranscript(data) {
//   data.forEach(function(i) {
//       var sentence = [];
//       var text = "";
//       var start = 0;
//       var end = 0;
//       var temp = {};
//       var speaker = "";
//       i['words'].forEach(function(j) {
//           if (speaker === "") {
//               speaker = j['speaker'];
//           }
//           if (j['text'].includes('.')) {
//               text += j['text'] + " ";
//               temp['text'] = text;
//               temp['start'] = start;
//               temp['end'] = j['end'];
//               sentence.push(temp);
//               temp = {};
//               start = j['end'];
//               end = 0;
//               text = "";
//           } else {
//               text += j['text'] + " ";
//           }
//       });
//       i['sentence'] = sentence;
//       delete i['words'];
//   });
  
//   // Return the modified data as a JavaScript object
//  return data;
// }

const FetchData = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    toast.promise(
      new Promise((resolve, reject) => {
        (async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/transcript');
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



const Table = ({ currentTime,NormalHighlight,FollowHighligh }) => {
  console.log(currentTime);
  console.log(NormalHighlight);
  console.log(FollowHighligh);
  const { loading: LoadingTranscript, data } = FetchData();
  const {loding: SummaryLoading, summaryData} = FetchSummary();
  const [search, setSearch] = useState('');
  const filteredData = useMemo(() => {
    const searchLower = search.toLowerCase();
    return data.filter(item =>
      item.words.some(word => word.text.toLowerCase().includes(searchLower))
    );
  }, [data, search]);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
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
                <th style={{width: '4%'}}>Id</th>
                <th style={{width: '10%'}}>Speaker</th>
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
                      <span key={`${index+1}-${wordIndex}`} id={`time-${word.start}`} 
                            style={{ backgroundColor: currentTime * 1000 >= word.start && currentTime * 1000 <= word.end  ? 'yellow' : 'transparent' }}>
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
              <p>{summaryData}</p>
            )}

          </div>
      </section>
    </main>
    </>

  );
}

export default Table;
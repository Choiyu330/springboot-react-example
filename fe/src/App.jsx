import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"
import StockInfo from "./components/StockInfo";
import StockInfoList from "./components/StockInfoList";
import StockInfoGraph from "./components/StockInfoGraph";



function App() {
  const [home, setHome] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    axios.get('/api')
      .then((res) => {
        setHome(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div className="App">
      
      <div className="StockInfoContainer">
        <div className="StockInfoList">
        <h1>📈 투자 정보</h1>
          <StockInfoList />
        </div>
        <div className="StockInfoGraph">
          <StockInfoGraph />
        </div>
      </div>

    </div>
  );
}

export default App;
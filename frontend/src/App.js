import './App.css';
import { useState, useEffect } from 'react';

import SqlQueryForm from "./Components/SQLCommandInput";
import Table from "./Components/DatabaseTable";
import UpdateInput from "./Components/UpdatesInput";
import { WebSocketContext } from "./Components/WebSocketConnection"

function App() {
  const [table, setTable] = useState([])
  const [sharedData, setSharedData] = useState(null)

  useEffect(() => {
  fetch("http://localhost:5001/customers")
    .then((res) => res.json())
    .then((table) => {
      console.log(table);
      setTable(table);
    });
    }, []);

  return (
    <>
      <WebSocketContext.Provider value={sharedData}>
        <SqlQueryForm setTable={setTable}/>
        <UpdateInput setSharedData={setSharedData}/>
        <Table table={table}/>
      </WebSocketContext.Provider>
    </>
  )
}

export default App;
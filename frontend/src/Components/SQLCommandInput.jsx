import { useState, useContext } from 'react';
import './Components.css';

function SqlQueryForm({ setTable }){
  const [query, setQuery] = useState("")
  
  function handleChange(e) {
    setQuery(e.target.value);
  }
  
  async function processQuery(event){
    event.preventDefault()
    let queryInput = {
      query:query
    }
    console.log(query);
    fetch("http://localhost:5001/api/query",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      
      body: JSON.stringify(queryInput)
    })
    .then(response=>response.json())
    .then(data=>{
      setTable(data);
    })
  }

  return (
    <>
      <div className="sqlCommandInputForm">
        <h3>SQL Statement</h3>
      </div>

      <form className="sqlForm" onSubmit={processQuery} >
        <input
          type="text" 
          value={query}
          onChange={handleChange}
        />
        
        <input type="submit" />
      </form>
    </>
    
  )
}

export default SqlQueryForm;
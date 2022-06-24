import React from 'react'
import { useState } from 'react'
import axios from 'axios';
const Search = () => {
  const [city, setCity] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // alert(`cidade: ${city}`);
    const url = `http://localhost:3000/${city}`;
    axios.get(url)
      .then(function (response) {
        console.log(response.data)
      });
  }

  return (
    <div>
      <div className='container'>
        <div className='form-group mt-5'>
          <input name='searc' type="text"
            placeholder='search'
            className="form-control input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleSubmit}>Buscar</button>
        </div>
      </div>
    </div>
  )
}

export default Search
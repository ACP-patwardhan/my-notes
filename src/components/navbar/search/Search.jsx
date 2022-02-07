import React from 'react';
import './search.css'
function Search() {
  return (
      <form >
          <input className='formInput' type="text" />
          <input className='searchBtn' type="button" value="search" />
      </form>
  );
}

export default Search;

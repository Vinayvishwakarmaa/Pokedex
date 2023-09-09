import React from 'react';
// CSS Import
import './Search.css';

function Search() {
  return (
        <div className='search-wrapper'>
              <input id='pokemon-name-search'
          type="text" placeholder='Pokemon name...' required />
        </div>
  )
}

export default Search;
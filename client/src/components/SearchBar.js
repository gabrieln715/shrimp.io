import React from 'react';

const SearchBar = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
        <label>
          Searchbar:
          <input type="text" value={props.value} onChange={props.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
  );
};

export default SearchBar;
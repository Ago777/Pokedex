import PropTypes from 'prop-types';
import React from 'react';

const SearchByName = (props) => {
  const {handleChangeInput, handleSearch} = props;

  const handleKeyPress = (target) => {
    if(target.charCode===13){
      handleSearch();
    }
  };

  return (
    <div className='search-by-name'>
      <input type='text' placeholder='Search by name' name='search' onChange={handleChangeInput} onKeyPress={handleKeyPress}/>
      <button type='submit' onClick={handleSearch}><i className='fa fa-search'/></button>
    </div>
  );
};

SearchByName.propTypes = {
  handleChangeInput: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired
};

export default SearchByName;
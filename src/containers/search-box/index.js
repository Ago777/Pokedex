import SearchByName from "./components/search-by-name";
import SearchByType from "./components/search-by-type";
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SearchBox extends Component {
  render() {
    return (
      <div>
        <SearchByName />
        <SearchByType />
      </div>
    );
  }
}

SearchBox.propTypes = {};

export default SearchBox;
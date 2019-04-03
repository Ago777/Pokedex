import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SearchByName extends Component {
  render() {
    return (
      <div className="search-by-name">
        <input type="text" placeholder="Search by name" name="search"/>
        <button type="submit"><i className="fa fa-search"/></button>
      </div>
    );
  }
}

SearchByName.propTypes = {};

export default SearchByName;
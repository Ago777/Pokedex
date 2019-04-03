import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SearchByType extends Component {
  render() {
    return (
      <div className='search-by-type'>
        <div className='search-txt'><h4>Search By Type</h4></div>
        <div className='type-buttons'>
          <button className="button normal active">Electric</button>
          <button className="button fighting button2">Blue</button>
          <button className="button button3">Red</button>
          <button className="button button4">Gray</button>
          <button className="button button5">Black</button>
          <button className="button">Green</button>
          <button className="button button2">Blue</button>
          <button className="button button3">Red</button>
          <button className="button button4">Gray</button>
          <button className="button button5">Black</button>
          <button className="button">Green</button>
          <button className="button button2">Blue</button>
          <button className="button button3">Red</button>
          <button className="button button4">Gray</button>
          <button className="button button5">Black</button>
          <button className="button">Green</button>
          <button className="button button2">Blue</button>
          <button className="button button3">Red</button>
          <button className="button button4">Gray</button>
          <button className="button button5">Black</button>
        </div>
      </div>
    );
  }
}

SearchByType.propTypes = {};

export default SearchByType;
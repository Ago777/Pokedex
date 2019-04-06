import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Loader from "../../../../common/loader";

class SearchByType extends Component {
  static propTypes = {
    selectTypeHandler: PropTypes.func.isRequired,
    pokemonTypes: PropTypes.array.isRequired,
    activeType: PropTypes.string.isRequired
  };

  render() {
    const {props: {pokemonTypes, activeType, selectTypeHandler}} = this;
    if (!pokemonTypes.length) {
      return (
        <div className='search-by-type'>
          <Loader/>
        </div>
      )
    }

    return (
      <div className='search-by-type'>
        <div className='type-buttons'>
          {
            pokemonTypes.map(type => {
              const name = type['name'];

              return (
                <button
                  key={name}
                  className={`button ${name} ${activeType === name ? ' active' : ''}`}
                  onClick={() => selectTypeHandler(name)}
                >
                  {type['name']}
                </button>
              )
            })
          }
        </div>
      </div>
    );
  };
}

export default SearchByType;
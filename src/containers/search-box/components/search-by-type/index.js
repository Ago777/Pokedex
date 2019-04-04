import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Loader from "../../../../common/loader";

class SearchByType extends Component {
  static propTypes = {
    fetchPokemonWithType: PropTypes.func.isRequired,
    pokemonTypes: PropTypes.array.isRequired
  };

  state = {
    activeTypesList: []
  };

  selectTypeHandler = (name) => {
    const {state: {activeTypesList}, props: {fetchPokemonWithType}} = this;
    const activeTypes = [...activeTypesList];

    activeTypes.includes(name) ? activeTypes.splice(activeTypes.indexOf(name), 1) : activeTypes.push(name);
    this.setState({activeTypesList: activeTypes}, () => fetchPokemonWithType(name))
  };

  render() {
    const {props: {pokemonTypes}, state: {activeTypesList}} = this;
    if (!pokemonTypes.length) {
      return (
        <div className='search-by-type'>
          <Loader/>
        </div>
      )
    }

    return (
      <div className='search-by-type'>
        <div className='search-txt'><h4>Search By Type</h4></div>
        <div className='type-buttons'>
          {
            pokemonTypes.map((type, i) => {
              const name = type['name'];

              return (
                <button
                  key={name}
                  className={`button ${name} ${activeTypesList.includes(name) ? ' active' : ''}`}
                  onClick={() => this.selectTypeHandler(name)}
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
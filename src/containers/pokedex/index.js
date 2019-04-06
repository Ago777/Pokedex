import React, {Component} from 'react';
import Pagination from "../pagination";
import SearchBox from "../search-box";
import PropTypes from 'prop-types';
import Pokemons from "../pokemons";

class Pokedex extends Component {
  static propTypes = {
    pokemonCounts: PropTypes.number.isRequired,
    pokemonList: PropTypes.array.isRequired
  };

  render() {
    const {pokemonCounts, pokemonList} = this.props;

    return (
      <div>
        <SearchBox/>
        <Pokemons pokemonList={pokemonList}/>
        <Pagination pokemonCounts={pokemonCounts}/>
      </div>
    );
  };
}

export default Pokedex;

import React, {Component} from 'react';
import Pagination from "../pagination";
import SearchBox from "../search-box";
import PropTypes from 'prop-types';
import Pokemons from "../pokemons";

class Pokedex extends Component {
  static propTypes = {
    pokemonList: PropTypes.array.isRequired,
    initPokemonData: PropTypes.object.isRequired
  };

  render() {
    const {initPokemonData, pokemonList} = this.props;

    return (
      <div>
        <SearchBox/>
        <Pokemons pokemonList={pokemonList}/>
        <Pagination initPokemonData={initPokemonData}/>
      </div>
    );
  };
}

export default Pokedex;

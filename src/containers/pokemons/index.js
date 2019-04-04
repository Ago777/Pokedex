import {inject, observer} from "mobx-react";
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Pokemon from './pokemon';
import Loader from "../../App";

@inject('MainStore')
@observer
class Pokemons extends Component {
  static propTypes = {
    pokemonList: PropTypes.array.isRequired
  };

  render() {
    const {pokemonList, MainStore: {getSearchError, getFetchLoading}} = this.props;
    if(getFetchLoading) {
      return <Loader/>
    }

    return (
      <>
        <div className='pokemons-header'><h2>Pokemons</h2></div>
        <div className='all-pokemons'>
          {getSearchError ? `${getSearchError}` : pokemonList.map(pokemon => <Pokemon key={pokemon['id']} pokemon={pokemon}/>)}
        </div>
      </>
    );
  };
}

export default Pokemons;
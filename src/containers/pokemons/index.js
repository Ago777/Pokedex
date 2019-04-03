import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Pokemon from "./pokemon";

class Pokemons extends Component {
  render() {
    return (
      <>
        <div className='pokemons-header'><h2>Pokemons</h2></div>
        <div className='all-pokemons'>
          <Pokemon/>

        </div>
      </>
    );
  }
}

Pokemons.propTypes = {};

export default Pokemons;
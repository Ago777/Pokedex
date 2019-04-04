import {inject, observer} from 'mobx-react';
import Pokedex from "./containers/pokedex";
import React, {Component} from 'react';
import Loader from "./common/loader";
import PropTypes from 'prop-types';

@inject('MainStore')
@observer
class App extends Component {
  static propTypes = {
    MainStore: PropTypes.shape({
      fetchInitPokemonData: PropTypes.func.isRequired,
      getInitPokemonData: PropTypes.object.isRequired,
      getPokemonFullList: PropTypes.array.isRequired,
      getAppLoadingValue: PropTypes.bool.isRequired,
      fetchPokemonTypes: PropTypes.func.isRequired
    }),
  };

  componentDidMount() {
    const {MainStore: {fetchInitPokemonData, fetchPokemonTypes}} = this.props;
    fetchInitPokemonData(0, 20);
    fetchPokemonTypes();
  };

  render() {
    const {MainStore: {getAppLoadingValue, getPokemonFullList, getInitPokemonData}} = this.props;

    return (
      <div className="App">
        {
          getAppLoadingValue
            ? <Loader/>
            : <Pokedex pokemonList={getPokemonFullList} initPokemonData={getInitPokemonData}/>
        }
      </div>
    );
  };
}

export default App;

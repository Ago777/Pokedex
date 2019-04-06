import {inject, observer} from 'mobx-react';
import Pokedex from "./containers/pokedex";
import AppLoader from "./common/loader";
import React, {Component} from 'react';
import PropTypes from 'prop-types';

@inject('MainStore')
@observer
class App extends Component {
  static propTypes = {
    MainStore: PropTypes.shape({
      fetchInitPokemonData: PropTypes.func.isRequired,
      getPokemonCounts: PropTypes.number.isRequired,
      getPokemonFullList: PropTypes.array.isRequired,
      getIsAppLoadedValue: PropTypes.bool.isRequired,
      fetchPokemonTypes: PropTypes.func.isRequired
    }),
  };

  componentDidMount() {
    const {MainStore: {fetchInitPokemonData, fetchPokemonTypes}} = this.props;
    fetchInitPokemonData();
    fetchPokemonTypes();
  };

  render() {
    const {MainStore: {getIsAppLoadedValue, getPokemonFullList, getPokemonCounts}} = this.props;

    return (
      <div className="App">
        {
          !getIsAppLoadedValue
            ? <AppLoader isAppLoader={true}/>
            : <Pokedex pokemonList={getPokemonFullList} pokemonCounts={getPokemonCounts}/>
        }
      </div>
    );
  };
}

export default App;

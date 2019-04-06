import {inject, observer} from "mobx-react";
import Loader from "../../common/loader";
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Pokemon from './pokemon';

@inject('MainStore')
@observer
class Pokemons extends Component {
  static propTypes = {
    MainStore: PropTypes.shape({
      changeShowItemsCount: PropTypes.func.isRequired,
      getShowItemsCount: PropTypes.number.isRequired,
      getSearchError: PropTypes.string.isRequired,
      getLoadingValue: PropTypes.bool.isRequired
    }),
    pokemonList: PropTypes.array.isRequired,
  };

  render() {
    const {
      pokemonList,
      MainStore: {
        getSearchError,
        getLoadingValue,
        getShowItemsCount,
        changeShowItemsCount,
        getSearchByValue
      }
    } = this.props;
    if (getLoadingValue) {
      return <div className='content'><Loader/></div>
    }

    return (
      <div className='content'>
        <div className='pokemons-header'><h2>Pokemons</h2></div>
        {
          !getSearchByValue['isSearchByName'] &&
          <div className='show-items'>
            <span>Show Pokemons</span>
            <button className={`count ${getShowItemsCount === 10 ? 'active' : ''}`}
                    onClick={() => changeShowItemsCount(10)}>10
            </button>
            <button className={`count ${getShowItemsCount === 20 ? 'active' : ''}`}
                    onClick={() => changeShowItemsCount(20)}>20
            </button>
            <button className={`count ${getShowItemsCount === 50 ? 'active' : ''}`}
                    onClick={() => changeShowItemsCount(50)}>50
            </button>
          </div>
        }
        <div className='all-pokemons'>
          {
            getSearchError ? `${getSearchError}`
              : pokemonList.map(pokemon =>
                <Pokemon key={pokemon['id']} pokemon={pokemon}/>)
          }
        </div>
      </div>
    );
  };
}

export default Pokemons;
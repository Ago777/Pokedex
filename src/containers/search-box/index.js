import SearchByName from "./components/search-by-name";
import SearchByType from "./components/search-by-type";
import {inject, observer} from "mobx-react";
import React, {Component} from 'react';
import PropTypes from 'prop-types';

@inject('MainStore')
@observer
class SearchBox extends Component {
  static propTypes = {
    MainStore: PropTypes.shape({
      fetchPokemonWithType: PropTypes.func.isRequired,
      fetchPokemonWithName: PropTypes.func.isRequired,
      getSearchByValue: PropTypes.object.isRequired,
      fetchPokemonTypes: PropTypes.func.isRequired,
      getPokemonTypes: PropTypes.array.isRequired,
      resetAll: PropTypes.func.isRequired
    }),
  };

  componentDidMount() {
    const {MainStore: {fetchPokemonTypes}} = this.props;
    fetchPokemonTypes();
  };


  state = {
    searchWord: '',
    activeType: ''
  };

  handleChangeInput = (e) => {
    this.setState({searchWord: e.target.value});

  };

  handleSearch = () => {
    const {state: {searchWord}, props: {MainStore: {fetchPokemonWithName}}} = this;
    searchWord.trim().length && this.setState({activeTypesList: []}, () => fetchPokemonWithName(searchWord.toLowerCase()));
  };

  selectTypeHandler = (name) => {
    const {state: {activeType}, props: {MainStore: {fetchPokemonWithType}}} = this;
    const newType = activeType === name ? '' : name;
    this.setState({activeType: newType, searchWord: ''}, () => fetchPokemonWithType(newType))
  };

  ResetAllFilter = () => {
    const {props: {MainStore: {resetAll}}} = this;
    this.setState({searchWord: '', activeType: ''}, () => resetAll());
  };

  render() {
    const {
      props: {
        MainStore: {
          getPokemonTypes,
          fetchPokemonWithType,
          getSearchByValue
        }
      },
      state: {
        activeType,
        searchWord
      }
    } = this;
    const {isSearchByName, isSearchByType} = getSearchByValue;
    const isShowSeeAllButton = isSearchByName || isSearchByType;

    return (
      <div>
        <SearchByName
          searchWord={searchWord}
          handleChangeInput={this.handleChangeInput}
          handleSearch={this.handleSearch}
        />
        <SearchByType
          selectTypeHandler={this.selectTypeHandler}
          fetchPokemonWithType={fetchPokemonWithType}
          pokemonTypes={getPokemonTypes}
          activeType={activeType}
        />
        {
          isShowSeeAllButton &&
          <div className='see-all'>
            <button onClick={this.ResetAllFilter}>See All</button>
          </div>
        }
      </div>
    );
  };
}

export default SearchBox;
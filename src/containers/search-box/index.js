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
      fetchPokemonWithName: PropTypes.func.isRequired,
      fetchPokemonTypes: PropTypes.func.isRequired,
      getPokemonTypes: PropTypes.array.isRequired,
    }),
  };

  componentDidMount() {
    const {MainStore: {fetchPokemonTypes}} = this.props;
    fetchPokemonTypes();
  };


  state = {
    searchWord: ''
  };

  handleChangeInput = (e) => {
    this.setState({searchWord: e.target.value});

  };

  handleSearch = () => {
    const {state: {searchWord}, props: {MainStore: {fetchPokemonWithName}}} = this;
    searchWord.trim().length && fetchPokemonWithName(searchWord.toLowerCase());
  };

  render() {
    const {MainStore: {getPokemonTypes, fetchPokemonWithType}} = this.props;

    return (
      <div>
        <SearchByName handleChangeInput={this.handleChangeInput} handleSearch={this.handleSearch}/>
        <SearchByType pokemonTypes={getPokemonTypes} fetchPokemonWithType={fetchPokemonWithType}/>
      </div>
    );
  };
}

export default SearchBox;
import React, {Component} from 'react';
import Pagination from "../pagination";
import SearchBox from "../search-box";
import Pokemons from "../pokemons";


class App extends Component {

  render() {
    return (
      <div>
        <SearchBox/>
        <Pokemons/>
        <Pagination/>
      </div>
    );
  }
}

export default App;

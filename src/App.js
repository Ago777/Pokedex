import {inject, observer} from 'mobx-react';
import Pokedex from "./containers/pokedex";
import React, {Component} from 'react';
import Loader from "./common/loader";


class App extends Component {
  state = {
    isAppLoading: false
  };

  render() {
    const {state: {isAppLoading}} = this;
    return (
      <div className="App">
        {isAppLoading ? <Loader/> : <Pokedex/>}
      </div>
    );
  }
}

export default App;

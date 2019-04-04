import Http from '../../common/constants/request-service'
import {observable, action, computed} from "mobx";
import api from '../../common/constants/api'

export default class MainStore {
  @observable isAppLoading = true;
  @observable isFetchLoading = false;
  @observable initPokemonData = {};
  @observable pokemonTypes = [];
  @observable pokemonFullList = [];
  @observable isSearchByName = false;
  @observable searchError = '';
  @observable isSearchByType = false;
  @observable showItemsCount = 20;
  @observable page = 1;

  @action fetchInitPokemonData = (offset, limit) => {
    const url = `${api}/pokemon?offset=${offset}&limit=${limit}`;
    const callback = (data) => {
      this.initPokemonData = data;
      this.fetchEveryPokemonData(data['results']);
    };
    Http.get(url, callback)
  };

  @action fetchEveryPokemonData = (initPokemonData) => {
    initPokemonData.forEach(result => {
      const url = result['url'];
      const callback = (data) => {
        this.pokemonFullList.push(data);
        this.pokemonFullList.length === this.showItemsCount && this.changeAppLoadingValue(false);
      };
      Http.get(url, callback);
    });
  };

  @action fetchPokemonTypes = () => {
    const url = `${api}/type`;
    const callback = (data) => this.pokemonTypes = data['results'];
    Http.get(url, callback);
  };

  @action fetchPokemonWithName = (searchWord) => {
    const url = `${api}/pokemon/${searchWord}`;
    this.searchError = '';
    this.isFetchLoading = true;
    const callback = (data) => {
      this.pokemonFullList = [data];
      this.isFetchLoading = false;
      this.isSearchByName = true;
      this.isSearchByType = false
    };

    const errorCallback = () => {
      this.isFetchLoading = false;
      this.searchError = 'No Pokemon With This Name';
    };
    Http.get(url, callback, errorCallback);
  };

  @action fetchPokemonWithType = (name) => {
    const url = `${api}/type/${name}`;
    this.isSearchByName = false;
    this.searchError = '';
    this.isFetchLoading = true;
    const callback = (data) => {
      const count = this.showItemsCount;
      const page = this.page;
      const max = page * count;
      const min = max - count;
      this.fetchFullPokemonDataWithType(data['pokemon'].slice(min, max));
    };

    Http.get(url, callback);
  };

  @action fetchFullPokemonDataWithType = (pokemonData) => {
    let newList = [];
    pokemonData.forEach(result => {
      const url = result['pokemon']['url'];
      const callback = (data) => {
        newList.push(data);
        this.pokemonFullList = newList;
        if (newList.length === this.showItemsCount) {
          this.isSearchByType = true;
          this.isFetchLoading = false;
        }
      };
      Http.get(url, callback);
    });
  };

  @action changeAppLoadingValue = (flag) => {
    this.isAppLoading = flag;
  };

  @computed get getInitPokemonData() {
    return this.initPokemonData;
  };

  @computed get getPokemonFullList() {
    return this.pokemonFullList;
  };

  @computed get getPokemonTypes() {
    return this.pokemonTypes.slice(0, -2);
  };

  @computed get getAppLoadingValue() {
    return this.isAppLoading
  };

  @computed get getPageIndex() {
    return this.page
  };

  @computed get getSearchError() {
    return this.searchError
  };

  @computed get getFetchLoading() {
    return this.isFetchLoading
  };
};

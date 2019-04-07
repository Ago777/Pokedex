import Http from '../../common/constants/request-service'
import {observable, action, computed} from "mobx";
import api from '../../common/constants/api'

export default class MainStore {
  @observable isLoading = false;
  @observable isAppLoaded = false;
  @observable pokemonCounts = 0;
  @observable pokemonTypes = [];
  @observable pokemonFullList = [];
  @observable isSearchByName = false;
  @observable searchError = '';
  @observable typeName = '';
  @observable isSearchByType = false;
  @observable showItemsCount = 20;
  @observable page = 1;

  @action setPage = (page) => {
    this.page = page;
    if (this.isSearchByType) {
      this.fetchPokemonWithType(this.typeName)
    } else {
      this.fetchInitPokemonData()
    }
  };

  @action fetchInitPokemonData = () => {
    this.isLoading = true;
    this.isSearchByName = false;
    this.isSearchByType = false;
    const count = this.showItemsCount;
    const page = this.page;
    const offset = page * count - count;
    const url = `${api}/pokemon?offset=${offset}&limit=${this.showItemsCount}`;
    const callback = (data) => {
      this.pokemonCounts = data['count'];
      this.pokemonFullList.length = 0;
      this.fetchEveryPokemonData(data['results']);
    };
    Http.get(url, callback)
  };

  @action fetchEveryPokemonData = (initPokemonData) => {
    let newList = [];
    initPokemonData.forEach(result => {
      const url = result['url'];
      const callback = (data) => {
        newList.push(data);
        if (newList.length === initPokemonData.length) {
          this.pokemonFullList = newList;
          this.isLoading = false;
          this.isAppLoaded = true;
        }
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
    this.isLoading = true;
    this.page = 1;
    const callback = (data) => {
      this.pokemonFullList = [data];
      this.isLoading = false;
      this.isSearchByName = true;
      this.isSearchByType = false
    };

    const errorCallback = () => {
      this.isLoading = false;
      this.searchError = 'No Pokemon With This Name';
    };
    Http.get(url, callback, errorCallback);
  };

  @action fetchPokemonWithType = (type) => {
    if (!type) {
      this.page = 1;
      this.fetchInitPokemonData();
      return;
    }
    this.isSearchByName = false;
    this.typeName = type;
    this.searchError = '';
    this.isLoading = true;
    this.page = this.isSearchByType ? this.page : 1;
    const url = `${api}/type/${type}`;
    const callback = (data) => {
      this.pokemonCounts = data['pokemon'].length;
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
        if (newList.length === pokemonData.length) {
          this.pokemonFullList = newList;
          this.isSearchByType = true;
          this.isLoading = false;
        }
      };
      Http.get(url, callback);
    });
  };

  @action changeShowItemsCount = (count) => {
    if (this.showItemsCount === count) return;
    this.showItemsCount = count;
    this.page = 1;
    if (this.isSearchByType) {
      this.fetchPokemonWithType(this.typeName)
    } else {
      this.fetchInitPokemonData()
    }
  };

  @action resetAll = () => {
    this.page = 1;
    this.fetchInitPokemonData();
  };

  @computed get getPokemonCounts() {
    return this.pokemonCounts;
  };

  @computed get getPokemonFullList() {
    return this.pokemonFullList;
  };

  @computed get getPokemonTypes() {
    return this.pokemonTypes.slice(0, -2);
  };

  @computed get getLoadingValue() {
    return this.isLoading
  };

  @computed get getIsAppLoadedValue() {
    return this.isAppLoaded
  };

  @computed get getSearchError() {
    return this.searchError
  };

  @computed get getShowItemsCount() {
    return this.showItemsCount
  };

  @computed get getPage() {
    return this.page
  };

  @computed get getSearchByValue() {
    return {
      isSearchByName: this.isSearchByName,
      isSearchByType: this.isSearchByType
    }
  };

};

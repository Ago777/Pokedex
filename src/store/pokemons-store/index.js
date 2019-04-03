import {observable, action, computed} from "mobx";

export default  class PokemonsStore {
  @observable pokemons = [];

  @action addPokemons = (pokemonsData) => {
    this.pokemons = pokemonsData;
  };

  @computed get getPokemons() {
    return this.pokemons;
  };
}

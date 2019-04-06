import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Pokemon extends Component {
  static propTypes = {
    pokemon: PropTypes.object.isRequired
  };

  render() {
    const {pokemon} = this.props;
    const pokemonImg = pokemon['sprites']['front_default'];
    const noImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png'

    return (
      <>
        <div className='flip-pokemon'>
          <div className='flip-pokemon-inner'>
            <div className='flip-pokemon-front'>
              <div className="pokemon">
                <img src={pokemonImg? pokemonImg : noImg} alt='Avatar'/>
                <div className="info">
                  <h4>{pokemon['name'].toUpperCase()}</h4>
                  <div>
                    {
                      pokemon['types'].map(type =>
                        <div key={type['slot']} className={`type ${type['type']['name']}`}>
                          {type['type']['name'].toUpperCase()}
                        </div>)
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className='flip-pokemon-back'>
              <h4>Stats</h4>
              <ul>
                {
                  pokemon['stats'].slice(0, 4).map(stat =>
                    <li key={stat['stat']['name']} className={stat['stat']['name']}>
                      {stat['stat']['name']}{' - '}{stat['base_stat']}
                    </li>)}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  };
}

export default Pokemon;
import React from 'react';
import './pc.css';

export default function PcCell({ pokemon, onClick }) {
  const classes = ['pc-cell'];
  if (pokemon) classes.push('has-pokemon');
  else classes.push('empty');

  return (
    <div
      className={classes.join(' ')}
      onClick={pokemon ? () => onClick(pokemon) : undefined}
      style={{ cursor: pokemon ? 'pointer' : 'default' }}
      title={pokemon ? pokemon.name : ''}
    >
      {pokemon && <img src={pokemon.imageUrl} alt={pokemon.name} className="pokemon-image" />}
    </div>
  );
}


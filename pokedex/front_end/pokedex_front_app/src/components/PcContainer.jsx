import React, { useState, useEffect } from 'react';
import Pc from './PcPokemon';
import Pokemons from './Pokemons';

export default function PcContainer() {
  const cellSize = 120; // taille fixe des cases
  const gap = 10; // gap entre cases

  // État pour stocker la taille de la fenêtre
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Met à jour la largeur à chaque redimensionnement
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Détermine dynamiquement le nombre de colonnes selon la largeur de la fenêtre
  let cols;
  if (windowWidth > 1200) cols = 8;
  else if (windowWidth > 900) cols = 6;
  else if (windowWidth > 600) cols = 4;
  else cols = 2;

  // Adapte aussi le nombre de lignes en fonction du nombre de colonnes
  // Tu peux ajuster comme tu veux ici
  let rows = 6;
  if (cols <= 4) rows = 4;

  const pokemons = [
    {
      id: 1,
      name: 'Bulbasaur',
      imageUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      position: 0,
    },
    {
      id: 5,
      name: 'Charmeleon',
      imageUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png',
      position: 1,
    },
    // Ajoute d'autres pokemons si tu veux
  ];

  // Calcule le style de position avec l'échelle selon les colonnes actuelles
  const getPositionStyle = (pos) => {
    const x = (pos % cols) * (cellSize + gap);
    const y = Math.floor(pos / cols) * (cellSize + gap);
    return {
      position: 'absolute',
      top: y,
      left: x,
      width: cellSize,
      height: cellSize,
      cursor: 'pointer',
    };
  };

  const handleClick = (pokemon) => {
    alert(`Tu as cliqué sur ${pokemon.name}`);
  };

  return (
    <>
      <div className="box-nav">
        <div className="arrow">{'◀'}</div>
        <div className="box-title">Box 1</div>
        <div className="arrow">{'▶'}</div>
      </div>
      <div
        style={{
          position: 'relative',
          width: cols * (cellSize + gap) - gap,
          height: rows * (cellSize + gap) - gap,
          margin: '0 auto',
          maxWidth: '90vw',
          maxHeight: '80vh',
        }}
      >
        <Pc rows={rows} cols={cols} cellSize={cellSize} gap={gap} />
        {pokemons.map((p) => (
          <Pokemons
            key={p.id}
            pokemon={p}
            style={getPositionStyle(p.position)}
            onClick={handleClick}
          />
        ))}
      </div>
    </>
  );
}

import React, { useState, useEffect } from 'react';
import Pokemons from './Pokemons';
import Navbar from './Navbar';

export default function PcContainer() {
  const cellSize = 120;
  const gap = 10;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetch('https://localhost/api/pokemons', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
    })
      .then(res => {
        if (!res.ok) throw new Error('Erreur réseau');
        return res.json();
      })
      .then(pokemons => {
        console.log('Données reçues depuis l’API :', pokemons); // <-- ici le log
        setPokemons(pokemons);
      })
      .catch(error => console.error('Erreur lors du fetch :', error));
  }, []);

  let cols;
  if (windowWidth > 1200) cols = 8;
  else if (windowWidth > 900) cols = 6;
  else if (windowWidth > 600) cols = 4;
  else cols = 2;

  return (
    <>
      <Navbar />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gap: gap,
          justifyContent: 'center',
          maxWidth: '90vw',
          margin: '0 auto',
        }}
      >
        {pokemons.map(pokemon => (
          <Pokemons
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => alert(`Tu as cliqué sur ${pokemon.name}`)}
          />
        ))}
      </div>
    </>
  );
}

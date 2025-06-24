import React, { useState, useEffect } from 'react';
import Pokemons from './Pokemons';
import Navbar from './Navbar';

export default function PcContainer() {
  const cellSize = 120;
  const gap = 10;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [pokemons, setPokemons] = useState([
    {
      id: 1,
      name: 'Bulbasaur',
      types: ['Plante', 'Poison'],
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      description: 'Bulbasaur est un Pokémon de type Plante et Poison.',
      position: 0,
    },
    {
      id: 2,
      name: 'Charmeleon',
      types: ['Feu'],
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png',
      description: 'Charmeleon est un Pokémon de type Feu.',
      position: 4,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newPokemonName, setNewPokemonName] = useState('');
  const [newPokemonTypes, setNewPokemonTypes] = useState('');
  const [newPokemonSize, setNewPokemonSize] =useState('');
  const [newPokemonSexe, setNewPokemonSexe] = useState('');
  const [newPokemonImageUrl, setNewPokemonImageUrl] = useState('');
  const [newPokemonDescription, setNewPokemonDescription] = useState('');

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

  let rows = cols <= 4 ? 4 : 6;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPokemonName.trim() || !newPokemonImageUrl.trim()) return;

    const newPokemon = {
      id: Date.now(),
      name: newPokemonName,
      types: newPokemonTypes.split(',').map((t) => t.trim()),
      imageUrl: newPokemonImageUrl,
      description: newPokemonDescription,
      position: pokemons.length,
    };

    setPokemons([...pokemons, newPokemon]);
    setNewPokemonName('');
    setNewPokemonTypes('');
    setNewPokemonSize('');
    setNewPokemonSexe('');
    setNewPokemonImageUrl('');
    setNewPokemonDescription('');
    setShowForm(false);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '10px' }}>
         <Navbar />

        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: '5px 10px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            borderRadius: '8px',
            border: '1px solid #ccc',
            background: '#e8f5e9',
            color: 'black',
          }}
        >
          Créer un Pokémon
        </button>
      </div>

      {/* MODALE CSS SIMPLE */}
      {showForm && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              width: '350px',
              boxShadow: '0 0 10px rgba(0,0,0,0.25)',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setShowForm(false)}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: 'transparent',
                border: 'none',
                fontSize: '1.2rem',
                cursor: 'pointer',
              }}
            >
              ✖
            </button>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              
              <input
                type="text"
                placeholder="Nom du Pokémon"
                value={newPokemonName}
                onChange={(e) => setNewPokemonName(e.target.value)}
                style={{ padding: '6px', borderRadius: '6px', border: '1px solid #ccc' }}
              />
              
              <input
                type="text"
                placeholder="Taille"
                value={newPokemonSize}
                onChange={(e) => setNewPokemonSize(e.target.value)}
                style={{ padding: '6px', borderRadius: '6px', border: '1px solid #ccc' }}
              />

              <input
                type="text"
                placeholder="Sexe"
                value={newPokemonSexe}
                onChange={(e) => setNewPokemonSexe(e.target.value)}
                style={{ padding: '6px', borderRadius: '6px', border: '1px solid #ccc' }}
              />

              <input
                type="text"
                placeholder="Types (séparés par des virgules)"
                value={newPokemonTypes}
                onChange={(e) => setNewPokemonTypes(e.target.value)}
                style={{ padding: '6px', borderRadius: '6px', border: '1px solid #ccc' }}
              />

              <input
                type="text"
                placeholder="URL de l'image"
                value={newPokemonImageUrl}
                onChange={(e) => setNewPokemonImageUrl(e.target.value)}
                style={{ padding: '6px', borderRadius: '6px', border: '1px solid #ccc' }}
              />

              <textarea
                placeholder="Description"
                value={newPokemonDescription}
                onChange={(e) => setNewPokemonDescription(e.target.value)}
                style={{ padding: '6px', borderRadius: '6px', border: '1px solid #ccc', height: '80px', resize: 'none' }}
              />

              <button
                type="submit"
                style={{
                  padding: '8px',
                  background: '#c8e6c9',
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Ajouter
              </button>
            </form>
          </div>
        </div>
      )}

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
            key={p.id}
            pokemon={p}
            style={getPositionStyle(p.position)}
            onClick={() => handleClick(p)}
          />
        ))}
      </div>
    </>
  );
}

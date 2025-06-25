import React, { useState, useEffect } from 'react';
import Pokemons from './Pokemons';
import Navbar from './Navbar';
import PokedexPopup from './PokedexPopup';
import ModeButton from './ModeButton';
import AddPokemon from './AddPokemon';

export default function PcContainer() {
  const cellSize = 120;
  const gap = 10;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [showForm, setShowForm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); 

  const [pokemons, setPokemons] = useState([]);


  const [newPokemonName, setNewPokemonName] = useState('');
  const [newPokemonTypes, setNewPokemonTypes] = useState('');
  const [newPokemonSize, setNewPokemonSize] = useState('');
  const [newPokemonSexe, setNewPokemonSexe] = useState('');
  const [newPokemonImageUrl, setNewPokemonImageUrl] = useState('');
  const [newPokemonDescription, setNewPokemonDescription] = useState('');

  // État pour stocker le Pokémon sélectionné
    const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Met à jour la largeur à chaque redimensionnement
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

  
  // Ouvre la popup avec le pokemon sélectionné
  const handleClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  // Ferme la popup
  const handleClose = () => {
    setSelectedPokemon(null);
  };
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '10px',
          position: 'relative',
          maxWidth: 800,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Navbar />

        {/* Desktop : bouton visible si plus large que 600px */}
        {windowWidth > 600 && (
          <div style={{ position: 'absolute', right: 0 }}>
            <ModeButton onClick={() => setShowForm(true)} />
          </div>
        )}

        {/* Mobile : bouton hamburger si fenêtre <= 600px */}
        {windowWidth <= 600 && (
          <div style={{ position: 'absolute', right: 0 }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              style={{
                fontSize: '1.5rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0 10px',
              }}
            >
              &#9776; {/* ≡ hamburger */}
            </button>

            {menuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '40px',
                  right: 0,
                  background: 'white',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                  borderRadius: '8px',
                  zIndex: 10,
                  padding: '10px',
                }}
              >
                <ModeButton
                  onClick={() => {
                    setShowForm(true);
                    setMenuOpen(false);
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODALE CSS SIMPLE */}
      {showForm && (
        <AddPokemon
          onAdd={(pokemon) => {
            setPokemons([...pokemons, pokemon]);
            setShowForm(false);
          }}
          onClose={() => setShowForm(false)}
        />
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
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => handleClick(pokemon)}
          />
        ))}

        {/* Popup, affichée seulement si un pokemon est sélectionné */}
        {selectedPokemon && (
          <PokedexPopup pokemon={selectedPokemon} onClose={handleClose} />
        )}
      </div>
    </>
  );
}

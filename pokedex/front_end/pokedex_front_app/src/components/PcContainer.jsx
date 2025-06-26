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

  const [mode, setMode] = useState('select');

  const [pokemons, setPokemons] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);

  const pokemonsPerPage = 48;
  const totalPages = Math.ceil(pokemons.length / pokemonsPerPage);

  const displayedPokemons = pokemons.slice(
    currentPage * pokemonsPerPage,
    (currentPage + 1) * pokemonsPerPage
  );

  const [selectedPokemon, setSelectedPokemon] = useState(null);

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
        setPokemons(pokemons);
      })
      .catch(error => console.error('Erreur lors du fetch :', error));
  }, []);

  let cols;
  if (windowWidth > 1200) cols = 8;
  else if (windowWidth > 900) cols = 6;
  else if (windowWidth > 600) cols = 4;
  else cols = 2;

  const editMode = mode === 'update';

  const handleUpdateSuccess = (updatedPokemon) => {
    setPokemons((prevPokemons) =>
      prevPokemons.map(p => (p.id === updatedPokemon.id ? updatedPokemon : p))
    );
    setSelectedPokemon(updatedPokemon);
  };

  const handleClick = (pokemon) => {
    if (mode === 'update' || mode === 'select') {
      setSelectedPokemon(pokemon);
    } else if (mode === 'add') {
      setShowForm(true);
    } else if (mode === 'delete') {
      if (window.confirm(`Supprimer ${pokemon.name} ?`)) {
        fetch(`https://localhost/api/pokemons/${pokemon.id}`, {
          method: 'DELETE',
        })
          .then(res => {
            if (!res.ok) throw new Error('Erreur lors de la suppression');
            setPokemons(pokemons.filter(p => p.id !== pokemon.id));
          })
          .catch(err => {
            alert('Erreur lors de la suppression : ' + err.message);
          });
      }
    }
  };

  const handleClose = () => {
    setSelectedPokemon(null);
  };

  const handleAddPokemon = (pokemon) => {
    setPokemons([...pokemons, pokemon]);
    setShowForm(false);
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
        <Navbar
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />

        {windowWidth > 600 && (
          <div style={{ position: 'absolute', right: 0 }}>
            <ModeButton
              mode={mode}
              setMode={(m) => {
                setMode(m);
                if (m === 'add') setShowForm(true);
                else setShowForm(false);
                setSelectedPokemon(null);
              }}
            />
          </div>
        )}

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
              &#9776;
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
                  mode={mode}
                  setMode={(m) => {
                    setMode(m);
                    if (m === 'add') setShowForm(true);
                    else setShowForm(false);
                    setSelectedPokemon(null);
                    setMenuOpen(false);
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {showForm && (
        <AddPokemon onAdd={handleAddPokemon} onClose={() => setShowForm(false)} />
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
        {displayedPokemons.map(pokemon => (
          <Pokemons
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => handleClick(pokemon)}
          />
        ))}

        {selectedPokemon && (
          <PokedexPopup
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
            editMode={mode === 'update'}
            onUpdateSuccess={handleUpdateSuccess}
          />
        )}
      </div>
    </>
  );
}

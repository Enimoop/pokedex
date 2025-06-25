import React from 'react';

export default function ModeButton({ onClick }) {
  return (
    <button
      onClick={onClick}
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
  );
}

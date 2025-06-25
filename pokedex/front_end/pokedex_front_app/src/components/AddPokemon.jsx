import React, { useState } from 'react';

export default function AddPokemon({ onAdd, onClose }) {
  const [name, setName] = useState('');
  const [types, setTypes] = useState('');
  const [size, setSize] = useState('');
  const [sex, setSex] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !imageUrl.trim()) return;

    onAdd({
      id: Date.now(),
      name,
      types: types.split(',').map(t => t.trim()),
      imageUrl,
      description,
      taille: size,
      sex,
      position: 0, // ou une autre logique pour la position
    });

    // Reset form
    setName('');
    setTypes('');
    setSize('');
    setSex('');
    setImageUrl('');
    setDescription('');
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
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
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '6px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            placeholder="Taille"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            style={{ padding: '6px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            placeholder="Sexe"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            style={{ padding: '6px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            placeholder="Types (séparés par des virgules)"
            value={types}
            onChange={(e) => setTypes(e.target.value)}
            style={{ padding: '6px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            placeholder="URL de l'image"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={{ padding: '6px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
  );
}

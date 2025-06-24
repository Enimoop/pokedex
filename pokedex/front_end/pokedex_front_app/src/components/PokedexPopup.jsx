import React, { useState } from 'react';
import PokemonTypeBadge from './PokemonTypeBadge';

const TYPES = [
  'Normal', 'Feu', 'Eau', 'Plante', 'Électrik', 'Glace', 'Combat',
  'Poison', 'Sol', 'Vol', 'Psy', 'Insecte', 'Roche', 'Spectre',
  'Dragon', 'Ténèbres', 'Acier', 'Fée'
];

const SEXES = ['♂', '♀', 'Inconnu'];

export default function InformationPopup({ pokemon, onClose }) {
  const [editMode, setEditMode] = useState(false);

  // États pour les champs éditables (initialisés aux valeurs actuelles)
  const [name, setName] = useState(pokemon.name);
  const [description, setDescription] = useState(pokemon.description || '');
  const [type1, setType1] = useState(pokemon.types?.[0] || '');
  const [type2, setType2] = useState(pokemon.types?.[1] || '');
  const [gender, setGender] = useState(pokemon.gender || '');

  if (!pokemon) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          borderRadius: 16,
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          display: 'flex',
          maxWidth: 600,
          width: '100%',
          padding: 20,
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          color: '#333',
          position: 'relative',
        }}
      >
        {/* Bouton crayon en haut à droite */}
        <button
          onClick={() => setEditMode(!editMode)}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            cursor: 'pointer',
            border: 'none',
            background: 'none',
            fontSize: 20,
            color: '#666',
          }}
          aria-label={editMode ? 'Quitter le mode édition' : 'Entrer en mode édition'}
          title={editMode ? 'Quitter le mode édition' : 'Modifier'}
        >
          ✏️
        </button>

        {/* Colonne gauche */}
        <div style={{ flex: '1 0 25%', textAlign: 'center' }}>
          <img
            src={pokemon.imageUrl}
            alt={pokemon.name}
            style={{ width: '100%', maxWidth: 200, objectFit: 'contain' }}
          />

          {editMode ? (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ marginTop: 10, marginBottom: 5, width: '90%', fontSize: 24, fontWeight: 'bold' }}
              />
              <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                <select
                  value={type1}
                  onChange={(e) => setType1(e.target.value)}
                  style={{ fontSize: 16, fontWeight: 'bold' }}
                >
                  <option value="">Type 1</option>
                  {TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <select
                  value={type2}
                  onChange={(e) => setType2(e.target.value)}
                  style={{ fontSize: 16, fontWeight: 'bold' }}
                >
                  <option value="">Type 2</option>
                  {TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <>
              <h2 style={{ marginTop: 10, marginBottom: 5 }}>{name}</h2>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
  {pokemon.types && pokemon.types.length > 0 ? (
    pokemon.types.map((t) => (
      <PokemonTypeBadge key={t} type={t} />
    ))
  ) : (
    <span style={{ color: '#555' }}>Aucun type</span>
  )}
</div>
            </>
          )}
        </div>

        {/* Colonne droite */}
<div style={{ 
  flex: '1 0 auto',  
  paddingLeft: 20, 
  minHeight: 300,
  boxSizing: 'border-box', 
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  maxWidth: 350,  // ou la largeur max que tu souhaites
width: '100%'
}}>
  <h3>Description</h3>
 {editMode ? (
  <textarea
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    rows={5}
    style={{ width: '100%', fontSize: 16, padding: 8, resize: 'vertical', flexGrow: 1 }}
  />
) : (
  <p
  style={{
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    maxWidth: '100%', // largeur max égale au parent
    maxHeight: '150px', // hauteur max fixe (ajuste à ta convenance)
    overflowY: 'auto', // scroll vertical si contenu trop grand
    margin: 0,
  }}
>
    {description || 'Pas de description disponible.'}
  </p>
)}

  <h4>Taille</h4>
  {editMode ? (
    <input
      type="text"
      value={pokemon.taille || ''}
      readOnly
      style={{ fontSize: 16, padding: 4, marginBottom: 10 }}
      placeholder="Taille (non modifiable)"
    />
  ) : (
    <p>{pokemon.taille ? `${pokemon.taille} m` : 'Inconnue'}</p>
  )}

  <h4>Sexe</h4>
  {editMode ? (
    <select
      value={gender}
      onChange={(e) => setGender(e.target.value)}
      style={{ fontSize: 16, padding: 4 }}
    >
      <option value="">Sélectionner</option>
      {SEXES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  ) : (
    <p>{gender || 'Inconnu'}</p>
  )}
</div>


      </div>
    </div>
  );
}

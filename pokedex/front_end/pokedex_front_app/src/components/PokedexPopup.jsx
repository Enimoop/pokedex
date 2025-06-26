import React, { useState, useEffect } from 'react';
import PokemonTypeBadge from './PokemonTypeBadge';

export default function PokedexPopup({ pokemon, onClose, editMode = false, onUpdateSuccess }) {
  const [types, setTypes] = useState([]);
  const [sexes, setSexes] = useState([]);

  const [name, setName] = useState(pokemon.name);
  const [description, setDescription] = useState(pokemon.description || '');
  const [type1, setType1] = useState(pokemon.type1?.id || '');
  const [type2, setType2] = useState(pokemon.type2?.id || '');
  const [gender, setGender] = useState(pokemon.sex?.id || '');

  useEffect(() => {
    fetch('https://localhost/api/references/types')
      .then(res => {
        if (!res.ok) throw new Error('Erreur réseau lors du fetch des types');
        return res.json();
      })
      .then(data => setTypes(data))
      .catch(() => setTypes([]));

    fetch('https://localhost/api/references/sexes')
      .then(res => {
        if (!res.ok) throw new Error('Erreur réseau lors du fetch des sexes');
        return res.json();
      })
      .then(data => setSexes(data))
      .catch(() => setSexes([]));
  }, []);

  useEffect(() => {
    setName(pokemon.name);
    setDescription(pokemon.description || '');
    setType1(pokemon.type1?.id || '');
    setType2(pokemon.type2?.id || '');
    setGender(pokemon.sex?.id || '');
  }, [pokemon]);

  if (!pokemon) return null;

  const handleSubmit = () => {
    const payload = {
      name,
      description,
      type1: type1 || null,
      type2: type2 || null,
      sex: gender || null,
    };

    fetch(`https://localhost/api/pokemons/${pokemon.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => {
        if (!res.ok) throw new Error('Erreur lors de la mise à jour');
        return res.json();
      })
      .then(updatedPokemon => {
        if (onUpdateSuccess) onUpdateSuccess(updatedPokemon);
        onClose();
      })
      .catch(err => {
        alert('Erreur lors de la mise à jour : ' + err.message);
      });
  };

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
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <div style={{ display: 'flex' }}>
          {/* Colonne gauche */}
          <div style={{ flex: '1 0 25%', textAlign: 'center' }}>
            <img
              src={pokemon.photo}
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
                    {types.map(t => (
                      <option key={t.id} value={t.id}>{t.libelle}</option>
                    ))}
                  </select>
                  <select
                    value={type2}
                    onChange={(e) => setType2(e.target.value)} 
                    style={{ fontSize: 16, fontWeight: 'bold' }}
                  >
                    <option value="">Type 2</option>
                    {types.map(t => (
                      <option key={t.id} value={t.id}>{t.libelle}</option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <>
                <h2 style={{ marginTop: 10, marginBottom: 5 }}>{name}</h2>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
                  {(pokemon.type1 || pokemon.type2) ? (
                    <>
                      {pokemon.type1 && <PokemonTypeBadge key={pokemon.type1.id} type={pokemon.type1.libelle} />}
                      {pokemon.type2 && <PokemonTypeBadge key={pokemon.type2.id} type={pokemon.type2.libelle} />}
                    </>
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
            maxWidth: 350,
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
                  maxWidth: '100%',
                  maxHeight: '150px',
                  overflowY: 'auto',
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
                onChange={e => setGender(parseInt(e.target.value))}
                style={{ fontSize: 16, padding: 4 }}
              >
                <option value="">Sélectionner</option>
                {sexes.map(s => (
                  <option key={s.id} value={s.id}>{s.libelle}</option>
                ))}
              </select>
            ) : (
              <p>{pokemon.sex?.libelle || 'Inconnu'}</p>
            )}
          </div>
        </div>

        {editMode && (
          <div style={{ textAlign: 'right' }}>
            <button
              onClick={handleSubmit}
              style={{
                padding: '8px 16px',
                backgroundColor: '#4caf50',
                border: 'none',
                borderRadius: '6px',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Valider
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

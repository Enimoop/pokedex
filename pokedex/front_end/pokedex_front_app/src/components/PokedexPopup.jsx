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
  const [photo, setPhoto] = useState(pokemon.photo);

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
    setPhoto(pokemon.photo || '');
  }, [pokemon]);

  if (!pokemon) return null;

  const handleSubmit = () => {
    const payload = {
      name,
      description,
      type1: type1 ? Number(type1) : null,
      type2: type2 ? Number(type2) : null,
      sex: gender ? Number(gender) : null,
      photo,
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
        <div style={{ display: 'flex', gap: 20 }}>
          {/* Colonne gauche */}
          <div
            style={{
              flex: '0 0 200px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 15,
            }}
          >
            <img
              src={photo}
              alt={name}
              style={{ width: 180, height: 180, objectFit: 'contain', borderRadius: 8 }}
            />
            {editMode ? (
              <>
                <input
                  type="text"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  placeholder="URL de la photo"
                  style={{
                    width: '100%',
                    padding: 6,
                    borderRadius: 6,
                    border: '1px solid #ccc',
                    marginTop: 10,
                    fontSize: 14,
                    textAlign: 'center',
                  }}
                />
                <input
                  type="text"
                  value={name}
                  maxLength={18}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    fontSize: 24,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    padding: 6,
                    borderRadius: 6,
                    border: '1px solid #ccc',
                    marginTop: 10,
                  }}
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
                <h2
                  style={{
                    margin: 0,
                    fontSize: 24,
                    fontWeight: 'bold',
                    width: '100%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  title={name}
                >
                  {name}
                </h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                  {pokemon.type1 && <PokemonTypeBadge key={pokemon.type1.id} type={pokemon.type1.libelle} />}
                  {pokemon.type2 && <PokemonTypeBadge key={pokemon.type2.id} type={pokemon.type2.libelle} />}
                </div>
              </>
            )}
          </div>

          {/* Colonne droite */}
          <div
            style={{
              flex: '1 1 350px',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              boxSizing: 'border-box',
              maxWidth: 350,
              minWidth: 350,
            }}
          >
            <div style={{ flex: '0 0 150px', paddingRight: 8 }}>
              <h3 style={{ marginTop: 0 }}>Description</h3>
              {editMode ? (
                <>
                  <textarea
                    value={description}
                    maxLength={200}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    style={{ width: '100%', height: '65%', resize: 'none', padding: 8, fontSize: 16, boxSizing: 'border-box' }}
                  />
                  <div style={{ textAlign: 'right', fontSize: 12, color: '#666' }}>
                    {description.length} / 200
                  </div>
                </>
              ) : (
                <p
                  style={{
                    margin: 0,
                    whiteSpace: 'normal',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                  }}
                  title={description}
                >
                  {description || 'Pas de description disponible.'}
                </p>
              )}
            </div>

            <div style={{ flex: '0 0 40px' }}>
              <h4 style={{ margin: '0 0 4px 0' }}>Taille</h4>
              {editMode ? (
                <input
                  type="text"
                  value={pokemon.taille || ''}
                  readOnly
                  style={{ fontSize: 16, padding: 4, width: '100%', boxSizing: 'border-box' }}
                  placeholder="Taille (non modifiable)"
                />
              ) : (
                <p style={{ margin: 0 }}>{pokemon.taille ? `${pokemon.taille} m` : 'Inconnue'}</p>
              )}
            </div>

            <div style={{ flex: '0 0 40px' }}>
              <h4 style={{ margin: '0 0 4px 0' }}>Sexe</h4>
              {editMode ? (
                <select
                  value={gender}
                  onChange={e => setGender(parseInt(e.target.value))}
                  style={{ fontSize: 16, padding: 4, width: '100%', boxSizing: 'border-box' }}
                >
                  <option value="">Sélectionner</option>
                  {sexes.map(s => (
                    <option key={s.id} value={s.id}>{s.libelle}</option>
                  ))}
                </select>
              ) : (
                <p style={{ margin: 0 }}>{pokemon.sex?.libelle || 'Inconnu'}</p>
              )}
            </div>
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

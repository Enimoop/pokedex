import React, { useState, useEffect} from 'react';

export default function AddPokemon({ onAdd, onClose }) {
  const [typesList, setTypesList] = useState([]);
  const [sexesList, setSexesList] = useState([]);

  const [name, setName] = useState('');
  const [type1, setType1] = useState('');
  const [type2, setType2] = useState('');
  const [size, setSize] = useState('');
  const [sex, setSex] = useState('');
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch('https://localhost/api/references/types')
      .then(res => res.ok ? res.json() : Promise.reject('Erreur fetch types'))
      .then(data => setTypesList(data))
      .catch(() => setTypesList([]));

    fetch('https://localhost/api/references/sexes')
      .then(res => res.ok ? res.json() : Promise.reject('Erreur fetch sexes'))
      .then(data => setSexesList(data))
      .catch(() => setSexesList([]));
  }, []);

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!name.trim() || !photo.trim()) return;

 const payload = {
    name,
    taille: size,
    sex: sex ? parseInt(sex, 10) : null,
    types: [type1, type2].filter(t => t).map(t => parseInt(t, 10)),
    photo,
    description,
    position: 0,
  };

  fetch('https://localhost/api/pokemons', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then(res => {
      if (!res.ok) throw new Error('Erreur lors de la création');
      return res.json();
    })
    .then(createdPokemon => {
      onAdd(createdPokemon);  // on ajoute le Pokémon retourné par l'API
      // reset et fermeture
      setName('');
      setType1('');
      setType2('');
      setSize('');
      setSex('');
      setPhoto('');
      setDescription('');
      onClose();
    })
    .catch(err => {
      alert('Erreur lors de la création : ' + err.message);
    });
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
           <select
            value={sex}
            onChange={e => setSex(e.target.value)}
            style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc' }}
          >
            <option value="">Sexe</option>
            {sexesList.map(s => (
              <option key={s.id} value={s.id}>{s.libelle}</option>
            ))}
          </select>
          <select
            value={type1}
            onChange={e => setType1(e.target.value)}
            style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc' }}
          >
            <option value="">Type 1</option>
            {typesList.map(t => (
              <option key={t.id} value={t.id}>{t.libelle}</option>
            ))}
          </select>

          <select
            value={type2}
            onChange={e => setType2(e.target.value)}
            style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc' }}
          >
            <option value="">Type 2</option>
            {typesList.map(t => (
              <option key={t.id} value={t.id}>{t.libelle}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="URL de l'image"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
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

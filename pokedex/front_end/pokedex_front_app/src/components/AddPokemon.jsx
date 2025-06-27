import React, { useState, useEffect } from 'react';

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

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  function isValidUrl(string) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' +               
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
    '((\\d{1,3}\\.){3}\\d{1,3}))' +   
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
    '(\\?[;&a-z\\d%_.~+=-]*)?' +        
    '(\\#[-a-z\\d_]*)?$', 'i'            
  );
  return !!pattern.test(string);
}


  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !size.trim() ||
      !sex.trim() ||
      !type1.trim() ||
      !photo.trim() ||
      !description.trim()
    ) {
      alert('Merci de remplir tous les champs obligatoires (sauf Type 2).');
      return;
    }

    if (!isValidUrl(photo.trim())) {
      alert('Veuillez saisir une URL valide pour l\'image.');
      return;
    }

    setIsSubmitting(true);

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
        onAdd(createdPokemon);
        setName('');
        setType1('');
        setType2('');
        setSize('');
        setSex('');
        setPhoto('');
        setDescription('');
        setIsSubmitting(false);
        onClose();
      })
      .catch(err => {
        alert('Erreur lors de la création : ' + err.message);
        setIsSubmitting(false);
      });
  };

  return (
    <div className="addpokemon-overlay" onClick={onClose}>
      <div className="addpokemon-container" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="addpokemon-form">
          <input
            type="text"
            placeholder="Nom du Pokémon"
            maxLength={18}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="addpokemon-input"
          />
          <input
            type="number"
            step="any"
            placeholder="Taille"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="addpokemon-input"
          />
          <select
            value={sex}
            onChange={e => setSex(e.target.value)}
            className="addpokemon-select"
          >
            <option value="">Sexe</option>
            {sexesList.map(s => (
              <option key={s.id} value={s.id}>{s.libelle}</option>
            ))}
          </select>
          <select
            value={type1}
            onChange={e => setType1(e.target.value)}
            className="addpokemon-select"
          >
            <option value="">Type 1</option>
            {typesList.map(t => (
              <option key={t.id} value={t.id}>{t.libelle}</option>
            ))}
          </select>
          <select
            value={type2}
            onChange={e => setType2(e.target.value)}
            className="addpokemon-select"
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
            className="addpokemon-input"
          />
          <textarea
            placeholder="Description"
            value={description}
            maxLength={200}
            onChange={(e) => setDescription(e.target.value)}
            className="addpokemon-textarea"
          />
          <button type="submit" className="addpokemon-button" disabled={isSubmitting}>
            {isSubmitting ? 'Envoi...' : 'Ajouter'}
          </button>
        </form>
      </div>
    </div>
  );
}

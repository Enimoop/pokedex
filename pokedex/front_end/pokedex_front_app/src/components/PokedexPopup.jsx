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
  const [size, setSize] = useState(pokemon.taille || '');

  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setSize(pokemon.taille || '');
    setPhoto(pokemon.photo || '');
  }, [pokemon]);

  if (!pokemon) return null;

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

  const handleSubmit = () => {
    if (!photo.trim()) {
      alert('Le champ "URL de la photo" est obligatoire.');
      return;
    }
    if (!isValidUrl(photo.trim())) {
      alert('Veuillez saisir une URL valide pour l\'image.');
      return;
    }
    if (!name.trim()) {
      alert('Le champ "Nom" est obligatoire.');
      return;
    }
    if (!description.trim()) {
      alert('Le champ "Description" est obligatoire.');
      return;
    }
    const tailleNumber = parseFloat(size);
    if (isNaN(tailleNumber) || tailleNumber <= 0) {
      alert('Le champ "Taille" doit être un nombre valide supérieur à 0 avec un point comme séparateur décimal.');
      return;
    }
    if (!gender) {
      alert('Le champ "Sexe" est obligatoire.');
      return;
    }
    if (!type1) {
      alert('Le champ "Type 1" est obligatoire.');
      return;
    }

    setIsSubmitting(true); 

    const payload = {
      name,
      description,
      type1: Number(type1),
      type2: type2 ? Number(type2) : null,
      sex: Number(gender),
      photo,
      taille: tailleNumber,
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
        alert('Mise à jour réussie !');
        onClose();
      })
      .catch(err => {
        alert('Erreur lors de la mise à jour : ' + err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="pokedex-popup-overlay" onClick={onClose}>
      <div className="pokedex-popup-container" onClick={e => e.stopPropagation()}>
        <div className="pokedex-popup-main">
          <div className="pokedex-popup-left">
            <img src={photo} alt={name} />
            {editMode ? (
              <>
                <input
                  type="text"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  placeholder="URL de la photo"
                  className="pokedex-popup-input-photo"
                />
                <input
                  type="text"
                  value={name}
                  maxLength={18}
                  onChange={(e) => setName(e.target.value)}
                  className="pokedex-popup-input-name"
                />
                <div className="pokedex-popup-type-selects">
                  <select
                    value={type1}
                    onChange={(e) => setType1(e.target.value)}
                    className="pokedex-popup-type-select"
                  >
                    <option value="">Type 1</option>
                    {types.map(t => (
                      <option key={t.id} value={t.id}>{t.libelle}</option>
                    ))}
                  </select>
                  <select
                    value={type2}
                    onChange={(e) => setType2(e.target.value)}
                    className="pokedex-popup-type-select"
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
                <h2 title={name} style={{ margin: 0, fontSize: 24, fontWeight: 'bold', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {name}
                </h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                  {pokemon.type1 && <PokemonTypeBadge key={pokemon.type1.id} type={pokemon.type1.libelle} />}
                  {pokemon.type2 && <PokemonTypeBadge key={pokemon.type2.id} type={pokemon.type2.libelle} />}
                </div>
              </>
            )}
          </div>

          <div className="pokedex-popup-right">
            <div className="pokedex-popup-description">
              <h3>Description</h3>
              {editMode ? (
                <>
                  <textarea
                    value={description}
                    maxLength={200}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="pokedex-popup-textarea"
                  />
                  <div className="pokedex-popup-description-counter">
                    {description.length} / 200
                  </div>
                </>
              ) : (
                <p title={description} style={{ margin: 0, whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                  {description || 'Pas de description disponible.'}
                </p>
              )}
            </div>

            <div className="pokedex-popup-size">
              <h4>Taille</h4>
              {editMode ? (
                <input
                  type="number"
                  step="any"
                  min="0"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="Taille en mètres"
                  className="pokedex-popup-input-size"
                />
              ) : (
                <p style={{ margin: 0 }}>{pokemon.taille ? `${pokemon.taille} m` : 'Inconnue'}</p>
              )}
            </div>

            <div className="pokedex-popup-sex">
              <h4>Sexe</h4>
              {editMode ? (
                <select
                  value={gender}
                  onChange={e => setGender(parseInt(e.target.value))}
                  className="pokedex-popup-select-sex"
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
          <div className="pokedex-popup-button-wrapper">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="pokedex-popup-submit-button"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Valider'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

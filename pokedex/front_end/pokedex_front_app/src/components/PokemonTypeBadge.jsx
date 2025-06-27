import React from 'react';

const typeImages = {
  Normal: '/assets/types/normal.png',
  Feu: '/assets/types/feu.png',
  Eau: '/assets/types/eau.png',
  Plante: '/assets/types/plante.png',
  Electrik: '/assets/types/elektrik.png',
  Glace: '/assets/types/glace.png',
  Combat: '/assets/types/combat.png',
  Poison: '/assets/types/poison.png',
  Sol: '/assets/types/sol.png',
  Vol: '/assets/types/vol.png',
  Psy: '/assets/types/psy.png',
  Insecte: '/assets/types/insecte.png',
  Roche: '/assets/types/roche.png',
  Spectre: '/assets/types/spectre.png',
  Dragon: '/assets/types/dragon.png',
  Ténèbres: '/assets/types/tenebres.png',
  Acier: '/assets/types/acier.png',
  Fée: '/assets/types/fee.png',
};

export default function PokemonTypeBadge({ type }) {
  const imgSrc = typeImages[type] || null;

  return imgSrc ? (
    <img
      src={imgSrc}
      alt={type}
      title={type}
      style={{
        width: 80,
        height: 80,
        margin: '0 4px',
        objectFit: 'contain',
      }}
    />
  ) : (
    <span>{type}</span>
  );
}
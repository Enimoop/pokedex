export default function Pokemons({ pokemon, onClick }) {
  return (
    <div
      className="pc-cell"
      style={{
        width: '120px',
        height: '140px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClick}
      title={pokemon.name}
    >
      <img
        src={pokemon.photo}
        alt={pokemon.name}
        style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }}
      />
    </div>
  );
}

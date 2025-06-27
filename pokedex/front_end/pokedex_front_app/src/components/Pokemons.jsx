export default function Pokemons({ pokemon, onClick }) {
  return (
    <div
      className="pc-cell"
      onClick={onClick}
      title={pokemon.name}
    >
      <img
        src={pokemon.photo}
        alt={pokemon.name}
      />
    </div>
  );
}

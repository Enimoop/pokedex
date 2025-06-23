export default function Pokemons({ pokemon, style, onClick }) {
  return (
    <img
      src={pokemon.imageUrl}
      alt={pokemon.name}
      className="pc-pokemon"
      style={style} // position absolue
      onClick={() => onClick(pokemon)}
    />
  );
}
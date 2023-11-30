import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import "./styles/PokeInfoPage.css"

const PokeInfoPage = () => {
  const { id } = useParams();

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const [pokemon, getPokemon] = useFetch(url);

  useEffect(() => {
    getPokemon();
  }, []);
 
console.log(pokemon)
  return (
    <div className="page-container" >
    <div className="container">
      <article>
        <img  className="img-center" src={pokemon?.sprites.other["official-artwork"].front_default}alt="poke"/>
        <h2>{pokemon?.name}</h2>
        <div className="types-abilities-container">
        <div className="types__nom">
  <h3>Types</h3>
  <ul className="types">
    {pokemon?.types.map((type) => (
      <li className="value__types" key={type.type.name}>
        <div className="type-square">{type.type.name}</div>
      </li>
    ))}
  </ul>
</div>
<div className="abilities">
  <h3>Abilities</h3>
  <ul className="abilities-list">
    {pokemon?.abilities.map((ability) => (
      <li key={ability.ability.name} className="ability-item">
        {ability.ability.name}
      </li>
    ))}
  </ul>
</div>
</div>   
        
        {/* Mostrar estadísticas */}
  <div className="stats">
  <div className="stats__separator">
  <h3 className="stats__title">Stats</h3>
  <hr className="separator" />
  </div>
  <dl>
    {pokemon?.stats
      .filter(
        (stat) =>
          stat.stat.name === "hp" ||
          stat.stat.name === "defense" ||
          stat.stat.name === "attack" ||
          stat.stat.name === "speed"
      )
      .map((stat) => (
        <div key={stat.stat.name} className="stat-bar">
          <dt>{stat.stat.name}</dt>
          <dd>
            <div
              className="stat-bar-fill"
              style={{ width: `${(stat.base_stat / 150) * 100}%` }}
            ></div>
            {stat.base_stat}
          </dd>
        </div>
      ))}
  </dl>
</div>
      </article>
    </div>
    </div>
  );
};

export default PokeInfoPage;

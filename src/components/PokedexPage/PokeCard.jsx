import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import "./styles/PokeCard.css";


const PokeCard = ({ url,selectedType }) => {

  const desiredStats = ["hp", "defense", "attack", "speed"];

  const [infoPoke, getInfoPoke] = useFetch(url);

  useEffect(() => {
    getInfoPoke();
  }, []);

  
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/pokedex/${infoPoke?.id}`);
  };
  const filteredStats = infoPoke?.stats.filter(
    (infoStat) => desiredStats.includes(infoStat.stat.name.toLowerCase())
  );
  
  return (
    <div className="poke__container" >
      <article className="poke__article" onClick={handleNavigate}>
        <header className="poke__header">
          <img
            className="img"
            src={infoPoke?.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </header>
        <section>
          <h3>{infoPoke?.name}</h3>
          <ul className="poke__type" >
            {infoPoke?.types.map((infoType) => (
              <li key={infoType.type.url}>
                {infoType.type.name}
              </li>
            ))}
          </ul>
          <h5>Type</h5>
          </section>
          <hr className="poke__separator" />
          <section className="poke__stats">
  <ul className="poke__statss_ul">
    {filteredStats && filteredStats.map((infoStat) => (
      <li className={`poke__stats_li ${infoStat.stat.name.toLowerCase()}-box`} key={infoStat.stat.url}>
        <span>{infoStat.stat.name}</span>
        <span>{infoStat.base_stat}</span>
      </li>
    ))}
  </ul>
</section>
      </article>
    </div>
  );
};

export default PokeCard;

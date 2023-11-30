import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import PokeCard from "../components/PokedexPage/PokeCard";
import SelectType from "../components/PokedexPage/SelectType";
import "./styles/PokedexPage.css";

const PokedexPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("allPokemons");

  const trainerName = useSelector((store) => store.trainerName);

  const url = "https://pokeapi.co/api/v2/pokemon?limit=5&offset=0";
  const [pokemons, getPokemons, getByTypePokemons] = useFetch(url);

  useEffect(() => {
    if (selectValue === "allPokemons") {
      getPokemons();
    } else {
      getByTypePokemons(selectValue);
    }
  }, [selectValue]);

  const inputSearch = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputValue(inputSearch.current.value.toLowerCase().trim());
    inputSearch.current.value = "";
  };

  const cbFilter = (poke) => {
    //filtro por nombre en el input
    const isTheFilter = poke.name.includes(inputValue);
    return isTheFilter;
  };
  

  return (
    <>  
    <div className="banner">
    <img src="./images/image1.png" alt="" />
    <img className="img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png" alt="poke" />
    </div>
    <div className="page__container">
      <div><img src="./public/image1.png" alt="" /></div>
      <p className="page__p">
        {" "}
        <span className="page__span">Welcome </span>
        <span className="page__span">{trainerName}</span>, here you can find
        favorite pokemon.let's go!{" "}
      </p>
      <div className="flex-container">
    <form className="page__form" onSubmit={handleSubmit}>
      <input className="page__input" ref={inputSearch} type="text" />
      <button className="page__btn">Search</button>
    </form>
    <SelectType setSelectValue={setSelectValue}  />
  </div>
  <div className="pokemon-card-container">
  {pokemons?.results.filter(cbFilter).map((poke) => (
    <PokeCard key={poke.url} url={poke.url}  className="pokemon-card" />
  ))}
</div>
    </div>
    </>
  );
  
};

export default PokedexPage;

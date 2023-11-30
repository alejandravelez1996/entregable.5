import { useEffect, useRef } from "react";
import useFetch from "../../hooks/useFetch";
import "./styles/SelectType.css";

const SelectType = ({ setSelectValue }) => {
  const url = "https://pokeapi.co/api/v2/type";

  const [typesInfo, getTypesInfo] = useFetch(url);

  useEffect(() => {
    getTypesInfo();
  }, []);

  const selectElement = useRef();

  const handleChange = () => {
    setSelectValue(selectElement.current.value);
    
  };
  console.log(typesInfo)
  return (
    <div className="selector__container">
    <select className="selector" ref={selectElement} onChange={handleChange}>
      <option className="select" value="allPokemons">
        all
      </option>
      {typesInfo?.results.map((type) => (
        <option className="select" key={type.url} value={type.url}>
          {type.name}
        </option>
      ))}
    </select>

    </div>
  );
};

export default SelectType;

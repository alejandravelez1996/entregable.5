import { useRef } from "react";
import { setTrainerName } from "../store/slices/trainerName.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./styles/HomePage.css"

const HomePage = () => {

    const inputName = useRef()

   const dispatch= useDispatch()

   const navigate = useNavigate()

    const handleSubmit = e =>{
      e.preventDefault()
      dispatch(setTrainerName(inputName.current.value.trim()))
      navigate('/pokedex') 
    }


  return (
    <div className="pokedex__container">
      <div className="pokedex"> <img src="./images/image1.png" alt="" /></div>
      <h2 className="hi__trainer">Hi Trainer</h2>
      <p className="poke__p">To start, please give me you trainer name</p>
      <form className="poke__form" onSubmit={handleSubmit}>
        <input className="poke__input" ref={inputName} type="text" />
        <button className="poke__btn" >Catch them all!</button>
      </form>
      
      
      <div className="poke__img"><img className="img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png" alt="poke" /></div>
      
    </div>
  )
}

export default HomePage

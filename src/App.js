import React from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"
import logo from "./images/poklogo.png";
import { type } from "@testing-library/user-event/dist/type";


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      pokemons: [],
      pokePictures: [],
      pokemon :{},
      height:"",
      type:"",
      weight:"",
    }
  }
  componentDidMount = () => {
    axios.get("https://pokeapi.co/api/v2/pokemon").then((result) => {
      // console.log("resultat:" , result);
      // console.log("name Of pokemon is ", result.data.results);
      result.data.results.map(pokemon => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then(resultat => {
          // console.log("l'image est ",resultat.data.sprites.front_default)
          var array = this.state.pokePictures
          array.push(resultat.data.sprites.other.dream_world.front_default)
          this.setState({
            pokePictures: array,
          })
          // console.log("les images sont +", this.state.pokePictures);

        })
      })
      this.setState({
        pokemons: result.data.results,
      })
      // console.log("la valeur de pokémon est", this.state.pokemons)
    })
  }
  getPoke = (pokemon) => {
    axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemon).then((result) => {
      console.log("resultat:", result);
      console.log("data:", result.data); 
      const pokemon = result.data
      const height = pokemon.height
      const type = pokemon.types
      const weight = pokemon.weight
      this.setState({
        pokemon:result.data,
        height : height,
        type : type,
        weight:weight,
      })
      console.log(result.data.name)
      // console.log(result.data.sprites.front_default);
    })
  }



  render() {
    // console.log(this.state.pokePictures)
    // this.getPoke("pikachu")
    // console.log(this.state.pokemons);
    return (
      <div className="listOfPok">
        <div>
          <h1 className="logo">
          <img src={logo} height="150px"/>
          </h1>
          <div className="cardpok">
            <header>
              <img src={this.state.pokemon?.sprites?.other.dream_world.front_default} height="300px" />
              <div className="stats">
              <p className="nameOfPok"> {this.state.pokemon.name}{}</p>
              <p>height : {this.state.height}</p>
              <p>weight: {this.state.weight}</p>
              </div>
              </header>
        <h2>{this.state.pokemons.map((pokemon, index) => {
          return <div onClick={()=>this.getPoke(pokemon.name)} className="poke" >
            <img className="picOfPok" src={this.state.pokePictures[index]} height="80px"/>
            <p className="listOfPokemon">{pokemon.name}</p>
          </div>
        })}</h2>
        </div>
        </div>
      </div>
    )

  }
}

export default App;

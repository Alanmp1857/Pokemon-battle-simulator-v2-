import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Pokedex from "./Pokedex";
import Stats from "./Stats";
import charmander from "./images/charmander.png";
import { types } from "./Data";
import axios from "axios";

const fileteredData = [];

const details = [];

function Teambuilder() {
  const [clicked, setClicked] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [teamPokemon, setTeamPokemon] = useState("");
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const url1 = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
    // console.log("sdnf");
    axios.get(url1).then((resp) => {
      setPokemons(resp.data.results);
    });
  }, []);

  useEffect(() => {
    const urls = [];
    for (let ele of pokemons) {
      urls.push(ele.url);
    }
    axios.all(urls.map((url) => axios.get(url))).then((res) => {
      let obj = {};
      for (let ele in res[0].data) {
        // console.log(ele);
        if (ele === "name") {
          obj[ele] = res[0].data[ele];
        }
        if (ele === "abilities") {
          console.log(res[0].data[ele][0].ability.name);
          obj[ele] = [
            res[0].data[ele][0].ability.name,
            res[0].data[ele][1].ability.name,
          ];
        }
        if (ele === "types") {
          console.log(
            res[0].data[ele][0].type.name,
            res[0].data[ele][1].type.name
          );
          obj[ele] = [
            res[0].data[ele][0].type.name,
            res[0].data[ele][1].type.name,
          ];
        }
        if (ele === "stats") {
          let stats = [
            { hp: res[0].data[ele][0].base_stat },
            { Atk: res[0].data[ele][1].base_stat },
            { Def: res[0].data[ele][2].base_stat },
            { Spa: res[0].data[ele][3].base_stat },
            { Spd: res[0].data[ele][4].base_stat },
            { Spe: res[0].data[ele][5].base_stat },
          ];
          let sum = 0;
          for (let obj of res[0].data[ele]) {
            sum += obj.base_stat;
          }
          stats.push({ Bst: sum });
          console.log(stats);
        }
      }
      // console.log(res[0]);
      // console.log(res[0].data.abilities[0].ability.name);
      // console.log(res[0].data.abilities[1].ability.name);
      console.log(res[0].data);
    });
  }, [pokemons]);

  return (
    <div className="h-full bg-green-400">
      <div className="h-full p-4 ">
        <Button
          onClick={() => setClicked(!clicked)}
          variant="contained"
          color="primary"
        >
          Add Team
        </Button>
        <div className="bg-blue-400 h-full w-full flex">
          <div className="h-full bg-orange-600 w-3/4">
            {clicked && <Pokedex sPokemon={setSelectedPokemon} />}
          </div>
          <div className="w-1/4 bg-gradient-to-r from-orange-500 to-red-500 h-full">
            <div className="w-full h-12 bg-yellow-400 flex">
              {selectedPokemon.map((pokemon) => {
                return (
                  <img
                    onClick={() => setTeamPokemon(pokemon)}
                    className="scale-125"
                    src={require(`./images/${pokemon.toLowerCase()}.png`)}
                  />
                );
              })}
            </div>
            {teamPokemon && (
              <h2 className="w-full text-center">{teamPokemon}</h2>
            )}
            <div className="w-full h-1/4 flex justify-center">
              {teamPokemon && (
                <img
                  className="scale-[1.5]"
                  src={require(`./images/charmander.png`)}
                />
              )}
            </div>
            <div className="w-full">
              <div className="h-6 m-4 w-12 text-center border-black border-2 rounded bg-green-400">
                Blaze
              </div>
            </div>
            <div className="w-full flex justify-center">
              {teamPokemon && <Stats selectedPokemon={selectedPokemon} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teambuilder;

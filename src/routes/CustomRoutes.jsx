import { Routes, Route } from "react-router-dom";
import React from "react";
import Pokedex from "../components/Pokedex/Pokedex";
import PokemonDetails from "../components/PokemonDetails/PokemonDetails";
      
function CustomRoutes() {
      return( <Routes>
            <Route path="/" element={<Pokedex/>}/>
            <Route path="/pokemon/:id" element={<PokemonDetails/>}/>
      </Routes>
      )
}

export default CustomRoutes;

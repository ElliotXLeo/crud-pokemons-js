'use strict';

import crudPokemon from "./crudPokemon.js";

const documentReady = () => {
  crudPokemon();
};

document.addEventListener('DOMContentLoaded', documentReady);
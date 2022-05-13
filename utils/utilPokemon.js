let timeoutId = 0;

export const generateId = () => {
  // if (localStorage.getItem(dataBase)) {
  //   const pokemons = JSON.parse(localStorage.getItem(dataBase));
  //   const ids = pokemons.length ? pokemons.map(element => element._id) : [0];
  //   return Math.max(...ids) + 1
  // } else {
  //   return 1;
  // }
  if (localStorage.getItem('crud-pokemons-id')) {
    let id = +localStorage.getItem('crud-pokemons-id');
    localStorage.setItem('crud-pokemons-id', ++id);
    return id;
  } else {
    localStorage.setItem('crud-pokemons-id', 1);
    return 1;
  }
};

export const showAlert = (type, content) => {
  const contenedorAlerta = document.querySelector('#contenedorAlerta');
  clearTimeout(timeoutId);
  contenedorAlerta.classList.remove('bg-primary');
  contenedorAlerta.classList.remove('bg-success');
  contenedorAlerta.classList.remove('bg-danger');
  contenedorAlerta.classList.add(type);
  contenedorAlerta.innerHTML = content;
  timeoutId = setTimeout(() => {
    contenedorAlerta.innerHTML = '';
  }, 5000);
};

export const getFormData = () => {
  const documentFormPokemon = document.forms['formPokemon'];
  const id = documentFormPokemon['id'].value;
  const nombre = documentFormPokemon['nombre'].value;
  const tipo = documentFormPokemon['tipo'].value;
  const hp = documentFormPokemon['hp'].value;
  const ataque = documentFormPokemon['ataque'].value;
  const especial = documentFormPokemon['especial'].value;
  const urlImagen = documentFormPokemon['url-imagen'].value;

  return ({ id, nombre, tipo, hp, ataque, especial, urlImagen });
};

export const validateForm = () => {
  const documentFormPokemon = document.forms['formPokemon'];
  const nombre = documentFormPokemon['nombre'].value;
  const tipo = documentFormPokemon['tipo'].value;
  const hp = documentFormPokemon['hp'].value;
  const ataque = documentFormPokemon['ataque'].value;
  const especial = documentFormPokemon['especial'].value;
  const urlImagen = documentFormPokemon['url-imagen'].value;

  return [nombre.trim(), tipo.trim(), hp.trim(), ataque.trim(), especial.trim(), urlImagen.trim()].includes('');
};

export const resetForm = () => {
  const documentFormPokemon = document.forms['formPokemon'];
  documentFormPokemon['id'].value = '';
  documentFormPokemon['nombre'].value = '';
  documentFormPokemon['tipo'].value = '';
  documentFormPokemon['hp'].value = '';
  documentFormPokemon['ataque'].value = '';
  documentFormPokemon['especial'].value = '';
  documentFormPokemon['url-imagen'].value = '';
};
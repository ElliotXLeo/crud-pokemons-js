import { generateId, getFormData, resetForm, showAlert, validateForm } from "../utils/utilPokemon.js";
import { Pokemon } from "./Pokemon.js";

const crudPokemon = () => {
  const pokemonsData = 'crud-pokemons';
  let pokemons = [];

  const formPokemon = document.querySelector('#formPokemon');

  const createPokemon = () => {
    const { nombre, tipo, hp, ataque, especial, urlImagen } = getFormData();
    if (validateForm()) {
      showAlert('bg-danger', 'Completar todos los campos');
    } else {
      pokemons = [...pokemons, new Pokemon(generateId(), nombre, tipo, +hp, ataque, especial, urlImagen)];
      localStorage.setItem(pokemonsData, JSON.stringify(pokemons));
      resetForm();
      readPokemons();
      showAlert('bg-primary', 'Registro creado');
    }
  };

  const readPokemons = () => {
    const tBodyPokemon = document.querySelector('#tBodyPokemon');
    tBodyPokemon.innerHTML = '';
    pokemons.forEach((element) => {
      const { _id, _nombre, _tipo, _hp, _ataque, _especial, _urlImagen } = element;

      const fragment = document.createDocumentFragment();
      const tableRow = document.createElement('tr');

      const tHId = document.createElement('th');
      tHId.textContent = _id;

      const tDNombre = document.createElement('td');
      tDNombre.textContent = _nombre;

      const tDTipo = document.createElement('td');
      tDTipo.textContent = _tipo;

      const tDHp = document.createElement('td');
      tDHp.textContent = _hp;

      const tDAtaque = document.createElement('td');
      tDAtaque.textContent = _ataque;

      const tDEspecial = document.createElement('td');
      tDEspecial.textContent = _especial;

      const tDUrlImage = document.createElement('td');
      tDUrlImage.style.maxWidth = '128px'

      const tDUrlImageImg = document.createElement('img');
      tDUrlImageImg.setAttribute('src', _urlImagen);
      tDUrlImageImg.setAttribute('alt', _nombre);
      tDUrlImageImg.classList.add('img-fluid');

      tDUrlImage.appendChild(tDUrlImageImg);

      const tDActions = document.createElement('td');

      const tDButtonRead = document.createElement('button');
      tDButtonRead.textContent = '✏';
      tDButtonRead.addEventListener('click', () => readPokemon(_id));
      tDButtonRead.classList.add(...['bg-success', 'rounded', 'border-0', 'mx-1', 'p-0']);

      const tDButtonDelete = document.createElement('button');
      tDButtonDelete.textContent = '🗑';
      tDButtonDelete.addEventListener('click', () => deletePokemon(_id));
      tDButtonDelete.classList.add('bg-danger');
      tDButtonDelete.classList.add('rounded');
      tDButtonDelete.classList.add('border-0');
      tDButtonDelete.classList.add('mx-1');
      tDButtonDelete.classList.add('p-0');

      tDActions.appendChild(tDButtonRead);
      tDActions.appendChild(tDButtonDelete);

      tableRow.appendChild(tHId);
      tableRow.appendChild(tDNombre);
      tableRow.appendChild(tDTipo);
      tableRow.appendChild(tDHp);
      tableRow.appendChild(tDAtaque);
      tableRow.appendChild(tDEspecial);
      tableRow.appendChild(tDUrlImage);
      tableRow.appendChild(tDActions);
      fragment.appendChild(tableRow);
      tBodyPokemon.appendChild(fragment);
    });
    showAlert('bg-primary', 'Registros leídos');
  };

  const readPokemon = (id) => {
    const documentFormPokemon = document.querySelector('#formPokemon');
    const formTitle = document.querySelector('#formTitle');
    const formButton = document.querySelector('#formButton');

    const pokemon = pokemons.find((element) => {
      return element._id === id;
    });
    const { _id, _nombre, _tipo, _hp, _ataque, _especial, _urlImagen } = pokemon;

    formTitle.innerHTML = 'Editar pokemon';
    formButton.innerHTML = 'Editar';
    documentFormPokemon['id'].value = _id;
    documentFormPokemon['nombre'].value = _nombre;
    documentFormPokemon['tipo'].value = _tipo;
    documentFormPokemon['hp'].value = _hp;
    documentFormPokemon['ataque'].value = _ataque;
    documentFormPokemon['especial'].value = _especial;
    documentFormPokemon['url-imagen'].value = _urlImagen;
    showAlert('bg-primary', 'Registro leído');
  };

  const updatePokemon = () => {
    const { id, nombre, tipo, hp, ataque, especial, urlImagen } = getFormData();
    const formTitle = document.querySelector('#formTitle');
    const formButton = document.querySelector('#formButton');

    if (validateForm()) {
      showAlert('bg-danger', 'Completar todos los campos');
    } else {
      pokemons = pokemons.map((element) => {
        if (element._id !== +id) {
          return element;
        } else {
          element._nombre = nombre;
          element._tipo = tipo;
          element._hp = +hp;
          element._ataque = ataque;
          element._especial = especial;
          element._urlImagen = urlImagen;
          return element;
        }
      });
      localStorage.setItem(pokemonsData, JSON.stringify(pokemons));
      resetForm();
      formTitle.innerHTML = 'Crear pokemon';
      formButton.innerHTML = 'Crear';
      readPokemons();
      showAlert('bg-success', 'Registro actualizado');
    }
  };

  const deletePokemon = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-2',
        cancelButton: 'btn btn-danger mx-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, elimínalo!',
      cancelButtonText: '¡No, cancélalo!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        pokemons = pokemons.filter((element) => {
          return element._id !== id;
        });
        localStorage.setItem(pokemonsData, JSON.stringify(pokemons));
        readPokemons();
        showAlert('bg-danger', 'Registro eliminado');
        swalWithBootstrapButtons.fire(
          '¡Eliminado!',
          'Tu registro ha sido eliminado.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Tu registro está seguro',
          'error'
        );
      }
    });
  };

  const submitPokemon = (e) => {
    e.preventDefault();
    const id = document.getElementById('formId').value;
    if (id === '') {
      createPokemon();
    } else {
      updatePokemon();
    }
  };

  if (localStorage.getItem(pokemonsData)) {
    pokemons = JSON.parse(localStorage.getItem(pokemonsData));
    // readPokemons();
  } else {
    pokemons = [
      new Pokemon(generateId(), 'Mew', 'Psiquico', 200, 'Bola Destructiva, 200', 'Burbuja', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png'),
      new Pokemon(generateId(), 'Pikachu', 'Eléctrico', 70, 'Recargar', 'Rayo, 100', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'),
      new Pokemon(generateId(), 'Mewtwo', 'Psiquico', 200, 'Psico Ataque, 150', 'Hiper Rayo, 100', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png')
    ];
    localStorage.setItem(pokemonsData, JSON.stringify(pokemons));
  }

  readPokemons();
  formPokemon.addEventListener('submit', submitPokemon);
}

export default crudPokemon;
const personas = [
  new Persona('Elliot', 'Garamendi'),
  new Persona('Leo', 'Sarmiento')
];

const botonAgregar = document.getElementById('botonAgregar');
const botonNuevoListado = document.getElementById('botonNuevoListado');

const mostrarPersonas = () => {
  let personaHtml = '';
  for (let persona of personas) {
    personaHtml += `
      <p class="persona">
        ${persona.nombre} ${persona.apellido}
        <button class="boton-eliminar" onclick='eliminarPersona(${persona.id})'>Eliminar</button>
      </p>
    `
  }
  document.getElementById('personas').innerHTML = personaHtml;

}

const eliminarPersona = (id) => {
  let indiceEliminar = personas.findIndex(persona => persona.id === id);
  personas.splice(indiceEliminar, 1);
  mostrarPersonas();
}


const agregarPersona = (event) => {
  event.preventDefault();
  const formularioPersona = document.forms['formularioPersona'];
  const nombre = formularioPersona['nombre'].value;
  const apellido = formularioPersona['apellido'].value;
  if (nombre != '' && apellido != '') {
    const persona = new Persona(nombre, apellido);
    personas.push(persona);
    mostrarPersonas();
  } else {
    alert('Ingrese valores');
  }
  formularioPersona['nombre'].value = '';
  formularioPersona['apellido'].value = '';
}

const nuevoListado = (event) => {
  event.preventDefault();
  const respuesta = confirm('¿Desea realizar un nuevo listado?')
  if (respuesta) {
    while (personas.length > 0) {
      personas.pop();
    }
  }

  document.forms['formularioPersona'].reset();
  mostrarPersonas();
}

botonNuevoListado.addEventListener('click', nuevoListado);

botonAgregar.addEventListener('click', agregarPersona);

window.addEventListener('load', mostrarPersonas);


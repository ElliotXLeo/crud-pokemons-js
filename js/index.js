const personas = [
  new Persona('Elliot', 'Garamendi'),
  new Persona('Leo', 'Sarmiento')
];

const botonAgregar = document.getElementById('botonAgregar');

const mostrarPersonas = () => {
  let personaHtml = '';
  for (let persona of personas) {
    personaHtml += `
      <p class="persona">
        ${persona.nombre} ${persona.apellido}
        <button class="boton-eliminar" onclick='eliminarPersona(${persona.id})'>Eliminar</button>
      </p>
    `

    console.log(persona);
  }
  document.getElementById('personas').innerHTML = personaHtml;

}

const eliminarPersona = (id) => {
  let indiceEliminar = personas.findIndex(persona => persona.id === id);
  personas.splice(indiceEliminar, 1);
  mostrarPersonas();
}


const agregarPersona = () => {
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

botonAgregar.addEventListener('click', agregarPersona);

window.addEventListener('load', mostrarPersonas);


const personas = [
  new Persona('Elliot', 'Garamendi'),
  new Persona('Leo', 'Sarmiento')
];

const botonAgregar = document.getElementById('botonAgregar');

const mostrarPersona = () => {
  let personaHtml = '';
  for (let persona of personas) {
    personaHtml += `<p class="persona">${persona.nombre} ${persona.apellido}</p>`
  }
  document.getElementById('personas').innerHTML = personaHtml;
}

const agregarPersona = () => {
  const formularioPersona = document.forms['formularioPersona'];
  const nombre = formularioPersona['nombre'].value;
  const apellido = formularioPersona['apellido'].value;
  if (nombre != '' && apellido != '') {
    const persona = new Persona(nombre, apellido);
    personas.push(persona);
    mostrarPersona();
  } else {
    alert('Ingrese valores');
  }
  formularioPersona['nombre'].value = '';
  formularioPersona['apellido'].value = '';
}

botonAgregar.addEventListener('click', agregarPersona);

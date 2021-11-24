// Selectores

const form = document.querySelector("#nueva-cita");

const mascota = document.querySelector("#mascota");
const propietario = document.querySelector("#propietario");
const telefono = document.querySelector("#telefono");
const fecha = document.querySelector("#fecha");
const hora = document.querySelector("#hora");
const sintomas = document.querySelector("#sintomas");

// Objeto principal - Información del Usuario

let citaDatos = {};

// Event listeners

eventListeners();

function eventListeners() {
  mascota.addEventListener("input", handleInput);
  propietario.addEventListener("input", handleInput);
  telefono.addEventListener("input", handleInput);
  fecha.addEventListener("input", handleInput);
  hora.addEventListener("input", handleInput);
  sintomas.addEventListener("input", handleInput);
}

// Recolector de datos
function handleInput(e) {
  e.preventDefault();
  citaDatos[e.target.name] = e.target.value;
  console.log(citaDatos);
}

// UI
const container = document.querySelector(".container");
const contenido = document.querySelector("#contenido");
const form = document.querySelector("#nueva-cita");
const contenedorCitas = document.querySelector("#citas");

// Selectores de inputs
const mascota = document.querySelector("#mascota");
const propietario = document.querySelector("#propietario");
const telefono = document.querySelector("#telefono");
const fecha = document.querySelector("#fecha");
const hora = document.querySelector("#hora");
const sintomas = document.querySelector("#sintomas");

// Objeto principal - Información del Usuario

let citaDatos = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};

// Event listeners

eventListeners();

function eventListeners() {
  propietario.addEventListener("input", handleInput);
  sintomas.addEventListener("input", handleInput);
  telefono.addEventListener("input", handleInput);
  mascota.addEventListener("input", handleInput);
  fecha.addEventListener("input", handleInput);
  hora.addEventListener("input", handleInput);

  form.addEventListener("submit", handleSubmit);
}

// Recolector de datos
function handleInput(e) {
  e.preventDefault();
  citaDatos[e.target.name] = e.target.value;
  console.log(citaDatos);
}

//Clases principales
class Citas {
  constructor() {
    this.citas = [];
  }
}
class UIcitas {
  imprimirAlert(mensaje, tipo) {
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "d-block", "col-12", "alert");
    // evalua el tipo de alerta
    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }
    // Mostrar el mensaje;
    divMensaje.textContent = mensaje;
    container.insertBefore(divMensaje, contenido);
    // borrar el mensaje
    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }
}
//instanciaciones de las clases para dejarlas disponible a nivel global
const citas = new Citas();
const ui = new UIcitas();

// Al crear nueva cita

function handleSubmit(e) {
  e.preventDefault();
  // Validar formulario
  const { propietario, sintomas, telefono, mascota, fecha, hora } = citaDatos;
  if (
    propietario == "" ||
    sintomas === "" ||
    telefono === "" ||
    mascota === "" ||
    fecha === "" ||
    hora === ""
  ) {
    ui.imprimirAlert("Todos los campos debe estar llenos", "error");
    return;
  }
  console.log("validando");
}

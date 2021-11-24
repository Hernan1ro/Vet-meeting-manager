// UI
const container = document.querySelector(".container");
const contenido = document.querySelector("#contenido");
const form = document.querySelector("#nueva-cita");
const contenedorCitas = document.querySelector("#citas");

// Selectores de inputs
const mascotaInput = document.querySelector("#mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomasInput = document.querySelector("#sintomas");

// Objeto principal - Información del Usuario

const citaDatos = {
  id: "",
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};
// modo edición
let edicion;

// Event listeners

eventListeners();

function eventListeners() {
  propietarioInput.addEventListener("input", handleInput);
  sintomasInput.addEventListener("input", handleInput);
  telefonoInput.addEventListener("input", handleInput);
  mascotaInput.addEventListener("input", handleInput);
  fechaInput.addEventListener("input", handleInput);
  horaInput.addEventListener("input", handleInput);

  form.addEventListener("submit", handleSubmit);
}

// Recolector de datos
function handleInput(e) {
  e.preventDefault();
  citaDatos[e.target.name] = e.target.value;
}

//Clases principales
class Citas {
  constructor() {
    this.citas = [];
  }
  agregarCita(cita) {
    this.citas = [...this.citas, cita];
  }
  removerCita(id) {
    this.citas = this.citas.filter((cita) => cita.id !== id);
  }
  editarCita(citaActualizada) {
    this.citas = this.citas.map((cita) =>
      cita.id === citaActualizada.id ? citaActualizada : cita
    );
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
  imprimirCitas({ citas }) {
    this.limpiarHmtl();
    citas.forEach((cita) => {
      const { propietario, mascota, hora, telefono, sintomas, id, fecha } =
        cita;
      // creación del contenedor de los dato de la cita
      const divCita = document.createElement("div");
      divCita.classList.add("cita", "p-3");
      divCita.dataset.id = id;

      // scripting de los elementos de la cita
      const mascotaParrafo = document.createElement("h2");
      mascotaParrafo.classList.add("card-title", "font-weight-bolder");
      mascotaParrafo.textContent = mascota;

      const propietarioParrafo = document.createElement("p");
      propietarioParrafo.innerHTML = `
        <span class="font-weight-bolder">Propietario:</span> ${propietario}
      `;
      const telefonoParrafo = document.createElement("p");
      telefonoParrafo.innerHTML = `
        <span class="font-weight-bolder">Teléfono:</span> ${telefono}
      `;
      const fechaParrafo = document.createElement("p");
      fechaParrafo.innerHTML = `
        <span class="font-weight-bolder">Fecha:</span> ${fecha}
      `;
      const horaParrafo = document.createElement("p");
      horaParrafo.innerHTML = `
        <span class="font-weight-bolder">Hora:</span> ${hora}
      `;
      const sintomaParrafo = document.createElement("p");
      sintomaParrafo.innerHTML = `
        <span class="font-weight-bolder">Sintomas:</span> ${sintomas}
      `;
      // botón borrar
      const btnBorrar = document.createElement("button");
      btnBorrar.classList.add("btn", "btn-danger", "mr-2");
      btnBorrar.innerHTML = "Eliminar cita";
      btnBorrar.onclick = () => {
        borrarCita(id);
      };
      // botón editar
      const btnEditar = document.createElement("button");
      btnEditar.classList.add("btn", "btn-info");
      btnEditar.innerHTML = "Editar";
      btnEditar.onclick = () => editarCita(cita);

      //Aañadir al DOM
      divCita.appendChild(mascotaParrafo);
      divCita.appendChild(propietarioParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(horaParrafo);
      divCita.appendChild(sintomaParrafo);
      divCita.appendChild(btnBorrar);
      divCita.appendChild(btnEditar);

      contenedorCitas.appendChild(divCita);
    });
  }
  limpiarHmtl() {
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
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
  if (edicion) {
    ui.imprimirAlert("Editado correctamente");
    form.querySelector('button[type="submit"]').textContent = "Crear cita";
    edicion = false;
    //Pasar objeto editado al estado
    citas.editarCita({ ...citaDatos });
  } else {
    // crear un id para el objeto citaDatos
    citaDatos.id = Date.now();
    // Agregar cita a la lista de citas;
    citas.agregarCita({ ...citaDatos });
    ui.imprimirAlert("Cita agendada correctamente");
  }
  // Resetear formulario
  resetearFormulario();
  form.reset();

  // Agregar la lista de citas al Html
  ui.imprimirCitas(citas);
}

// Resetear los valores del objeto global -- infirmación del formulario

function resetearFormulario() {
  citaDatos.propietario = "";
  citaDatos.mascota = "";
  citaDatos.sintomas = "";
  citaDatos.fecha = "";
  citaDatos.hora = "";
  citaDatos.telefono = "";
}

// Borrar citas y altualizar Html

function borrarCita(id) {
  citas.removerCita(id);
  ui.imprimirCitas(citas);
  ui.imprimirAlert("Cita eliminada exitosamente");
}

// Iniciar modo edición

function editarCita(cita) {
  edicion = true;
  // cambiar el texto del botón del formulario
  form.querySelector('button[type="submit"]').textContent = "Guardar cambios";

  // llena los input con la información de cita
  const { propietario, telefono, mascota, fecha, hora, id, sintomas } = cita;
  propietarioInput.value = propietario;
  sintomasInput.value = sintomas;
  telefonoInput.value = telefono;
  mascotaInput.value = mascota;
  fechaInput.value = fecha;
  horaInput.value = hora;
  //Llena el objeto en memoria
  citaDatos.propietario = propietario;
  citaDatos.telefono = telefono;
  citaDatos.mascota = mascota;
  citaDatos.fecha = fecha;
  citaDatos.hora = hora;
  citaDatos.sintomas = sintomas;
  citaDatos.id = id;
}

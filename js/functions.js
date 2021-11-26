import Citas from "./classes/Citas.js";
import UIcitas from "./classes/UI.js";
import {
  form,
  propietarioInput,
  sintomasInput,
  telefonoInput,
  fechaInput,
  horaInput,
  mascotaInput,
} from "./selectores.js";

//instanciaciones de las clases para dejarlas disponible a nivel global
const citas = new Citas();
const ui = new UIcitas();
// modo edición
let edicion;

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

// Recolector de datos
export function handleInput(e) {
  e.preventDefault();
  citaDatos[e.target.name] = e.target.value;
}

// Al crear nueva cita

export function handleSubmit(e) {
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

export function resetearFormulario() {
  citaDatos.propietario = "";
  citaDatos.mascota = "";
  citaDatos.sintomas = "";
  citaDatos.fecha = "";
  citaDatos.hora = "";
  citaDatos.telefono = "";
}

// Borrar citas y altualizar Html

export function borrarCita(id) {
  citas.removerCita(id);
  ui.imprimirCitas(citas);
  ui.imprimirAlert("Cita eliminada exitosamente");
}

// Iniciar modo edición

export function editarCita(cita) {
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
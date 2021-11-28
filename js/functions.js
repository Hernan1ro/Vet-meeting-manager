import Citas from "./classes/Citas.js";
import UIcitas from "./classes/UI.js";
import { DB } from "./classes/App.js";

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
export const ui = new UIcitas();
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
    //Pasar objeto editado al estado
    citas.editarCita({ ...citaDatos });
    // Edita los datos en IndexDB
    const transaction = DB.transaction(["citas"], "readwrite");
    const objectStore = transaction.objectStore("citas");

    objectStore.put(citaDatos);

    transaction.oncomplete = function () {
      ui.imprimirAlert("Editado correctamente");
      form.querySelector('button[type="submit"]').textContent = "Crear cita";
      edicion = false;
    };
    transaction.onerror = function () {
      console.log("Hubo un error");
    };
  } else {
    // crear un id para el objeto citaDatos
    citaDatos.id = Date.now();
    // Agregar cita a la lista de citas;
    citas.agregarCita({ ...citaDatos });
    ui.imprimirAlert("Cita agendada correctamente");
    //Insertar Registro en indexDB
    let transaction = DB.transaction(["citas"], "readwrite");
    //Habilitar el objectStore
    const objectStore = transaction.objectStore("citas");
    //Insertar en la BD
    objectStore.add(citaDatos);
    //Mostrar mensaje de guardado exitoso
    transaction.onsuccesss = function () {
      //Imprimir mensaje en el html
      ui.imprimirAlert("Cita agendada correctamente");
    };
  }
  // Resetear formulario
  resetearFormulario();
  form.reset();

  // Agregar la lista de citas al Html
  ui.imprimirCitas();
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
  const transaction = DB.transaction(["citas"], "readwrite");
  const objectStore = transaction.objectStore("citas");
  objectStore.delete(id);
  transaction.oncomplete = function () {
    ui.imprimirCitas();
    ui.imprimirAlert("Cita eliminada", "error");
  };
  transaction.onerror = function () {
    console.log("Hubo un error");
  };
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

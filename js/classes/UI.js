import { editarCita, borrarCita } from "../functions.js";
import {
  contenedorCitas,
  container,
  contenido,
  heading,
} from "../selectores.js";
import { DB } from "./App.js";
class UIcitas {
  imprimirAlert(mensaje, tipo) {
    const divMensaje = document.createElement("div");
    const alerta = document.querySelector(".alert");
    if (!alerta) {
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
  imprimirCitas() {
    //Limpia el HTML
    this.limpiarHmtl();
    //Valida elmensaje de bienvenida
    this.textoHeading();
    //Leer el contenido de la base de datos
    const objectStore = DB.transaction("citas").objectStore("citas");

    const fnTextoHeading = this.textoHeading;

    const total = objectStore.count();
    total.onsuccess = function () {
      fnTextoHeading(total.result);
    };

    objectStore.openCursor().onsuccess = function (e) {
      const cursor = e.target.result;

      if (cursor) {
        const { propietario, mascota, hora, telefono, sintomas, id, fecha } =
          cursor.value;
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
        const cita = cursor.value;
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

        //Itera sobre el siguiente elemento
        cursor.continue();
      }
    };
  }
  textoHeading(cantidad) {
    if (cantidad > 0) {
      heading.textContent = "Administra tus citas";
    } else {
      heading.textContent = "No hay citas, comienza creando una";
    }
  }
  limpiarHmtl() {
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
  }
}

export default UIcitas;

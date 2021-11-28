import {
  form,
  propietarioInput,
  sintomasInput,
  telefonoInput,
  fechaInput,
  horaInput,
  mascotaInput,
} from "../selectores.js";
import { handleInput, handleSubmit } from "../functions.js";
import { ui } from "../functions.js";

export let DB;
class App {
  constructor() {
    this.init();
    this.crearDB();
  }
  init() {
    propietarioInput.addEventListener("input", handleInput);
    sintomasInput.addEventListener("input", handleInput);
    telefonoInput.addEventListener("input", handleInput);
    mascotaInput.addEventListener("input", handleInput);
    fechaInput.addEventListener("input", handleInput);
    horaInput.addEventListener("input", handleInput);

    form.addEventListener("submit", handleSubmit);
  }
  crearDB() {
    const crearDB = window.indexedDB.open("citas", 1);
    crearDB.onerror = () => {
      console.log("Ha habido un error al crear la base de datos");
    };
    crearDB.onsuccess = () => {
      DB = crearDB.result;
      // Mostrar citas al cargar (IndexDB debe estar listo)
      ui.imprimirCitas();
    };
    // Definir el schema de la base de datos
    crearDB.onupgradeneeded = (e) => {
      const db = e.target.result;
      const objectStore = db.createObjectStore("citas", {
        keyPath: "id",
        autoIncrement: true,
      });
      // Definir las columnas
      //----------------------------------Keypath
      objectStore.createIndex("mascota", "mascota", { unique: false });
      objectStore.createIndex("propietario", "propietario", { unique: false });
      objectStore.createIndex("telefono", "telefono", { unique: false });
      objectStore.createIndex("fecha", "fecha", { unique: false });
      objectStore.createIndex("hora", "hora", { unique: false });
      objectStore.createIndex("sintomas", "sintomas", { unique: false });
      objectStore.createIndex("id", "id", { unique: true });
    };
  }
}

export default App;

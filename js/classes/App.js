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

class App {
  constructor() {
    this.init();
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
}

export default App;

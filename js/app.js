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

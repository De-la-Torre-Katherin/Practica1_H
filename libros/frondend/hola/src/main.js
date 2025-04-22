let message = document.querySelector("#message");
let pingButton = document.querySelector("#pingButton");

pingButton.addEventListener('click', getPing);

function getPing() {
  const url = 'http://localhost:9999/ping'; // Puerto incorrecto para forzar el error

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Respuesta no válida del servidor");
      }
      return response.text();
    })
    .then((data) => {
      console.log(data);
      message.innerHTML = data + ' - Katherin De la Torre';
    })
    .catch((error) => {
      console.error("Error al hacer ping:", error);
      message.innerHTML = '❌ Error al conectar con el servidor';
    });
}

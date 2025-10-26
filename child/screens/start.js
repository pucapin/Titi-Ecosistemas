import { makeRequest } from "../app.js";

export default function renderStartChild() {
  const app = document.getElementById("app");
  app.innerHTML = `
      <input type="text" placeholder="Nombre" required id="input-user"/>
      <input type="text" placeholder="Código para unirse" required id="input-join"/>
      <p>Pídele a tu acudiente el ID que aparece en su pantalla!</p>
      <button id="start">Start</button>
      `;
// Importante añadir un texto explicativo para que entiendan cual es el id

      async function sendChildData(username, code) {
      const response = await makeRequest("/child", "POST", {username: username, code: code} );
      console.log("response", response);
    }
    const startBtn = document.getElementById('start');
    startBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const user = document.getElementById("input-user").value;
      let code  = document.getElementById("input-join").value;
      code = code.trim().toUpperCase();
      console.log(code)
      sendChildData(user, code)
    });
}
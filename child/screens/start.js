import { makeRequest } from "../app.js";

export default function renderStartChild() {
  const app = document.getElementById("app");
  app.innerHTML = `
      //enter name and parent id
      <input type="text" placeholder="Enter name" required id="input-user"/>
      <input type="text" placeholder="Enter Join ID" required id="input-join"/>
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
  // Falta añadir todas las verificaciones aqui, por si el ID no existe enviar un mensaje de que no existe....
}
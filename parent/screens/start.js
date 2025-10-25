import { makeRequest } from "../app.js";

export default function renderStartParent(data) {
  const app = document.getElementById("app");
  app.innerHTML = `
  
        <input type="text" placeholder="Enter username" required id="input-user"/>
        <input type="password" placeholder="Enter password" required id="input-password"/>
        <button id="register">Start</button>
        `;

  
    async function sendParentData(username, password) {
      const response = await makeRequest("/parent", "POST", {username: username, password: password} );
      console.log("response", response);
    }
    const registerBtn = document.getElementById('register');
    registerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const user = document.getElementById("input-user").value;
      const pass = document.getElementById("input-password").value;
      sendParentData(user, pass)
    });
}
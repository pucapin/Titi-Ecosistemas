import { navigateTo } from "../app.js";

export default function renderAnswers(data) {
  const app = document.getElementById("app");
  app.innerHTML = `
            <button id="go-screen-back">Go to previous screen</button>
        `;

  const goBackButton = document.getElementById("go-screen-back");

  goBackButton.addEventListener("click", () => {
    navigateTo("/");
  });
}
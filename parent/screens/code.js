import { navigateTo } from "../app.js";

export default function renderCode(data) {
    const app = document.getElementById("app");
    app.innerHTML = `
        <button id="go-screen-questions">Q&A</button>
  <button id="go-screen-medals">Medals</button>
  <button id="go-screen-results">Results</button>
  <button id="go-screen-map">Map</button>
  <h1>${data?.user?.join_code}</h1>
          `;
  const questionsButton = document.getElementById("go-screen-questions");
  questionsButton.addEventListener("click", () => {
    navigateTo("/answers");
  });
  const medalsButton = document.getElementById("go-screen-medals");
  medalsButton.addEventListener("click", () => {
    navigateTo("/medals");
  });
  const resultsButton = document.getElementById("go-screen-results");
  resultsButton.addEventListener("click", () => {
    navigateTo("/results");
  });
  const mapButton = document.getElementById("go-screen-map");
  mapButton.addEventListener("click", () => {
    navigateTo("/map");
  });
  }
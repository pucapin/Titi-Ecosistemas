import renderAnswers from "./screens/answers.js";
import renderHome from "./screens/home.js";
import renderMapParent from "./screens/map.js";
import renderMedals from "./screens/medals.js";
import renderResultsParent from "./screens/results.js";
import renderStartParent from "./screens/start.js";

const socket = io("/", { path: "/real-time" });

function clearScripts() {
  document.getElementById("app").innerHTML = "";
}

let route = { path: "/", data: {} };
renderRoute(route);

function renderRoute(currentRoute) {
  switch (currentRoute?.path) {
    case "/start":
      clearScripts();
      renderStartParent(currentRoute?.data);
      break;
    case "/":
      clearScripts();
      renderHome(currentRoute?.data);
      break;
    case "/map":
      clearScripts();
      renderMapParent(currentRoute?.data);
      break;
    case "/answers":
      clearScripts();
      renderAnswers(currentRoute?.data);
      break;
    case "/medals":
      clearScripts();
      renderMedals(currentRoute?.data);
      break;
    case "/results":
      clearScripts();
      renderResultsParent(currentRoute?.data);
      break;
    default:
      const app = document.getElementById("app");
      app.innerHTML = `<h1>404 - Not Found</h1><p>The page you are looking for does not exist.</p>`;
  }
}

async function makeRequest(url, method, body) {
  const BASE_URL = "http://localhost:5050";
  let response = await fetch(`${BASE_URL}${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  response = await response.json();
  return response;
}


function navigateTo(path, data) {
  route = { path, data };
  renderRoute(route);
}

export { navigateTo, socket, makeRequest};
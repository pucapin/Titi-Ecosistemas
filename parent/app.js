import renderAnswers from "./screens/answers.js";
import renderHome from "./screens/home.js";
import renderMapParent from "./screens/map.js";
import renderMedals from "./screens/medals.js";
import renderResultsParent from "./screens/results.js";
import renderStartParent from "./screens/start.js";
import renderCode from "./screens/code.js";

const socket = io("/", { path: "/real-time" });

function clearScripts() {
  document.getElementById("app").innerHTML = "";
}

// Verificar si hay una sesión guardada
const parentId = localStorage.getItem("parentId");
const joinCode = localStorage.getItem("joinCode");
const childLoggedIn = localStorage.getItem("childId");

let route;
if (!parentId) {
  route = { path: "/start", data: {} };
} else if (childLoggedIn) {
  route = { path: "/", data: {} };
} else {
  route = { path: "/code", data: { user: { id: parentId, join_code: joinCode } } };
}
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
    case "/code":
      clearScripts();
      renderCode(currentRoute?.data);
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
  const BASE_URL = "https://backend-three-rho-19.vercel.app";
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

// Escuchar cuando un niño inicie sesión
socket.on("childLoggedIn", (data) => {
  console.log("Child logged in:", data);
  navigateTo("/", {});
});

export { navigateTo, socket, makeRequest};
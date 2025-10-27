import renderMapChild from "./screens/map.js";
import renderOptions from "./screens/options.js";
import renderPlayChild from "./screens/play.js";
import renderStartChild from "./screens/start.js";

const socket = io("/", { path: "/real-time" });

function clearScripts() {
  document.getElementById("app").innerHTML = "";
}

// Verificar si hay una sesión guardada
const childId = localStorage.getItem("childId");
let route = childId 
  ? { path: "/play", data: { user: { id: childId } } } 
  : { path: "/", data: {} };
renderRoute(route);

function renderRoute(currentRoute) {
  switch (currentRoute?.path) {
    case "/":
      clearScripts();
      renderStartChild(currentRoute?.data);
      break;
    case "/play":
      clearScripts();
      renderPlayChild(currentRoute?.data);
      break;
    case "/map":
      clearScripts();
      renderMapChild(currentRoute?.data);
      break;
    case "/options":
      clearScripts();
      renderOptions(currentRoute?.data);
      break;
    default:
      const app = document.getElementById("app");
      app.innerHTML = `<h1>404 - Not Found</h1><p>The page you are looking for does not exist.</p>`;
  }
}


function navigateTo(path, data) {
  route = { path, data };
  renderRoute(route);
}

async function makeRequest(url, method, body) {
  const BASE_URL = "http://localhost:5050";
  //const BASE_URL = "https://s5pxp1mh-5050.use.devtunnels.ms";
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


export { navigateTo, socket, makeRequest };

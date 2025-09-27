import renderMapChild from "./screens/map.js";
import renderOptions from "./screens/options.js";
import renderPlayChild from "./screens/play.js";
import renderStartChild from "./screens/start.js";

const socket = io("/", { path: "/real-time" });

function clearScripts() {
  document.getElementById("app").innerHTML = "";
}

let route = { path: "/", data: {} };
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

export { navigateTo, socket };
import renderAnswers from "./screens/answers";
import renderHome from "./screens/home";
import renderMapParent from "./screens/map";
import renderMedals from "./screens/medals";
import renderResultsParent from "./screens/results";
import renderStartParent from "./screens/start";

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

function navigateTo(path, data) {
  route = { path, data };
  renderRoute(route);
}

export { navigateTo, socket };
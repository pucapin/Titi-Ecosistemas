import renderCorrect from "./screens/checkpoint/correct.js";
import renderIncorrect from "./screens/checkpoint/incorrect.js";
import renderQuestion from "./screens/checkpoint/question.js";
import renderGame from "./screens/game/game.js";
import renderLost from "./screens/game/lost.js";
import renderWon from "./screens/game/won.js";
import renderScanGame from "./screens/scan.js";
import renderTutorial from "./screens/tutorial.js";

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
      renderScanGame(currentRoute?.data);
      break;
    case "/tutorial":
      clearScripts();
      renderTutorial(currentRoute?.data);
      break;
    case "/game":
      clearScripts();
      renderGame(currentRoute?.data);
      break;
    case "/lost":
      clearScripts();
      renderLost(currentRoute?.data);
      break;
    case "/won":
      clearScripts();
      renderWon(currentRoute?.data);
      break;
    case "/question":
      clearScripts();
      renderQuestion(currentRoute?.data);
      break;
    case "/correct":
      clearScripts();
      renderCorrect(currentRoute?.data);
      break;
    case "/incorrect":
      clearScripts();
      renderIncorrect(currentRoute?.data);
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
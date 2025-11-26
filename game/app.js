import renderCorrect from "./screens/checkpoint/correct.js";
import renderIncorrect from "./screens/checkpoint/incorrect.js";
import renderQuestion from "./screens/checkpoint/question.js";
import renderGame from "./screens/game/running/game.js";
import renderLost from "./screens/game/lost.js";
import renderEnd from "./screens/end.js";
import renderScanGame from "./screens/scan.js";
import renderRole from "./screens/role.js";
import { setStation } from "./screens/game/running/resources.js";

const SUPABASE_URL="https://cmyrktpbeqcoodpebbuz.supabase.co"
const ANON_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNteXJrdHBiZXFjb29kcGViYnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4Mjk2MjAsImV4cCI6MjA3NDQwNTYyMH0.pFgGt0Ycx2wAETy6TNV-62aWgO23ac7OypY8JksW0P8"
const supabaseClient = window.supabase.createClient(SUPABASE_URL, ANON_KEY);
const channel = supabaseClient.channel("realtime-events");

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
    case "/role":
      clearScripts();
      renderRole(currentRoute?.data);
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
    case "/end":
      clearScripts();
      renderEnd(currentRoute?.data);
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


channel
  .on("broadcast", { event: "startGame" }, (data) => {
    console.log("Game starting:", data);
    navigateTo("/game", {});
  })
  .on("broadcast", { event: "startRoleSelection" }, (data) => {
    console.log("Role selection starting:", data);
    navigateTo("/role", {});
  })
  .on("broadcast", { event: "change-station" }, (data) => {
    console.log("Station changing:", data);

    const newStation = data.payload.station;

    setStation(newStation);         
    navigateTo("/game", {});
  })
  .subscribe();


export { navigateTo, channel, makeRequest };
import renderMapChild from "./screens/map.js";
import renderOptions from "./screens/options.js";
import renderPlayChild from "./screens/play.js";
import renderStartChild from "./screens/start.js";
import renderScanned from "./screens/login.js";
import renderTutorial1 from "./screens/tutorial1.js";
import renderTutorial2 from "./screens/tutorial2.js";
import renderTutorial3 from "./screens/tutorial3.js";

const SUPABASE_URL="https://cmyrktpbeqcoodpebbuz.supabase.co"
const ANON_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNteXJrdHBiZXFjb29kcGViYnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4Mjk2MjAsImV4cCI6MjA3NDQwNTYyMH0.pFgGt0Ycx2wAETy6TNV-62aWgO23ac7OypY8JksW0P8"
const supabaseClient = window.supabase.createClient(SUPABASE_URL, ANON_KEY);
const channel = supabaseClient.channel("realtime-events");

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
      renderScanned(currentRoute?.data);
      break;
    case "/start":
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
    case "/tutorial1":
      clearScripts();
      renderTutorial1(currentRoute?.data);
      break;
    case "/tutorial2":
      clearScripts();
      renderTutorial2(currentRoute?.data);
      break;
    case "/tutorial3":
      clearScripts();
      renderTutorial3(currentRoute?.data);
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


export { navigateTo, channel, makeRequest };

import { makeRequest } from "../app.js";

export default function renderPlayChild(data) {
  const app = document.getElementById("app");
  app.innerHTML = `
        instrucciones en el celular (agitame para saltar)
        <button id="start-game">Start</button>
        `;
  const startGameBtn = document.getElementById('start-game');
  startGameBtn.addEventListener('click', initMotionEvent);


  //await makeRequest("/motion", "POST");

  // Request permission and initialize motion event on user interaction (e.g., button click)

  async function initMotionEvent() {
    if (window.DeviceMotionEvent) {
      if (typeof DeviceMotionEvent.requestPermission === "function") {
        DeviceMotionEvent.requestPermission()
          .then((permissionState) => {
            if (permissionState === "granted") {
              window.addEventListener("devicemotion", handleMotionEvent);
            } else {
              alert("Permission to access device motion data denied.");
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener("devicemotion", handleMotionEvent); // Añadirlo al comenzar el juego, funcion en otro archivo
      }
    } else {
      console.log("DeviceMotionEvent is not supported by this browser.");
    }
  }
async function handleMotionEvent(event) {
  const acceleration = event.accelerationIncludingGravity;

  if(acceleration.x > 7) {
      await makeRequest("/motion", "POST", { acceleration, timestamp: Date.now() });
  }
  // EMIT EVENT TO SERVER 
}

}

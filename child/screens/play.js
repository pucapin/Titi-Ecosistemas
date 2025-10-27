import { makeRequest, navigateTo, socket } from "../app.js";

export default function renderPlayChild(data) {
  const app = document.getElementById("app");
  app.innerHTML = `
        <h1>Mueve el celular hacia arriba para saltar!</h1>
        `;
 // const startGameBtn = document.getElementById('start-game');
 // startGameBtn.addEventListener('click', initMotionEvent);
  initMotionEvent();

  //await makeRequest("/motion", "POST");
  socket.on("showQuestion", (checkpointId) => {
    console.log("received")
    navigateTo('/options', checkpointId )
  })
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

  if(acceleration.x > 40) {
      await makeRequest("/motion", "POST", { acceleration: acceleration.x });
  }
  // EMIT EVENT TO SERVER 
}

}

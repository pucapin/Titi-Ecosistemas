import { makeRequest, navigateTo, channel } from "../app.js";

export default function renderPlayChild(data) {
  const app = document.getElementById("app");
  app.innerHTML = `
  <style>
  .container {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            height: 100%;
          }

          h2 {
            color: #FF600B;
            font-size: 44px;
            font-style: normal;
            font-weight: 600;
            line-height: 95%; /* 43.7px */
            margin-left: 20px;
            margin-top: 200px;
            width: 330px;
          }
  </style>
        <div class="container">
        <h2>Mueve el celular hacia arriba para saltar!</h2>
        <button id="start-game">Start!</button>
        <img src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/jumping2.svg">
        </div>
        `;
 // const startGameBtn = document.getElementById('start-game');
 // startGameBtn.addEventListener('click', initMotionEvent);
  
  const startGameBtn = document.getElementById('start-game');
  startGameBtn.addEventListener('click', async () => {
    await makeRequest("/games/start", "POST", {});
  });
  
  initMotionEvent();

  //await makeRequest("/motion", "POST");
  channel.on("broadcast",{event: "showQuestion"}, ({payload}) => {
    navigateTo('/options', payload.checkpointId)
  }).subscribe();
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

import { navigateTo } from "../app.js";

export default function renderTutorial1() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <style>
      .tutorial-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100vw;
        padding: 20px;
        padding-top: 120px;
        box-sizing: border-box;
        position: relative;
      }

      .title {
        color: #1FB0F9;
font-family: Raleway;
font-size: 36.73px;
font-style: normal;
font-weight: 900;
line-height: 93%; /* 34.159px */
        margin-bottom: 20px;
        text-align: center;
        margin-top: -40px; /* Push it up a bit */
      }

      .speech-bubble {
        background-color: white;
        border-radius: 20px;
        padding: 20px;
        max-width: 80%;
        position: relative;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        margin-bottom: 20px;
        text-align: center;
      }

      /* Bubble tail */
      .speech-bubble::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 20%; /* Position the tail */
        border-width: 10px 10px 0;
        border-style: solid;
        border-color: white transparent;
        display: block;
        width: 0;
      }

      .speech-text {
        color: #01AD47;
font-family: Raleway;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 120%; /* 24px */
        margin: 0;
        line-height: 1.4;
      }

      .speech-text strong {
        color: #008B38;
font-family: Raleway;
font-size: 20px;
font-style: normal;
font-weight: 800;
line-height: 120%;
      }

      .tutorial-image {
        width: 430px;
        height: auto;
        object-fit: contain;
        margin-top:100px;
      }

      /* Make sure the vines don't interfere if they are part of background */
    </style>
    <div class="tutorial-container">
      <h1 class="title">¡Corre Conmigo!</h1>
      
      <div class="speech-bubble">
        <p class="speech-text">Mueve el celular hacia arriba para saltar y esquivar los obstáculos</p>
      </div>

      <img src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/Tuto1Correcion.svg" alt="Tutorial: Saltar" class="tutorial-image">
    </div>
  `;
  setTimeout(() => {
    navigateTo("/tutorial2");
  }, 5000);
}

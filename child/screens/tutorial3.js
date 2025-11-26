import { navigateTo } from "../app.js";

export default function renderTutorial3() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <style>
    body {
      overflow: hidden;
    }
      .tutorial-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        width: 100vw;
        padding: 20px;
        padding-top: 160px;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
      }

      .title {
        color: #1FB0F9;
        font-family: Raleway;
        font-size: 36.73px;
        font-style: normal;
        font-weight: 900;
        line-height: 93%;
        margin-bottom: 20px;
        text-align: center;
        margin-top: -40px;
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

      .speech-bubble::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 20%;
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
        line-height: 120%;
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
        width: 120%;
        max-width: 500px;
        height: auto;
        object-fit: contain;
        position: absolute;
        bottom: 100px;
        left: -10%;
      }
    </style>
    <div class="tutorial-container">
      <h1 class="title">¡Consigue puntos<br>y medallas!</h1>
      
      <div class="speech-bubble">
        <p class="speech-text">Si aciertas, ganas bananas y estrellas con tu nombre. <strong>¡Colecciónalas todas!</strong></p>
      </div>

      <img src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/Tuto3Correcion.svg" alt="Tutorial: Conseguir puntos y medallas" class="tutorial-image">
    </div>
  `;
  setTimeout(() => {
    navigateTo("/play");
  }, 5000);
}

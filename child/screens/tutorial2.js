import { navigateTo } from "../app.js";

export default function renderTutorial2() {
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
        padding-top: 180px;
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
        position: absolute;
        bottom: 0;
        left: -40px; 
        top: 400px
      }
    </style>
    <div class="tutorial-container">
      <h1 class="title">¿Qué aprendiste?</h1>
      
      <div class="speech-bubble">
        <p class="speech-text">Cuando llegues a un <strong>reto</strong>, responde la pregunta en tu celular</p>
      </div>

      <img src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/Tuto2.svg" alt="Tutorial: Responder preguntas" class="tutorial-image">
    </div>
  `;
  setTimeout(() => {
    navigateTo("/tutorial3");
  }, 5000);
}

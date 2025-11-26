import { navigateTo } from "../app.js";

  export default function renderCode(data) {
  const app = document.getElementById("app");
  const joinCode = data?.user?.join_code || localStorage.getItem("joinCode") || "N/A";
  
  app.innerHTML = `
    <style>
      @media only screen and (max-width:767px) {
        body {
          margin: 0px;
          width: 100vw;
          height: 100vh;
          background: #FFF1E0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-image: url(https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/grassbg.png);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        
        .code-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            text-align: center;
        }
        
        .title {
            color: #FF6B00;
            font-family: Outfit, sans-serif;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 15px;
        }

        .subtitle {
             color: #5A3A29;
             font-family: Outfit, sans-serif;
             font-size: 18px;
             font-weight: 400;
             margin-bottom: 40px;
             max-width: 280px;
        }
        
        .code-display {
            font-family: Outfit, sans-serif;
            font-size: 64px;
            font-weight: 800;
            color: #55BD47;
            letter-spacing: 5px;
            background-color: #FFFFFF;
            padding: 30px 50px;
            border-radius: 20px;
            border: 3px dashed #FF6B00;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            margin-bottom: 50px;
        }
        
        .next-btn {
            background-color: #FF6B00;
            color: white;
            border: none;
            border-radius: 50px;
            padding: 15px 40px;
            font-family: Outfit, sans-serif;
            font-size: 20px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 4px 0 #CC5600;
            transition: transform 0.1s;
        }
        
        .next-btn:active {
             transform: translateY(4px);
             box-shadow: none;
        }
      }
    </style>
    
    <div class="code-container">
             
  <button id="go-screen-home">Home</button>
        <h2 class="title">¡Código de Vinculación!</h2>
        <p class="subtitle">Usa este código en la app de tu hijo para conectar las cuentas.</p>
        
        <div class="code-display">
            ${joinCode}
        </div>
            </div>

  `;
    const mapButton = document.getElementById("go-screen-home");
  mapButton.addEventListener("click", () => {
    navigateTo("/");
  });
}
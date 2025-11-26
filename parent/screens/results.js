import { navigateTo } from "../app.js";

export default function renderAnswers(data) {
  const app = document.getElementById("app");
  app.innerHTML = `
        <style>
            @media only screen and (max-width:767px) {
              body {
                  margin: 0px;
                  width: 100vw;
                  height: 100vh;
                  background: #FFF1E0;
              }
              
              /* Navbar Styles */
              .home-header {
                height: 155px;
                background-color: #FF6B00;
                padding: 15px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: white;
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
                z-index: 10;
                box-sizing: border-box;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
            }

            .profile-section {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .profile-pic-wrapper {
                 width: 50px;
                 height: 50px;
                 border-radius: 50%;
                 background-color: #55BD47;
                 display: flex;
                 justify-content: center;
                 align-items: center;
                 overflow: hidden;
                 border: 2px solid white;
            }

            .profile-pic {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .user-info {
                display: flex;
                flex-direction: column;
            }

            .user-name {
                color: #FFF;
                font-family: Outfit, sans-serif;
                font-size: 32px;
                font-style: normal;
                font-weight: 700;
                line-height: 93%;
                margin:0
            }

            .user-role {
                color: #FFF;
                font-family: Outfit, sans-serif;
                font-size: 13.9px;
                font-style: normal;
                font-weight: 400;
                line-height: 93%;
            }

            .home-action {
                display: flex;
                flex-direction: column;
                align-items: center;
                cursor: pointer;
            }

            .home-label {
               color: #FFF;
               font-family: Outfit, sans-serif;
               font-size: 13.9px;
               font-style: normal;
               font-weight: 400;
               line-height: 93%;
            }

            #results-container {
                padding-top: 160px; /* Space for navbar */
                padding-left: 20px;
                padding-right: 20px;
            }
        }
        </style>
        <header class="home-header">
            <div class="profile-section">
                <div class="profile-pic-wrapper">
                     <img src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/ProfilePic.svg" class="profile-pic" alt="Profile">
                </div>
                <div class="user-info">
                    <h2 class="user-name">${localStorage.getItem("parentName") || "Parent"}</h2>
                    <p class="user-role">Admin de ${localStorage.getItem("childName") || "ANDY"}</p>
                </div>
            </div>
            <div class="home-action" id="go-home-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="51" height="33" viewBox="0 0 51 33" fill="none">
  <path d="M22.9376 2.34143C24.3886 1.01556 26.6114 1.01556 28.0624 2.34142L40.3577 13.5764C42.9173 15.9153 41.2626 20.1792 37.7953 20.1792H13.2047C9.73743 20.1792 8.08269 15.9153 10.6423 13.5764L22.9376 2.34143Z" fill="white"/>
  <rect x="32.2319" y="3.19971" width="6.12" height="10.4633" rx="1.68828" fill="white"/>
  <path d="M32.4719 11.0004C35.2688 11.0006 37.5362 13.2679 37.5364 16.0648V27.6097C37.5363 30.4067 35.2689 32.674 32.4719 32.6742H29.3254V26.0502C29.3254 24.8848 28.3804 23.94 27.2151 23.9398H23.7854C22.6199 23.9398 21.675 24.8847 21.675 26.0502V32.6742H18.9368C16.1398 32.674 13.8724 30.4067 13.8723 27.6097V16.0648C13.8725 13.2679 16.1398 11.0006 18.9368 11.0004H32.4719Z" fill="white"/>
</svg>
                <span class="home-label">Inicio</span>
            </div>
        </header>

        <div id="results-container">
            
            <h3>Respuestas del niño</h3>
            <div id="answers-container">Cargando respuestas...</div>

            <button id="go-screen-back">Volver</button>
        </div>
        `;

  const goBackButton = document.getElementById("go-screen-back");
  const answersContainer = document.getElementById("answers-container");
  const homeBtn = document.getElementById("go-home-btn");

  if(homeBtn) {
      homeBtn.addEventListener("click", () => {
          navigateTo("/");
      });
  }

  goBackButton.addEventListener("click", () => {
    navigateTo("/");
  });

  const fetchChildData = async () => {
    try {
      const childId = localStorage.getItem("childId");
      
      if (!childId) {
        answersContainer.textContent = "";
        return;
      }

      // Fetch Answers
      try {
        const answersResponse = await fetch(`https://backend-three-rho-19.vercel.app/child/${childId}/answers`);
        const answersResult = await answersResponse.json();

        if (answersResult.success) {
          if (answersResult.data.length === 0) {
            answersContainer.textContent = "No hay respuestas registradas yet.";
          } else {
            let html = '<ul style="list-style-type: none; padding: 0;">';
            
            answersResult.data.forEach(item => {
              
              let answerText = item.respuesta;
              if (item.Preguntas && item.respuesta) {
                const letter = item.respuesta.toLowerCase();
                const key = `opcion_${letter}`;
                if (item.Preguntas[key]) {
                  answerText = item.Preguntas[key];
                }
              }

              const isCorrect = item.correcta ? "Correcta" : "Incorrecta";
              const color = item.correcta ? "green" : "red";

              html += `<li style="margin-bottom: 15px; border-bottom: 1px solid #ccc; padding-bottom: 10px;">
                        <div>R: ${answerText}</div>
                        <div style="color: ${color}; font-weight: bold;">${isCorrect}</div>
                       </li>`;
            });
            
            html += '</ul>';
            answersContainer.innerHTML = html;
          }
        } else {
          answersContainer.textContent = "Error al cargar las respuestas";
          console.error(answersResult.error);
        }
      } catch (e) {
        answersContainer.textContent = "Error al cargar las respuestas";
        console.error(e);
      }

    } catch (error) {
      answersContainer.textContent = "Error de conexión";
      console.error(error);
    }
  };

  fetchChildData();
}

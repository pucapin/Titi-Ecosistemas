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
                padding-bottom: 40px;
            }

            .qa-item {
                background-color:rgb(255, 255, 255);
                border-radius: 20px;
                padding: 20px;
                margin-bottom: 30px;
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                max-width: 360px; /* Reduced max-width */
                margin-left: auto;
                margin-right: auto;
                box-sizing: border-box; /* Ensure padding is included in width */
            }
            
            .station-title {
                color: #FF6B00;
                font-family: Outfit, sans-serif;
                font-size: 20px;
                font-weight: 700;
                margin-bottom: 10px;
                align-self: flex-start;
            }

            .question-bubble {
                background-color: #55BD47;
                color: white;
                padding: 20px;
                border-radius: 20px;
                font-family: Outfit, sans-serif;
                font-size: 18px;
                font-weight: 600;
                width: 100%;
                box-sizing: border-box;
                position: relative;
                text-align: center;
                margin-bottom: 10px;
                box-shadow: 0 4px 0 #3da032;
            }

            .connector-container {
                align-self: flex-start;
                margin-left: 20px;
                height: 40px;
                margin-top: -5px;
                margin-bottom: -5px;
                z-index: 1;
            }

            .answer-label {
                color: #FF6B00;
                font-family: Outfit, sans-serif;
                font-size: 16px;
                font-weight: 700;
                margin-bottom: 5px;
                align-self: flex-start;
            }

            .answer-card {
                background-color: #FFF5E6;
                border-radius: 20px;
                display: flex;
                align-items: center;
                padding: 10px;
                width: 100%;
                box-sizing: border-box;
                position: relative;
                min-height: 80px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }

            .answer-icon-box {
                background-color: #FF4D4D;
                width: 60px;
                height: 60px;
                border-radius: 15px;
                margin-right: 15px;
                flex-shrink: 0;
                /* Optional: stylized leaf if possible, otherwise solid red */
            }

            .answer-text-content {
                color: #5A3A29;
                font-family: Outfit, sans-serif;
                font-size: 16px;
                font-weight: 700;
                flex: 1;
                padding-right: 60px; /* space for medal */
                text-align: left;
            }

            .medal-decoration {
                position: absolute;
                right: -10px;
                top: 50%;
                transform: translateY(-50%);
                width: 70px;
                height: 70px;
            }

            .medal-decoration img {
                width: 100%;
                height: 100%;
                object-fit: contain;
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
            
            <h3 style="text-align: center; color: #FF6B00; margin-bottom: 30px; font-family: Outfit, sans-serif;">Respuestas del niño</h3>
            <div id="answers-container">Cargando respuestas...</div>

        </div>
        `;

  const answersContainer = document.getElementById("answers-container");
  const homeBtn = document.getElementById("go-home-btn");

  if(homeBtn) {
      homeBtn.addEventListener("click", () => {
          navigateTo("/");
      });
  }

  const fetchChildData = async () => {
    try {
      const childId = localStorage.getItem("childId");
      
      if (!childId) {
        answersContainer.textContent = "";
        return;
      }

      // Fetch Points
      try {
        const pointsResponse = await fetch(`https://backend-three-rho-19.vercel.app/child/${childId}`);
        const pointsResult = await pointsResponse.json();

        if (pointsResult.success) {
          console.log(pointsResult.data);
        } else {
          console.error(pointsResult.error);
        }
      } catch (e) {
        console.error(e);
      }

      // Fetch Answers
      try {
        const answersResponse = await fetch(`https://backend-three-rho-19.vercel.app/child/${childId}/answers`);
        const answersResult = await answersResponse.json();

        if (answersResult.success) {
          if (answersResult.data.length === 0) {
            answersContainer.textContent = "No hay respuestas registradas yet.";
          } else {
            let html = '';
            
            answersResult.data.forEach(item => {
              const questionText = item.Preguntas ? item.Preguntas.pregunta : "Pregunta no encontrada";
              
              let answerText = item.respuesta;
              if (item.Preguntas && item.respuesta) {
                const letter = item.respuesta.toLowerCase();
                const key = `opcion_${letter}`;
                if (item.Preguntas[key]) {
                  answerText = item.Preguntas[key];
                }
              }

              html += `
                <div class="qa-item">
                    <div class="question-bubble">
                        ${questionText}
                    </div>
                    
                    <div class="connector-container">
                        <svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <path d="M15 0 V 15 A 15 15 0 0 0 30 30 H 40" stroke="#55BD47" stroke-width="4" fill="none"/>
                             <path d="M35 25 L 42 30 L 35 35" fill="#55BD47"/>
                        </svg>
                    </div>

                    <h4 class="answer-label">Respuesta de ${localStorage.getItem("childName") || "ANDY"}</h4>
                    
                    <div class="answer-card">
                        <div class="answer-icon-box">
                             <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="60" height="60" rx="15" fill="#FF4D4D"/>
                                <svg x="14.5" y="8" xmlns="http://www.w3.org/2000/svg" width="31" height="44" viewBox="0 0 31 44" fill="none">
  <path d="M23.3641 43.9657C24.1218 43.9722 24.8855 43.8993 25.6454 43.7237C28.4894 43.0652 29.737 39.6869 30.2573 36.2186C30.6149 33.831 30.5888 31.4446 30.2494 29.3259C29.5215 24.7652 27.542 21.0706 25.3096 18.0006C25.2994 17.9872 25.2908 17.9744 25.2806 17.961C24.0322 19.4831 23.026 20.6637 22.2973 21.5049C22.8378 20.4209 23.6001 18.9216 24.5925 17.0492C24.3985 16.7995 24.2015 16.5537 24.003 16.3123C23.4483 16.9713 22.9714 17.5286 22.5742 17.9873C22.867 17.4036 23.223 16.6984 23.6443 15.8798C21.4562 13.2847 19.0063 11.0789 16.4379 9.13125C15.4339 10.8711 14.6174 12.2331 14.0177 13.2176C14.3878 12.0724 14.9122 10.4886 15.6038 8.50528C15.3706 8.33597 15.136 8.16615 14.9006 7.99854C10.2281 4.67595 5.19636 2.09202 0 0C0.108273 0.0422506 0.133616 1.31381 0.152184 1.48331C0.247078 2.34388 0.351574 3.20035 0.464971 4.05001C0.733 6.05266 1.03874 8.03618 1.39039 9.99103C2.76235 9.2652 3.70516 8.90553 4.02775 8.78685C3.77111 9.17044 2.99088 10.3226 1.74156 11.8617C2.17947 14.1033 2.6774 16.3038 3.2384 18.4543C4.9371 17.5075 6.11543 17.0584 6.4838 16.9209C6.19947 17.3469 5.27783 18.7098 3.79189 20.4936C5.58361 26.8245 7.97137 32.8469 11.472 37.3695C13.4865 39.974 15.946 41.9904 18.7646 43.0456C20.1746 43.5735 21.7525 43.9516 23.3641 43.9657Z" fill="#B82022"/>
</svg>
                             </svg>
                        </div>
                        <div class="answer-text-content">
                            ${answerText}
                        </div>
                        <div class="medal-decoration">
                             <img src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/titi1.png" alt="Medal">
                        </div>
                    </div>
                </div>
              `;
            });
            
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

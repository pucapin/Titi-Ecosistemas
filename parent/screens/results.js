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
                padding-top: 170px;
                padding-left: 20px;
                padding-right: 20px;
                padding-bottom: 40px;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .results-list {
                list-style: none;
                padding: 0;
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 15px;
                margin-bottom: 30px;
            }

            .result-card {
                display: flex;
                align-items: center;
                background:rgb(255, 255, 255);
                border-radius: 20px;
                overflow: hidden;
                height: 85px;
                box-shadow: 0 4px 4px rgba(0,0,0,0.05);
            }

            .icon-box {
                width: 85px;
                height: 85px;
                display: flex;
                justify-content: center;
                border-radius: 15px;
                align-items: center;
                flex-shrink: 0;
            }
            
            .icon-box svg {
                width: 40px;
                height: 40px;
                fill: white;
            }

            .card-content {
                flex: 1;
                padding: 0 15px;
                color: #5A3E2B;
                font-family: Outfit, sans-serif;
                font-size: 18px;
                font-weight: 700;
                line-height: 1.1;
            }

            .status-box {
                width: 60px;
                height: 60px;
                border-radius: 12px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 12px;
                flex-shrink: 0;
            }

            .status-box svg {
                width: 30px;
                height: 30px;
                fill: none;
                stroke: white;
                stroke-width: 4px;
                stroke-linecap: round;
                stroke-linejoin: round;
            }

            .status-correct {
                background-color: #55BD47;
            }

            .status-incorrect {
                background-color: #FF4C4C;
            }

            .action-button {
                width: 100%;
                max-width: 300px;
                height: 60px;
                background-color: #55BD47;
                color: white;
                border: none;
                border-radius: 12px;
                font-family: Outfit, sans-serif;
                font-size: 20px;
                font-weight: 700;
                cursor: pointer;
                box-shadow: 0 6px 0 #3e9e32;
                transition: all 0.1s;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .action-button:active {
                transform: translateY(4px);
                box-shadow: 0 2px 0 #3e9e32;
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
            <div id="answers-container" style="width: 100%;">
                Cargando respuestas...
            </div>

            <button id="go-screen-back" class="action-button">Ver preguntas</button>
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
    navigateTo("/answers");
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
            answersContainer.textContent = "No hay respuestas registradas.";
          } else {
            let html = '<ul class="results-list">';
            
            answersResult.data.forEach((item, index) => {
              
              let answerText = item.respuesta;
              let letter = item.respuesta ? item.respuesta.toLowerCase() : '';

              if (item.Preguntas && item.respuesta) {
                const key = `opcion_${letter}`;
                if (item.Preguntas[key]) {
                  answerText = item.Preguntas[key];
                }
              }

              const isCorrect = item.correcta;
              const statusClass = isCorrect ? "status-correct" : "status-incorrect";
              const statusIcon = isCorrect 
                ? '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>' 
                : '<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';

              let boxColor = "#FF4D4D";
              let iconSvg = `<svg x="14.5" y="8" width="31" height="44" viewBox="0 0 31 44" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M23.3641 43.9657C24.1218 43.9722 24.8855 43.8993 25.6454 43.7237C28.4894 43.0652 29.737 39.6869 30.2573 36.2186C30.6149 33.831 30.5888 31.4446 30.2494 29.3259C29.5215 24.7652 27.542 21.0706 25.3096 18.0006C25.2994 17.9872 25.2908 17.9744 25.2806 17.961C24.0322 19.4831 23.026 20.6637 22.2973 21.5049C22.8378 20.4209 23.6001 18.9216 24.5925 17.0492C24.3985 16.7995 24.2015 16.5537 24.003 16.3123C23.4483 16.9713 22.9714 17.5286 22.5742 17.9873C22.867 17.4036 23.223 16.6984 23.6443 15.8798C21.4562 13.2847 19.0063 11.0789 16.4379 9.13125C15.4339 10.8711 14.6174 12.2331 14.0177 13.2176C14.3878 12.0724 14.9122 10.4886 15.6038 8.50528C15.3706 8.33597 15.136 8.16615 14.9006 7.99854C10.2281 4.67595 5.19636 2.09202 0 0C0.108273 0.0422506 0.133616 1.31381 0.152184 1.48331C0.247078 2.34388 0.351574 3.20035 0.464971 4.05001C0.733 6.05266 1.03874 8.03618 1.39039 9.99103C2.76235 9.2652 3.70516 8.90553 4.02775 8.78685C3.77111 9.17044 2.99088 10.3226 1.74156 11.8617C2.17947 14.1033 2.6774 16.3038 3.2384 18.4543C4.9371 17.5075 6.11543 17.0584 6.4838 16.9209C6.19947 17.3469 5.27783 18.7098 3.79189 20.4936C5.58361 26.8245 7.97137 32.8469 11.472 37.3695C13.4865 39.974 15.946 41.9904 18.7646 43.0456C20.1746 43.5735 21.7525 43.9516 23.3641 43.9657Z" fill="#B82022"/>
</svg>`;

              if (letter === 'a') {
                  boxColor = "#2DB9FF";
                  iconSvg = `<svg x="12" y="10.5" width="36" height="39" viewBox="0 0 36 39" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="23.4892" cy="6.07478" rx="4.85983" ry="6.07478" fill="#1D739F"/>
  <ellipse cx="12.1494" cy="6.07478" rx="4.85983" ry="6.07478" fill="#1D739F"/>
  <ellipse cx="4.04986" cy="13.3644" rx="4.04986" ry="5.26481" fill="#1D739F"/>
  <ellipse cx="31.5889" cy="13.3644" rx="4.04986" ry="5.26481" fill="#1D739F"/>
  <ellipse cx="8.31184" cy="11.2084" rx="8.31184" ry="11.2084" transform="matrix(0.937895 0.346919 -0.352784 0.935705 8.71753 11.481)" fill="#1D739F"/>
  <ellipse cx="8.31184" cy="11.2084" rx="8.31184" ry="11.2084" transform="matrix(0.937895 -0.346919 -0.352784 -0.935705 18.2849 38.0823)" fill="#1D739F"/>
  <ellipse cx="17.4141" cy="18.2243" rx="8.50469" ry="5.26481" fill="#1D739F"/>
  <path d="M21.0593 34.2239C21.0593 36.1265 19.4274 33.2087 17.4144 33.2087C15.4014 33.2087 13.7695 36.1265 13.7695 34.2239C13.7695 32.3212 15.4014 30.7788 17.4144 30.7788C19.4274 30.7788 21.0593 32.3212 21.0593 34.2239Z" fill="#1D739F"/>
</svg>`;
              } else if (letter === 'b') {
                  boxColor = "#FFAF01";
                  iconSvg = `<svg x="10.5" y="11" width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.6505 -0.000105083L10.457 0.483611L9.34319 3.8328C9.10678 4.55438 8.84106 5.11057 8.90637 5.83881C8.96856 6.53237 9.519 9.86065 9.79331 10.8685C10.1534 12.1913 10.3311 15.2989 13.7594 21.1833C17.1877 27.0677 29.0357 27.7791 34.5311 27.3992L36.3059 27.314L38.0518 30.3106L36.8167 31.3222C29.9411 37.8093 13.2805 42.4074 4.50879 29.8569C-6.3644 14.2995 5.85786 4.59714 5.76185 3.94889C5.66235 3.27707 5.71806 0.836284 5.6505 -0.000105083Z" fill="#D08E00"/>
</svg>`;
              } else if (letter === 'c') {
                  boxColor = "#FF3538";
                  iconSvg = `<svg x="14.5" y="8" width="31" height="44" viewBox="0 0 31 44" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M23.3641 43.9657C24.1218 43.9722 24.8855 43.8993 25.6454 43.7237C28.4894 43.0652 29.737 39.6869 30.2573 36.2186C30.6149 33.831 30.5888 31.4446 30.2494 29.3259C29.5215 24.7652 27.542 21.0706 25.3096 18.0006C25.2994 17.9872 25.2908 17.9744 25.2806 17.961C24.0322 19.4831 23.026 20.6637 22.2973 21.5049C22.8378 20.4209 23.6001 18.9216 24.5925 17.0492C24.3985 16.7995 24.2015 16.5537 24.003 16.3123C23.4483 16.9713 22.9714 17.5286 22.5742 17.9873C22.867 17.4036 23.223 16.6984 23.6443 15.8798C21.4562 13.2847 19.0063 11.0789 16.4379 9.13125C15.4339 10.8711 14.6174 12.2331 14.0177 13.2176C14.3878 12.0724 14.9122 10.4886 15.6038 8.50528C15.3706 8.33597 15.136 8.16615 14.9006 7.99854C10.2281 4.67595 5.19636 2.09202 0 0C0.108273 0.0422506 0.133616 1.31381 0.152184 1.48331C0.247078 2.34388 0.351574 3.20035 0.464971 4.05001C0.733 6.05266 1.03874 8.03618 1.39039 9.99103C2.76235 9.2652 3.70516 8.90553 4.02775 8.78685C3.77111 9.17044 2.99088 10.3226 1.74156 11.8617C2.17947 14.1033 2.6774 16.3038 3.2384 18.4543C4.9371 17.5075 6.11543 17.0584 6.4838 16.9209C6.19947 17.3469 5.27783 18.7098 3.79189 20.4936C5.58361 26.8245 7.97137 32.8469 11.472 37.3695C13.4865 39.974 15.946 41.9904 18.7646 43.0456C20.1746 43.5735 21.7525 43.9516 23.3641 43.9657Z" fill="#B82022"/>
</svg>`;
              } else if (letter === 'd') {
                  boxColor = "#01AD47";
                  iconSvg = `<svg x="10" y="5" width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18.7555 20.2218L23.3139 20.764L24.4554 49.067L24.4318 49.4375L17.0825 48.5634L19.3885 35.5224L8.78323 23.1557L10.0856 23.3106L19.6765 33.1009L18.7555 20.2218Z" fill="#067432"/>
  <path d="M16.6244 1.49205C18.7745 0.541697 21.2255 0.541697 23.3756 1.49205L23.4538 1.52658C24.4464 1.96531 25.5184 2.19585 26.6036 2.20394L27.8835 2.21349C29.7156 2.22715 31.4216 3.14822 32.4382 4.67242L32.5073 4.77603C33.0265 5.55454 33.7505 6.17458 34.5997 6.56779L35.6849 7.07033C37.1593 7.75313 37.9793 9.36138 37.6777 10.9581V10.9581C37.5133 11.8284 37.6835 12.7342 38.1559 13.4834V13.4834C39.0945 14.9719 38.7839 16.9257 37.4299 18.0496L37.0749 18.3443C36.3844 18.9175 35.905 19.7047 35.7125 20.5811L35.6981 20.6471C35.3429 22.2645 34.0761 23.5255 32.4572 23.8734L31.0106 24.1842C30.027 24.3955 29.1056 24.8313 28.3183 25.4575L28.2123 25.5418C26.5774 26.8421 24.4532 27.3572 22.4043 26.9502L21.6905 26.8084C20.5744 26.5867 19.4256 26.5867 18.3095 26.8084L17.5957 26.9502C15.5468 27.3572 13.4226 26.8421 11.7877 25.5418L11.6817 25.4575C10.8944 24.8313 9.97298 24.3955 8.98945 24.1842L7.54285 23.8734C5.92389 23.5255 4.6571 22.2645 4.30194 20.6471L4.28745 20.5811C4.09499 19.7047 3.61555 18.9175 2.9251 18.3443L2.57013 18.0497C1.21613 16.9257 0.905482 14.9719 1.84408 13.4834V13.4834C2.31652 12.7342 2.48674 11.8284 2.32234 10.9581V10.9581C2.02075 9.36138 2.84065 7.75313 4.31514 7.07032L5.40034 6.56779C6.24948 6.17458 6.97355 5.55454 7.49275 4.77603L7.56185 4.67242C8.57836 3.14822 10.2844 2.22715 12.1165 2.21349L13.3964 2.20394C14.4816 2.19585 15.5536 1.96531 16.5462 1.52658L16.6244 1.49205Z" fill="#067432"/>
</svg>`;
              }

              html += `
                <li class="result-card">
                    <div class="icon-box" style="background-color: ${boxColor};">
                        <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="60" height="60" rx="15" fill="${boxColor}"/>
                            ${iconSvg}
                        </svg>
                    </div>
                    <div class="card-content">${answerText}</div>
                    <div class="status-box ${statusClass}">
                        ${statusIcon}
                    </div>
                </li>
              `;
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

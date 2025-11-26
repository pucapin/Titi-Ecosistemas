import { navigateTo } from "../app.js";

export default function renderResultsParent(data) {
  const app = document.getElementById("app");
  app.innerHTML = `
        <style>
            @media only screen and (max-width:767px) {
              body {
                  margin: 0px;
                  width: 100vw;
                  height: 100vh;
                  background: #FFF1E0;
                  font-family: 'Outfit', sans-serif;
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
                padding-top: 180px; /* Space for navbar */
                padding-left: 20px;
                padding-right: 20px;
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            .page-title {
                color: #5D4037;
                font-size: 18px;
                font-weight: 500;
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 10px;
            }
            
            .page-title svg {
                width: 10px;
                height: 16px;
            }

            /* Card Container */
            .card-container {
                background-color: white;
                border-radius: 20px;
                padding: 15px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                box-shadow: 0px 4px 0px 0px #D7C9B6;
                margin-bottom: 20px;
            }

            .medal-slot {
                width: 60px;
                height: 60px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .medal-img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
            
            .empty-slot {
                width: 60px;
                height: 60px;
                background-color: #E0D0B8;
                border-radius: 50%;
                clip-path: path("M30 0 C46.5685 0 60 13.4315 60 30 C60 46.5685 46.5685 60 30 60 C13.4315 60 0 46.5685 0 30 C0 13.4315 13.4315 0 30 0 Z"); /* Circle fallback */
                
            }

            /* Progress Section */
            .progress-section {
                margin-bottom: 30px;
                position: relative;
            }

            .progress-header {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 10px;
            }

            .progress-number {
    color: #FFC401;
    text-shadow: 2px 2px 0 rgba(251, 77, 80, 0.60);
    font-family: Outfit;
    font-size: 40px;
    font-style: normal;
    font-weight: 600;
    line-height: 93%; 
            }

            .progress-label {
                font-size: 20px;
                font-weight: 700;
                color: #4E342E;
                line-height: 1.1;
            }

            .progress-bar-container {
                width: 100%;
                height: 12px;
                background-color: #E0E0E0;
                border-radius: 10px;
                position: relative;
                margin-top: 15px;
                box-shadow: 0px 2px 0px 0px #D7C9B6;
            }
            
            .progress-bar-fill {
                height: 100%;
                background-color: #FF9800; 
                width: 0%; 
                transition: width 0.5s ease;
            }
            
            .progress-knob {
                width: 20px;
                height: 20px;
                background-color: #FFC107;
                border: 3px solid white;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                transform: translate(-50%, -50%);
                left: 0%; 
                box-shadow: 0px 2px 4px rgba(0,0,0,0.2);
            }

            .flag-icon {
                position: absolute;
                right: -10px;
                top: -35px;
                width: 40px;
                height: auto;
            }

            /* Banana Section Specifics */
            .banana-img {
                width: 100px;
                height: auto;
            }
            
            .footer-text {
                text-align: center;
                color: #FF6B00;
                font-size: 32px;
                font-weight: 700;
                margin-top: 20px;
                line-height: 1.2;
            }
            
            .footer-text span {
                color: #2E7D32; 
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
            <div class="page-title">

                Puntos y medallas
            </div>

            <div class="card-container">
                <div class="medal-slot" id="medal-titi">
                    <div class="empty-slot"></div>
                </div>
                <div class="medal-slot" id="medal-nutria">
                    <div class="empty-slot"></div>
                </div>
                <div class="medal-slot" id="medal-meer">
                    <div class="empty-slot"></div>
                </div>
            </div>

            <div class="progress-section">
                <div class="progress-header">
                    <span class="progress-number" id="medals-count">0</span>
                    <span class="progress-label">Titi<br>medallas</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" id="medals-progress-fill" style="width: 0%"></div>
                    <div class="progress-knob" id="medals-progress-knob" style="left: 0%"></div>
                    <img src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/flag.png" class="flag-icon" style="display: none;"> <!-- Placeholder for flag if needed, or use CSS shape -->
                    <!-- Using SVG for flag based on image -->
                    <svg class="flag-icon" width="45" height="55" viewBox="0 0 45 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 55V5" stroke="#8D6E63" stroke-width="4" stroke-linecap="round"/>
                        <path d="M5 5C5 5 15 0 25 5C35 10 45 5 45 5V30C45 30 35 35 25 30C15 25 5 30 5 30V5Z" fill="#FFC107"/>
                    </svg>
                </div>
            </div>

            <div class="card-container">
                <div class="medal-slot">
                    <img src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/banana.png" class="banana-img">
                </div>
                <div class="medal-slot">
                    <img src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/banana.png" class="banana-img">
                </div>
                <div class="medal-slot">
                    <img src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/banana.png" class="banana-img">
                </div>
            </div>

            <div class="progress-section">
                <div class="progress-header">
                    <span class="progress-number" id="banana-points">0</span>
                    <span class="progress-label">Banana<br>puntos</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" id="points-progress-fill" style="width: 0%"></div>
                    <div class="progress-knob" id="points-progress-knob" style="left: 0%"></div>
                    <svg class="flag-icon" width="45" height="55" viewBox="0 0 45 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 55V5" stroke="#8D6E63" stroke-width="4" stroke-linecap="round"/>
                        <path d="M5 5C5 5 15 0 25 5C35 10 45 5 45 5V30C45 30 35 35 25 30C15 25 5 30 5 30V5Z" fill="#FFC107"/>
                    </svg>
                </div>
            </div>

            <div class="footer-text">
                ¡Llega a la meta y<br>reclama tu <span>premio!</span>
            </div>

        </div>
        `;

  const homeBtn = document.getElementById("go-home-btn");
  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      navigateTo("/");
    });
  }

  const fetchChildData = async () => {
    try {
      const childId = localStorage.getItem("childId");

      if (!childId) {
        console.error("No child ID found");
        return;
      }

      try {
        const pointsResponse = await fetch(`https://backend-three-rho-19.vercel.app/child/${childId}`);
        const pointsResult = await pointsResponse.json();

        if (pointsResult.success) {
          const points = pointsResult.data.puntos || 0;
          document.getElementById("banana-points").textContent = points;

          const maxPoints = 1000;
          const pointsPercentage = Math.min((points / maxPoints) * 100, 100);
          document.getElementById("points-progress-fill").style.width = `${pointsPercentage}%`;
          document.getElementById("points-progress-knob").style.left = `${pointsPercentage}%`;

        } else {
          console.error(pointsResult.error);
        }
      } catch (e) {
        console.error(e);
      }

      try {
        const stationsResponse = await fetch(`https://backend-three-rho-19.vercel.app/stationchild/${childId}`);
        const stationsResult = await stationsResponse.json();

        if (stationsResult.success) {
          const stations = stationsResult.data;
          let medalsCount = 0;

          stations.forEach(item => {
            const starNumber = item.correctas || 0;
            if (item.completed) medalsCount++;

            if (item.Estacion.name == "EstacionTiti") {
              const img = document.createElement("img");
              img.src = `https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/${"titi" + starNumber}.png`;
              img.className = "medal-img";
              const slot = document.getElementById("medal-titi");
              slot.innerHTML = "";
              slot.appendChild(img);
            } else if (item.Estacion.name == "EstacionNutria") {
              const img = document.createElement("img");
              img.src = `https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/${"nutri" + starNumber}.svg`;
              img.className = "medal-img";
              const slot = document.getElementById("medal-nutria");
              slot.innerHTML = "";
              slot.appendChild(img);
            }
            else if (item.Estacion.name == "EstacionSuricata") { 
              const img = document.createElement("img");
              img.src = `https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/locked.png`;
              img.className = "medal-img";
              const slot = document.getElementById("medal-meer");
              slot.innerHTML = "";
              slot.appendChild(img);
            }
          });

          document.getElementById("medals-count").textContent = medalsCount;

          const maxMedals = 3;
          const medalsPercentage = Math.min((medalsCount / maxMedals) * 100, 100);
          document.getElementById("medals-progress-fill").style.width = `${medalsPercentage}%`;
          document.getElementById("medals-progress-knob").style.left = `${medalsPercentage}%`;

        } else {
          console.error(stationsResult.error);
        }
      } catch (e) {
        console.error(e);
      }

    } catch (error) {
      console.error(error);
    }
  };

  fetchChildData();
}

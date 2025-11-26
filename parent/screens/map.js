import { navigateTo } from "../app.js";

export default function renderMapChild() {
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
            position: absolute; /* Changed to absolute */
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

          .map {
              width: 100%;
              max-height: 100vh; 
              display: block; 
              margin: 0px;
              position: absolute;
              top: 0;
              left: 0;
              background-position: center;
              z-index: 1;
          }
          .mapa-img {
              width: 100%;
              height: auto;
              display: block; 
              }
          .medal {
              width: 150px;
              position: absolute;
          }
          #nutri-station {
              top: 16%;
              left: 50%;
          }

          #meer-station {
              top: 40%;
              left: 10%;
          }

          #titi-station {
              top: 75%;
              left: 30%;
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
        <div class="map">
        <img
          src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/map.png""
          class="mapa-img"
        />
        <img id="nutri-station" class="medal" src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/locked.png">
        <img id="meer-station" class="medal" src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/locked.png">
        <img id="titi-station" class="medal" src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/locked.png">
        </div>
      `;
      const childId = localStorage.getItem("childId");
      const titiStation = document.getElementById("titi-station");
      const nutriStation = document.getElementById("nutri-station");

      const homeBtn = document.getElementById("go-home-btn");
      if(homeBtn) {
          homeBtn.addEventListener("click", () => {
              navigateTo("/");
          });
      }

    const fetchStationProgress = async () => {
    try {      
      if (!childId) {
        return;
      }

      try {
        const response = await fetch(`https://backend-three-rho-19.vercel.app/stationchild/${childId}`);
        const result = await response.json();

        if (result.success) {
          if (result.data.length === 0) {
            return
            //stationsList.textContent = "No hay estaciones registradas yet.";
          } else {
            //let html = '<ul style="list-style-type: none; padding: 0;">';
            
            result.data.forEach(item => {
              const starNumber = item.correctas || 0;

              if(item.Estacion.name == "EstacionTiti") {
                titiStation.src = `https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/${"titi" + starNumber}.png`
              } else if (item.Estacion.name =="EstacionNutria") {
                nutriStation.src = `https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/${"nutri" + starNumber}.svg`;
              }
            });
          }
        } else {
          console.error(result.error);
        }
      } catch (e) {
        stationsList.textContent = "Error al cargar estaciones";
        console.error(e);
      }

    } catch (error) {
      stationsList.textContent = "Error de conexión";
      console.error(error);
    }
  };

  fetchStationProgress();
}
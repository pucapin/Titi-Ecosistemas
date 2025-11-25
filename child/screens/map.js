import { makeRequest } from "../app.js";

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
          .map {
              width: 100%;
              display: inline-block;
              margin: 0px;
              position: relative;
              background-position: center;
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

  nutriStation.addEventListener('click', () => {
    makeRequest("/games/change", "POST", { station: "nutriStation" });
  })

}
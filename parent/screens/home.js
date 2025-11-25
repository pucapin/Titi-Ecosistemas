import { navigateTo, makeRequest } from "../app.js";

export default function renderHome(data) {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="home-container">
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
            <div class="home-action">
                <svg xmlns="http://www.w3.org/2000/svg" width="51" height="33" viewBox="0 0 51 33" fill="none">
  <path d="M22.9376 2.34143C24.3886 1.01556 26.6114 1.01556 28.0624 2.34142L40.3577 13.5764C42.9173 15.9153 41.2626 20.1792 37.7953 20.1792H13.2047C9.73743 20.1792 8.08269 15.9153 10.6423 13.5764L22.9376 2.34143Z" fill="white"/>
  <rect x="32.2319" y="3.19971" width="6.12" height="10.4633" rx="1.68828" fill="white"/>
  <path d="M32.4719 11.0004C35.2688 11.0006 37.5362 13.2679 37.5364 16.0648V27.6097C37.5363 30.4067 35.2689 32.674 32.4719 32.6742H29.3254V26.0502C29.3254 24.8848 28.3804 23.94 27.2151 23.9398H23.7854C22.6199 23.9398 21.675 24.8847 21.675 26.0502V32.6742H18.9368C16.1398 32.674 13.8724 30.4067 13.8723 27.6097V16.0648C13.8725 13.2679 16.1398 11.0006 18.9368 11.0004H32.4719Z" fill="white"/>
</svg>
                <span class="home-label">Inicio</span>
            </div>
        </header>

        <main class="main-content">
            <h1 class="screen-title">Sobre ${localStorage.getItem("childName") || "ANDY"}</h1>
            
            <div class="cards-grid">
                <div class="card card-blue" id="go-screen-questions">
                    <div class="card-content">
                        <span class="card-label">Preguntas y respuestas</span>
                        <img src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/QA.svg" class="card-icon" alt="Q&A">
                    </div>
                </div>
                
                <div class="card card-green" id="go-screen-map">
                    <div class="card-content">
                        <span class="card-label">Mapa de etapas</span>
                        <img src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/MapStages.svg" class="card-icon" alt="Map">
                    </div>
                </div>
                
                <div class="card card-yellow" id="go-screen-medals">
                    <div class="card-content">
                        <span class="card-label">Medallas y puntos</span>
                        <img src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/PointsMedals.svg" class="card-icon" alt="Medals">
                    </div>
                </div>
                
                <div class="card card-red" id="go-screen-results">
                     <div class="card-content">
                        <span class="card-label">Aciertos y errores</span>
                        <img src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/SucessFailures.svg" class="card-icon" alt="Results">
                    </div>
                </div>
            </div>
        </main>

        <div class="leaves-decoration"></div>

        <footer class="home-footer">
            <img src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/Logo.svg" class="footer-logo" alt="Titi Logo">
        </footer>
    </div>

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

        body {
            margin: 0;
            padding: 0;
            font-family: 'Nunito', sans-serif;
            background-color: #FFF7E9;
            background-image:none;
        }

        .home-container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            position: relative;
            overflow-x: hidden;
            overflow-y: hidden;
            height: 100vh;
        }

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
             background-color: #55BD47; /* Match the green circle if transparent */
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
font-family: Outfit;
font-size: 32px;
font-style: normal;
font-weight: 700;
line-height: 93%; /* 29.76px */
margin:0
        }

        .user-role {
            color: #FFF;
font-family: Outfit;
font-size: 13.9px;
font-style: normal;
font-weight: 400;
line-height: 93%; /* 12.927px */
        }

        .home-action {
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
        }

        .home-icon {
            width: 24px;
            height: 24px;
            margin-bottom: 2px;
        }

        .home-label {
           color: #FFF;
font-family: Outfit;
font-size: 13.9px;
font-style: normal;
font-weight: 400;
line-height: 93%; /* 12.927px */
        }

        .main-content {
            flex: 1;
            padding: 20px;
            padding-top: 80px;
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 2;
            padding-bottom: 80px; /* Space for footer */
        }

        .screen-title {
            color: #FF600B;
font-family: Outfit;
font-size: 40px;
font-style: normal;
font-weight: 600;
line-height: 93%; /* 37.2px */
            margin-top: 20px;
            margin-bottom: 30px;
            text-align: center;
        }

        .cards-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            width: 100%;
            max-width: 400px;
        }

        .card {
            aspect-ratio: 1 / 1;
            border-radius: 25px;
            padding: 15px;
            display: flex;
            flex-direction: column;
            cursor: pointer;
            transition: transform 0.1s ease;
            box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
            position: relative;
            overflow: hidden;
        }

        .card:active {
            transform: scale(0.98);
        }

        .card-content {
            display: flex;
            flex-direction: column;
            height: 100%;
            justify-content: space-between;
            align-items: center;
            text-align: center;
        }

        .card-label {
            font-size: 16px;
            font-weight: 700;
            color: #585858; /* Fallback or specific color */
            margin-bottom: 5px;
            z-index: 2;
            text-align: center;
            width: 100%;
        }

        .card-icon {
            width: 80%;
            height: auto;
            object-fit: contain;
            z-index: 1;
        }

        /* Card specific colors */
        .card-blue {
            background-color: #2BC8F8;
        }
        .card-blue .card-label { color: #005F7A; } /* Darker text for contrast */

        .card-green {
            background-color: #01AD47;
        }
        .card-green .card-label { color: #00461C; }

        .card-yellow {
            background-color: #FFD401;
        }
        .card-yellow .card-label { color: #7A6500; }

        .card-red {
            background-color: #FF4D4D;
        }
        .card-red .card-label { color: #660000; }

        .leaves-decoration {
        margin-top: 70px;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/Leaves.svg');
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            pointer-events: none;
            z-index: 1;
            opacity: 0.8;
        }

        .home-footer {
            height: 70px;
            background-color: #FF6B00;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            z-index: 10;
        }

        .footer-logo {
            width: 73.083px;
            height: 51.588px;
        }
    </style>
  `;

  if(!localStorage.getItem("childId") || localStorage.getItem("childId") == "null") {
    try {
        getChild(parentId);
    } catch (e) {
        console.log("getChild logic preserved but parentId might be undefined");
    }
  } else {
    const childId = localStorage.getItem("childId");
    makeRequest(`/child/${childId}`, "GET").then(response => {
        if (response.success && response.data && response.data.name) {
            localStorage.setItem("childName", response.data.name);
            const roleElem = document.querySelector(".user-role");
            const nameChild = document.querySelector(".screen-title");
            if (roleElem) roleElem.textContent = `Admin de ${response.data.name}`;
            if (nameChild) nameChild.textContent = `Sobre ${response.data.name}`;
        }
    }).catch(console.error);
  }
  
  const questionsButton = document.getElementById("go-screen-questions");
  questionsButton.addEventListener("click", () => {
    navigateTo("/answers");
  });
  const medalsButton = document.getElementById("go-screen-medals");
  medalsButton.addEventListener("click", () => {
    navigateTo("/medals");
  });
  const resultsButton = document.getElementById("go-screen-results");
  resultsButton.addEventListener("click", () => {
    navigateTo("/results");
  });
  const mapButton = document.getElementById("go-screen-map");
  mapButton.addEventListener("click", () => {
    navigateTo("/map");
  });
}

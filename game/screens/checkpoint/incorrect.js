import { navigateTo, makeRequest } from "../../app.js";
import { getResource } from "../game/running/resources.js";

let timeoutId = null;

export default function renderIncorrect(data) {
  // Cancelar cualquier timeout anterior
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  
  const app = document.getElementById("app");
  app.innerHTML = `
<style>
          body {
            width: 100vw;
     height: 100vh;
     background: #FFF1E0;
     background-image: url(https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/webbg.png);
     background-size: cover;
     background-position: center;
     background-repeat: no-repeat;
     margin: 0;
     padding: 0;

        }
</style>
        <div class="container">
        <h1 class="correct">
        ¡Incorrecto!
        </h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="110" height="110" viewBox="0 0 110 110" fill="none">
  <circle cx="55" cy="55" r="55" fill="#FF3134"/>
  <circle cx="55" cy="55" r="46" fill="#FFF1E0"/>
  <circle cx="54.5" cy="54.5" r="40.5" fill="#FF3134"/>
  <g transform="translate(34.5, 34)">
  <line x1="35.3934" y1="6.52316" x2="6.52319" y2="36.8405"
    stroke="white" stroke-width="9" stroke-linecap="round" />
  <line x1="4.61395" y1="-4.61395" x2="46.4784" y2="-4.61395"
    transform="matrix(0.689612 0.724179 0.724179 -0.689612 5.0332 0)"
    stroke="white" stroke-width="9" stroke-linecap="round" />
</g>

</svg>
        <h2 id="answer">La respuesta correcta es:</h2>
        <div id="option" ></div>
        </div>
        `;
  
  const stationId = getResource("stationId"); // Mocked por ahora
  const checkpoint = Number(localStorage.getItem('checkpoint'));
  const correctAnswers = Number(localStorage.getItem('correctAnswers'));
  const optionEl = document.getElementById('option');
  const childId = data.childId;
    if(data.correctLetter == "a") {
    optionEl.classList.add("option1")
    optionEl.innerHTML += `        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="41" viewBox="0 0 38 41" fill="none">
  <ellipse cx="24.9403" cy="6.45006" rx="5.16005" ry="6.45006" fill="#1D739F"/>
  <ellipse cx="12.8998" cy="6.45006" rx="5.16005" ry="6.45006" fill="#1D739F"/>
  <ellipse cx="4.30004" cy="14.1901" rx="4.30004" ry="5.59005" fill="#1D739F"/>
  <ellipse cx="33.5408" cy="14.1901" rx="4.30004" ry="5.59005" fill="#1D739F"/>
  <ellipse cx="8.82532" cy="11.9009" rx="8.82532" ry="11.9009" transform="matrix(0.937895 0.346919 -0.352784 0.935705 9.25635 12.1903)" fill="#1D739F"/>
  <ellipse cx="8.82532" cy="11.9009" rx="8.82532" ry="11.9009" transform="matrix(0.937895 -0.346919 -0.352784 -0.935705 19.415 40.4349)" fill="#1D739F"/>
  <ellipse cx="18.49" cy="19.3501" rx="9.03008" ry="5.59005" fill="#1D739F"/>
  <path d="M22.3602 36.3381C22.3602 38.3583 20.6275 35.2603 18.4902 35.2603C16.3528 35.2603 14.6201 38.3583 14.6201 36.3381C14.6201 34.3179 16.3528 32.6802 18.4902 32.6802C20.6275 32.6802 22.3602 34.3179 22.3602 36.3381Z" fill="#1D739F"/>
</svg>`
    optionEl.innerHTML += data.correctOption
  } else if(data.correctLetter == "b") {
    optionEl.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="41" height="49" viewBox="0 0 41 49" fill="none">
  <path d="M12.5187 -1.29996e-05L17.9019 2.03765L15.588 5.54935C15.0936 6.30703 14.6164 6.86533 14.4672 7.72365C14.3251 8.54109 13.9332 12.5415 13.9384 13.786C13.9452 15.4195 13.1923 19.051 15.3253 26.8802C17.4582 34.7093 30.8759 39.1785 37.3181 40.4345L39.3871 40.8832L40.4734 44.8702L38.7401 45.654C28.8277 51.0021 8.23482 51.1613 2.00556 34.0132C-5.71607 12.7569 11.3409 5.35525 11.4302 4.57954C11.5226 3.77562 12.3388 0.983478 12.5187 -1.29996e-05Z" fill="#D08E00"/>
</svg>`
    optionEl.innerHTML += data.correctOption
    optionEl.classList.add("option2")
  } else if(data.correctLetter =="c") {
    optionEl.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="33" height="47" viewBox="0 0 33 47" fill="none">
  <path d="M24.8075 46.6817C25.6119 46.6887 26.4229 46.6112 27.2296 46.4248C30.2494 45.7256 31.574 42.1386 32.1265 38.456C32.5062 35.9209 32.4785 33.3871 32.1181 31.1376C31.3452 26.2951 29.2434 22.3723 26.8731 19.1126C26.8623 19.0984 26.8531 19.0848 26.8424 19.0706C25.5169 20.6867 24.4485 21.9402 23.6747 22.8334C24.2487 21.6824 25.0581 20.0905 26.1117 18.1025C25.9057 17.8373 25.6966 17.5763 25.4858 17.32C24.8969 18.0197 24.3904 18.6114 23.9687 19.0985C24.2796 18.4788 24.6576 17.73 25.1049 16.8608C22.7817 14.1054 20.1804 11.7633 17.4534 9.69535C16.3873 11.5426 15.5204 12.9888 14.8837 14.0342C15.2766 12.8182 15.8334 11.1366 16.5677 9.0307C16.3202 8.85093 16.071 8.67062 15.8211 8.49266C10.86 4.96481 5.51737 2.22126 0 0C0.114962 0.0448607 0.14187 1.39497 0.161586 1.57494C0.262341 2.48868 0.373293 3.39806 0.493695 4.3002C0.778282 6.42657 1.10291 8.53262 1.47628 10.6082C2.933 9.83757 3.93405 9.45568 4.27657 9.32967C4.00407 9.73695 3.17564 10.9603 1.84915 12.5945C2.31411 14.9745 2.8428 17.311 3.43845 19.5944C5.24209 18.589 6.49321 18.1122 6.88435 17.9662C6.58244 18.4185 5.60387 19.8656 4.02614 21.7596C5.92854 28.4817 8.46381 34.876 12.1807 39.6781C14.3197 42.4434 16.9311 44.5844 19.9238 45.7048C21.4209 46.2653 23.0963 46.6667 24.8075 46.6817Z" fill="#B82022"/>
</svg>`
    optionEl.innerHTML += data.correctOption
    optionEl.classList.add("option3")
  } else if(data.correctLetter =="d") {
    optionEl.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50" fill="none">
  <path d="M18.7555 20.2217L23.3139 20.7639L24.4554 49.0669L24.4318 49.4374L17.0825 48.5632L19.3885 35.5222L8.78323 23.1556L10.0856 23.3105L19.6765 33.1008L18.7555 20.2217Z" fill="#067432"/>
  <path d="M16.6244 1.49205C18.7745 0.541697 21.2255 0.541697 23.3756 1.49205L23.4538 1.52658C24.4464 1.96531 25.5184 2.19585 26.6036 2.20394L27.8835 2.21349C29.7156 2.22715 31.4216 3.14822 32.4382 4.67242L32.5073 4.77603C33.0265 5.55454 33.7505 6.17458 34.5997 6.56779L35.6849 7.07032C37.1593 7.75313 37.9793 9.36138 37.6777 10.9581C37.5133 11.8284 37.6835 12.7342 38.1559 13.4834C39.0945 14.9719 38.7839 16.9257 37.4299 18.0497L37.0749 18.3443C36.3844 18.9175 35.905 19.7047 35.7125 20.5811L35.6981 20.6471C35.3429 22.2645 34.0761 23.5255 32.4571 23.8734L31.0106 24.1842C30.027 24.3955 29.1056 24.8313 28.3183 25.4575L28.2123 25.5418C26.5774 26.8421 24.4532 27.3572 22.4043 26.9502L21.6905 26.8084C20.5744 26.5867 19.4256 26.5867 18.3095 26.8084L17.5957 26.9502C15.5468 27.3572 13.4226 26.8421 11.7877 25.5418L11.6817 25.4575C10.8944 24.8313 9.97298 24.3955 8.98945 24.1842L7.54285 23.8734C5.92389 23.5255 4.6571 22.2645 4.30194 20.6471L4.28745 20.5811C4.09499 19.7047 3.61555 18.9175 2.9251 18.3443L2.57013 18.0497C1.21613 16.9257 0.905482 14.9719 1.84408 13.4834C2.31652 12.7342 2.48674 11.8284 2.32234 10.9581C2.02075 9.36138 2.84065 7.75313 4.31514 7.07032L5.40034 6.56779C6.24948 6.17458 6.97355 5.55454 7.49275 4.77603L7.56185 4.67242C8.57836 3.14822 10.2844 2.22715 12.1165 2.21349L13.3964 2.20394C14.4816 2.19585 15.5536 1.96531 16.5462 1.52658L16.6244 1.49205Z" fill="#067432"/>
</svg>`
    optionEl.innerHTML += data.correctOption
    optionEl.classList.add("option4")
  }

  // Volver al juego después de 3 segundos
timeoutId = setTimeout(() => {
  if (checkpoint === 3) {
    localStorage.setItem('checkpoint', JSON.stringify(0))
    // Obtener los puntos antes de navegar (NO los borramos aún)
    const gamePoints = localStorage.getItem('gamePoints');
    const points = gamePoints ? Number(JSON.parse(gamePoints)) : 0;
    localStorage.removeItem('checkpointOrder');
    makeRequest(`/stationchild`, "POST", {childId: childId, stationId: stationId, completed: true, correctas: correctAnswers})
    localStorage.removeItem('correctAnswers');
    makeRequest("/games/change", "POST", { station: "titiEstacion" });
    navigateTo('/end', points);
    timeoutId = null;
    return;
  }
  navigateTo("/game");
  timeoutId = null;
}, 3000);
}
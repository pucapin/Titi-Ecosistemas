import { navigateTo, channel, makeRequest } from "../../app.js";


export default function renderQuestion(data) {
  const app = document.getElementById("app");
  app.innerHTML = `
  <style>
  .level {
    color: #FF3538;
text-align: center;
font-family: Raleway;
font-size: 27.844px;
font-style: normal;
font-weight: 800;
line-height: 93%; /* 25.895px */

}

#level-text {
        margin-top: 120px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.circle {
    margin-left: 16px;
    width: 15px;
height: 30px;
    display: inline-flex;
padding: 3px 11px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 49px;
background: #FF3538;
color: #FFF;
text-align: center;
font-family: Raleway;
font-size: 27.844px;
font-style: normal;
font-weight: 800;
line-height: 93%;
}
#question {
    color: var(--darkorange, #FF600B);
text-align: center;
font-family: Raleway;
font-size: 27.844px;
font-style: normal;
font-weight: 600;
line-height: 93%; 
}

.speech {
    fill: #FFF;
filter: drop-shadow(0 6px 0 #BFB5A8);
margin-bottom: 20%;

}
.options {
    margin-left: 200px;
    display: flex;
width: 700px;
align-items: flex-start;
align-content: flex-start;
gap: 20px 16px;
flex-wrap: wrap;
}
.instructions {
    margin: 0 auto;
    max-width: 1000px;    
    display: flex;
    align-items: center; 
    justify-content: center;
    gap: 12px;           
    padding: 0 16px;
    box-sizing: border-box;
}

.titi {
    width: 300px;       
    height: auto;
}

.top-decoration {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 500px;
  pointer-events: none; /* para que no moleste */
  z-index: 1;
}
#option1 {
    color: #FFF;
text-align: center;
font-family: Raleway;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 93%; /* 18.6px */
    display: flex;
width: 215px;
height: 119px;
padding: 24px 34px 24px 6px;
align-items: center;
gap: 10px;
flex-shrink: 0;
border-radius: 12px;
background: #2DB9FF;
box-shadow: 0 6px 0 0 #3E9FD0;
}

#option2 {
    color: #FFF;
text-align: center;
font-family: Raleway;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 93%; /* 18.6px */
    display: flex;
width: 215px;
height: 119px;
padding: 24px 34px 24px 6px;
align-items: center;
gap: 10px;
flex-shrink: 0;
border-radius: 12px;
background: #FFAF01;
box-shadow: 0 6px 0 0 #E39C00;
}

#option3 {
    color: #FFF;
text-align: center;
font-family: Raleway;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 93%; /* 18.6px */
   display: flex;
width: 215px;
height: 119px;
padding: 24px 34px 24px 6px;
align-items: center;
gap: 10px;
flex-shrink: 0;
border-radius: 12px;
background: #FF3538;
box-shadow: 0 6px 0 0 #CB2C2F;
}

#option4 {
    color: #FFF;
text-align: center;
font-family: Raleway;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 93%; /* 18.6px */
display: flex;
width: 215px;
height: 119px;
padding: 24px 34px 24px 6px;
align-items: center;
gap: 10px;
flex-shrink: 0;
border-radius: 12px;
background: #01AD47;
box-shadow: 0 6px 0 0 #008B38;

}
  </style>
  <svg xmlns="http://www.w3.org/2000/svg" width="502" height="109" viewBox="0 0 502 109" fill="none" class="top-decoration">
  <path d="M426.088 -19.6621C392.181 3.03244 343.864 28.7606 290.586 46.7979C287.973 36.9573 279.75 23.532 261.676 28.249C263.391 35.2966 269.075 47.0708 279.791 50.3242C272.9 52.4919 265.939 54.5233 258.927 56.3936C219.779 37.6045 181.292 12.6879 144.245 -19.5098L142.934 -18L141.621 -16.4902C177.618 14.7953 214.968 39.2578 252.959 57.9424C249.351 58.8535 245.731 59.7201 242.103 60.541C242.1 60.516 242.097 60.4909 242.094 60.4658C241.519 60.5916 240.91 60.7523 240.273 60.9492C230.188 63.1852 220.034 65.0599 209.869 66.5029C203.23 67.4454 196.588 68.2037 189.96 68.7627C187.644 58.3991 179.515 42.472 161.142 45.3438C162.843 52.5271 168.266 64.6954 178.249 69.5381C147.23 71.0221 116.702 67.853 88.2646 58.1934C88.8513 47.5026 85.4177 29.4516 67.2217 25.4697C66.9143 32.5593 68.5919 45.1784 75.8164 53.4863C42.9645 39.7529 13.3653 16.5692 -10.334 -19.1064L-13.666 -16.8936C21.8435 36.5608 70.3295 62.4673 122.994 70.7852C115.75 73.4698 108.622 79.8852 106.305 93.3115C114.501 93.9106 131.354 90.4497 136.335 72.5127C160.597 74.987 185.572 73.9918 210.431 70.4629C216.711 69.5713 222.986 68.5148 229.243 67.3145C223.27 72.7538 218.524 81.63 220.335 95.1191C228.053 92.4342 242.425 82.7307 242.349 64.584C247.764 63.3675 253.159 62.0505 258.523 60.6377C356.84 107.462 459.221 116.033 553.461 104.253C685.9 87.6984 802.354 30.9548 869.156 -16.3682L866.844 -19.6318C800.49 27.3731 684.65 83.823 552.965 100.283C460.708 111.815 360.72 103.716 264.495 59.0234C287.238 52.7184 309.389 44.7862 330.285 35.9902C322.568 41.7306 314.287 53.2779 319.316 71.0098C326.981 66.6544 340.902 53.1204 336.132 33.4932C371.989 17.9527 403.874 0.0192986 428.312 -16.3379L426.088 -19.6621Z" fill="#01AD47"/>
</svg>
  <div  id="level-text">
    <h3 class="level">Llegaste al nivel</h3>
    <div class="circle">
    <p id="level-number">0</p>
    </div>
  </div>

  <h1 id="question"></h1>
  <div class="options">
        <div id="option1">
        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="41" viewBox="0 0 38 41" fill="none">
  <ellipse cx="24.9403" cy="6.45006" rx="5.16005" ry="6.45006" fill="#1D739F"/>
  <ellipse cx="12.8998" cy="6.45006" rx="5.16005" ry="6.45006" fill="#1D739F"/>
  <ellipse cx="4.30004" cy="14.1901" rx="4.30004" ry="5.59005" fill="#1D739F"/>
  <ellipse cx="33.5408" cy="14.1901" rx="4.30004" ry="5.59005" fill="#1D739F"/>
  <ellipse cx="8.82532" cy="11.9009" rx="8.82532" ry="11.9009" transform="matrix(0.937895 0.346919 -0.352784 0.935705 9.25635 12.1903)" fill="#1D739F"/>
  <ellipse cx="8.82532" cy="11.9009" rx="8.82532" ry="11.9009" transform="matrix(0.937895 -0.346919 -0.352784 -0.935705 19.415 40.4349)" fill="#1D739F"/>
  <ellipse cx="18.49" cy="19.3501" rx="9.03008" ry="5.59005" fill="#1D739F"/>
  <path d="M22.3602 36.3381C22.3602 38.3583 20.6275 35.2603 18.4902 35.2603C16.3528 35.2603 14.6201 38.3583 14.6201 36.3381C14.6201 34.3179 16.3528 32.6802 18.4902 32.6802C20.6275 32.6802 22.3602 34.3179 22.3602 36.3381Z" fill="#1D739F"/>
</svg>
        
        </div>
        <div id="option2">
        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="49" viewBox="0 0 41 49" fill="none">
  <path d="M12.5187 -1.29996e-05L17.9019 2.03765L15.588 5.54935C15.0936 6.30703 14.6164 6.86533 14.4672 7.72365C14.3251 8.54109 13.9332 12.5415 13.9384 13.786C13.9452 15.4195 13.1923 19.051 15.3253 26.8802C17.4582 34.7093 30.8759 39.1785 37.3181 40.4345L39.3871 40.8832L40.4734 44.8702L38.7401 45.654C28.8277 51.0021 8.23482 51.1613 2.00556 34.0132C-5.71607 12.7569 11.3409 5.35525 11.4302 4.57954C11.5226 3.77562 12.3388 0.983478 12.5187 -1.29996e-05Z" fill="#D08E00"/>
</svg>
        
        </div>
        <div id="option3">
        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="47" viewBox="0 0 33 47" fill="none">
  <path d="M24.8075 46.6817C25.6119 46.6887 26.4229 46.6112 27.2296 46.4248C30.2494 45.7256 31.574 42.1386 32.1265 38.456C32.5062 35.9209 32.4785 33.3871 32.1181 31.1376C31.3452 26.2951 29.2434 22.3723 26.8731 19.1126C26.8623 19.0984 26.8531 19.0848 26.8424 19.0706C25.5169 20.6867 24.4485 21.9402 23.6747 22.8334C24.2487 21.6824 25.0581 20.0905 26.1117 18.1025C25.9057 17.8373 25.6966 17.5763 25.4858 17.32C24.8969 18.0197 24.3904 18.6114 23.9687 19.0985C24.2796 18.4788 24.6576 17.73 25.1049 16.8608C22.7817 14.1054 20.1804 11.7633 17.4534 9.69535C16.3873 11.5426 15.5204 12.9888 14.8837 14.0342C15.2766 12.8182 15.8334 11.1366 16.5677 9.0307C16.3202 8.85093 16.071 8.67062 15.8211 8.49266C10.86 4.96481 5.51737 2.22126 0 0C0.114962 0.0448607 0.14187 1.39497 0.161586 1.57494C0.262341 2.48868 0.373293 3.39806 0.493695 4.3002C0.778282 6.42657 1.10291 8.53262 1.47628 10.6082C2.933 9.83757 3.93405 9.45568 4.27657 9.32967C4.00407 9.73695 3.17564 10.9603 1.84915 12.5945C2.31411 14.9745 2.8428 17.311 3.43845 19.5944C5.24209 18.589 6.49321 18.1122 6.88435 17.9662C6.58244 18.4185 5.60387 19.8656 4.02614 21.7596C5.92854 28.4817 8.46381 34.876 12.1807 39.6781C14.3197 42.4434 16.9311 44.5844 19.9238 45.7048C21.4209 46.2653 23.0963 46.6667 24.8075 46.6817Z" fill="#B82022"/>
</svg>
        
        </div>
        <div id="option4">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50" fill="none">
  <path d="M18.7555 20.2217L23.3139 20.7639L24.4554 49.0669L24.4318 49.4374L17.0825 48.5632L19.3885 35.5222L8.78323 23.1556L10.0856 23.3105L19.6765 33.1008L18.7555 20.2217Z" fill="#067432"/>
  <path d="M16.6244 1.49205C18.7745 0.541697 21.2255 0.541697 23.3756 1.49205L23.4538 1.52658C24.4464 1.96531 25.5184 2.19585 26.6036 2.20394L27.8835 2.21349C29.7156 2.22715 31.4216 3.14822 32.4382 4.67242L32.5073 4.77603C33.0265 5.55454 33.7505 6.17458 34.5997 6.56779L35.6849 7.07032C37.1593 7.75313 37.9793 9.36138 37.6777 10.9581C37.5133 11.8284 37.6835 12.7342 38.1559 13.4834C39.0945 14.9719 38.7839 16.9257 37.4299 18.0497L37.0749 18.3443C36.3844 18.9175 35.905 19.7047 35.7125 20.5811L35.6981 20.6471C35.3429 22.2645 34.0761 23.5255 32.4571 23.8734L31.0106 24.1842C30.027 24.3955 29.1056 24.8313 28.3183 25.4575L28.2123 25.5418C26.5774 26.8421 24.4532 27.3572 22.4043 26.9502L21.6905 26.8084C20.5744 26.5867 19.4256 26.5867 18.3095 26.8084L17.5957 26.9502C15.5468 27.3572 13.4226 26.8421 11.7877 25.5418L11.6817 25.4575C10.8944 24.8313 9.97298 24.3955 8.98945 24.1842L7.54285 23.8734C5.92389 23.5255 4.6571 22.2645 4.30194 20.6471L4.28745 20.5811C4.09499 19.7047 3.61555 18.9175 2.9251 18.3443L2.57013 18.0497C1.21613 16.9257 0.905482 14.9719 1.84408 13.4834C2.31652 12.7342 2.48674 11.8284 2.32234 10.9581C2.02075 9.36138 2.84065 7.75313 4.31514 7.07032L5.40034 6.56779C6.24948 6.17458 6.97355 5.55454 7.49275 4.77603L7.56185 4.67242C8.57836 3.14822 10.2844 2.22715 12.1165 2.21349L13.3964 2.20394C14.4816 2.19585 15.5536 1.96531 16.5462 1.52658L16.6244 1.49205Z" fill="#067432"/>
</svg>
        
        </div>
</div>
<div class="instructions">
<img src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/jumping2.svg" class="titi">
  <svg xmlns="http://www.w3.org/2000/svg" width="266" height="94" viewBox="0 0 266 94" fill="none" class="speech">

    <path d="M241.692 0C254.697 0.000229866 265.24 10.5429 265.24 23.5479V61.9268C265.239 74.9316 254.697 85.4744 241.692 85.4746H29.9224C27.7399 85.4746 25.6272 85.1758 23.6216 84.6201L3.50635 93.0889C1.53735 93.9178 -0.506209 92.0769 0.112793 90.0322L6.95264 67.4365C6.96517 67.3951 6.97934 67.3546 6.99365 67.3145C6.58862 65.5842 6.37455 63.7805 6.37451 61.9268V23.5479C6.37464 10.5427 16.9172 5.56669e-05 29.9224 0H241.692Z"
      fill="white"/>

<text x="50%" y="45%" text-anchor="middle" fill="#01AD47"
      font-size="19" font-family="Raleway" font-weight="700">

  <tspan x="50%" dy="0">
    ¡Responde la pregunta
  </tspan>

  <tspan x="50%" dy="1.2em">
    desde el celular!
  </tspan>

</text>


  </svg>
</div>

        `;

    // Debe existir una forma de validar el ID de la pregunta, ya que hay 3 checkpoints y en cada uno debe haber una distinta
    // Podemos validar en qué fase se encuentra..
    const levelNumber = document.getElementById("level-number")
    const levelText = document.getElementById("level-text");
    const checkpointNum = localStorage.getItem("checkpoint");

    levelNumber.textContent = checkpointNum;
    if(checkpointNum == "1") {
        levelText.style.color = "#FF3538";
    }else if (checkpointNum == "2") {
        levelText.style.color = "#2DB9FF";
    }else if (checkpointNum == "3") {
        levelText.style.color = "#FF9E01";
    }



    const questionTitle = document.getElementById('question')
    const optionA = document.getElementById('option1');
    const optionB = document.getElementById('option2');
    const optionC = document.getElementById('option3');
    const optionD = document.getElementById('option4');
    const correctAnswers = Number(localStorage.getItem('correctAnswers'));
    let correct = '';
    let correctOption = '';
    let correctLetter = '';
    


    // se debe poner el id de la pregunta aqui
    async function getQuestion() {
        const response = await makeRequest(`/checkpoint/question/${data}`, "GET");
        questionTitle.innerHTML = response.Preguntas.pregunta;
        optionA.innerHTML += response.Preguntas.opcion_a;
        optionB.innerHTML += response.Preguntas.opcion_b;
        optionC.innerHTML += response.Preguntas.opcion_c;
        optionD.innerHTML += response.Preguntas.opcion_d;
        correct = 'opcion_' + response.Preguntas.correct;
        correctLetter = response.Preguntas.correct;
        correctOption = response.Preguntas[correct];

    }
    getQuestion()

    channel.on("broadcast",{event: "answer_result"}, (data) => {
    console.log("Answer result received:", data);

    const { questionId, isCorrect, childId } = data.payload;

    if(isCorrect === true) {

    localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers + 1));
    navigateTo('/correct', {questionId, isCorrect, correctOption, childId, correctLetter})
    } else {
    navigateTo('/incorrect', {questionId, isCorrect, correctOption, childId, correctLetter})
    }

    }).subscribe();
}
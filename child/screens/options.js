import { makeRequest, navigateTo, channel } from "../app.js";

export default function renderOptions(data) {
  const app = document.getElementById("app");
  app.innerHTML = `
  <style>
  .container {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            height: 100%;
          }
  #question {
color: #FF600B;
text-align: center;
font-family: Raleway;
font-size: 27.844px;
font-style: normal;
font-weight: 600;
line-height: 93%; /* 25.895px */
width: 383px;
height: 83px;
margin-top: 130px;
}
#option-a {

  display: flex;
width: 177px;
height: 162px;
padding: 24px 34px 24px 47px;
align-items: center;
gap: 10px;
border-radius: 12px;
background: #2DB9FF;
box-shadow: 0 6px 0 0 #3E9FD0;
}
#option-b {

  border-radius: 12px;
background: #FFAF01;
box-shadow: 0 6px 0 0 #E39C00;
display: flex;
width: 177px;
height: 162px;
padding: 24px 34px;
align-items: center;
gap: 10px;
}
#option-c {

  display: flex;
width: 177px;
height: 162px;
padding: 24px 34px;
align-items: center;
gap: 10px;
border-radius: 12px;
background: #FF3538;
box-shadow: 0 6px 0 0 #CB2C2F;
}
#option-d {
  display: flex;
width: 177px;
height: 162px;
padding: 24px 34px 24px 46px;
align-items: center;
gap: 10px;
border-radius: 12px;
background: #01AD47;
box-shadow: 0 6px 0 0 #008B38;

}
.questions {
  display: flex;
width: 375px;
align-items: flex-start;
align-content: flex-start;
gap: 16px 16px;
flex-wrap: wrap;
}

@keyframes leafRise {
  0% {
    transform: translateY(40px) scale(0.7);
    opacity: 0;
  }
  60% {
    transform: translateY(-10px) scale(1.05);
    opacity: 1;
  }
  100% {
    transform: translateY(0) scale(1.4);
  }
}


.grass {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 250px;
  gap: -40px;
  padding-bottom: 0;
  overflow: hidden;
  margin: none;
  padding: none;
}

.grass svg {
  animation: leafRise 0.9s ease-out forwards;
  display: block;
  width: auto;
  max-height: 300px; 
}


.grass svg:nth-child(1) { left: 0%;   transform: translateY(-30px) scale(1.3); }
.grass svg:nth-child(2) { left: 10%;  transform: translateY(-2px) scale(1.6); }
.grass svg:nth-child(3) { left: 25%;  transform: translateY(-2px) scale(1.8); }
.grass svg:nth-child(4) { left: 45%;  transform: translateY(-2px) scale(1.2); }
.grass svg:nth-child(5) { left: 65%;  transform: translateY(-0px) scale(2); }
.grass svg:nth-child(6) { left: 82%;  transform: translateY(-2px) scale(1.6); }
  </style>
  <div class="container">
  <h1 id="question"></h1>
  <div class="questions">
      <button id='option-a'>
      <svg xmlns="http://www.w3.org/2000/svg" width="89" height="95" viewBox="0 0 89 95" fill="none">
  <ellipse cx="58.3797" cy="15.0981" rx="12.0785" ry="15.0981" fill="#1D739F"/>
  <ellipse cx="30.1956" cy="15.0981" rx="12.0785" ry="15.0981" fill="#1D739F"/>
  <ellipse cx="10.0654" cy="33.2157" rx="10.0654" ry="13.085" fill="#1D739F"/>
  <ellipse cx="78.5112" cy="33.2157" rx="10.0654" ry="13.085" fill="#1D739F"/>
  <ellipse cx="20.658" cy="27.8571" rx="20.658" ry="27.8571" transform="matrix(0.937895 0.346919 -0.352784 0.935705 21.667 28.5347)" fill="#1D739F"/>
  <ellipse cx="20.658" cy="27.8571" rx="20.658" ry="27.8571" transform="matrix(0.937895 -0.346919 -0.352784 -0.935705 45.4463 94.6486)" fill="#1D739F"/>
  <ellipse cx="43.2809" cy="45.2942" rx="21.1373" ry="13.085" fill="#1D739F"/>
  <path d="M52.3399 85.0591C52.3399 89.7879 48.2841 82.5361 43.281 82.5361C38.2779 82.5361 34.2222 89.7879 34.2222 85.0591C34.2222 80.3303 38.2779 76.4968 43.281 76.4968C48.2841 76.4968 52.3399 80.3303 52.3399 85.0591Z" fill="#1D739F"/>
</svg>
</button>
      <button id='option-b'>
      <svg xmlns="http://www.w3.org/2000/svg" width="84" height="83" viewBox="0 0 84 83" fill="none" class="banana">
  <path d="M12.366 2.96026e-05L22.8851 1.05864L20.4474 8.38836C19.93 9.96753 19.3485 11.1848 19.4915 12.7785C19.6276 14.2964 20.8322 21.5803 21.4325 23.786C22.2205 26.681 22.6094 33.4819 30.1124 46.3599C37.6153 59.2379 63.5445 60.7949 75.5713 59.9636L79.4555 59.777L83.2764 66.3352L80.5733 68.549C65.5261 82.746 29.0643 92.8091 9.86734 65.3422C-13.9287 31.2949 12.8198 10.0611 12.6097 8.64243C12.3919 7.17213 12.5138 1.83047 12.366 2.96026e-05Z" fill="#D08E00"/>
</svg></button>
      <button id='option-c'><svg xmlns="http://www.w3.org/2000/svg" width="83" height="90" viewBox="0 0 83 90" fill="none">
  <path d="M70.2393 88.845C71.9375 88.5502 73.6168 88.0751 75.2455 87.3719C81.3409 84.7368 82.7532 76.6673 82.5012 68.6934C82.3263 63.2043 81.2934 57.8748 79.6686 53.2722C76.1771 43.3635 70.2385 35.9041 63.989 29.9458C63.9609 29.92 63.9363 29.8947 63.9081 29.8689C61.7361 33.785 59.9666 36.8378 58.6792 39.0178C59.4462 36.3713 60.5398 32.7048 61.9959 28.1096C61.4597 27.63 60.9185 27.1604 60.3757 26.7012C59.4037 28.4025 58.5638 29.8443 57.8624 31.033C58.2793 29.6074 58.788 27.8839 59.3964 25.8799C53.4401 20.9662 47.0568 17.0305 40.5139 13.7209C38.9776 18.0243 37.7067 21.4058 36.7668 23.8538C37.1272 21.14 37.654 17.3816 38.3917 12.6608C37.8007 12.3771 37.2063 12.0929 36.6111 11.814C24.7982 6.28683 12.4828 2.55941 0 0C0.259549 0.0503311 0.835546 2.88547 0.946322 3.2572C1.51012 5.14425 2.09373 7.01819 2.69448 8.87323C4.11213 13.2453 5.60636 17.5592 7.19161 21.7902C9.96538 19.6056 11.9283 18.4157 12.6017 18.0184C12.1841 18.9816 10.9086 21.8785 8.74143 25.8329C10.6368 30.6703 12.6497 35.3913 14.7834 39.9747C18.1981 37.1621 20.6516 35.676 21.4198 35.2178C20.9574 36.2871 19.4516 39.7134 16.8548 44.312C23.4498 57.7478 31.2526 70.2495 40.9333 78.9407C46.505 83.9462 52.8324 87.4541 59.5708 88.6644C62.9417 89.2699 66.6271 89.4716 70.2393 88.845Z" fill="#B82022"/>
</svg></button>
      <button id='option-d'><svg xmlns="http://www.w3.org/2000/svg" width="81" height="102" viewBox="0 0 81 102" fill="none">
  <path d="M37.9797 40.9491L47.2105 42.0471L49.5221 99.3606L49.4742 100.111L34 100.111L39.2615 71.9327L17.7859 46.8903L20.4233 47.204L39.8447 67.0293L37.9797 40.9491Z" fill="#067432"/>
  <path d="M33.6643 3.0214C38.0183 1.09694 42.9817 1.09694 47.3357 3.0214L47.4939 3.09132C49.5039 3.97976 51.6748 4.4466 53.8723 4.46299L56.4642 4.48231C60.174 4.50998 63.6288 6.37514 65.6873 9.46165L65.8272 9.67146C66.8786 11.2479 68.3448 12.5035 70.0643 13.2998L72.2618 14.3174C75.2477 15.7001 76.908 18.9568 76.2973 22.1901V22.1901C75.9644 23.9526 76.3091 25.7867 77.2657 27.3039V27.3039C79.1664 30.3182 78.5373 34.2745 75.7955 36.5505L75.0767 37.1472C73.6785 38.3079 72.7076 39.9019 72.3179 41.6768L72.2886 41.8104C71.5694 45.0856 69.0041 47.6392 65.7257 48.3436L62.7964 48.973C60.8047 49.4009 58.9389 50.2833 57.3446 51.5514L57.1299 51.7221C53.8192 54.3552 49.5177 55.3983 45.3686 54.5741L43.9233 54.287C41.6632 53.838 39.3368 53.838 37.0766 54.287L35.6314 54.5741C31.4823 55.3983 27.1808 54.3552 23.8701 51.7221L23.6554 51.5514C22.0611 50.2833 20.1953 49.4009 18.2036 48.973L15.2743 48.3436C11.9959 47.6392 9.43063 45.0856 8.71143 41.8104L8.68209 41.6768C8.29235 39.9019 7.32149 38.3079 5.92332 37.1472L5.20451 36.5505C2.46267 34.2745 1.8336 30.3182 3.73425 27.3039V27.3039C4.69094 25.7867 5.03564 23.9526 4.70273 22.1901V22.1901C4.09202 18.9568 5.75232 15.7001 8.73816 14.3174L10.9357 13.2998C12.6552 12.5035 14.1214 11.2479 15.1728 9.67146L15.3127 9.46165C17.3712 6.37514 20.826 4.50998 24.5358 4.48231L27.1277 4.46299C29.3252 4.4466 31.4961 3.97976 33.5061 3.09132L33.6643 3.0214Z" fill="#067432"/>
</svg></button>
</div>
  <div class="grass">
  <svg xmlns="http://www.w3.org/2000/svg" width="115" height="238" viewBox="0 0 115 238" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M-0.696679 166.827C-6.90775 159.041 -21.5384 146.771 -30.3722 159.979C-39.2061 173.188 -3.52556 231.084 15.419 258.382C9.03379 252.489 -5.46612 244.447 -12.3845 259.423C-19.3028 274.4 37.7067 338.558 66.0224 368.571C104.749 405.681 117.694 266.324 114.505 238.572C112.192 218.446 97.3299 227.747 88.1091 233.724L91.7602 209.707C100.866 115.687 73.9435 118.865 59.3442 132.207C49.8118 84.1561 22.3741 -9.40352 -11.1173 0.766368C-44.6086 10.9363 -18.1249 115.711 -0.696679 166.827Z" fill="#54B769"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="97" height="105" viewBox="0 0 97 105" fill="none">
  <ellipse cx="34.238" cy="51.937" rx="9.39957" ry="51.1102" transform="rotate(-12.3796 34.238 51.937)" fill="#19705D"/>
  <ellipse cx="63.4249" cy="54.6278" rx="9.39957" ry="51.1102" transform="rotate(20.8839 63.4249 54.6278)" fill="#19705D"/>
  <ellipse cx="66.7116" cy="86.7015" rx="9.39957" ry="29.6567" transform="rotate(59.2121 66.7116 86.7015)" fill="#19705D"/>
  <ellipse cx="27.2135" cy="81.9999" rx="9.39957" ry="29.6567" transform="rotate(-43.4275 27.2135 81.9999)" fill="#19705D"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="80" height="140" viewBox="0 0 80 140" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M25.1361 74.4487C23.1653 69.9643 17.3863 62.0553 10.0365 66.2945C2.6867 70.5338 11.5425 102.053 16.8891 117.282C14.4678 113.596 7.96912 107.558 1.34571 112.904C-5.27769 118.249 14.1799 156.214 24.1913 174.26C38.6209 197.221 71.8611 138.538 75.2971 125.849C77.7889 116.647 67.8429 118.13 61.6335 119.14L68.1461 109.274C90.7777 69.7469 75.3206 66.4556 64.7631 69.7508C68.4983 47.0833 70.8706 1.40419 50.478 0.0275983C30.0855 -1.34899 25.0865 49.0681 25.1361 74.4487Z" fill="#54B769"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="83" height="140" viewBox="0 0 83 140" fill="none">
  <path d="M36.5717 169.875C34.0024 170.56 31.3427 170.981 28.6066 171.049C18.3642 171.3 11.1674 160.909 6.36358 149.577C3.05873 141.775 1.05895 133.642 0.358334 126.144C-1.15907 110.006 2.33547 95.7169 7.23612 83.3291C7.25884 83.2748 7.27704 83.2234 7.29977 83.1691C12.8748 87.25 17.3278 90.3817 20.5408 92.6029C17.755 89.3918 13.8519 84.9631 8.8406 79.468C9.28144 78.4495 9.73584 77.4416 10.1993 76.4475C12.6611 78.2019 14.7699 79.6784 16.5212 80.8899C15.0152 79.1625 13.1881 77.0773 11.0398 74.6636C16.2054 63.9288 22.6016 54.2877 29.6263 45.4204C34.5613 50.4549 38.5284 54.3695 41.4281 57.1909C39.1682 53.6225 35.9997 48.6986 31.9134 42.5629C32.5577 41.7834 33.2066 41.0009 33.86 40.2252C46.8325 24.8435 61.6728 11.6579 77.5029 0C77.1719 0.238355 78.1986 4.5822 78.2838 5.17454C78.7145 8.18245 79.1088 11.1848 79.467 14.1718C80.3087 21.2128 81.0055 28.2218 81.5212 35.1736C76.223 33.9074 72.7039 33.5101 71.5036 33.389C72.7116 34.4681 76.3717 37.7011 81.9647 41.8388C82.4382 49.8406 82.6716 57.7553 82.647 65.5554C76.0449 63.8239 71.6471 63.3289 70.2748 63.184C71.6139 64.3828 75.9391 68.2083 82.5505 72.9706C82.0015 96.0558 79.1567 118.614 71.2171 137.049C66.6496 147.663 60.055 156.669 51.399 162.722C47.0687 165.75 42.0368 168.416 36.5717 169.875Z" fill="#146635"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="104" height="109" viewBox="0 0 104 109" fill="none">
  <path d="M81.1595 118H8.59722C1.56087 95.8838 -7.76228 48.5292 11.2358 36.0402C34.9835 20.4289 38.9415 114.097 37.6221 77.0199C36.5667 47.3584 42.4596 25.6325 45.538 18.4773C46.8573 10.6716 52.1346 -3.76884 62.6891 0.914559C73.2436 5.59795 70.605 61.4084 67.9664 88.7282L71.9243 69.2146C77.2016 56.2052 90.3947 33.3086 100.949 45.7977C111.504 58.2867 92.1538 99.1363 81.1595 118Z" fill="#10A84F"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="85" height="206" viewBox="0 0 85 206" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M91.598 137.418C96.3577 130.74 107.84 120 115.691 130.466C123.542 140.932 96.7859 190.121 82.4262 213.408C87.4134 208.279 98.9765 201.021 105.332 213.026C111.687 225.031 67.6732 280.319 45.73 306.255C15.5432 338.491 -1.30659 224.493 0.0791934 201.535C1.08418 184.885 13.7178 191.87 21.565 196.373L17.4935 176.79C5.81959 99.8956 28.0956 101.31 40.6928 111.629C46.3898 71.6984 64.7808 -6.44472 92.7691 0.424851C120.757 7.29442 103.65 94.6158 91.598 137.418Z" fill="#54B769"/>
</svg>

  </div>
  </div>

  `;
    const optionA = document.getElementById('option-a');
    const optionB = document.getElementById('option-b');
    const optionC = document.getElementById('option-c');
    const optionD = document.getElementById('option-d');
    const questionTitle = document.getElementById('question');

    //const childId = '08c79a34-c634-43af-8cfd-1c80a5927cb2';
    const childId = localStorage.getItem("childId");
    console.log("childId", childId);
    console.log(data)
    let questionId = '';

    async function getOptions() {
        const response = await makeRequest(`/checkpoint/question/${data}`, "GET");
        
        if (response && response.Preguntas) {
            questionTitle.innerHTML = response.Preguntas.pregunta;
            questionId = response.Preguntas.id;
        } else {
            console.error("Invalid response structure:", response);
            questionTitle.innerHTML = "Error loading question";
        }
    }
    getOptions()
    // se debe poner el id de la pregunta aqui
    optionA.addEventListener('click', () => sendAnswer(questionId, 'a', childId));
    optionB.addEventListener('click', () => sendAnswer(questionId, 'b', childId));
    optionC.addEventListener('click', () => sendAnswer(questionId, 'c', childId));
    optionD.addEventListener('click', () => sendAnswer(questionId, 'd', childId));

    async function sendAnswer(id, letter, childId) {
      const {success, isCorrect, error} = await makeRequest(`/questions/${id}`, "POST", { option: letter, childId: childId });

      let nextScreenTimeout;

      if (!success) {
        console.error(error);
      } else if (isCorrect) {
        app.innerHTML = `
        <style>
  .correct {
  color: #FF600B;
text-align: center;
font-family: Raleway;
font-size: 44.77px;
font-style: normal;
font-weight: 700;
line-height: 93%; /* 41.636px */
margin-top: 200px;
}

.container2 {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
        </style>
      <div class="container2">  
      <h2 class="correct">Tu respuesta es correcta!</h2>
                <svg xmlns="http://www.w3.org/2000/svg" width="110" height="110" viewBox="0 0 110 110" fill="none">
  <circle cx="55" cy="55" r="55" fill="#59CD42"/>
  <circle cx="55" cy="55" r="46" fill="#FFF1E0"/>
  <circle cx="54.5" cy="54.5" r="40.5" fill="#59CD42"/>
  <line x1="38.1314" y1="53.9133" x2="49.9133" y2="67.8373" stroke="white" stroke-width="8.70116" stroke-linecap="round"/>
  <line x1="69.9451" y1="42.0796" x2="50.7358" y2="68.3609" stroke="white" stroke-width="8.70116" stroke-linecap="round"/>
</svg>     
</div>             
        `;
        nextScreenTimeout = setTimeout(() => {
          navigateTo("/play");
        }, 3000);
      } else {
        app.innerHTML = `
                <style>
  .correct {
  color: #FF600B;
text-align: center;
font-family: Raleway;
font-size: 44.77px;
font-style: normal;
font-weight: 700;
line-height: 93%; /* 41.636px */
margin-top: 200px;
}

.container2 {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
        </style>
        <div class="container2">
        <h2 class="correct">Tu respuesta es incorrecta</h2>
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
</div>
`;
        nextScreenTimeout = setTimeout(() => {
          navigateTo("/play");
        }, 3000);
      }

      channel.on("broadcast",{event: "endStation"}, () => {
        if (nextScreenTimeout) clearTimeout(nextScreenTimeout);
        navigateTo("/map");
      }).subscribe();

    }

}
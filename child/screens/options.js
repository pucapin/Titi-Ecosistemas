import { makeRequest } from "../app.js";

export default function renderOptions(data) {
  const app = document.getElementById("app");
  app.innerHTML = `
  <h1 id="question"></h1>
      <button id='option-a'>A</button>
      <button id='option-b'>B</button>
      <button id='option-c'>C</button>
      <button id='option-d'>D</button>
  `;
    const optionA = document.getElementById('option-a');
    const optionB = document.getElementById('option-b');
    const optionC = document.getElementById('option-c');
    const optionD = document.getElementById('option-d');
    const questionTitle = document.getElementById('question');

    const checkpointId = '0f65a854-4895-4b64-828a-d1505e92dbfe'
    let questionId = ''

    async function getOptions() {
        const response = await makeRequest(`/checkpoint/question/${checkpointId}`, "GET");
        console.log(response);
        questionTitle.innerHTML = response.Preguntas.pregunta;
        questionId = response.Preguntas.id;
    }
    getOptions()
    
    optionA.addEventListener('click', () => sendAnswer(questionId, 'a'));
    optionB.addEventListener('click', () => sendAnswer(questionId, 'b'));
    optionC.addEventListener('click', () => sendAnswer(questionId, 'c'));
    optionD.addEventListener('click', () => sendAnswer(questionId, 'd'));


    async function sendAnswer(id, letter) {
      const {success, isCorrect, error} = await makeRequest(`/questions/${id}`, "POST", { option: letter });

      if (!success) {
        console.error(error);
      } else if (isCorrect) {
        console.log("Correct!");
      } else {
        console.log("Wrong!");
      }
    }


}
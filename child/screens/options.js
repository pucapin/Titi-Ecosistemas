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

    //const childId = '08c79a34-c634-43af-8cfd-1c80a5927cb2';
    const childId = localStorage.getItem("childId");
    console.log("childId", childId);
    console.log(data)
    let questionId = '';

    async function getOptions() {
        const response = await makeRequest(`/checkpoint/question/${data}`, "GET");
        console.log("Response from API:", response);
        
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

      if (!success) {
        console.error(error);
      } else if (isCorrect) {
        console.log("Correct!");
      } else {
        console.log("Wrong!");
      }
    }


}
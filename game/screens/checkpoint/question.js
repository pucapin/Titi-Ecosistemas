import { navigateTo, socket, makeRequest } from "../../app.js";


export default function renderQuestion(data) {
  const app = document.getElementById("app");
  app.innerHTML = `
  <h1 id="question"></h1>
        <div id="option1">
        </div>
        <div id="option2">
        </div>
        <div id="option3">
        </div>
        <div id="option4">
        </div>
        `;

    // Debe existir una forma de validar el ID de la pregunta, ya que hay 3 checkpoints y en cada uno debe haber una distinta
    // Podemos validar en qué fase se encuentra..
    const questionTitle = document.getElementById('question')
    const optionA = document.getElementById('option1');
    const optionB = document.getElementById('option2');
    const optionC = document.getElementById('option3');
    const optionD = document.getElementById('option4');

    // se debe poner el id de la pregunta aqui
    async function getQuestion() {
        const response = await makeRequest(`/checkpoint/question/${data}`, "GET");
        questionTitle.innerHTML = response.Preguntas.pregunta;
        optionA.textContent = response.Preguntas.opcion_a;
        optionB.textContent = response.Preguntas.opcion_b;
        optionC.textContent = response.Preguntas.opcion_c;
        optionD.textContent = response.Preguntas.opcion_d;
    }
    getQuestion()

    socket.on("answer_result", (data) => {
    console.log("Answer result received:", data);

    const { questionId, isCorrect } = data;

    if(isCorrect === true) {
    navigateTo('/correct', {questionId, isCorrect})
    } else {
    navigateTo('/incorrect', {questionId, isCorrect})
    }

    });
}
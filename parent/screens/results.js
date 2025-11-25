import { navigateTo, supabaseClient } from "../app.js";

export default async function renderResultsParent(data) {
  const app = document.getElementById("app");
  app.innerHTML = `
            <button id="go-screen-back">Go to previous screen</button>
            <div id="child-name"></div>
            <div id="child-points">Loading points...</div>
        `;

  const goBackButton = document.getElementById("go-screen-back");
  const answersContainer = document.getElementById("answers-container");

  goBackButton.addEventListener("click", () => {
    navigateTo("/");
  });

  const childId = localStorage.getItem("childId");
  if (childId) {
    const { data: childData, error } = await supabaseClient
      .from("Niño")
      .select("puntos, name")
      .eq("id", childId)
      .single();

    if (error) {
      console.error("Error fetching points:", error);
      document.getElementById("child-points").innerText = "Error loading points";
    } else if (childData) {
      document.getElementById("child-points").innerText = `Puntos: ${childData.puntos}`;
      document.getElementById("child-name").innerText = `Nombre: ${childData.name}`;
    }
  } else {
      document.getElementById("child-points").innerText = "No child selected";
      document.getElementById("child-name").innerText = "No child selected";
  }
}
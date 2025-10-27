export default function renderCode(data) {
    const app = document.getElementById("app");
    app.innerHTML = `
  <h1>${data?.user?.join_code}</h1>
          `;
  
  }
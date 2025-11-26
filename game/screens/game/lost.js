
export default function renderLost(data) {
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
  h1 {
  color: #FF600B;
text-align: center;
font-family: Raleway;
font-size: 44.77px;
font-style: normal;
font-weight: 700;
line-height: 93%; /* 41.636px */
margin-top: 160px;
  }
.lost {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
  </style>
  <div class="lost">

  <h1>No pasa nada! Vuelve a intentarlo</h1>
  <img src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/running2.svg">
  </div>
        `;

}
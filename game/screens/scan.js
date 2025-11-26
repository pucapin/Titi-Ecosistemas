export default function renderScanGame(data) {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="scan-container">
        <h2 class="scan-text-top">Juega y aprende con</h2>
        <img src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/Logo.svg" class="scan-logo" alt="Titi Logo">
        
        <div class="qr-container">
            <img src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/QR.svg" class="qr-image" alt="QR Code">
        </div>
        
        <h1 class="scan-text-bottom">¡Escanéame!</h1>
    </div>

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap');

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

        .scan-container {
            width: 100%;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
        }

        .scan-text-top {
            color: #1FB0F9;
font-family: Raleway;
font-size: 36.73px;
font-style: normal;
font-weight: 900;
line-height: 93%; /* 34.159px */
            margin-bottom: 10px;
            margin-top: 50%;
            text-align: center;
        }

        .scan-logo {
            width: 204px;
            margin-bottom: 20px;
        }

        .qr-image {
            display: block;
        }

        .scan-text-bottom {
            color: var(--darkorange, #FF600B);
font-family: Raleway;
font-size: 48px;
font-style: normal;
font-weight: 800;
line-height: 93%; /* 44.64px */
            margin: 0;
            text-align: center;
        }
    </style>
  `;
}

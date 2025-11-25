export default function renderRole(data) {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="role-container">
            <img src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/Lianas.svg" class="lianas-top" alt="Lianas">
            
            <div class="content-wrapper">
                <h2 class="role-text-top">Juega y aprende con</h2>
                <img src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/Logo.svg" class="role-logo" alt="Titi Logo">
                
                <div class="speech-bubble">
                    <p class="bubble-text-orange">Ingresen sus</p>
                    <p class="bubble-text-green">nombres y roles</p>
                    <div class="bubble-arrow"></div>
                </div>
                
                <img src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/TitiFace.svg" class="titi-face" alt="Titi Face">
            </div>
        </div>

        <style>
            @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap');

            body {
                margin: 0;
                padding: 0;
                overflow: hidden;
            }

            .role-container {
                width: 100%;
                height: 100vh;
                background-color: #FFF7E9;
                display: flex;
                flex-direction: column;
                align-items: center;
                font-family: 'Nunito', sans-serif;
                position: relative;
            }

            .lianas-top {
                width: 100%;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1;
            }

            .content-wrapper {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                padding-top: 40px;
                z-index: 2;
            }

            .role-text-top {
                color: #1FB0F9;
font-family: Raleway;
font-size: 36.73px;
font-style: normal;
font-weight: 900;
line-height: 93%; /* 34.159px */
                margin-bottom: 15px;
                text-align: center;
            }

            .role-logo {
                width: 204px;
                margin-bottom: 40px;
            }

            .speech-bubble {
                background-color: white;
                padding: 20px 40px;
                border-radius: 20px;
                position: relative;
                box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
                margin-bottom: 20px;
                text-align: center;
            }

            .bubble-arrow {
                position: absolute;
                bottom: -12px;
                right: 40px;
                width: 0; 
                height: 0; 
                border-left: 12px solid transparent;
                border-right: 0px solid transparent;
                border-top: 20px solid white;
                transform: skewX(20deg);
            }

            .bubble-text-orange {
                color: var(--darkorange, #FF600B);
text-align: center;
font-family: Raleway;
font-size: 36px;
font-style: normal;
font-weight: 600;
line-height: 110%; /* 39.6px */
margin: 0
            }

            .bubble-text-green {
                color: var(--green, #01AD47);
font-family: Raleway;
font-size: 36px;
font-style: normal;
font-weight: 800;
line-height: 110%;
margin:0
            }

            .titi-face {
                width: 372px;
                margin-top: 10px;
            }
        </style>
    `;
}

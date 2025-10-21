document.addEventListener('DOMContentLoaded', () => {

    const funFactButton = document.getElementById('fun-fact-button');
    const funFactPopup = document.getElementById('fun-fact-popup');

    const funFacts = [
        "Fun Fact: I love retro games!",
        "Fun Fact: Anime is my passion!",
        "Fun Fact: I collect manga!",
        "Fun Fact: Pokemon is life!",
        "Fun Fact: I play only retro style!"
    ];

    if(funFactButton && funFactPopup) {
        funFactButton.addEventListener('click', () => {
            const fact = funFacts[Math.floor(Math.random() * funFacts.length)];
            funFactPopup.textContent = fact;
            funFactPopup.style.display = 'block';

            const clickSound = new Audio('sounds/click.mp3');
            clickSound.currentTime = 0;
            clickSound.play();

            setTimeout(() => {
                funFactPopup.style.display = 'none';
            }, 2000);
        });
    }

});


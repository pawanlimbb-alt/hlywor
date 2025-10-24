document.addEventListener('DOMContentLoaded', () => {

    // -----------------------------
    // Background music
    // -----------------------------
    const bgMusic = new Audio('sounds/background.mp3');
    bgMusic.loop = true;
    bgMusic.autoplay = true;
    bgMusic.muted = true; // start muted for autoplay
    bgMusic.play().catch(() => {}); // try to play silently

    function enableBackgroundMusic() {
        bgMusic.muted = false;
        bgMusic.play();
        document.removeEventListener('click', enableBackgroundMusic);
        document.removeEventListener('keydown', enableBackgroundMusic);
    }

    document.addEventListener('click', enableBackgroundMusic);
    document.addEventListener('keydown', enableBackgroundMusic);

    // -----------------------------
    // Click and hover sounds
    // -----------------------------
    const clickSound = new Audio('sounds/click.mp3');
    const popSound = new Audio('sounds/Pop.mp3');

    function playClick() {
        clickSound.currentTime = 0;
        clickSound.play();
    }

    function playPop() {
        popSound.currentTime = 0;
        popSound.play();
    }

    // Play click sound on links and buttons
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('click', playClick);
        el.addEventListener('mouseover', playPop); // hover pop
    });

    // -----------------------------
    // Ez.html start sound (play once)
    // -----------------------------
    if(window.location.pathname.includes('Ez.html')) {
        const startSound = new Audio('sounds/start.mp3');

        function playStartAndGoMenu() {
            startSound.currentTime = 0;
            startSound.play();
            setTimeout(() => {
                window.location.href = 'menu.html';
            }, 700);
        }

        document.addEventListener('click', playStartAndGoMenu, { once: true });
        document.addEventListener('keydown', playStartAndGoMenu, { once: true });
    }

});


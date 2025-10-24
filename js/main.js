document.addEventListener('DOMContentLoaded', () => {

    // -------------------------------
    // Sounds
    // -------------------------------
    const clickSound = new Audio('sounds/click.mp3');
    const hoverSound = new Audio('sounds/Pop.mp3');
    const bgMusic = new Audio('sounds/background.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.2;

    // Attempt autoplay for background music
    bgMusic.play().catch(() => {
        // will play after first interaction
        document.addEventListener('click', () => bgMusic.play(), { once: true });
    });

    // Play click sound
    function playClick() {
        clickSound.currentTime = 0;
        clickSound.play();
    }

    // Play hover sound
    function playHover() {
        hoverSound.currentTime = 0;
        hoverSound.play();
    }

    // -------------------------------
    // Apply hover and click globally
    // -------------------------------
    document.querySelectorAll('button, a, .anime-card, .back-button').forEach(el => {
        el.addEventListener('mouseenter', playHover);
        el.addEventListener('click', playClick);
    });

    // -------------------------------
    // Click navigation with delay
    // -------------------------------
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.href;
            playClick();
            setTimeout(() => window.location.href = url, 300);
        });
    });

    document.querySelectorAll('.close-button').forEach(btn => {
        btn.addEventListener('click', () => {
            playClick();
            setTimeout(() => window.location.href = 'menu.html', 300);
        });
    });

    // -------------------------------
    // Start sound on Ez.html only once
    // -------------------------------
    if(window.location.pathname.includes('Ez.html')) {
        const startSound = new Audio('sounds/start.mp3');
        function playStart() {
            startSound.play();
        }

        document.addEventListener('click', playStart, { once: true });
        document.addEventListener('keydown', playStart, { once: true });
    }
});


document.addEventListener('DOMContentLoaded', () => {

    const clickSound = new Audio('sounds/click.mp3');

    function playClick(url) {
        clickSound.currentTime = 0;
        clickSound.play();
        if(url) {
            setTimeout(() => {
                window.location.href = url;
            }, 700);
        }
    }

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            playClick(this.href);
        });
    });

    document.querySelectorAll('button:not(#fun-fact-button)').forEach(btn => {
        btn.addEventListener('click', () => {
            playClick();
        });
    });

    document.querySelectorAll('.close-button').forEach(btn => {
        btn.addEventListener('click', () => {
            playClick();
            setTimeout(() => {
                window.location.href = 'menu.html';
            }, 700);
        });
    });

    if(window.location.pathname.includes('Ez.html')) {
        const startSound = new Audio('sounds/Start.mp3');

        function startAndGoMenu() {
            startSound.currentTime = 0;
            startSound.play();
            setTimeout(() => {
                window.location.href = 'menu.html';
            }, 700);
        }

        document.addEventListener('click', startAndGoMenu, { once: true });
        document.addEventListener('keydown', startAndGoMenu, { once: true });
    }

});


document.addEventListener('DOMContentLoaded', () => {

    // -------------------------------
    // Sounds
    // -------------------------------
    const clickSound = new Audio('sounds/click.mp3');
    const hoverSound = new Audio('sounds/Pop.mp3');
    const bgMusic = new Audio('sounds/background.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.2;

    // Simple autoplay; fall back to first user interaction
    bgMusic.play().catch(() => {
        const playOnce = () => bgMusic.play().catch(() => {});
        document.addEventListener('click', playOnce, { once: true });
        document.addEventListener('keydown', playOnce, { once: true });
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
    // Ez.html: navigate to menu after 3s on first interaction
    // -------------------------------
    if (window.location.pathname.includes('Ez.html')) {
        function scheduleGoMenu() {
            setTimeout(() => {
                window.location.href = 'menu.html';
            }, 3000);
        }
        document.addEventListener('click', scheduleGoMenu, { once: true });
        document.addEventListener('keydown', scheduleGoMenu, { once: true });
    }

    function typeHeadingSafe(el, speed = 22) {
        if (!el || el.classList.contains('animated-typing')) return;
        el.classList.add('animated-typing');
        const origText = el.textContent || '';
        el.textContent = '';
        let i = 0;
        function next() {
            if (i > origText.length) {
                el.textContent = origText;
                return;
            }
            el.textContent = origText.slice(0, i) + (i < origText.length ? '\u258C' : '');
            i++;
            setTimeout(next, speed);
        }
        next();
    }

    function typeHeadingNoStretch(el, speed = 22) {
        if (!el || el.classList.contains('animated-typing')) return;
        el.classList.add('animated-typing');
        const text = el.textContent;
        el.textContent = '';
        let i = 0;
        function next() {
            if (i > text.length) {
                el.textContent = text;
                return;
            }
            el.textContent = text.slice(0, i) + (i < text.length ? '\u258C' : '');
            i++;
            setTimeout(next, speed);
        }
        next();
    }

    document.querySelectorAll('.left-menu-layout h1, .left-menu-layout h2').forEach(h => typeHeadingNoStretch(h, 22));

    // --- Universal Anime/Card Reveal on Scroll, no flicker ---
    function doCardReveal() {
        const observer = new window.IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('active')) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // stop observing after first reveal
                }
            });
        }, { threshold: 0.14 });
        document.querySelectorAll('.anime-card.reveal, .comics-grid .anime-card.reveal, .games-grid .anime-card.reveal').forEach(card => {
            observer.observe(card);
        });
    }
    doCardReveal();
});


// Comics tab logic for anime-style UI
const comicsTabs = {
    favorites: [
        { title: 'Coming Soon!', cover: 'images/koushik.webp' }
    ],
    classics: [
        { title: 'Coming Soon!', cover: 'images/koushik.webp' }
    ]
};

function renderComicsTab(tab) {
    const grid = document.querySelector(`#${tab} .anime-grid`);
    if (!grid) return;
    grid.innerHTML = '';
    const cards = comicsTabs[tab] || [];
    cards.forEach((entry, i) => {
        const card = document.createElement('div');
        card.className = 'anime-card reveal';
        card.style.transitionDelay = `${i * 45}ms`;
        card.innerHTML = `<img src='${entry.cover}' alt='${entry.title}' loading='lazy'><h2>${entry.title}</h2>`;
        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabs .tab-button');
    const contents = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
            renderComicsTab(tab.dataset.tab);
        });
    });
    // Initial
    renderComicsTab('favorites');
});

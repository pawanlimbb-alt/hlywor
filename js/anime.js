// Tab switching + click sound
const tabs = document.querySelectorAll('.tab-button');
const contents = document.querySelectorAll('.tab-content');
const clickSound = new Audio('sounds/click.mp3');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play();

        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// Favorites anime list (all folders in ~/images/favorites/)
const animeTabs = {
    favorites: [
        'Attack on Titan',
        'Attack on Titan_ Final Season',
        'Attack on Titan_ Final Season Part 2',
        'Attack on Titan Season 2',
        'Attack on Titan Season 3',
        'Attack on Titan Season 3 Part 2',
        'Attack on Titan_ The Last Attack',
        'Delicious in Dungeon',
        'Dr. Stone',
        'Dr. Stone_ New World',
        'Dr. Stone_ New World Part 2',
        'Dr. Stone_ Ryusui',
        'Dr. Stone_ Science Future',
        'Dr. Stone_ Science Future Part 2',
        'Dr. Stone_ Stone Wars',
        'Evangelion_ 1.0 You Are (Not) Alone',
        'Evangelion_ 2.0 You Can (Not) Advance',
        'Evangelion_ 3.0 You Can (Not) Redo',
        'Evangelion_ 3.0+1.0 Thrice Upon a Time',
        'Haikyu!!',
        'Haikyu!! 3rd Season',
        'Haikyu!! Movie_ The Dumpster Battle',
        'Haikyu!! The Movie_ Battle of Concepts',
        'Haikyu!! The Movie_ Talent and Sense',
        'Haikyu!! To the Top',
        'Haikyu!! To the Top 2nd-cour',
        'Orb_ On the Movements of the Earth',
        'Re_ZERO -Starting Life in Another World-',
        "Re_ZERO -Starting Life In Another World- Director's Cut",
        'Re_ZERO -Starting Life in Another World- Memory Snow',
        'Re_ZERO -Starting Life in Another World- Season 2',
        'Re_ZERO -Starting Life in Another World- Season 2 Part 2',
        'Re_ZERO -Starting Life in Another World- Season 3',
        'The Disappearance of Haruhi Suzumiya',
        'The Eminence in Shadow',
        'The Melancholy of Haruhi Suzumiya',
        'The Melancholy of Haruhi Suzumiya Season 2',
        'Fullmetal Alchemist_ Brotherhood'
    ]
};

// Populate anime cards with local cover.webp
for (const [tab, titles] of Object.entries(animeTabs)) {
    const grid = document.querySelector(`#${tab} .anime-grid`);
    titles.forEach(title => {
        const imgPath = `images/favorites/${title}/cover.webp`;

        const card = document.createElement('div');
        card.className = 'anime-card';
        card.innerHTML = `
            <img src="${imgPath}" alt="${title}" loading="lazy">
            <h2>${title}</h2>
        `;
        grid.appendChild(card);
    });
}


// Tab switching functionality
const tabs = document.querySelectorAll('.tab-button');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// Anime titles per tab
const animeTabs = {
    'favorites': ["Guilty Crown", "Death Note", "Steins;Gate"],
    'recommendations': ["One Piece", "Attack on Titan"],
    'controversial': ["School Days"],
    'best-music': ["Nana"],
    'will-make-you-cry': ["Clannad: After Story"]
};

// Fetch anime from AniList
async function fetchAnime(title) {
    const query = `
    query ($search: String) {
      Media(search: $search, type: ANIME) {
        id
        title { romaji english }
        coverImage { large }
        description(asHtml: false)
        genres
        episodes
        averageScore
      }
    }`;

    const variables = { search: title };

    const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables })
    });

    const data = await response.json();
    return data.data.Media;
}

// Populate grids dynamically
async function populateGrids() {
    for (const [tab, titles] of Object.entries(animeTabs)) {
        const grid = document.querySelector(`#${tab} .anime-grid`);
        if (!grid) continue;

        // Clear existing cards to prevent duplicates
        grid.innerHTML = '';

        for (const title of titles) {
            try {
                const anime = await fetchAnime(title);

                const card = document.createElement('a');
                card.className = 'anime-card';
                card.href = `anime_pages/${anime.title.romaji.replace(/\s/g, '_')}.html`;
                card.innerHTML = `
                    <img src="${anime.coverImage.large}" alt="${anime.title.romaji}">
                    <h2>${anime.title.romaji}</h2>
                    <p>${anime.genres.join(', ')}</p>
                `;
                grid.appendChild(card);
            } catch (err) {
                console.error(`Failed to fetch ${title}:`, err);
            }
        }
    }
}

// Start populating
populateGrids();


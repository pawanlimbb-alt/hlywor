// Get URL params
const params = new URLSearchParams(window.location.search);
const title = params.get("title");
const tab = params.get("tab");

// Elements
const titleElement = document.getElementById("anime-title");
const coverElement = document.getElementById("anime-cover");
const summaryElement = document.getElementById("anime-summary");
const episodesElement = document.getElementById("anime-episodes");
const genreElement = document.getElementById("anime-genre");
const thoughtsElement = document.getElementById("anime-thoughts");

titleElement.textContent = title || "Unknown Anime";

// Resolve dataset by tab param using category-specific arrays
function getDatasetForTab(tabKey) {
    switch (tabKey) {
        case 'favorites':
            return typeof favorites !== 'undefined' ? favorites : [];
        case 'recommendations':
            return typeof recommendations !== 'undefined' ? recommendations : [];
        case 'controversial':
            return typeof controversial !== 'undefined' ? controversial : [];
        case 'best-music':
            return typeof bestMusic !== 'undefined' ? bestMusic : [];
        case 'will-make-you-cry':
            return typeof willMakeYouCry !== 'undefined' ? willMakeYouCry : [];
        default:
            return [];
    }
}

// Find anime in the selected category dataset
let animeInfo;
if (tab) {
    const dataset = getDatasetForTab(decodeURIComponent(tab));
    animeInfo = dataset.find(a => a.title === (title ? decodeURIComponent(title) : ''));
}

// Load image with robust fallbacks
const safeTab = tab ? decodeURIComponent(tab) : '';
const safeTitle = title ? decodeURIComponent(title) : '';

// Ensure broken image swaps to fallback gracefully
coverElement.onerror = () => {
    coverElement.onerror = null;
    coverElement.src = "images/koushik.webp";
};

if (animeInfo && animeInfo.cover) {
    coverElement.src = animeInfo.cover;
} else if (safeTab && safeTitle) {
    const encTab = encodeURIComponent(safeTab);
    const encTitle = encodeURIComponent(safeTitle);
    coverElement.src = `images/${encTab}/${encTitle}/cover.webp`;
} else {
    coverElement.src = "images/koushik.webp";
}

// Populate details
if (animeInfo) {
    summaryElement.textContent = animeInfo.summary;
    episodesElement.textContent = `Episodes: ${animeInfo.episodes}`;
    genreElement.textContent = `Genre: ${animeInfo.genre.join(', ')}`;
    thoughtsElement.textContent = animeInfo.thoughts;
} else {
    summaryElement.textContent = "No data available yet.";
    episodesElement.textContent = "Episodes: Unknown";
    genreElement.textContent = "Genre: Unknown";
    thoughtsElement.textContent = "Add your personal thoughts here!";
}

// -----------------------------
// Scroll reveal / pop animation
// -----------------------------
const detailElements = document.querySelectorAll('.anime-details img, .anime-info');

function revealDetails() {
    detailElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight - 50) {
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
        } else {
            el.style.opacity = 0;
            el.style.transform = 'translateY(20px)';
        }
    });
}

window.addEventListener('scroll', revealDetails);
window.addEventListener('resize', revealDetails);
revealDetails();


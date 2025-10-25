const params = new URLSearchParams(window.location.search);
const title = params.get("title");
const tab = params.get("tab");

const titleElement = document.getElementById("anime-title");
const coverElement = document.getElementById("anime-cover");
const summaryElement = document.getElementById("anime-summary");
const episodesElement = document.getElementById("anime-episodes");
const genreElement = document.getElementById("anime-genre");
const thoughtsElement = document.getElementById("anime-thoughts");

titleElement.textContent = title || "Unknown Anime";

// Load local image
const imgPath = `images/${tab}/${title}/cover.webp`;
fetch(imgPath)
    .then(res => {
        if (res.ok) coverElement.src = imgPath;
        else coverElement.src = "images/fallback.webp";
    }).catch(() => coverElement.src = "images/fallback.webp");

// Add any personal info here
summaryElement.textContent = "This is a placeholder summary. Add your own notes per anime!";
episodesElement.textContent = "Episodes: Unknown";
genreElement.textContent = "Type: Anime";
thoughtsElement.textContent = "Add your personal thoughts here!";
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

// Find anime in animeData
let animeInfo;
if (animeData[tab]) {
    animeInfo = animeData[tab].find(a => a.title === title);
}

// Load image
if (animeInfo && animeInfo.cover) {
    coverElement.src = animeInfo.cover;
} else {
    coverElement.src = "images/fallback.webp";
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


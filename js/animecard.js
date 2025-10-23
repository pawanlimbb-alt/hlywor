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


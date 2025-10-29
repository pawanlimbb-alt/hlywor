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

// Hint browser to prioritize this image
try {
    coverElement.loading = 'eager';
    coverElement.decoding = 'async';
    coverElement.fetchPriority = 'high';
} catch (e) {}

// Progressive image loading: mimic anime.html first, then alternatives
const rawPath = safeTab && safeTitle ? `images/${safeTab}/${safeTitle}/cover.webp` : "";
const encPath = safeTab && safeTitle ? `images/${encodeURIComponent(safeTab)}/${encodeURIComponent(safeTitle)}/cover.webp` : "";
const datasetCover = animeInfo && animeInfo.cover ? animeInfo.cover : "";

const imageCandidates = [];
if (rawPath) imageCandidates.push(rawPath);
if (datasetCover && datasetCover !== rawPath) imageCandidates.push(datasetCover);
if (encPath && encPath !== rawPath && encPath !== datasetCover) imageCandidates.push(encPath);
imageCandidates.push("images/koushik.webp");

let imageCandidateIndex = 0;
function setNextImageCandidate() {
    if (imageCandidateIndex >= imageCandidates.length) {
        coverElement.onerror = null;
        return;
    }
    const nextSrc = imageCandidates[imageCandidateIndex++];
    const currentAttr = coverElement.getAttribute('src');
    if (currentAttr === nextSrc) {
        setNextImageCandidate();
        return;
    }
    coverElement.src = nextSrc;
}

coverElement.onerror = () => {
    setNextImageCandidate();
};

// Start with the same raw path strategy as anime.html
setNextImageCandidate();

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



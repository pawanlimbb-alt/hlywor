// Tab switching
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

// Anime categories
const animeTabs = {
    favorites: ["Evangelion: 1.0 You Are (Not) Alone",
        "Evangelion: 2.0 You Can (Not) Advance",
        "Evangelion: 3.0 You Can (Not) Redo",
        "Evangelion: 3.0+1.0 Thrice Upon a Time",
        "Haikyuu!!",
        "Haikyuu!! 2nd Season",
        "Haikyuu!!: Karasuno Koukou VS Shiratorizawa Gakuen Koukou",
        "Haikyuu!! TO THE TOP",
        "Haikyuu!! TO THE TOP 2",
        "The Melancholy of Haruhi Suzumiya",
        "The Disappearance of Haruhi Suzumiya",
        "Re:Zero - Starting Life in Another World",
        "Re:Zero - Starting Life in Another World 2nd Season",
        "Dungeon Meshi",
        "The Eminence in Shadow",
        "The Eminence in Shadow 2nd Season",
        "Kaguya-sama: Love is War",
        "Kaguya-sama: Love is War 2nd Season",
        "Kaguya-sama: Love is War 3rd Season",
        "Kaguya-sama: Love is War: The Movie",
        "Dr. Stone",
        "Dr. Stone: Stone Wars",
        "Dr. Stone: Ryuusui",
        "Fullmetal Alchemist: Brotherhood",
        "Attack on Titan",
        "Attack on Titan Season 2",
        "Attack on Titan Season 3",
        "Attack on Titan: The Final Season",
        "Attack on Titan: The Final Season Part 2",
        "Attack on Titan: The Final Season Part 3"],
    recommendations: ["Shangri-La Frontier",
        "Shangri-La Frontier 2nd Season",
        "Orb: On the Movements of the Earth",
        "Scissor Seven",
        "Scissor Seven 2nd Season",
        "Scissor Seven 3rd Season",
        "Josee, the Tiger and the Fish",
        "86",
        "86 2nd Season",
        "Fumetsu no Anata e",
        "Fumetsu no Anata e 2nd Season",
        "Yahari Ore no Seishun Love Come wa Machigatteiru.",
        "Yahari Ore no Seishun Love Come wa Machigatteiru. Zoku",
        "Yahari Ore no Seishun Love Come wa Machigatteiru. Kan",
        "Tengen Toppa Gurren Lagann",
        "Tengen Toppa Gurren Lagann: Lagann-hen",
        "Mob Psycho 100",
        "Mob Psycho 100 II",
        "Mob Psycho 100 III",
        "Sword Art Online",
        "Sword Art Online II",
        "Sword Art Online: Alicization",
        "Sword Art Online: Alicization – War of Underworld",
        "Vinland Saga",
        "Vinland Saga Season 2",
        "Steins;Gate",
        "Steins;Gate 0",
        "My Hero Academia",
        "My Hero Academia 2nd Season",
        "My Hero Academia 3rd Season",
        "My Hero Academia 4th Season",
        "My Hero Academia 5th Season",
        "My Hero Academia 6th Season",
        "My Hero Academia 7th Season"],
    controversial: ["Mushoku Tensei: Isekai Ittara Honki Dasu",
        "Mushoku Tensei: Isekai Ittara Honki Dasu Part 2",
        "Mushoku Tensei: Isekai Ittara Honki Dasu Part 3",
        "Rurouni Kenshin: Meiji Kenkaku Romantan",
        "Rurouni Kenshin: Meiji Kenkaku Romantan - Tsuioku-hen",
        "Rurouni Kenshin: Meiji Kenkaku Romantan - Seisou-hen",
        "Rurouni Kenshin: Meiji Kenkaku Romantan - Kyoto Taika-hen",
        "Kokoro Connect",
        "Kokoro Connect: Michi Random",
        "Darling in the Franxx",
        "Goblin Slayer",
        "Goblin Slayer: Goblin's Crown",
        "Berserk (2016)",
        "Berserk (2017)",
        "The Seven Deadly Sins: Nanatsu no Taizai",
        "The Seven Deadly Sins: Imashime no Fukkatsu",
        "The Seven Deadly Sins: Kamigami no Gekirin",
        "The Seven Deadly Sins: Funnu no Shinpan",
        "Puella Magi Madoka Magica",
        "Puella Magi Madoka Magica: The Movie - Beginnings",
        "Puella Magi Madoka Magica: The Movie - Eternal",
        "Puella Magi Madoka Magica: The Movie - Rebellion",
        "Magia Record: Mahou Shoujo Madoka☆Magica Gaiden",
        "Magia Record: Mahou Shoujo Madoka☆Magica Gaiden 2nd SEASON - Kakusei Zenya",
        "Magia Record: Mahou Shoujo Madoka☆Magica Gaiden Final SEASON - Asaki Yume no Akatsuki",
        "School Days",
        "School Days: Valentine Days",
        "School Days: Memorial Edition",
        "Made in Abyss",
        "Made in Abyss: Retsujitsu no Ougonkyou",
        "Made in Abyss: Fukaki Tamashii no Reimei",
        "Made in Abyss: Retsujitsu no Ougonkyou - Kuro no Shoujo"],
    bestMusic: ["Guilty Crown",
        "Black Clover",
        "Cowboy Bebop",
        "Cowboy Bebop: Tengoku no Tobira",
        "Koutetsujou no Kabaneri",
        "Koutetsujou no Kabaneri: Unato Kessen",
        "Violet Evergarden",
        "Violet Evergarden: Eien to Jidou Shuki Ningyou",
        "Violet Evergarden: Kitto 'Ai' wo Shiru Hi ga Kuru no Darou",
        "Violet Evergarden: The Movie",
        "Monogatari Series: Bakemonogatari",
        "Monogatari Series: Nisemonogatari",
        "Monogatari Series: Nekomonogatari (Kuro)",
        "Monogatari Series: Monogatari Series Second Season",
        "Monogatari Series: Tsukimonogatari",
        "Monogatari Series: Owarimonogatari",
        "Monogatari Series: Koyomimonogatari",
        "Monogatari Series: Owarimonogatari 2nd Season",
        "Monogatari Series: Zoku Owarimonogatari",
        "Vivy: Fluorite Eye's Song",
        "Vivy: Fluorite Eye's Song - PILOT MOVIE",
        "Gintama",
        "Gintama': Enchousen",
        "Gintama°",
        "Gintama.: Porori-hen",
        "Gintama.: Shirogane no Tamashii-hen",
        "Gintama: The Final",
        "Shingeki no Kyojin",
        "Shingeki no Kyojin: The Final Season",
        "Tokyo Ghoul",
        "Tokyo Ghoul √A",
        "Tokyo Ghoul:re",
        "Tokyo Ghoul:re 2nd Season",
        "Noragami",
        "Noragami Aragoto",
        "Noragami: OVA",
        "Psycho-Pass",
        "Psycho-Pass 2",
        "Psycho-Pass 3",
        "Psycho-Pass 3: First Inspector",
        "Beck: Mongolian Chop Squad",
        "Neon Genesis Evangelion",
        "Neon Genesis Evangelion: Death & Rebirth",
        "Neon Genesis Evangelion: The End of Evangelion",
        "Bleach",
        "Bleach: Memories in the Rain",
        "Bleach: The Sealed Sword Frenzy",
        "Bleach: Memories of Nobody",
        "Bleach: The DiamondDust Rebellion",
        "Bleach: Fade to Black",
        "Bleach: Hell Verse",
        "JoJo no Kimyou na Bouken: Phantom Blood",
        "JoJo no Kimyou na Bouken: Battle Tendency",
        "JoJo no Kimyou na Bouken: Stardust Crusaders",
        "JoJo no Kimyou na Bouken: Diamond wa Kudakenai",
        "JoJo no Kimyou na Bouken: Golden Wind",
        "JoJo no Kimyou na Bouken: Stone Ocean",
        "JoJo no Kimyou na Bouken: Steel Ball Run",
        "JoJo no Kimyou na Bouken: JoJolion"],
    willMakeYouCry: ["Anohana: The Flower We Saw That Day",
        "Anohana: The Movie",
        "Angel Beats!",
        "Kotaro Lives Alone",
        "Cyberpunk: Edgerunners",
        "A Place Further than the Universe",
        "Plastic Memories",
        "Clannad",
        "Clannad: After Story",
        "Assassination Classroom",
        "Assassination Classroom 2nd Season",
        "5 Centimeters per Second",
        "I Want to Eat Your Pancreas",
        "Toradora!",
        "Your Lie in April",
        "Wolf Children",
        "Bubble",
        "Maboroshi no Yamataikoku",
        "No Game No Life: Zero"]
};

// Delay helper
function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
}

// Fetch a single anime with retries
async function fetchAnime(title, retries = 2) {
    const query = `
    query ($search: String) {
      Media(search: $search, type: ANIME) {
        id
        title { romaji english }
        coverImage { large }
        genres
      }
    }`;

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const res = await fetch("https://graphql.anilist.co", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query, variables: { search: title } })
            });

            const json = await res.json();
            if (!json.data?.Media) throw new Error("No media");
            console.log(`✅ Fetched: ${title}`);
            return json.data.Media;

        } catch (err) {
            console.warn(`⚠️ Retry ${attempt} failed for: ${title}`);
            if (attempt === retries) {
                console.error(`❌ Skipping: ${title}`);
                return null;
            }
            await delay(1000);
        }
    }
}

// Fetch in batches with pause
async function fetchInBatches(titles, batchSize = 5) {
    let results = [];
    for (let i = 0; i < titles.length; i += batchSize) {
        const batch = titles.slice(i, i + batchSize);
        console.log(`🚀 Fetching batch ${i / batchSize + 1}/${Math.ceil(titles.length / batchSize)} (${batch.join(", ")})`);
        const batchResults = await Promise.all(batch.map(t => fetchAnime(t)));
        results = results.concat(batchResults.filter(a => a !== null));
        await delay(1000); // Wait 1 second per batch
    }
    return results;
}

// Populate anime cards
async function populateGrids() {
    for (const [tab, titles] of Object.entries(animeTabs)) {
        const grid = document.querySelector(`#${tab} .anime-grid`);
        if (!grid) continue;

        grid.innerHTML = "<p>Loading...</p>";

        let animeList = JSON.parse(localStorage.getItem(tab) || "null");
        if (!animeList) {
            animeList = await fetchInBatches(titles, 5);
            localStorage.setItem(tab, JSON.stringify(animeList));
        }

        grid.innerHTML = "";
        animeList.forEach(anime => {
            const card = document.createElement("a");
            card.className = "anime-card";
            card.href = `anime_pages/${anime.title.romaji.replace(/\s/g, "_")}.html`;
            card.innerHTML = `
                <img src="${anime.coverImage.large}" alt="${anime.title.romaji}" loading="lazy">
                <h2>${anime.title.romaji}</h2>
                <p>${anime.genres.join(", ")}</p>
            `;
            grid.appendChild(card);
        });
        console.log(`✅ Finished populating ${tab} (${animeList.length} anime)`);
    }
}

// Clear cache & start fresh
localStorage.clear();
populateGrids();












// -----------------------------
// Tab switching
// -----------------------------
const tabs = document.querySelectorAll('.tab-button');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');

        // trigger reveal on newly active tab
        triggerReveal();
    });
});

// -----------------------------
// Anime lists
// -----------------------------
const animeTabs = {
    "favorites": [
        'Attack on Titan','Attack on Titan_ Final Season','Attack on Titan_ Final Season Part 2','Attack on Titan Season 2',
        'Attack on Titan Season 3','Attack on Titan Season 3 Part 2','Attack on Titan_ The Last Attack','Delicious in Dungeon',
        'Dr. Stone','Dr. Stone_ New World','Dr. Stone_ New World Part 2','Dr. Stone_ Ryusui','Dr. Stone_ Science Future',
        'Dr. Stone_ Science Future Part 2','Dr. Stone_ Stone Wars','Evangelion_ 1.0 You Are (Not) Alone',
        'Evangelion_ 2.0 You Can (Not) Advance','Evangelion_ 3.0 You Can (Not) Redo','Evangelion_ 3.0+1.0 Thrice Upon a Time',
        'Haikyu!!','Haikyu!! 3rd Season','Haikyu!! Movie_ The Dumpster Battle','Haikyu!! The Movie_ Battle of Concepts',
        'Haikyu!! The Movie_ Talent and Sense','Haikyu!! To the Top','Haikyu!! To the Top 2nd-cour','Orb_ On the Movements of the Earth',
        'Re_ZERO -Starting Life in Another World-',"Re_ZERO -Starting Life In Another World- Director's Cut",
        'Re_ZERO -Starting Life in Another World- Memory Snow','Re_ZERO -Starting Life in Another World- Season 2',
        'Re_ZERO -Starting Life in Another World- Season 2 Part 2','Re_ZERO -Starting Life in Another World- Season 3',
        'The Disappearance of Haruhi Suzumiya','The Eminence in Shadow','The Melancholy of Haruhi Suzumiya',
        'The Melancholy of Haruhi Suzumiya Season 2','Fullmetal Alchemist_ Brotherhood'
    ],
    "recommendations": [
        '86 Eighty-Six','86 Eighty-Six Part 2','86 Eighty-Six_ Special Edition - The Poppies Bloom Red on the Battlefield',
        'Gurren Lagann','Gurren Lagann The Movie_ The Lights in the Sky are Stars','Josee, the Tiger and the Fish',
        'Mob Psycho 100','Mob Psycho 100 II','Mob Psycho 100 III','Mob Psycho 100 Reigen_ The Miraculous Unknown Psychic',
        'Mob Psycho 100_ Spirits and Such Company Trip - A Journey That Mends the Heart and Heals the Soul',
        'My Hero Academia','My Hero Academia_ Heroes Rising','My Hero Academia Season 2','My Hero Academia Season 3',
        'My Hero Academia Season 5','My Hero Academia Season 6','My Hero Academia Season 7','My Hero Academia_ Two Heroes',
        'Scissor Seven','Scissor Seven_ Shadow Fate','Scissor Seven_ The Strongest Hairstylist','Scissor Seven_ Xuanwu Kingdom Chapter',
        'Shangri-La Frontier','Shangri-La Frontier Season 2','Steins;Gate','Steins;Gate 0',
        'Steins;Gate 0_ Valentine\'s of Crystal Polymorphism -Bittersweet Intermedio-',
        'Steins;Gate_ The Movie - Load Region of Déjà Vu','Sword Art Online','Sword Art Online_ Alicization',
        'Sword Art Online_ Alicization - War of Underworld','Sword Art Online_ Alicization - War of Underworld 2nd Season',
        'Sword Art Online Alternative_ Gun Gale Online','Sword Art Online II','Sword Art Online Movie_ Ordinal Scale - Sword Art Offline',
        'To Your Eternity','To Your Eternity Season 2','To Your Eternity Season 3','Vinland Saga','Vinland Saga Season 2'
    ],
    "controversial": [
        'Berserk','Berserk (2016)','Berserk_ Season II','DARLING in the FRANXX','Goblin Slayer','Goblin Slayer_ Adventure Sheet',
        "Goblin Slayer_ Goblin's Crown",'Goblin Slayer II','Kokoro Connect','Kokoro Connect OVA','Made in Abyss',
        'Made in Abyss_ Dawn of the Deep Soul',"Made in Abyss_ Journey's Dawn",'Made in Abyss_ The Golden City of the Scorching Sun',
        'Made in Abyss_ The Golden City of the Scorching Sun - Together with Papa','Made in Abyss_ Wandering Twilight',
        'Magia Record_ Puella Magi Madoka Magica Side Story','Magia Record_ Puella Magi Madoka Magica Side Story Final Season',
        'Magia Record_ Puella Magi Madoka Magica Side Story Recap',
        'Magia Record_ Puella Magi Madoka Magica Side Story Season 2 - The Eve of Awakening','Mushoku Tensei_ Jobless Reincarnation',
        'Mushoku Tensei_ Jobless Reincarnation - Eris the Goblin Slayer','Mushoku Tensei_ Jobless Reincarnation Part 2',
        'Mushoku Tensei_ Jobless Reincarnation Season 2','Mushoku Tensei_ Jobless Reincarnation Season 2 - Episode 0 _Guardian Fitz_',
        'Mushoku Tensei_ Jobless Reincarnation Season 2 Part 2','Puella Magi Madoka Magica','Puella Magi Madoka Magica the Movie Part 1_ Beginnings',
        'Puella Magi Madoka Magica the Movie Part 2_ Eternal','Puella Magi Madoka Magica the Movie_ Rebellion','Rurouni Kenshin',
        'Rurouni Kenshin_ Meiji Kenkaku Romantan','School Days','The Seven Deadly Sins',"The Seven Deadly Sins_ Dragon's Judgement",
        'The Seven Deadly Sins_ Four Knights of the Apocalypse','The Seven Deadly Sins_ Four Knights of the Apocalypse Season 2',
        'The Seven Deadly Sins_ Imperial Wrath of the Gods','The Seven Deadly Sins_ Revival of the Commandments'
    ],
    "best-music": [
        'Bakemonogatari','Beck','Black Clover','Black Clover_ Sword of the Wizard King','Bleach','Bleach_ Thousand-Year Blood War',
        'Bleach_ Thousand-Year Blood War - The Conflict','Bleach_ Thousand-Year Blood War - The Separation','Cowboy Bebop',
        'Cowboy Bebop_ The Movie','Gintama','Guilty Crown',"JoJo's Bizarre Adventure",'JoJo\'s Bizarre Adventure (2012)',
        "JoJo's Bizarre Adventure_ Diamond Is Unbreakable","JoJo's Bizarre Adventure_ Golden Wind","JoJo's Bizarre Adventure_ Stardust Crusaders",
        "JoJo's Bizarre Adventure_ Stardust Crusaders - Battle in Egypt","JoJo's Bizarre Adventure_ Stone Ocean",'Kabaneri of the Iron Fortress',
        'Kabaneri of the Iron Fortress_ Life The Burns','Kabaneri of the Iron Fortress_ Light That Gathers','Kabaneri of the Iron Fortress_ The Battle of Unato',
        'Monogatari Series_ Second Season','Nekomonogatari Black','Nisemonogatari','Noragami','Noragami Aragoto','Owarimonogatari',
        'Owarimonogatari 2nd Season','Psycho-Pass','Psycho-Pass 2','Psycho-Pass 3','Psycho-Pass Movie 2_ Providence',
        'Psycho-Pass_ Sinners of the System Case.1 - Crime and Punishment','Psycho-Pass_ Sinners of the System Case.2 - First Guardian',
        'Psycho-Pass_ Sinners of the System Case.3 - On the Other Side of Love and Hate','Psycho-Pass_ The Movie',
        'Tokyo Ghoul','Tokyo Ghoul √A','Tokyo Ghoul_re','Tokyo Ghoul_re 2nd Season','Tsukimonogatari','Violet Evergarden',
        'Violet Evergarden_ Eternity and the Auto Memory Doll','Violet Evergarden_ The Day You Understand _I Love You_ Will Surely Come',
        'Violet Evergarden_ The Movie','Vivy -Fluorite Eye\'s Song-','Zoku Owarimonogatari'
    ],
    "will-make-you-cry": [
        '5 Centimeters per Second','Anohana_ The Flower We Saw That Day','Anohana_ The Flower We Saw That Day The Movie',
        'A Place Further Than The Universe','Assassination Classroom','Assassination Classroom Second Season','Assassination Classroom_ Meeting Time',
        'Bubble','Cyberpunk_ Edgerunners','Kotaro Lives Alone','Maboroshi','No Game No Life_ Zero','Plastic Memories',
        'Toradora!','Wolf Children','Your Lie in April'
    ]
};

// -----------------------------
// Populate grids
// -----------------------------
for (const [tab, titles] of Object.entries(animeTabs)) {
    const grid = document.querySelector(`#${tab.replace(/ /g,'-')} .anime-grid`);
    if (!grid) continue;

    titles.forEach((title, index) => {
        const imgPath = `images/${tab}/${title}/cover.webp`;

        const card = document.createElement('div');
        card.className = 'anime-card reveal';
        card.style.transitionDelay = `${index * 50}ms`; // stagger animation
        card.innerHTML = `
            <img src="${imgPath}" alt="${title}" loading="lazy">
            <h2>${title}</h2>
        `;

        card.addEventListener('click', () => {
            const encodedTitle = encodeURIComponent(title);
            const encodedTab = encodeURIComponent(tab);
            window.location.href = `animecard.html?tab=${encodedTab}&title=${encodedTitle}`;
        });

        grid.appendChild(card);
    });
}

// -----------------------------
// TYPING EFFECT for H1
// -----------------------------
const typingElement = document.querySelector('h1');
const text = typingElement.textContent;
typingElement.setAttribute('data-text', text);
typingElement.textContent = '';
typingElement.classList.add('typing', 'reveal');

let i = 0;
function type() {
    if (i < text.length) {
        typingElement.textContent += text.charAt(i);
        i++;
        setTimeout(type, 80); // typing speed
    }
}
type();

// -----------------------------
// SCROLL REVEAL
// -----------------------------
function triggerReveal() {
    const reveals = document.querySelectorAll('.tab-content.active .anime-card, h1');

    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (top < windowHeight - 50) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', triggerReveal);
window.addEventListener('resize', triggerReveal);
triggerReveal();


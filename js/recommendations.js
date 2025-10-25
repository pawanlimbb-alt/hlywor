const recommendations = [
    {
        title: '86 Eighty-Six',
        cover: 'images/recommendations/86 Eighty-Six/cover.webp',
        summary: 'The 86th district fights for survival in a war with autonomous drones.',
        episodes: 11,
        genre: ['Action','Drama','Sci-Fi'],
        thoughts: 'Dark and thought-provoking military story.'
    },
    {
        title: '86 Eighty-Six Part 2',
        cover: 'images/recommendations/86 Eighty-Six Part 2/cover.webp',
        summary: 'Continuation of the 86th district’s struggle.',
        episodes: 11,
        genre: ['Action','Drama','Sci-Fi'],
        thoughts: 'Even more emotional and tense.'
    },
    {
        title: '86 Eighty-Six_ Special Edition - The Poppies Bloom Red on the Battlefield',
        cover: 'images/recommendations/86 Eighty-Six_ Special Edition - The Poppies Bloom Red on the Battlefield/cover.webp',
        summary: 'Special edition focusing on the emotional aftermath of battles.',
        episodes: 1,
        genre: ['Action','Drama','Sci-Fi'],
        thoughts: 'Emotional and reflective.'
    },
    {
        title: 'Gurren Lagann',
        cover: 'images/recommendations/Gurren Lagann/cover.webp',
        summary: 'Simon and Kamina fight against oppressive forces underground.',
        episodes: 27,
        genre: ['Action','Adventure','Comedy'],
        thoughts: 'Epic, over-the-top energy with amazing animation.'
    },
    {
        title: 'Gurren Lagann The Movie_ The Lights in the Sky are Stars',
        cover: 'images/recommendations/Gurren Lagann The Movie_ The Lights in the Sky are Stars/cover.webp',
        summary: 'Movie adaptation summarizing the original series with extra scenes.',
        episodes: 1,
        genre: ['Action','Adventure','Comedy'],
        thoughts: 'Stylized, exciting, and visually stunning.'
    },
    {
        title: 'Josee, the Tiger and the Fish',
        cover: 'images/recommendations/Josee, the Tiger and the Fish/cover.webp',
        summary: 'A touching romance between a wheelchair-bound girl and a university student.',
        episodes: 1,
        genre: ['Romance','Drama'],
        thoughts: 'Beautiful, emotional, and heartfelt.'
    },
    {
        title: 'Mob Psycho 100',
        cover: 'images/recommendations/Mob Psycho 100/cover.webp',
        summary: 'Mob struggles with psychic powers and adolescence.',
        episodes: 25,
        genre: ['Action','Comedy','Supernatural'],
        thoughts: 'Funny, emotional, and visually unique.'
    },
    {
        title: 'Mob Psycho 100 II',
        cover: 'images/recommendations/Mob Psycho 100 II/cover.webp',
        summary: 'Mob faces stronger enemies and personal growth challenges.',
        episodes: 13,
        genre: ['Action','Comedy','Supernatural'],
        thoughts: 'Even more exciting and emotional.'
    },
    {
        title: 'Mob Psycho 100 III',
        cover: 'images/recommendations/Mob Psycho 100 III/cover.webp',
        summary: 'Mob’s final tests of strength and character unfold.',
        episodes: 12,
        genre: ['Action','Comedy','Supernatural'],
        thoughts: 'Culmination of Mob’s journey.'
    },
    {
        title: 'Mob Psycho 100 Reigen_ The Miraculous Unknown Psychic',
        cover: 'images/recommendations/Mob Psycho 100 Reigen_ The Miraculous Unknown Psychic/cover.webp',
        summary: 'Focus on Reigen’s adventures and wisdom.',
        episodes: 1,
        genre: ['Comedy','Supernatural'],
        thoughts: 'Lighthearted and clever.'
    },
    {
        title: 'Mob Psycho 100_ Spirits and Such Company Trip - A Journey That Mends the Heart and Heals the Soul',
        cover: 'images/recommendations/Mob Psycho 100_ Spirits and Such Company Trip - A Journey That Mends the Heart and Heals the Soul/cover.webp',
        summary: 'Side story focusing on bonding and growth.',
        episodes: 1,
        genre: ['Comedy','Supernatural'],
        thoughts: 'Heartwarming and fun.'
    },
    {
        title: 'My Hero Academia',
        cover: 'images/recommendations/My Hero Academia/cover.webp',
        summary: 'A society where heroes exist, and young students train to become pro heroes.',
        episodes: 13,
        genre: ['Action','Adventure','Superhero'],
        thoughts: 'Inspiring and action-packed.'
    },
    {
        title: 'My Hero Academia_ Heroes Rising',
        cover: 'images/recommendations/My Hero Academia_ Heroes Rising/cover.webp',
        summary: 'Movie showing a battle that tests the students’ limits.',
        episodes: 1,
        genre: ['Action','Adventure','Superhero'],
        thoughts: 'High-stakes and emotional.'
    },
    {
        title: 'My Hero Academia Season 2',
        cover: 'images/recommendations/My Hero Academia Season 2/cover.webp',
        summary: 'Students face new villains and challenges in their hero journey.',
        episodes: 25,
        genre: ['Action','Adventure','Superhero'],
        thoughts: 'Engaging and full of growth.'
    },
    {
        title: 'My Hero Academia Season 3',
        cover: 'images/recommendations/My Hero Academia Season 3/cover.webp',
        summary: 'The students experience their toughest trials yet.',
        episodes: 25,
        genre: ['Action','Adventure','Superhero'],
        thoughts: 'Emotional and thrilling.'
    },
    {
        title: 'My Hero Academia Season 5',
        cover: 'images/recommendations/My Hero Academia Season 5/cover.webp',
        summary: 'New villains and developments push the heroes further.',
        episodes: 25,
        genre: ['Action','Adventure','Superhero'],
        thoughts: 'Powerful and exciting.'
    },
    {
        title: 'My Hero Academia Season 6',
        cover: 'images/recommendations/My Hero Academia Season 6/cover.webp',
        summary: 'Climactic events reshape the hero society.',
        episodes: 25,
        genre: ['Action','Adventure','Superhero'],
        thoughts: 'Tense and gripping.'
    },
    {
        title: 'My Hero Academia Season 7',
        cover: 'images/recommendations/My Hero Academia Season 7/cover.webp',
        summary: 'Continuation of the students’ heroic journey.',
        episodes: 25,
        genre: ['Action','Adventure','Superhero'],
        thoughts: 'Exciting and engaging.'
    },
    {
        title: 'My Hero Academia_ Two Heroes',
        cover: 'images/recommendations/My Hero Academia_ Two Heroes/cover.webp',
        summary: 'Movie highlighting All Might and Deku’s relationship.',
        episodes: 1,
        genre: ['Action','Adventure','Superhero'],
        thoughts: 'Emotional and dynamic.'
    },
    {
        title: 'Scissor Seven',
        cover: 'images/recommendations/Scissor Seven/cover.webp',
        summary: 'A hairdresser fights enemies while juggling comedy and action.',
        episodes: 15,
        genre: ['Action','Comedy','Adventure'],
        thoughts: 'Humorous and inventive.'
    },
    {
        title: 'Scissor Seven_ Shadow Fate',
        cover: 'images/recommendations/Scissor Seven_ Shadow Fate/cover.webp',
        summary: 'Continuation of Scissor Seven’s adventures.',
        episodes: 15,
        genre: ['Action','Comedy','Adventure'],
        thoughts: 'Funny and suspenseful.'
    },
    {
        title: 'Scissor Seven_ The Strongest Hairstylist',
        cover: 'images/recommendations/Scissor Seven_ The Strongest Hairstylist/cover.webp',
        summary: 'Focuses on mastering hairdressing and combat skills.',
        episodes: 1,
        genre: ['Action','Comedy'],
        thoughts: 'Fun and engaging.'
    },
    {
        title: 'Scissor Seven_ Xuanwu Kingdom Chapter',
        cover: 'images/recommendations/Scissor Seven_ Xuanwu Kingdom Chapter/cover.webp',
        summary: 'Story arc set in Xuanwu Kingdom with new characters.',
        episodes: 1,
        genre: ['Action','Comedy','Adventure'],
        thoughts: 'Exciting and adventurous.'
    },
    {
        title: 'Shangri-La Frontier',
        cover: 'images/recommendations/Shangri-La Frontier/cover.webp',
        summary: 'Gamer battles challenges in a virtual reality game.',
        episodes: 12,
        genre: ['Action','Adventure','Fantasy'],
        thoughts: 'High-intensity gaming action.'
    },
    {
        title: 'Shangri-La Frontier Season 2',
        cover: 'images/recommendations/Shangri-La Frontier Season 2/cover.webp',
        summary: 'Continuation of the virtual world adventures.',
        episodes: 12,
        genre: ['Action','Adventure','Fantasy'],
        thoughts: 'Even more intense and thrilling.'
    },
    {
        title: 'Steins;Gate',
        cover: 'images/recommendations/Steins;Gate/cover.webp',
        summary: 'A group discovers time travel and faces dangerous consequences.',
        episodes: 24,
        genre: ['Sci-Fi','Drama','Thriller'],
        thoughts: 'Mind-bending and emotional.'
    },
    {
        title: 'Steins;Gate 0',
        cover: 'images/recommendations/Steins;Gate 0/cover.webp',
        summary: 'Alternate timeline exploring tragic events.',
        episodes: 23,
        genre: ['Sci-Fi','Drama','Thriller'],
        thoughts: 'Dark and compelling.'
    },
    {
        title: 'Steins;Gate 0_ Valentine\'s of Crystal Polymorphism -Bittersweet Intermedio-',
        cover: 'images/recommendations/Steins;Gate 0_ Valentine\'s of Crystal Polymorphism -Bittersweet Intermedio-/cover.webp',
        summary: 'Special side story of Steins;Gate 0 focusing on Valentine’s Day.',
        episodes: 1,
        genre: ['Drama','Romance','Sci-Fi'],
        thoughts: 'Sweet and emotional.'
    },
    {
        title: 'Steins;Gate_ The Movie - Load Region of Déjà Vu',
        cover: 'images/recommendations/Steins;Gate_ The Movie - Load Region of Déjà Vu/cover.webp',
        summary: 'Movie adaptation expanding the story of Okabe and Kurisu.',
        episodes: 1,
        genre: ['Sci-Fi','Drama','Romance'],
        thoughts: 'Beautiful continuation of the series.'
    },
    {
        title: 'Sword Art Online',
        cover: 'images/recommendations/Sword Art Online/cover.webp',
        summary: 'Players trapped in a VRMMORPG must clear the game to survive.',
        episodes: 25,
        genre: ['Action','Adventure','Fantasy'],
        thoughts: 'Exciting and engaging.'
    },
    {
        title: 'Sword Art Online_ Alicization',
        cover: 'images/recommendations/Sword Art Online_ Alicization/cover.webp',
        summary: 'Kirito enters a virtual world to uncover a conspiracy.',
        episodes: 24,
        genre: ['Action','Adventure','Fantasy'],
        thoughts: 'Immersive and action-packed.'
    },
    {
        title: 'Sword Art Online_ Alicization - War of Underworld',
        cover: 'images/recommendations/Sword Art Online_ Alicization - War of Underworld/cover.webp',
        summary: 'Continuation of the Alicization arc with war and conflict.',
        episodes: 23,
        genre: ['Action','Adventure','Fantasy'],
        thoughts: 'Intense and dramatic.'
    },
    {
        title: 'Sword Art Online_ Alicization - War of Underworld 2nd Season',
        cover: 'images/recommendations/Sword Art Online_ Alicization - War of Underworld 2nd Season/cover.webp',
        summary: 'Final part of the Alicization war arc.',
        episodes: 12,
        genre: ['Action','Adventure','Fantasy'],
        thoughts: 'Epic conclusion with high stakes.'
    },
    {
        title: 'Sword Art Online Alternative_ Gun Gale Online',
        cover: 'images/recommendations/Sword Art Online Alternative_ Gun Gale Online/cover.webp',
        summary: 'A spin-off focusing on PvP and battles in GGO.',
        episodes: 12,
        genre: ['Action','Adventure','Sci-Fi'],
        thoughts: 'Fast-paced and exciting.'
    },
    {
        title: 'Sword Art Online II',
        cover: 'images/recommendations/Sword Art Online II/cover.webp',
        summary: 'Continuation of SAO adventures in a new arc.',
        episodes: 24,
        genre: ['Action','Adventure','Fantasy'],
        thoughts: 'Thrilling and engaging.'
    },
    {
        title: 'Sword Art Online Movie_ Ordinal Scale - Sword Art Offline',
        cover: 'images/recommendations/Sword Art Online Movie_ Ordinal Scale - Sword Art Offline/cover.webp',
        summary: 'Movie showing events of Ordinal Scale in full detail.',
        episodes: 1,
        genre: ['Action','Adventure','Fantasy'],
        thoughts: 'Beautiful animation with emotional depth.'
    },
    {
        title: 'To Your Eternity',
        cover: 'images/recommendations/To Your Eternity/cover.webp',
        summary: 'An immortal being experiences life through human forms.',
        episodes: 20,
        genre: ['Adventure','Drama','Fantasy'],
        thoughts: 'Emotional, philosophical, and moving.'
    },
    {
        title: 'To Your Eternity Season 2',
        cover: 'images/recommendations/To Your Eternity Season 2/cover.webp',
        summary: 'Continuation of Fushi’s journey and growth.',
        episodes: 20,
        genre: ['Adventure','Drama','Fantasy'],
        thoughts: 'Even more emotional and intense.'
    },
    {
        title: 'To Your Eternity Season 3',
        cover: 'images/recommendations/To Your Eternity Season 3/cover.webp',
        summary: 'Final arcs of Fushi’s story unfold.',
        episodes: 20,
        genre: ['Adventure','Drama','Fantasy'],
        thoughts: 'Heartbreaking and satisfying conclusion.'
    },
    {
        title: 'Vinland Saga',
        cover: 'images/recommendations/Vinland Saga/cover.webp',
        summary: 'Thorfinn’s quest for revenge in Viking-era Europe.',
        episodes: 24,
        genre: ['Action','Drama','Historical'],
        thoughts: 'Intense and beautifully animated.'
    },
    {
        title: 'Vinland Saga Season 2',
        cover: 'images/recommendations/Vinland Saga Season 2/cover.webp',
        summary: 'Continuation of Thorfinn’s journey and growth.',
        episodes: 24,
        genre: ['Action','Drama','Historical'],
        thoughts: 'Epic storytelling with strong characters.'
    }
];


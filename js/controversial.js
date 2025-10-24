const controversial = [
    {
        title: 'Berserk',
        cover: 'images/controversial/Berserk/cover.webp',
        summary: 'Guts fights against dark forces in a medieval world filled with violence and betrayal.',
        episodes: 25,
        genre: ['Action','Dark Fantasy','Adventure'],
        thoughts: 'Grim, intense, and controversial for its graphic content.'
    },
    {
        title: 'Berserk (2016)',
        cover: 'images/controversial/Berserk (2016)/cover.webp',
        summary: 'Reboot adaptation of the original Berserk series.',
        episodes: 12,
        genre: ['Action','Dark Fantasy','Adventure'],
        thoughts: 'Criticized for animation style but continues Guts’ dark journey.'
    },
    {
        title: 'Berserk_ Season II',
        cover: 'images/controversial/Berserk_ Season II/cover.webp',
        summary: 'Continuation of Guts’ story with new arcs.',
        episodes: 12,
        genre: ['Action','Dark Fantasy','Adventure'],
        thoughts: 'Explores more mature and violent themes.'
    },
    {
        title: 'DARLING in the FRANXX',
        cover: 'images/controversial/DARLING in the FRANXX/cover.webp',
        summary: 'Teen pilots bond while fighting mysterious creatures.',
        episodes: 24,
        genre: ['Action','Mecha','Romance'],
        thoughts: 'Loved for its emotional beats but controversial for fanservice.'
    },
    {
        title: 'Goblin Slayer',
        cover: 'images/controversial/Goblin Slayer/cover.webp',
        summary: 'A dark fantasy world where Goblin Slayer fights goblins obsessively.',
        episodes: 12,
        genre: ['Action','Dark Fantasy'],
        thoughts: 'Controversial for its graphic violence and dark themes.'
    },
    {
        title: 'Goblin Slayer_ Adventure Sheet',
        cover: 'images/controversial/Goblin Slayer_ Adventure Sheet/cover.webp',
        summary: 'Side story exploring Goblin Slayer’s adventures and character depth.',
        episodes: 1,
        genre: ['Action','Fantasy'],
        thoughts: 'Dark yet insightful.'
    },
    {
        title: "Goblin Slayer_ Goblin's Crown",
        cover: 'images/controversial/Goblin Slayer_ Goblin\'s Crown/cover.webp',
        summary: 'Movie continuation of Goblin Slayer’s fight against goblins.',
        episodes: 1,
        genre: ['Action','Dark Fantasy'],
        thoughts: 'Intense action and mature themes.'
    },
    {
        title: 'Goblin Slayer II',
        cover: 'images/controversial/Goblin Slayer II/cover.webp',
        summary: 'Second season exploring deeper threats and character arcs.',
        episodes: 12,
        genre: ['Action','Dark Fantasy'],
        thoughts: 'Continuing intense and controversial storylines.'
    },
    {
        title: 'Kokoro Connect',
        cover: 'images/controversial/Kokoro Connect/cover.webp',
        summary: 'Five high school friends experience supernatural body-switching.',
        episodes: 13,
        genre: ['Drama','Romance','Supernatural'],
        thoughts: 'Emotional but controversial for mature situations.'
    },
    {
        title: 'Kokoro Connect OVA',
        cover: 'images/controversial/Kokoro Connect OVA/cover.webp',
        summary: 'Side stories and additional arcs of Kokoro Connect.',
        episodes: 1,
        genre: ['Drama','Romance','Supernatural'],
        thoughts: 'Expands on relationships and conflicts.'
    },
    {
        title: 'Made in Abyss',
        cover: 'images/controversial/Made in Abyss/cover.webp',
        summary: 'Riko descends into the Abyss to find her mother.',
        episodes: 13,
        genre: ['Adventure','Fantasy','Drama'],
        thoughts: 'Beautiful but extremely dark and disturbing.'
    },
    {
        title: 'Made in Abyss_ Dawn of the Deep Soul',
        cover: 'images/controversial/Made in Abyss_ Dawn of the Deep Soul/cover.webp',
        summary: 'Movie continuation of Riko’s journey with intense battles.',
        episodes: 1,
        genre: ['Adventure','Fantasy','Drama'],
        thoughts: 'Emotional and graphic.'
    },
    {
        title: "Made in Abyss_ Journey's Dawn",
        cover: 'images/controversial/Made in Abyss_ Journey\'s Dawn/cover.webp',
        summary: 'Special episodes focusing on character backstories.',
        episodes: 1,
        genre: ['Adventure','Fantasy'],
        thoughts: 'Insightful and tragic.'
    },
    {
        title: 'Made in Abyss_ The Golden City of the Scorching Sun',
        cover: 'images/controversial/Made in Abyss_ The Golden City of the Scorching Sun/cover.webp',
        summary: 'Riko and companions face new depths and challenges.',
        episodes: 1,
        genre: ['Adventure','Fantasy','Drama'],
        thoughts: 'Stunning but very dark.'
    },
    {
        title: 'Made in Abyss_ The Golden City of the Scorching Sun - Together with Papa',
        cover: 'images/controversial/Made in Abyss_ The Golden City of the Scorching Sun - Together with Papa/cover.webp',
        summary: 'Extended special exploring Riko’s bond with Reg.',
        episodes: 1,
        genre: ['Adventure','Fantasy','Drama'],
        thoughts: 'Emotional and bittersweet.'
    },
    {
        title: 'Made in Abyss_ Wandering Twilight',
        cover: 'images/controversial/Made in Abyss_ Wandering Twilight/cover.webp',
        summary: 'Final side story in the Abyss saga.',
        episodes: 1,
        genre: ['Adventure','Fantasy','Drama'],
        thoughts: 'Beautifully dark and emotional.'
    },
    {
        title: 'Magia Record_ Puella Magi Madoka Magica Side Story',
        cover: 'images/controversial/Magia Record_ Puella Magi Madoka Magica Side Story/cover.webp',
        summary: 'Side story exploring magical girls and their struggles.',
        episodes: 12,
        genre: ['Action','Drama','Fantasy'],
        thoughts: 'Intriguing and darker than expected.'
    },
    {
        title: 'Magia Record_ Puella Magi Madoka Magica Side Story Final Season',
        cover: 'images/controversial/Magia Record_ Puella Magi Madoka Magica Side Story Final Season/cover.webp',
        summary: 'Climactic end to the side story arc.',
        episodes: 12,
        genre: ['Action','Drama','Fantasy'],
        thoughts: 'Emotional and intense.'
    },
    {
        title: 'Magia Record_ Puella Magi Madoka Magica Side Story Recap',
        cover: 'images/controversial/Magia Record_ Puella Magi Madoka Magica Side Story Recap/cover.webp',
        summary: 'Recap of previous events for context.',
        episodes: 1,
        genre: ['Action','Drama','Fantasy'],
        thoughts: 'Useful but mostly summary.'
    },
    {
        title: 'Magia Record_ Puella Magi Madoka Magica Side Story Season 2 - The Eve of Awakening',
        cover: 'images/controversial/Magia Record_ Puella Magi Madoka Magica Side Story Season 2 - The Eve of Awakening/cover.webp',
        summary: 'Continuation of magical girls’ struggles and conflicts.',
        episodes: 12,
        genre: ['Action','Drama','Fantasy'],
        thoughts: 'Exciting and dramatic.'
    },
    {
        title: 'Mushoku Tensei_ Jobless Reincarnation',
        cover: 'images/controversial/Mushoku Tensei_ Jobless Reincarnation/cover.webp',
        summary: 'Man is reincarnated in a fantasy world, seeking redemption.',
        episodes: 23,
        genre: ['Fantasy','Adventure','Drama'],
        thoughts: 'Beloved but controversial for certain scenes.'
    },
    {
        title: 'Mushoku Tensei_ Jobless Reincarnation - Eris the Goblin Slayer',
        cover: 'images/controversial/Mushoku Tensei_ Jobless Reincarnation - Eris the Goblin Slayer/cover.webp',
        summary: 'OVA focusing on Eris’ side adventures.',
        episodes: 1,
        genre: ['Fantasy','Adventure'],
        thoughts: 'Actionful and fun, slightly dark.'
    },
    {
        title: 'Mushoku Tensei_ Jobless Reincarnation Part 2',
        cover: 'images/controversial/Mushoku Tensei_ Jobless Reincarnation Part 2/cover.webp',
        summary: 'Continuation exploring deeper character development.',
        episodes: 23,
        genre: ['Fantasy','Adventure','Drama'],
        thoughts: 'Rich storytelling with some mature content.'
    },
    {
        title: 'Mushoku Tensei_ Jobless Reincarnation Season 2',
        cover: 'images/controversial/Mushoku Tensei_ Jobless Reincarnation Season 2/cover.webp',
        summary: 'Further adventures and conflicts in the fantasy world.',
        episodes: 12,
        genre: ['Fantasy','Adventure','Drama'],
        thoughts: 'Intense and emotional.'
    },
    {
        title: 'Mushoku Tensei_ Jobless Reincarnation Season 2 - Episode 0 _Guardian Fitz_',
        cover: 'images/controversial/Mushoku Tensei_ Jobless Reincarnation Season 2 - Episode 0 _Guardian Fitz_/cover.webp',
        summary: 'Special episode exploring side stories.',
        episodes: 1,
        genre: ['Fantasy','Adventure'],
        thoughts: 'Adds depth to characters.'
    },
    {
        title: 'Mushoku Tensei_ Jobless Reincarnation Season 2 Part 2',
        cover: 'images/controversial/Mushoku Tensei_ Jobless Reincarnation Season 2 Part 2/cover.webp',
        summary: 'Final arcs of the season.',
        episodes: 12,
        genre: ['Fantasy','Adventure','Drama'],
        thoughts: 'Climactic and rich in storytelling.'
    },
    {
        title: 'Puella Magi Madoka Magica',
        cover: 'images/controversial/Puella Magi Madoka Magica/cover.webp',
        summary: 'Girls fight witches in a magical world with dark twists.',
        episodes: 12,
        genre: ['Dark Fantasy','Drama','Magical Girl'],
        thoughts: 'Controversial for dark themes and shocking twists.'
    },
    {
        title: 'Puella Magi Madoka Magica the Movie Part 1_ Beginnings',
        cover: 'images/controversial/Puella Magi Madoka Magica the Movie Part 1_ Beginnings/cover.webp',
        summary: 'Movie adaptation of the series beginning.',
        episodes: 1,
        genre: ['Dark Fantasy','Drama','Magical Girl'],
        thoughts: 'Beautiful and emotionally impactful.'
    },
    {
        title: 'Puella Magi Madoka Magica the Movie Part 2_ Eternal',
        cover: 'images/controversial/Puella Magi Madoka Magica the Movie Part 2_ Eternal/cover.webp',
        summary: 'Continuation of the series in movie form.',
        episodes: 1,
        genre: ['Dark Fantasy','Drama','Magical Girl'],
        thoughts: 'Darker and more dramatic.'
    },
    {
        title: 'Puella Magi Madoka Magica the Movie_ Rebellion',
        cover: 'images/controversial/Puella Magi Madoka Magica the Movie_ Rebellion/cover.webp',
        summary: 'Final movie with shocking twists and rebellion.',
        episodes: 1,
        genre: ['Dark Fantasy','Drama','Magical Girl'],
        thoughts: 'Highly controversial and mind-bending.'
    },
    {
        title: 'Rurouni Kenshin',
        cover: 'images/controversial/Rurouni Kenshin/cover.webp',
        summary: 'A wandering swordsman seeks redemption in Meiji-era Japan.',
        episodes: 95,
        genre: ['Action','Adventure','Historical'],
        thoughts: 'Classic samurai tale, some violence.'
    },
    {
        title: 'Rurouni Kenshin_ Meiji Kenkaku Romantan',
        cover: 'images/controversial/Rurouni Kenshin_ Meiji Kenkaku Romantan/cover.webp',
        summary: 'Another adaptation focusing on Kenshin’s story.',
        episodes: 95,
        genre: ['Action','Adventure','Historical'],
        thoughts: 'Loved classic with some mature themes.'
    },
    {
        title: 'School Days',
        cover: 'images/controversial/School Days/cover.webp',
        summary: 'High school romance that turns into a dark psychological thriller.',
        episodes: 12,
        genre: ['Drama','Romance','Psychological'],
        thoughts: 'Extremely controversial for shocking and violent ending.'
    },
    {
        title: 'The Seven Deadly Sins',
        cover: 'images/controversial/The Seven Deadly Sins/cover.webp',
        summary: 'Knights on a quest to save their kingdom from tyrants.',
        episodes: 24,
        genre: ['Action','Adventure','Fantasy'],
        thoughts: 'Popular but controversial for some fanservice.'
    },
    {
        title: "The Seven Deadly Sins_ Dragon's Judgement",
        cover: 'images/controversial/The Seven Deadly Sins_ Dragon\'s Judgement/cover.webp',
        summary: 'Continuation of epic battles and character arcs.',
        episodes: 24,
        genre: ['Action','Adventure','Fantasy'],
        thoughts: 'High stakes and intense action.'
    },
    {
        title: 'The Seven Deadly Sins_ Four Knights of the Apocalypse',
        cover: 'images/controversial/The Seven Deadly Sins_ Four Knights of the Apocalypse/cover.webp',
        summary: 'Next generation faces new threats.',
        episodes: 24,
        genre: ['Action','Adventure','Fantasy'],
        thoughts: 'Exciting and controversial in storytelling.'
    },
    {
        title: 'The Seven Deadly Sins_ Four Knights of the Apocalypse Season 2',
        cover: 'images/controversial/The Seven Deadly Sins_ Four Knights of the Apocalypse Season 2/cover.webp',
        summary: 'Continuation of the Four Knights saga.',
        episodes: 24,
        genre: ['Action','Adventure','Fantasy'],
        thoughts: 'Maintains controversy and intensity.'
    },
    {
        title: 'The Seven Deadly Sins_ Imperial Wrath of the Gods',
        cover: 'images/controversial/The Seven Deadly Sins_ Imperial Wrath of the Gods/cover.webp',
        summary: 'Epic battles continue with emotional twists.',
        episodes: 24,
        genre: ['Action','Adventure','Fantasy'],
        thoughts: 'High-quality action with mature themes.'
    },
    {
        title: 'The Seven Deadly Sins_ Revival of the Commandments',
        cover: 'images/controversial/The Seven Deadly Sins_ Revival of the Commandments/cover.webp',
        summary: 'Villains return with a new threat.',
        episodes: 24,
        genre: ['Action','Adventure','Fantasy'],
        thoughts: 'Engaging and controversial in story arcs.'
    }
];

export default controversial;


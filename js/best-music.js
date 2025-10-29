const bestMusic = [
    {
        title: 'Bakemonogatari',
        cover: 'images/best-music/Bakemonogatari/cover.webp',
        summary: 'A supernatural high school story with unique narrative and style.',
        episodes: 15,
        genre: ['Supernatural','Romance','Comedy'],
        thoughts: 'Known for its creative dialogue and outstanding soundtrack.'
    },
    {
        title: 'Beck',
        cover: 'images/best-music/Beck/cover.webp',
        summary: 'Teenagers form a rock band and chase their musical dreams.',
        episodes: 26,
        genre: ['Music','Slice of Life','Drama'],
        thoughts: 'Iconic for music-focused storytelling and realistic band life.'
    },
    {
        title: 'Black Clover',
        cover: 'images/best-music/Black Clover/cover.webp',
        summary: 'Two orphans strive to become the Wizard King in a magical world.',
        episodes: 170,
        genre: ['Action','Adventure','Fantasy'],
        thoughts: 'Energetic soundtrack complements epic battles.'
    },
    {
        title: 'Black Clover_ Sword of the Wizard King',
        cover: 'images/best-music/Black Clover_ Sword of the Wizard King/cover.webp',
        summary: 'Movie adaptation highlighting key battles and character arcs.',
        episodes: 1,
        genre: ['Action','Fantasy','Adventure'],
        thoughts: 'Music amplifies the cinematic intensity.'
    },
    {
        title: 'Bleach',
        cover: 'images/best-music/Bleach/cover.webp',
        summary: 'Ichigo Kurosaki gains Soul Reaper powers and battles evil spirits.',
        episodes: 366,
        genre: ['Action','Adventure','Supernatural'],
        thoughts: 'Legendary soundtrack that defines Shonen classics.'
    },
    {
        title: 'Bleach_ Thousand-Year Blood War',
        cover: 'images/best-music/Bleach_ Thousand-Year Blood War/cover.webp',
        summary: 'Final arc of Bleach adapted with modern animation.',
        episodes: 52,
        genre: ['Action','Adventure','Supernatural'],
        thoughts: 'Epic music heightens the dramatic climax.'
    },
    {
        title: 'Bleach_ Thousand-Year Blood War - The Conflict',
        cover: 'images/best-music/Bleach_ Thousand-Year Blood War - The Conflict/cover.webp',
        summary: 'Movie special focusing on major battles.',
        episodes: 1,
        genre: ['Action','Adventure','Supernatural'],
        thoughts: 'Powerful score accentuates conflicts.'
    },
    {
        title: 'Bleach_ Thousand-Year Blood War - The Separation',
        cover: 'images/best-music/Bleach_ Thousand-Year Blood War - The Separation/cover.webp',
        summary: 'Additional movie content expanding the arc.',
        episodes: 1,
        genre: ['Action','Adventure','Supernatural'],
        thoughts: 'Music complements the narrative tension.'
    },
    {
        title: 'Cowboy Bebop',
        cover: 'images/best-music/Cowboy Bebop/cover.webp',
        summary: 'Bounty hunters roam space in a jazz-infused sci-fi adventure.',
        episodes: 26,
        genre: ['Action','Sci-Fi','Adventure'],
        thoughts: 'Iconic jazz soundtrack by Yoko Kanno, unforgettable music.'
    },
    {
        title: 'Cowboy Bebop_ The Movie',
        cover: 'images/best-music/Cowboy Bebop_ The Movie/cover.webp',
        summary: 'Expanded story of the Bebop crew with cinematic scale.',
        episodes: 1,
        genre: ['Action','Sci-Fi','Adventure'],
        thoughts: 'Jazz and orchestral music elevate cinematic experience.'
    },
    {
        title: 'Gintama',
        cover: 'images/best-music/Gintama/cover.webp',
        summary: 'Comedy-action about an odd jobs samurai in an alien-occupied Japan.',
        episodes: 201,
        genre: ['Comedy','Action','Sci-Fi'],
        thoughts: 'Funny, chaotic, and great musical themes.'
    },
    {
        title: 'Guilty Crown',
        cover: 'images/best-music/Guilty Crown/cover.webp',
        summary: 'Dystopian future where a boy gains special powers to fight rebels.',
        episodes: 22,
        genre: ['Action','Sci-Fi','Drama'],
        thoughts: 'Emotional soundtrack blends orchestral and rock music.'
    },
    {
        title: "JoJo's Bizarre Adventure",
        cover: 'images/best-music/JoJo\'s Bizarre Adventure/cover.webp',
        summary: 'Multi-generational saga of the Joestar family against supernatural foes.',
        episodes: 26,
        genre: ['Action','Adventure','Supernatural'],
        thoughts: 'Legendary for its eccentric characters and musical references.'
    },
    {
        title: "JoJo's Bizarre Adventure (2012)",
        cover: 'images/best-music/JoJo\'s Bizarre Adventure (2012)/cover.webp',
        summary: 'Updated adaptation of Phantom Blood and Battle Tendency arcs.',
        episodes: 26,
        genre: ['Action','Adventure','Supernatural'],
        thoughts: 'Music perfectly matches stylish battles.'
    },
    {
        title: "JoJo's Bizarre Adventure_ Diamond Is Unbreakable",
        cover: 'images/best-music/JoJo\'s Bizarre Adventure_ Diamond Is Unbreakable/cover.webp',
        summary: 'Josuke Higashikata fights mysterious Stand users in Morioh.',
        episodes: 39,
        genre: ['Action','Adventure','Supernatural'],
        thoughts: 'Dynamic and memorable soundtrack.'
    },
    {
        title: "JoJo's Bizarre Adventure_ Golden Wind",
        cover: 'images/best-music/JoJo\'s Bizarre Adventure_ Golden Wind/cover.webp',
        summary: 'Giorno Giovanna aims to reform the Italian mafia.',
        episodes: 39,
        genre: ['Action','Adventure','Supernatural'],
        thoughts: 'Music enhances stylish action and dramatic tension.'
    },
    {
        title: "JoJo's Bizarre Adventure_ Stardust Crusaders",
        cover: 'images/best-music/JoJo\'s Bizarre Adventure_ Stardust Crusaders/cover.webp',
        summary: 'Jotaro and companions journey to defeat Dio.',
        episodes: 48,
        genre: ['Action','Adventure','Supernatural'],
        thoughts: 'Epic soundtrack complements globe-trotting battles.'
    },
    {
        title: "JoJo's Bizarre Adventure_ Stardust Crusaders - Battle in Egypt",
        cover: 'images/best-music/JoJo\'s Bizarre Adventure_ Stardust Crusaders - Battle in Egypt/cover.webp',
        summary: 'Movie adaptation of Egypt arc.',
        episodes: 1,
        genre: ['Action','Adventure','Supernatural'],
        thoughts: 'Music intensifies climactic moments.'
    },
    {
        title: "JoJo's Bizarre Adventure_ Stone Ocean",
        cover: 'images/best-music/JoJo\'s Bizarre Adventure_ Stone Ocean/cover.webp',
        summary: 'Jolyne Cujoh battles enemies in prison using Stands.',
        episodes: 38,
        genre: ['Action','Adventure','Supernatural'],
        thoughts: 'Strong soundtrack adds tension and flair.'
    },
    {
        title: 'Kabaneri of the Iron Fortress',
        cover: 'images/best-music/Kabaneri of the Iron Fortress/cover.webp',
        summary: 'Humans fight zombie-like creatures during the industrial revolution.',
        episodes: 12,
        genre: ['Action','Adventure','Steampunk'],
        thoughts: 'Music is energetic and matches intense battles.'
    },
    {
        title: 'Kabaneri of the Iron Fortress_ Life The Burns',
        cover: 'images/best-music/Kabaneri of the Iron Fortress_ Life The Burns/cover.webp',
        summary: 'OVA exploring character side stories.',
        episodes: 1,
        genre: ['Action','Adventure'],
        thoughts: 'Music adds emotional depth.'
    },
    {
        title: 'Kabaneri of the Iron Fortress_ Light That Gathers',
        cover: 'images/best-music/Kabaneri of the Iron Fortress_ Light That Gathers/cover.webp',
        summary: 'Continuation of the intense fight against Kabanes.',
        episodes: 1,
        genre: ['Action','Adventure'],
        thoughts: 'Music heightens dramatic tension.'
    },
    {
        title: 'Kabaneri of the Iron Fortress_ The Battle of Unato',
        cover: 'images/best-music/Kabaneri of the Iron Fortress_ The Battle of Unato/cover.webp',
        summary: 'Movie recap focusing on pivotal battles.',
        episodes: 1,
        genre: ['Action','Adventure'],
        thoughts: 'Powerful soundtrack intensifies action.'
    },
    {
        title: 'Monogatari Series_ Second Season',
        cover: 'images/best-music/Monogatari Series_ Second Season/cover.webp',
        summary: 'Continuation of supernatural arcs with dialogue-driven storytelling.',
        episodes: 26,
        genre: ['Supernatural','Romance','Comedy'],
        thoughts: 'Unique soundtrack enhances atmosphere.'
    },
    {
        title: 'Nekomonogatari Black',
        cover: 'images/best-music/Nekomonogatari Black/cover.webp',
        summary: 'Koyomi faces dark family and supernatural challenges.',
        episodes: 4,
        genre: ['Supernatural','Romance','Comedy'],
        thoughts: 'Atmospheric soundtrack complements tension.'
    },
    {
        title: 'Nisemonogatari',
        cover: 'images/best-music/Nisemonogatari/cover.webp',
        summary: 'Koyomi Araragi faces new oddities and family drama.',
        episodes: 11,
        genre: ['Supernatural','Romance','Comedy'],
        thoughts: 'Music sets the mood perfectly.'
    },
    {
        title: 'Noragami',
        cover: 'images/best-music/Noragami/cover.webp',
        summary: 'Minor god Yato tries to gain followers while fighting phantoms.',
        episodes: 12,
        genre: ['Action','Comedy','Supernatural'],
        thoughts: 'Fun and catchy soundtrack.'
    },
    {
        title: 'Noragami Aragoto',
        cover: 'images/best-music/Noragami Aragoto/cover.webp',
        summary: 'Continuation of Yato’s adventures with darker threats.',
        episodes: 13,
        genre: ['Action','Comedy','Supernatural'],
        thoughts: 'Music matches intense and emotional moments.'
    },
    {
        title: 'Owarimonogatari',
        cover: 'images/best-music/Owarimonogatari/cover.webp',
        summary: 'Koyomi resolves past mysteries and supernatural events.',
        episodes: 12,
        genre: ['Supernatural','Romance','Comedy'],
        thoughts: 'Music adds intrigue and dramatic effect.'
    },
    {
        title: 'Owarimonogatari 2nd Season',
        cover: 'images/best-music/Owarimonogatari 2nd Season/cover.webp',
        summary: 'Conclusion of Owarimonogatari arcs.',
        episodes: 7,
        genre: ['Supernatural','Romance','Comedy'],
        thoughts: 'Soundtrack emphasizes final story beats.'
    },
    {
        title: 'Psycho-Pass',
        cover: 'images/best-music/Psycho-Pass/cover.webp',
        summary: 'Futuristic police enforce law using psychological scanners.',
        episodes: 22,
        genre: ['Action','Sci-Fi','Psychological'],
        thoughts: 'Intense soundtrack builds tension and mood.'
    },
    {
        title: 'Psycho-Pass 2',
        cover: 'images/best-music/Psycho-Pass 2/cover.webp',
        summary: 'Continuation with new threats and characters.',
        episodes: 11,
        genre: ['Action','Sci-Fi','Psychological'],
        thoughts: 'Music heightens suspense.'
    },
    {
        title: 'Psycho-Pass 3',
        cover: 'images/best-music/Psycho-Pass 3/cover.webp',
        summary: 'New team faces complex crime and moral dilemmas.',
        episodes: 8,
        genre: ['Action','Sci-Fi','Psychological'],
        thoughts: 'Soundtrack matches fast-paced tension.'
    },
    {
        title: 'Psycho-Pass Movie 2_ Providence',
        cover: 'images/best-music/Psycho-Pass Movie 2_ Providence/cover.webp',
        summary: 'Movie continuation expanding the narrative universe.',
        episodes: 1,
        genre: ['Action','Sci-Fi','Psychological'],
        thoughts: 'Music emphasizes cinematic suspense.'
    },
    {
        title: 'Psycho-Pass_ Sinners of the System Case.1 - Crime and Punishment',
        cover: 'images/best-music/Psycho-Pass_ Sinners of the System Case.1 - Crime and Punishment/cover.webp',
        summary: 'Side story focusing on crime and moral conflicts.',
        episodes: 1,
        genre: ['Action','Sci-Fi','Psychological'],
        thoughts: 'Soundtrack underlines moral tension.'
    },
    {
        title: 'Psycho-Pass_ Sinners of the System Case.2 - First Guardian',
        cover: 'images/best-music/Psycho-Pass_ Sinners of the System Case.2 - First Guardian/cover.webp',
        summary: 'Second side story with high stakes.',
        episodes: 1,
        genre: ['Action','Sci-Fi','Psychological'],
        thoughts: 'Music adds depth to suspense.'
    },
    {
        title: 'Psycho-Pass_ Sinners of the System Case.3 - On the Other Side of Love and Hate',
        cover: 'images/best-music/Psycho-Pass_ Sinners of the System Case.3 - On the Other Side of Love and Hate/cover.webp',
        summary: 'Final side story exploring relationships and morality.',
        episodes: 1,
        genre: ['Action','Sci-Fi','Psychological'],
        thoughts: 'Soundtrack enhances emotional drama.'
    },
    {
        title: 'Psycho-Pass_ The Movie',
        cover: 'images/best-music/Psycho-Pass_ The Movie/cover.webp',
        summary: 'Feature film expanding the universe and stakes.',
        episodes: 1,
        genre: ['Action','Sci-Fi','Psychological'],
        thoughts: 'Epic soundtrack heightens cinematic intensity.'
    },
    {
        title: 'Tokyo Ghoul',
        cover: 'images/best-music/Tokyo Ghoul/cover.webp',
        summary: 'Ken Kaneki becomes a half-ghoul and struggles with identity.',
        episodes: 12,
        genre: ['Action','Horror','Supernatural'],
        thoughts: 'Dark, emotional, with haunting music.'
    },
    {
        title: 'Tokyo Ghoul √A',
        cover: 'images/best-music/Tokyo Ghoul √A/cover.webp',
        summary: 'Continuation of Kaneki’s journey with intense conflicts.',
        episodes: 12,
        genre: ['Action','Horror','Supernatural'],
        thoughts: 'Soundtrack mirrors dark tone.'
    },
    {
        title: 'Tokyo Ghoul_re',
        cover: 'images/best-music/Tokyo Ghoul_re/cover.webp',
        summary: 'New protagonist and continuation of the Tokyo Ghoul universe.',
        episodes: 12,
        genre: ['Action','Horror','Supernatural'],
        thoughts: 'Music matches suspense and action.'
    },
    {
        title: 'Tokyo Ghoul_re 2nd Season',
        cover: 'images/best-music/Tokyo Ghoul_re 2nd Season/cover.webp',
        summary: 'Final season of Tokyo Ghoul_re arc.',
        episodes: 12,
        genre: ['Action','Horror','Supernatural'],
        thoughts: 'Soundtrack enhances dark and emotional tone.'
    },
    {
        title: 'Tsukimonogatari',
        cover: 'images/best-music/Tsukimonogatari/cover.webp',
        summary: 'Koyomi faces new supernatural challenges post-Owarimonogatari.',
        episodes: 4,
        genre: ['Supernatural','Romance','Comedy'],
        thoughts: 'Music keeps the series’ unique rhythm.'
    },
    {
        title: 'Violet Evergarden',
        cover: 'images/best-music/Violet Evergarden/cover.webp',
        summary: 'Violet seeks to understand human emotions after war.',
        episodes: 13,
        genre: ['Drama','Slice of Life','Fantasy'],
        thoughts: 'Orchestral soundtrack deeply emotional.'
    },
    {
        title: 'Violet Evergarden_ Eternity and the Auto Memory Doll',
        cover: 'images/best-music/Violet Evergarden_ Eternity and the Auto Memory Doll/cover.webp',
        summary: 'OVA focusing on Violet helping a young girl.',
        episodes: 1,
        genre: ['Drama','Slice of Life'],
        thoughts: 'Music enhances emotional narrative.'
    },
    {
        title: 'Violet Evergarden_ The Day You Understand _I Love You_ Will Surely Come',
        cover: 'images/best-music/Violet Evergarden_ The Day You Understand _I Love You_ Will Surely Come/cover.webp',
        summary: 'OVA exploring further emotional arcs.',
        episodes: 1,
        genre: ['Drama','Slice of Life'],
        thoughts: 'Soundtrack accentuates heartfelt moments.'
    },
    {
        title: 'Violet Evergarden_ The Movie',
        cover: 'images/best-music/Violet Evergarden_ The Movie/cover.webp',
        summary: 'Movie continuation of Violet’s journey and closure.',
        episodes: 1,
        genre: ['Drama','Slice of Life','Fantasy'],
        thoughts: 'Orchestral music is breathtaking.'
    },
    {
        title: 'Vivy -Fluorite Eye\'s Song-',
        cover: 'images/best-music/Vivy -Fluorite Eye\'s Song-/cover.webp',
        summary: 'An AI singer fights to prevent war while performing.',
        episodes: 13,
        genre: ['Action','Music','Sci-Fi'],
        thoughts: 'Music-driven plot with spectacular soundtrack.'
    },
    {
        title: 'Zoku Owarimonogatari',
        cover: 'images/best-music/Zoku Owarimonogatari/cover.webp',
        summary: 'Final arcs of the Monogatari series, concluding Koyomi’s journey.',
        episodes: 6,
        genre: ['Supernatural','Romance','Comedy'],
        thoughts: 'Music concludes series with elegance and flair.'
    }
];


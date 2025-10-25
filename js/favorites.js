// favorites.js

const favorites = [
    {
        title: 'Attack on Titan',
        cover: 'images/favorites/Attack on Titan/cover.webp',
        summary: 'Humanity fights titans to survive.',
        episodes: 25,
        genre: ['Action', 'Drama'],
        thoughts: 'Epic storyline.'
    },
    {
        title: 'Attack on Titan_ Final Season',
        cover: 'images/favorites/Attack on Titan_ Final Season/cover.webp',
        summary: 'The final battle between humans and titans unfolds.',
        episodes: 16,
        genre: ['Action', 'Drama'],
        thoughts: 'Tense and emotional conclusion.'
    },
    {
        title: 'Attack on Titan_ Final Season Part 2',
        cover: 'images/favorites/Attack on Titan_ Final Season Part 2/cover.webp',
        summary: 'Humanity faces the last threats from the titans.',
        episodes: 12,
        genre: ['Action', 'Drama'],
        thoughts: 'Heart-pounding finale.'
    },
    {
        title: 'Attack on Titan Season 2',
        cover: 'images/favorites/Attack on Titan Season 2/cover.webp',
        summary: 'Secrets about the titans start to surface.',
        episodes: 12,
        genre: ['Action', 'Drama'],
        thoughts: 'Intense plot twists.'
    },
    {
        title: 'Attack on Titan Season 3',
        cover: 'images/favorites/Attack on Titan Season 3/cover.webp',
        summary: 'Political intrigue and the fight for freedom.',
        episodes: 22,
        genre: ['Action', 'Drama'],
        thoughts: 'Great mix of action and story.'
    },
    {
        title: 'Attack on Titan Season 3 Part 2',
        cover: 'images/favorites/Attack on Titan Season 3 Part 2/cover.webp',
        summary: 'The battle to reclaim humanity’s home intensifies.',
        episodes: 10,
        genre: ['Action', 'Drama'],
        thoughts: 'Epic and emotional.'
    },
    {
        title: 'Attack on Titan_ The Last Attack',
        cover: 'images/favorites/Attack on Titan_ The Last Attack/cover.webp',
        summary: 'Climactic showdown with the titans.',
        episodes: 1,
        genre: ['Action', 'Drama'],
        thoughts: 'High stakes and emotional payoff.'
    },
    {
        title: 'Delicious in Dungeon',
        cover: 'images/favorites/Delicious in Dungeon/cover.webp',
        summary: 'Adventurers cook monsters they defeat.',
        episodes: 12,
        genre: ['Fantasy', 'Comedy', 'Adventure'],
        thoughts: 'Fun mix of cooking and dungeon crawling.'
    },
    {
        title: 'Dr. Stone',
        cover: 'images/favorites/Dr. Stone/cover.webp',
        summary: 'Science revives civilization after a mysterious petrification.',
        episodes: 24,
        genre: ['Adventure', 'Sci-Fi', 'Comedy'],
        thoughts: 'Smart, fun, and educational.'
    },
    {
        title: 'Dr. Stone_ New World',
        cover: 'images/favorites/Dr. Stone_ New World/cover.webp',
        summary: 'The adventure continues with new challenges.',
        episodes: 11,
        genre: ['Adventure', 'Sci-Fi', 'Comedy'],
        thoughts: 'Expands the universe cleverly.'
    },
    {
        title: 'Dr. Stone_ New World Part 2',
        cover: 'images/favorites/Dr. Stone_ New World Part 2/cover.webp',
        summary: 'Further adventures and inventions unfold.',
        episodes: 11,
        genre: ['Adventure', 'Sci-Fi', 'Comedy'],
        thoughts: 'Exciting continuation.'
    },
    {
        title: 'Dr. Stone_ Ryusui',
        cover: 'images/favorites/Dr. Stone_ Ryusui/cover.webp',
        summary: 'Focus on the charismatic Ryusui and sea adventures.',
        episodes: 4,
        genre: ['Adventure', 'Comedy'],
        thoughts: 'Lighthearted and entertaining.'
    },
    {
        title: 'Dr. Stone_ Science Future',
        cover: 'images/favorites/Dr. Stone_ Science Future/cover.webp',
        summary: 'New inventions shape the path of civilization.',
        episodes: 10,
        genre: ['Adventure', 'Sci-Fi', 'Comedy'],
        thoughts: 'Smart and inspiring.'
    },
    {
        title: 'Dr. Stone_ Science Future Part 2',
        cover: 'images/favorites/Dr. Stone_ Science Future Part 2/cover.webp',
        summary: 'Continuation of scientific breakthroughs.',
        episodes: 10,
        genre: ['Adventure', 'Sci-Fi', 'Comedy'],
        thoughts: 'Keeps the momentum going.'
    },
    {
        title: 'Dr. Stone_ Stone Wars',
        cover: 'images/favorites/Dr. Stone_ Stone Wars/cover.webp',
        summary: 'Battle between kingdoms using science as weapons.',
        episodes: 11,
        genre: ['Adventure', 'Sci-Fi', 'Action'],
        thoughts: 'Epic scientific battles.'
    },
    {
        title: 'Evangelion_ 1.0 You Are (Not) Alone',
        cover: 'images/favorites/Evangelion_ 1.0 You Are (Not) Alone/cover.webp',
        summary: 'Shinji begins piloting Eva to fight mysterious Angels.',
        episodes: 1,
        genre: ['Mecha', 'Drama'],
        thoughts: 'Classic mecha introduction.'
    },
    {
        title: 'Evangelion_ 2.0 You Can (Not) Advance',
        cover: 'images/favorites/Evangelion_ 2.0 You Can (Not) Advance/cover.webp',
        summary: 'Shinji faces stronger threats and personal dilemmas.',
        episodes: 1,
        genre: ['Mecha', 'Drama'],
        thoughts: 'Darker and more complex.'
    },
    {
        title: 'Evangelion_ 3.0 You Can (Not) Redo',
        cover: 'images/favorites/Evangelion_ 3.0 You Can (Not) Redo/cover.webp',
        summary: 'The world changes drastically; Shinji must cope.',
        episodes: 1,
        genre: ['Mecha', 'Drama'],
        thoughts: 'Emotionally intense.'
    },
    {
        title: 'Evangelion_ 3.0+1.0 Thrice Upon a Time',
        cover: 'images/favorites/Evangelion_ 3.0+1.0 Thrice Upon a Time/cover.webp',
        summary: 'Conclusion of the Evangelion saga.',
        episodes: 1,
        genre: ['Mecha', 'Drama'],
        thoughts: 'Epic, satisfying ending.'
    },
    {
        title: 'Haikyu!!',
        cover: 'images/favorites/Haikyu!!/cover.webp',
        summary: 'High school volleyball team aims for the top.',
        episodes: 25,
        genre: ['Sports', 'Comedy', 'Drama'],
        thoughts: 'Exciting matches with great character growth.'
    },
    {
        title: 'Haikyu!! 3rd Season',
        cover: 'images/favorites/Haikyu!! 3rd Season/cover.webp',
        summary: 'Karasuno faces new rivals with stronger determination.',
        episodes: 10,
        genre: ['Sports', 'Comedy', 'Drama'],
        thoughts: 'Intense games and character development.'
    },
    {
        title: 'Haikyu!! Movie_ The Dumpster Battle',
        cover: 'images/favorites/Haikyu!! Movie_ The Dumpster Battle/cover.webp',
        summary: 'Compilation of the thrilling matches.',
        episodes: 1,
        genre: ['Sports', 'Comedy', 'Drama'],
        thoughts: 'Great recap and fun for fans.'
    },
    {
        title: 'Haikyu!! The Movie_ Battle of Concepts',
        cover: 'images/favorites/Haikyu!! The Movie_ Battle of Concepts/cover.webp',
        summary: 'Focus on strategies and teamwork.',
        episodes: 1,
        genre: ['Sports', 'Comedy', 'Drama'],
        thoughts: 'Insightful and fun.'
    },
    {
        title: 'Haikyu!! The Movie_ Talent and Sense',
        cover: 'images/favorites/Haikyu!! The Movie_ Talent and Sense/cover.webp',
        summary: 'Highlights of skills and growth.',
        episodes: 1,
        genre: ['Sports', 'Comedy', 'Drama'],
        thoughts: 'Inspiring and well-animated.'
    },
    {
        title: 'Haikyu!! To the Top',
        cover: 'images/favorites/Haikyu!! To the Top/cover.webp',
        summary: 'Karasuno aims for nationals again.',
        episodes: 25,
        genre: ['Sports', 'Comedy', 'Drama'],
        thoughts: 'Exciting and emotional.'
    },
    {
        title: 'Haikyu!! To the Top 2nd-cour',
        cover: 'images/favorites/Haikyu!! To the Top 2nd-cour/cover.webp',
        summary: 'Continuation of the national tournament.',
        episodes: 13,
        genre: ['Sports', 'Comedy', 'Drama'],
        thoughts: 'Thrilling and satisfying.'
    },
    {
        title: 'Orb_ On the Movements of the Earth',
        cover: 'images/favorites/Orb_ On the Movements of the Earth/cover.webp',
        summary: 'Educational series on Earth’s motions.',
        episodes: 1,
        genre: ['Educational', 'Documentary'],
        thoughts: 'Informative and interesting.'
    },
    {
        title: 'Re_ZERO -Starting Life in Another World-',
        cover: 'images/favorites/Re_ZERO -Starting Life in Another World-/cover.webp',
        summary: 'Subaru struggles with time loops.',
        episodes: 50,
        genre: ['Fantasy', 'Drama'],
        thoughts: 'Intense and emotional.'
    },
    {
        title: "Re_ZERO -Starting Life In Another World- Director's Cut",
        cover: 'images/favorites/Re_ZERO -Starting Life In Another World- Director\'s Cut/cover.webp',
        summary: 'Extended version with additional scenes.',
        episodes: 1,
        genre: ['Fantasy', 'Drama'],
        thoughts: 'More depth and detail.'
    },
    {
        title: 'Re_ZERO -Starting Life in Another World- Memory Snow',
        cover: 'images/favorites/Re_ZERO -Starting Life in Another World- Memory Snow/cover.webp',
        summary: 'Side story focusing on character relationships.',
        episodes: 1,
        genre: ['Fantasy', 'Drama', 'Romance'],
        thoughts: 'Heartwarming and fun.'
    },
    {
        title: 'Re_ZERO -Starting Life in Another World- Season 2',
        cover: 'images/favorites/Re_ZERO -Starting Life in Another World- Season 2/cover.webp',
        summary: 'The story deepens with new challenges.',
        episodes: 25,
        genre: ['Fantasy', 'Drama'],
        thoughts: 'Dark and gripping.'
    },
    {
        title: 'Re_ZERO -Starting Life in Another World- Season 2 Part 2',
        cover: 'images/favorites/Re_ZERO -Starting Life in Another World- Season 2 Part 2/cover.webp',
        summary: 'Continuation of Subaru’s struggle.',
        episodes: 25,
        genre: ['Fantasy', 'Drama'],
        thoughts: 'Intense and emotional.'
    },
    {
        title: 'Re_ZERO -Starting Life in Another World- Season 3',
        cover: 'images/favorites/Re_ZERO -Starting Life in Another World- Season 3/cover.webp',
        summary: 'New adventures and threats emerge.',
        episodes: 25,
        genre: ['Fantasy', 'Drama'],
        thoughts: 'Exciting continuation.'
    },
    {
        title: 'The Disappearance of Haruhi Suzumiya',
        cover: 'images/favorites/The Disappearance of Haruhi Suzumiya/cover.webp',
        summary: 'Haruhi disappears, and Kyon must solve the mystery.',
        episodes: 1,
        genre: ['Comedy', 'Sci-Fi', 'Romance'],
        thoughts: 'Emotional and well-paced.'
    },
    {
        title: 'The Eminence in Shadow',
        cover: 'images/favorites/The Eminence in Shadow/cover.webp',
        summary: 'A boy acts as a shadow mastermind in a fantasy world.',
        episodes: 20,
        genre: ['Action', 'Comedy', 'Fantasy'],
        thoughts: 'Funny and over-the-top.'
    },
    {
        title: 'The Melancholy of Haruhi Suzumiya',
        cover: 'images/favorites/The Melancholy of Haruhi Suzumiya/cover.webp',
        summary: 'High school life with a mysterious girl disrupting reality.',
        episodes: 14,
        genre: ['Comedy', 'Sci-Fi', 'Slice of Life'],
        thoughts: 'Classic, quirky, and fun.'
    },
    {
        title: 'The Melancholy of Haruhi Suzumiya Season 2',
        cover: 'images/favorites/The Melancholy of Haruhi Suzumiya Season 2/cover.webp',
        summary: 'Continuation of the strange events at North High.',
        episodes: 14,
        genre: ['Comedy', 'Sci-Fi', 'Slice of Life'],
        thoughts: 'Clever and engaging.'
    },
    {
        title: 'Fullmetal Alchemist_ Brotherhood',
        cover: 'images/favorites/Fullmetal Alchemist_ Brotherhood/cover.webp',
        summary: 'Two brothers seek the Philosopher’s Stone to restore their bodies.',
        episodes: 64,
        genre: ['Action', 'Adventure', 'Fantasy'],
        thoughts: 'Perfect balance of story, action, and emotion.'
    }
];


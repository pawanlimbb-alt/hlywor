document.addEventListener('DOMContentLoaded', () => {
    // Hand-picked mostly unique or signature abilities and their owners
    const abilityQuiz = [
        { name: 'Shedinja', ability: 'Wonder Guard', hint: 'Only super-effective moves can hit this Pokémon.' },
        { name: 'Arceus', ability: 'Multitype', hint: 'Changes type to match the held Plate.' },
        { name: 'Silvally', ability: 'RKS System', hint: 'Changes type to match the held Memory.' },
        { name: 'Zoroark', ability: 'Illusion', hint: 'Appears as the last Pokémon in the party until damaged.' },
        { name: 'Mimikyu', ability: 'Disguise', hint: 'Takes no damage from the first hit by hiding.' },
        { name: 'Aegislash', ability: 'Stance Change', hint: 'Switches between offensive and defensive forms.' },
        { name: 'Minior', ability: 'Shields Down', hint: 'Shell breaks at low HP, changing form.' },
        { name: 'Wishiwashi', ability: 'Schooling', hint: 'Becomes a stronger form at higher levels of HP.' },
        { name: 'Komala', ability: 'Comatose', hint: 'Always considered asleep; immune to other status conditions.' },
        { name: 'Zygarde', ability: 'Power Construct', hint: 'Transforms into Complete Forme at low HP.' },
        { name: 'Cramorant', ability: 'Gulp Missile', hint: 'Spits out prey when hit after Surf or Dive.' },
        { name: 'Eiscue', ability: 'Ice Face', hint: 'Ice head breaks on physical hit, then reforms in hail/snow.' },
        { name: 'Morpeko', ability: 'Hunger Switch', hint: 'Cycles between Full Belly and Hangry Mode each turn.' },
        { name: 'Greninja', ability: 'Battle Bond', hint: 'Transforms after knocking out a foe (originally to Ash-Greninja).'},
        { name: 'Darmanitan', ability: 'Zen Mode', hint: 'Changes form at low HP (original form).'},
        { name: 'Palafin', ability: 'Zero to Hero', hint: 'Transforms into Hero Form after switching out.' },
        { name: 'Gholdengo', ability: 'Good as Gold', hint: 'Completely immune to status moves.' },
        { name: 'Tatsugiri', ability: 'Commander', hint: 'Hides inside Dondozo’s mouth to power it up.' },
        { name: 'Pecharunt', ability: 'Poison Puppeteer', hint: 'Automatically confuses poisoned targets.' },
        { name: 'Ogerpon', ability: 'Embody Aspect', hint: 'Changes mask and form to alter type and stats.' },

        // ✅ Missing comma fixed above
        { name: 'Tapu Lele', ability: 'Psychic Surge', hint: 'Automatically generates Psychic Terrain when entering battle.' },
        { name: 'Solgaleo', ability: 'Full Metal Body', hint: 'Prevents its stats from being lowered by opponents.' },
        { name: 'Lunala', ability: 'Shadow Shield', hint: 'Takes less damage when it is at full HP.' },
        { name: 'Necrozma', ability: 'Prism Armor', hint: 'Reduces damage from super-effective attacks.' },
        { name: 'Zacian', ability: 'Intrepid Sword', hint: 'Boosts its Attack stat upon entering battle.' },
        { name: 'Zamazenta', ability: 'Dauntless Shield', hint: 'Boosts its Defense stat when entering battle.' },
        { name: 'Urshifu', ability: 'Unseen Fist', hint: 'Its contact moves can hit through Protect/Detect.' },
        { name: 'Calyrex', ability: 'As One', hint: 'Combines with the steed’s ability for a dual-effect trait.' },
        { name: 'Tornadus-Therian', ability: 'Regenerator', hint: 'Recovers a portion of its HP when switching out.' },
        { name: 'Urshifu-Rapid-Strike', ability: 'Surging Strikes', hint: 'Its critical hits always land when hitting consecutively.' },
        { name: 'Kyurem-White', ability: 'Turboblaze', hint: 'Its moves ignore the target’s ability.' },
        { name: 'Kyurem-Black', ability: 'Teravolt', hint: 'Its moves bypass the target’s ability just like Turboblaze.' },
        { name: 'Great Tusk', ability: 'Protosynthesis', hint: 'Boosts its highest stat under harsh sunlight or with Booster Energy.' },
        { name: 'Iron Bundle', ability: 'Quark Drive', hint: 'Boosts its highest stat on Electric Terrain or with Booster Energy.' },
        { name: 'Palafin', ability: 'Zero to Hero', hint: 'Transforms into Hero Form after switching out once.' }
    ];

    // Placeholder for empty data
    if (abilityQuiz.length < 3) {
        abilityQuiz.push({ name: 'Coming Soon', ability: '???', hint: 'More questions coming soon!' });
    }

    // Shuffle
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    shuffleArray(abilityQuiz);

    let current = 0;
    const hint = document.getElementById('ability-hint');
    const input = document.getElementById('ability-answer');
    const submit = document.getElementById('ability-submit');
    const feedback = document.getElementById('ability-feedback');

    function loadQuestion(index) {
        const q = abilityQuiz[index];
        hint.textContent = `${q.ability}: ${q.hint}`;
        input.value = '';
        input.focus();
        feedback.textContent = '';
        feedback.style.color = 'var(--text)';
    }

    function check() {
        const guess = input.value.trim().toLowerCase();
        const correct = abilityQuiz[current].name.toLowerCase();
        if (guess === correct) {
            feedback.textContent = 'Correct!';
            feedback.style.color = 'lime';
        } else {
            feedback.textContent = `Wrong! It was ${abilityQuiz[current].name}`;
            feedback.style.color = 'red';
        }
        setTimeout(() => {
            current = (current + 1) % abilityQuiz.length;
            loadQuestion(current);
        }, 1500);
    }

    submit.addEventListener('click', check);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') check();
    });

    loadQuestion(current);
});


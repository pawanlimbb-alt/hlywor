document.addEventListener('DOMContentLoaded', () => {
    // Hand-picked mostly unique or signature abilities and their owners
    const abilityQuiz = [
        { name: 'Shedinja', ability: 'Wonder Guard', hint: 'Only supereffective moves can hit this Pokémon.' },
        { name: 'Arceus', ability: 'Multitype', hint: 'Changes type to match the held Plate.' },
        { name: 'Aegislash', ability: 'Stance Change', hint: 'Switches between offensive and defensive forms.' },
        { name: 'Mimikyu', ability: 'Disguise', hint: 'Takes no damage from the first hit by hiding.' },
        { name: 'Zoroark', ability: 'Illusion', hint: 'Appears as the last Pokémon in the party until damaged.' },
        { name: 'Castform', ability: 'Forecast', hint: 'Changes form based on the weather.' },
        { name: 'Kecleon', ability: 'Color Change', hint: 'Changes type to the type of the move it was hit by.' },
        { name: 'Wishiwashi', ability: 'Schooling', hint: 'Becomes a stronger form at higher levels of HP.' },
        { name: 'Komala', ability: 'Comatose', hint: 'Always considered asleep; immune to other status conditions.' },
        { name: 'Minior', ability: 'Shields Down', hint: 'Shell breaks at low HP, changing form.' },
        { name: 'Zygarde', ability: 'Power Construct', hint: 'Transforms into Complete Forme at low HP.' },
        { name: 'Darmanitan', ability: 'Zen Mode', hint: 'Changes form at low HP (original form).'},
        { name: 'Silvally', ability: 'RKS System', hint: 'Changes type to match the held Memory.' },
        { name: 'Cramorant', ability: 'Gulp Missile', hint: 'Spits out prey when hit after Surf or Dive.' },
        { name: 'Eiscue', ability: 'Ice Face', hint: 'Ice head breaks on physical hit, then reforms in hail/snow.' },
        { name: 'Morpeko', ability: 'Hunger Switch', hint: 'Cycles between Full Belly and Hangry Mode each turn.' },
        { name: 'Greninja', ability: 'Battle Bond', hint: 'Transforms after knocking out a foe (originally to Ash-Greninja).'},
        { name: 'Passimian', ability: 'Receiver', hint: 'Inherits the Ability of a defeated ally in doubles.' },
        { name: 'Tsareena', ability: 'Queenly Majesty', hint: 'Prevents priority moves from affecting allies.' }
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




document.addEventListener('DOMContentLoaded', () => {
    // Curated unique/signature moves and their owners
    const moveQuiz = [
        { name: 'Arceus', move: 'Judgment', hint: 'Legendary Normal-type move that changes type with Plate held.' },
        { name: 'Pikachu', move: 'Volt Tackle', hint: 'This recoil Electric move can only be learned by a certain mascot and its family.' },
        { name: 'Decidueye', move: 'Spirit Shackle', hint: 'A Ghost arrow move that prevents foes from switching out.' },
        { name: 'Zygarde', move: 'Thousand Arrows', hint: 'Unique Ground move that hits Flying types, exclusive to the Order Pokémon.' },
        { name: 'Eevee', move: 'Extreme Evoboost', hint: 'A status move granting huge stat boosts, performed by a normal-type that evolves into many types.' },
        { name: 'Greninja', move: 'Water Shuriken', hint: 'A fast priority multi-hit Water move (Gen 6+) known as a signature for a ninja Pokémon.' },
        { name: 'Marshadow', move: 'Spectral Thief', hint: 'Steals stat boosts after damaging. Only shadowy mythical can use it.' },
        { name: 'Melmetal', move: 'Double Iron Bash', hint: 'A Steel-type move that can make foes flinch. Only this Galar mythic has it.' },
        { name: 'Urshifu', move: 'Wicked Blow', hint: 'A guaranteed critical hit move, exclusive to one form of the Single Strike Style Pokémon.' },
        { name: 'Zarude', move: 'Jungle Healing', hint: 'Heals both the monkey and its allies, exclusive to a mythical vine-swinger.' }
    ];
    // Placeholder if not enough
    if (moveQuiz.length < 3) moveQuiz.push({ name: 'Coming Soon', move: '???', hint: 'More questions coming soon!' });

    // Shuffle
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    shuffleArray(moveQuiz);

    let current = 0;
    const hint = document.getElementById('move-hint');
    const input = document.getElementById('move-answer');
    const submit = document.getElementById('move-submit');
    const feedback = document.getElementById('move-feedback');

    function loadQuestion(index) {
        const q = moveQuiz[index];
        hint.textContent = `${q.move}: ${q.hint}`;
        input.value = '';
        input.focus();
        feedback.textContent = '';
        feedback.style.color = 'var(--text)';
    }

    function check() {
        const guess = input.value.trim().toLowerCase();
        const correct = moveQuiz[current].name.toLowerCase();
        if (guess === correct) {
            feedback.textContent = 'Correct!';
            feedback.style.color = 'lime';
        } else {
            feedback.textContent = `Wrong! It was ${moveQuiz[current].name}`;
            feedback.style.color = 'red';
        }
        setTimeout(() => {
            current = (current + 1) % moveQuiz.length;
            loadQuestion(current);
        }, 1500);
    }

    submit.addEventListener('click', check);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') check();
    });
    loadQuestion(current);
});


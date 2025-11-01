document.addEventListener('DOMContentLoaded', () => {
    // Curated unique/signature moves and their owners
    const moveQuiz = [
    { name: 'Arceus', move: 'Judgment', hint: 'Legendary Normal-type move that changes type with the Plate held.' },
    { name: 'Pikachu', move: 'Volt Tackle', hint: 'Powerful recoil Electric move, exclusive to Pikachu and its family.' },
    { name: 'Decidueye', move: 'Spirit Shackle', hint: 'Ghost arrow move that prevents foes from escaping.' },
    { name: 'Zygarde', move: 'Thousand Arrows', hint: 'Unique Ground move that can hit Flying-types and Levitate users.' },
    { name: 'Eevee', move: 'Extreme Evoboost (Z-Move)', hint: 'Z-Move that greatly raises all stats using the power of its evolutions.' },
    { name: 'Greninja', move: 'Water Shuriken', hint: 'Priority multi-hit Water move linked to Greninja and Ash-Greninja.' },
    { name: 'Marshadow', move: 'Spectral Thief', hint: 'Steals target’s stat boosts before dealing Ghost-type damage.' },
    { name: 'Melmetal', move: 'Double Iron Bash', hint: 'Two-hit Steel move that may flinch, exclusive to Melmetal.' },
    { name: 'Urshifu (Single Strike)', move: 'Wicked Blow', hint: 'Always lands a critical hit; exclusive to Single Strike Urshifu.' },
    { name: 'Urshifu (Rapid Strike)', move: 'Surging Strikes', hint: 'Multi-hit Water move that always crits; exclusive to Rapid Strike Urshifu.' },
    { name: 'Zarude', move: 'Jungle Healing', hint: 'Heals the user and allies; exclusive to the mythical jungle Pokémon.' },
    { name: 'Zacian', move: 'Behemoth Blade', hint: 'Fairy-type move that doubles power against Dynamax foes.' },
    { name: 'Zamazenta', move: 'Behemoth Bash', hint: 'Steel-type move that doubles power versus Dynamax foes.' },
    { name: 'Calyrex (Shadow Rider)', move: 'Astral Barrage', hint: 'Devastating Ghost-type move unique to Shadow Rider Calyrex.' },
    { name: 'Calyrex (Ice Rider)', move: 'Glacial Lance', hint: 'Powerful Ice-type attack exclusive to Ice Rider Calyrex.' },
    { name: 'Mimikyu', move: 'Let’s Snuggle Forever (Z-Move)', hint: 'Z-Move upgrade of Play Rough; exclusive to Mimikyu.' },
    { name: 'Kommo-o', move: 'Clangorous Soulblaze (Z-Move)', hint: 'Exclusive Dragon-type Z-Move that raises all stats after hitting.' },
    { name: 'Giratina', move: 'Shadow Force', hint: 'Ghost move that makes it vanish, then strike through Protect.' },
    { name: 'Hoopa (Unbound)', move: 'Hyperspace Fury', hint: 'Dark-type move that bypasses Protect; exclusive to Hoopa-Unbound.' },
    { name: 'Volcanion', move: 'Steam Eruption', hint: 'Water/Fire hybrid move that may burn; exclusive to Volcanion.' },
    { name: 'Zeraora', move: 'Plasma Fists', hint: 'Electric punch that turns Normal moves into Electric type that turn.' },
    { name: 'Obstagoon', move: 'Obstruct', hint: 'Protect-like move that harshly lowers Defense if touched.' },
    { name: 'Kingambit', move: 'Kowtow Cleave', hint: 'Dark-type move that never misses, exclusive to Kingambit.' },
    { name: 'Pecharunt', move: 'Malignant Chain', hint: 'Exclusive Poison-type move that badly poisons the target.' },
    { name: 'Ogerpon', move: 'Ivy Cudgel', hint: 'Mask-dependent move that changes type; exclusive to Ogerpon.' },
    { name: 'Enamorus', move: 'Springtide Storm', hint: 'Fairy-type storm move exclusive to Enamorus.' },
    { name: 'Basculegion', move: 'Wave Crash', hint: 'High-recoil Water-type move unique to Hisuian Basculegion.' },
    { name: 'Kleavor', move: 'Stone Axe', hint: 'Rock-type move that sets up splinters after striking.' },
    { name: 'Sneasler', move: 'Dire Claw', hint: 'Poison move that may inflict sleep, paralysis, or poison.' },
    { name: 'Annihilape', move: 'Rage Fist', hint: 'Gets stronger each time it’s hit; exclusive to Annihilape.' },
    { name: 'Gholdengo', move: 'Make It Rain', hint: 'Steel-type move that lowers user’s Sp. Atk and gives money after battle.' },
    { name: 'Palafin', move: 'Jet Punch', hint: 'Priority Water-type move exclusive to Hero Form Palafin.' },
    { name: 'Terapagos', move: 'Tera Starstorm', hint: 'Changes type and power when fully Terastalized; unique to Terapagos.' },
    { name: 'Rayquaza', move: 'Dragon Ascent', hint: 'Flying-type move that enables Mega Evolution; exclusive to Rayquaza.' },
    { name: 'Lugia', move: 'Aeroblast', hint: 'Flying-type move with high critical-hit ratio; exclusive to Lugia.' },
    { name: 'Ho-Oh', move: 'Sacred Fire', hint: 'Fire-type move with a high chance to burn; exclusive to Ho-Oh.' },
    { name: 'Dialga', move: 'Roar of Time', hint: 'Dragon-type move requiring recharge; unique to Dialga.' },
    { name: 'Palkia', move: 'Spacial Rend', hint: 'Dragon-type move with a high crit ratio; exclusive to Palkia.' },
    { name: 'Darkrai', move: 'Dark Void', hint: 'Puts all adjacent foes to sleep; exclusive to Darkrai.' },
    { name: 'Regieleki', move: 'Thunder Cage', hint: 'Traps target in electricity; unique to Regieleki.' },
    { name: 'Regidrago', move: 'Dragon Energy', hint: 'Powerful Dragon move that scales with remaining HP.' },
    { name: 'Magearna', move: 'Fleur Cannon', hint: 'Devastating Fairy-type beam that lowers Sp. Atk; unique to Magearna.' },
    { name: 'Eternatus', move: 'Eternabeam', hint: 'Ultimate Dragon-type move requiring recharge; exclusive to Eternatus.' },
    { name: 'Tapu Koko', move: 'Guardian of Alola (Z-Move)', hint: 'Z-Move that reduces target’s HP by 75%; shared among Tapus.' },
    { name: 'Tapu Lele', move: 'Guardian of Alola (Z-Move)', hint: 'Shared Tapu-exclusive Z-Move that uses island spirit power.' },
    { name: 'Tapu Bulu', move: 'Guardian of Alola (Z-Move)', hint: 'Z-Move shared among the four Tapu guardians.' },
    { name: 'Tapu Fini', move: 'Guardian of Alola (Z-Move)', hint: 'Fairy Z-Move shared by all Tapus, reducing foe HP drastically.' },
    { name: 'Shaymin (Sky Forme)', move: 'Seed Flare', hint: 'Grass-type move that may sharply lower the foe’s Sp. Def.' },
    { name: 'Hoopa (Confined)', move: 'Hyperspace Hole', hint: 'Psychic-type move that bypasses Protect; exclusive to Hoopa Confined.' },
    { name: 'Regigigas', move: 'Crush Grip', hint: 'Normal move that deals more damage the higher the target’s HP.' },
    { name: 'Kyurem (Black)', move: 'Freeze Shock', hint: 'Two-turn Ice move that may paralyze; exclusive to Black Kyurem.' },
    { name: 'Kyurem (White)', move: 'Ice Burn', hint: 'Two-turn Ice move that may burn; exclusive to White Kyurem.' },
    { name: 'Xerneas', move: 'Geomancy', hint: 'Charges first turn, then boosts Sp. Atk, Sp. Def, and Speed next turn.' },
    { name: 'Yveltal', move: 'Oblivion Wing', hint: 'Flying move that restores HP equal to 75% of damage dealt.' },
    { name: 'Solgaleo', move: 'Sunsteel Strike', hint: 'Steel-type move that ignores the target’s Ability; exclusive to Solgaleo.' },
    { name: 'Necrozma', move: 'Photon Geyser', hint: 'Psychic move using the higher of Attack or Sp. Atk; signature of Necrozma.' },
    { name: 'Kommo-o', move: 'Clanging Scales', hint: 'Dragon-type sound move that lowers the user’s Defense after use.' },
    { name: 'Zygarde', move: 'Core Enforcer', hint: 'Dragon-type move that nullifies the target’s Ability if it moves first.' },
    { name: 'Dhelmise', move: 'Anchor Shot', hint: 'Steel-type move that traps the target so it cannot switch out.' },
    { name: 'Toxtricity', move: 'Overdrive', hint: 'Electric-type sound move that hits all opponents; signature of Toxtricity.' },
    { name: 'Dragapult', move: 'Dragon Darts', hint: 'Dragon-type move that hits twice; both darts target the same or different foes.' },
    { name: 'Rillaboom', move: 'Drum Beating', hint: 'Grass-type move that lowers the target’s Speed after hitting.' },
    { name: 'Inteleon', move: 'Snipe Shot', hint: 'Water-type move that ignores moves like Follow Me and redirection effects.' },
    { name: 'Cinderace', move: 'Pyro Ball', hint: 'Powerful Fire-type move that may burn; exclusive to Cinderace.' },
    { name: 'Corviknight', move: 'Steel Beam', hint: 'Powerful Steel-type recoil move; used notably by Corviknight.' },
    { name: 'Appletun', move: 'Apple Acid', hint: 'Grass-type move that always lowers the target’s Sp. Def; signature of Appletun.' },
    { name: 'Flapple', move: 'Grav Apple', hint: 'Physical Grass move that lowers the target’s Defense; signature of Flapple.' },
    { name: 'Centiskorch', move: 'Fire Lash', hint: 'Fire-type move that lowers the target’s Defense after dealing damage.' },
    { name: 'Coalossal', move: 'Tar Shot', hint: 'Rock-type move that lowers Speed and makes the target weak to Fire.' },
    { name: 'Hatterene', move: 'Magic Powder', hint: 'Psychic-type move that changes the target’s type to Psychic.' },
    { name: 'Goodra (Hisuian)', move: 'Shelter', hint: 'Steel-type move that raises Defense; signature of Hisuian Goodra.' },
    { name: 'Eternatus', move: 'Dynamax Cannon', hint: 'Dragon-type beam that doubles damage against Dynamax Pokémon.' },
    { name: 'Ursaluna (Bloodmoon)', move: 'Blood Moon', hint: 'Powerful Normal-type move that can’t be used consecutively.' },
    { name: 'Gouging Fire', move: 'Burning Bulwark', hint: 'Fire-type defense move that damages contact attackers.' },
    { name: 'Raging Bolt', move: 'Thunderclap', hint: 'Electric-type priority move; exclusive to Raging Bolt.' },
    { name: 'Iron Boulder', move: 'Tachyon Cutter', hint: 'Steel-type double-hit slicing move; unique to Iron Boulder.' },
    { name: 'Iron Crown', move: 'Tachyon Cutter', hint: 'Variant of the double-hitting Steel move; exclusive to Iron Crown.' },
    { name: 'Genesect', move: 'Techno Blast', hint: 'Normal-type move changing type based on Drive held; exclusive to Genesect.' }
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



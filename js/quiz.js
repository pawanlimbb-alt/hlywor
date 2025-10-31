document.addEventListener('DOMContentLoaded', () => {
    // Example Pokédex entries (you already have your full list)
    const quizData = [
     { "name": "Bulbasaur", "entry": "There is a seed on its back right from the day this Pokémon is born. The seed slowly grows larger." },
  { "name": "Ivysaur", "entry": "There is a large plant on this Pokémon's back. The plant is said to be a living thing." },
  { "name": "Venusaur", "entry": "The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight." },
  { "name": "Charmander", "entry": "The flame that burns at the tip of its tail is an indication of its health. The flame wavers when Charmander is happy, and blazes when it is enraged." },
  { "name": "Charmeleon", "entry": "When it swings its burning tail, it elevates the temperature to unbearably high levels." },
  { "name": "Charizard", "entry": "Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally." },
  { "name": "Squirtle", "entry": "Shoots water at prey while in the water. It is a skilled swimmer." },
  { "name": "Wartortle", "entry": "Often hides in water to stalk unwary prey. For swimming fast, it moves its ears to maintain balance." },
  { "name": "Blastoise", "entry": "A brutal Pokémon with pressurized water jets on its shell. They are used for high-speed tackles." },
  { "name": "Caterpie", "entry": "Its short feet are tipped with suction pads that enable it to tirelessly climb slopes and walls." },
  { "name": "Metapod", "entry": "This Pokémon is vulnerable to attack while its shell is soft, exposing its weak and tender body." },
  { "name": "Butterfree", "entry": "Its wings, covered with toxic powder, are used to scatter the powder for defense." },
  { "name": "Weedle", "entry": "Often found in forests, eating leaves. It has a sharp stinger on its head." },
  { "name": "Kakuna", "entry": "Almost incapable of moving, this Pokémon can only harden its shell to protect itself." },
  { "name": "Beedrill", "entry": "Flies at high speed and attacks using its stingers on its forelegs and tail." },
  { "name": "Pidgey", "entry": "A common sight in forests and woods. It flaps its wings at ground level to kick up blinding sand." },
  { "name": "Pidgeotto", "entry": "This Pokémon is full of vitality. It constantly flies around its large territory in search of prey." },
  { "name": "Pidgeot", "entry": "This Pokémon is known for its speed. It can fly at Mach 2 speed." },
  { "name": "Rattata", "entry": "The hair on its back is stiff and bristles if it feels threatened." },
  { "name": "Raticate", "entry": "Its hind feet are webbed. They act as flippers, so it can swim in rivers." },
  { "name": "Spearow", "entry": "It has a very loud cry. It is very quick to anger." },
  { "name": "Fearow", "entry": "It has the stamina to fly all day on its broad wings." },
  { "name": "Ekans", "entry": "Moves silently and stealthily. Eats the eggs of birds, such as Pidgey and Spearow." },
  { "name": "Arbok", "entry": "It is rumored that the ferocious warning markings on its belly differ from area to area." },
  { "name": "Pikachu", "entry": "When several of these Pokémon gather, their electricity could build and cause lightning storms." },
  { "name": "Raichu", "entry": "Its long tail serves as a ground to protect it from its own high-voltage power." },
  { "name": "Sandshrew", "entry": "Burrows deep underground in arid locations. It can roll itself into a ball." },
  { "name": "Sandslash", "entry": "Curls up into a spiny ball when threatened. It can roll while curled up." },
  { "name": "Nidoran♀", "entry": "The horn on its head secretes a powerful venom. It is used only for defense." },
  { "name": "Nidorina", "entry": "The female's horn is shorter and blunter than the male's. It is not as dangerous." },
  { "name": "Nidoqueen", "entry": "Its body is covered with hard scales. It is capable of using powerful moves." },
  { "name": "Nidoran♂", "entry": "The larger the male's horn, the more powerful its poison." },
  { "name": "Nidorino", "entry": "It is quick to anger. It charges at foes with a powerful horn." },
  { "name": "Nidoking", "entry": "Its horn contains venom. If it stabs an enemy, the poison will cause paralysis." },
  { "name": "Clefairy", "entry": "Its magical and cute appeal has many admirers. It is rare and found only in certain areas." },
  { "name": "Clefable", "entry": "It is said that happiness will come to those who see a gathering of Clefairy dancing under a full moon." },
  { "name": "Vulpix", "entry": "At the time of birth, it has six gorgeous tails. The tails become more beautiful as it grows older." },
  { "name": "Ninetales", "entry": "It is said to live for a thousand years. It can freely control fire." },
  { "name": "Jigglypuff", "entry": "It captivates foes with its huge, round eyes, then lulls them to sleep with its soothing melody." },
  { "name": "Wigglytuff", "entry": "It uses its cute looks to get its way. It has a very strong voice." },
  { "name": "Zubat", "entry": "It emits ultrasonic cries while flying. They act as a sonar used to check for objects in its way." },
  { "name": "Golbat", "entry": "It attacks in a stealthy manner. Its sharp fangs are used to suck blood." },
  { "name": "Oddish", "entry": "During the day, it stays in the shade. At night, it is active and searches for food." },
  { "name": "Gloom", "entry": "The stench from its pistil is so atrocious that it can make people faint." },
  { "name": "Vileplume", "entry": "The pistil of its flower is said to be as toxic as poison ivy." },
  { "name": "Paras", "entry": "Burrows under the ground to gnaw on tree roots. The mushrooms on its back grow by drawing nutrients from the bug." },
  { "name": "Parasect", "entry": "The mushrooms on its back grow by drawing nutrients from the bug. They are used to release spores." },
  { "name": "Venonat", "entry": "Its large eyes can see in the dark. It is often found in forests and caves." },
  { "name": "Venomoth", "entry": "The wings are covered with fine scales. They can cause allergic reactions." },
  { "name": "Diglett", "entry": "It lives about a yard underground where it feeds on plant roots. It sometimes appears above ground." },
  { "name": "Dugtrio", "entry": "A team of Diglett triplets that can burrow through the ground at high speed." },
  { "name": "Meowth", "entry": "Adores round objects. It wanders the streets on a nightly basis to look for dropped loose change." },
  { "name": "Persian", "entry": "The favorite Pokémon of many businessmen. It is said to have been the first Pokémon bred as a pet." },
  { "name": "Psyduck", "entry": "While lulling about, it may exhibit odd behavior. It is known to suffer from frequent headaches." },
  { "name": "Golduck", "entry": "It is said to be able to swim at high speeds. It can also use psychic powers." },
  { "name": "Mankey", "entry": "It is known to become wildly enraged without cause. It is said to be the most violent Pokémon." },
  { "name": "Primeape", "entry": "It is known to become wildly enraged without cause. It is said to be the most violent Pokémon." },
  { "name": "Growlithe", "entry": "A Pokémon with a friendly nature. It doesn't like to fight." },
  { "name": "Arcanine", "entry": "A legendary Pokémon in the Pokémon world. It is said to have been a loyal companion to many trainers." },
  { "name": "Poliwag", "entry": "Its body is mostly water. It is known to swim in rivers and ponds." },
  { "name": "Poliwhirl", "entry": "It has a spiral pattern on its belly. It is known to use water-based attacks." },
  { "name": "Politoed", "entry": "A Pokémon with a friendly nature. It doesn't like to fight." },
  { "name": "Abra", "entry": "It sleeps for 18 hours a day. It uses telepathy to communicate." },
  { "name": "Kadabra", "entry": "It uses its psychic powers to read minds and predict the future." },
  { "name": "Alakazam", "entry": "It has an IQ of 5000. It can perform telekinesis and other psychic feats." },
  { "name": "Machop", "entry": "It trains by lifting heavy boulders. It is known for its strength." },
  { "name": "Machoke", "entry": "It is known to be able to lift heavy objects. It is often seen training." },
  { "name": "Machamp", "entry": "It has four muscular arms and is known for its strength." }, 
    ];

    // Shuffle function to randomize quiz questions
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Shuffle questions at the start
    shuffleArray(quizData);

    // Placeholder for empty or small data
    if (quizData.length < 3) {
        quizData.push({ name: "Coming Soon", entry: "More questions coming soon!" });
    }

    let currentIndex = 0;

    const pokedexEntry = document.getElementById('pokedex-entry');
    const answerInput = document.getElementById('answer-input');
    const submitButton = document.getElementById('submit-button');
    const feedback = document.getElementById('feedback');

    function loadEntry(index) {
        const data = quizData[index];
        pokedexEntry.textContent = data.entry;
        answerInput.value = "";
        answerInput.focus();
        feedback.textContent = "";
    }

    function checkAnswer() {
        const answer = answerInput.value.trim().toLowerCase();
        const correct = quizData[currentIndex].name.toLowerCase();

        if(answer === correct) {
            feedback.textContent = "Correct!";
            feedback.style.color = "lime";
        } else {
            feedback.textContent = `Wrong! The correct answer was ${quizData[currentIndex].name}`;
            feedback.style.color = "red";
        }

        // Move to next Pokémon after 1.5s
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % quizData.length;
            loadEntry(currentIndex);
        }, 1500);
    }

    submitButton.addEventListener('click', checkAnswer);
    answerInput.addEventListener('keydown', (e) => {
        if(e.key === "Enter") checkAnswer();
    });

    // Load first entry
    loadEntry(currentIndex);
});


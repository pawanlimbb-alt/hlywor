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
     { "name": "Bellsprout", "entry": "Prefers hot and humid places. It ensnares tiny insects with its vines and devours them." },
  { "name": "Weepinbell", "entry": "It spits out poison powder to immobilize prey, then swallows it whole." },
  { "name": "Victreebel", "entry": "Attracts prey with a sweet aroma. The prey is melted with strong acid." },
  { "name": "Tentacool", "entry": "Drifts aimlessly in the sea. It stings anything that touches it." },
  { "name": "Tentacruel", "entry": "Its 80 tentacles can stretch and contract freely. They wrap around prey and immobilize it." },
  { "name": "Geodude", "entry": "Found in fields and mountains. Mistaking them for boulders is a common mistake." },
  { "name": "Graveler", "entry": "Rolls down slopes to move. It crushes anything in its path without slowing down." },
  { "name": "Golem", "entry": "Its body can withstand dynamite blasts without damage. It sheds its skin once a year." },
  { "name": "Ponyta", "entry": "Its hooves are ten times harder than diamonds. It can run at incredible speeds." },
  { "name": "Rapidash", "entry": "Very competitive, it races across plains at speeds over 150 mph." },
  { "name": "Slowpoke", "entry": "Incredibly slow and dopey. It takes five seconds for it to feel pain when under attack." },
  { "name": "Slowbro", "entry": "A Shellder biting its tail made it more intelligent. It rarely releases the bite." },
  { "name": "Magnemite", "entry": "Uses magnetism to stay airborne. It feeds on electricity from power plants." },
  { "name": "Magneton", "entry": "Formed by several Magnemite linking together. It causes radio interference." },
  { "name": "Farfetch’d", "entry": "Always carries a stick. It uses it to strike and defend itself skillfully." },
  { "name": "Doduo", "entry": "Its two heads never sleep at the same time. One head always keeps watch." },
  { "name": "Dodrio", "entry": "An evolved form of Doduo with three heads that represent joy, anger, and sorrow." },
  { "name": "Seel", "entry": "Loves freezing-cold conditions. It swims easily in frigid waters." },
  { "name": "Dewgong", "entry": "Its entire body is covered in a pure white, glossy coat. It sleeps on ice floes." },
  { "name": "Grimer", "entry": "Appears in filthy areas. It feeds on waste and industrial sludge." },
  { "name": "Muk", "entry": "Thickly covered in sludge. Touching it can cause severe poisoning." },
  { "name": "Shellder", "entry": "It clamps tightly onto anything. Its shell is harder than diamond." },
  { "name": "Cloyster", "entry": "Its shell is extremely hard. Nothing can break through it." },
  { "name": "Gastly", "entry": "A being made of gas. It can envelop an opponent and put it to sleep." },
  { "name": "Haunter", "entry": "Hiding in the dark, it stares at its victim, causing chills to run down the spine." },
  { "name": "Gengar", "entry": "It hides in shadows and absorbs heat. Its presence causes the temperature to drop suddenly." },
  { "name": "Onix", "entry": "Burrows at high speed through the ground, leaving tunnels in its wake." },
  { "name": "Drowzee", "entry": "If you sleep by it often, it will eventually begin to eat your dreams." },
  { "name": "Hypno", "entry": "Carries a pendulum and hypnotizes opponents to control them." },
  { "name": "Krabby", "entry": "Its pincers are not only powerful weapons but also tools to dig and climb." },
  { "name": "Kingler", "entry": "Its enormous claw has 10,000-horsepower strength, but it is unwieldy." },
  { "name": "Voltorb", "entry": "It looks just like a Poké Ball. It is known to explode when touched." },
  { "name": "Electrode", "entry": "Stores electrical energy inside. It explodes at the slightest shock." },
  { "name": "Exeggcute", "entry": "Even though it consists of six eggs, it uses telepathy to stay connected." },
  { "name": "Exeggutor", "entry": "Each of its three heads thinks independently. It is called the walking jungle." },
  { "name": "Cubone", "entry": "Wears the skull of its deceased mother. It cries at night out of loneliness." },
  { "name": "Marowak", "entry": "Overcame its sadness and grew tough. It fights using a bone as a weapon." },
  { "name": "Hitmonlee", "entry": "Its legs freely stretch and contract. It delivers devastating kicks." },
  { "name": "Hitmonchan", "entry": "Its punches are blindingly fast. It can punch through concrete walls." },
  { "name": "Lickitung", "entry": "Its tongue is twice the length of its body. Anything it licks gets covered in a sticky saliva." },
  { "name": "Koffing", "entry": "It stores several kinds of toxic gas inside its body and releases them when threatened." },
  { "name": "Weezing", "entry": "Lives and grows by inhaling poisonous gases. It loves the smell of garbage." },
  { "name": "Rhyhorn", "entry": "Runs in a straight line, smashing anything in its path. Its brain is small but tough." },
  { "name": "Rhydon", "entry": "Stands on its hind legs and uses its drill horn to crush solid rock." },
  { "name": "Chansey", "entry": "Lays nutritious eggs daily. It shares them with injured Pokémon." },
  { "name": "Tangela", "entry": "Its body is wrapped in blue vines. The vines move independently." },
  { "name": "Kangaskhan", "entry": "Raises its baby in its pouch. It never lets anyone near its child." },
  { "name": "Horsea", "entry": "If it senses danger, it sprays ink and hides behind rocks." },
  { "name": "Seadra", "entry": "Its sharp spines can pierce through thick shells. It moves by fluttering its fins rapidly." },
  { "name": "Goldeen", "entry": "Its dorsal fin acts like a drill. It is a strong swimmer." },
  { "name": "Seaking", "entry": "In the autumn spawning season, it can be seen swimming powerfully up rivers." },
  { "name": "Staryu", "entry": "Even if its body is torn, it can regenerate as long as the core remains intact." },
  { "name": "Starmie", "entry": "Its core glows in seven colors. It emits radio waves into the night sky." },
  { "name": "Mr. Mime", "entry": "It creates invisible walls using its miming motions. It is a master of pantomime." },
  { "name": "Scyther", "entry": "Moves so fast it appears as a blur. It slashes enemies with its razor-sharp scythes." },
  { "name": "Jynx", "entry": "It speaks in a strange language and dances rhythmically to communicate." },
  { "name": "Electabuzz", "entry": "It loves to feed on electricity. It often gathers near power plants during storms." },
  { "name": "Magmar", "entry": "Born in volcanoes, its body temperature is nearly 2,200°F." },
  { "name": "Pinsir", "entry": "Grips prey with its pincers until it is torn apart. It thrives in warm climates." },
  { "name": "Tauros", "entry": "When it charges, it whips itself with its tails to increase its rage." },
  { "name": "Magikarp", "entry": "Famous for being weak. It flops around aimlessly but is hardy and enduring." },
  { "name": "Gyarados", "entry": "Rarely seen in the wild. Its temper is legendary, and it razes cities in rage." },
  { "name": "Lapras", "entry": "A gentle soul that ferries people across seas. It can understand human speech." },
  { "name": "Ditto", "entry": "It can transform into anything it sees. However, it sometimes gets details wrong." },
  { "name": "Eevee", "entry": "Possesses an unstable genetic makeup that allows it to evolve into many forms." },
  { "name": "Vaporeon", "entry": "Its cells are similar to water molecules. It can melt into water to hide." },
  { "name": "Jolteon", "entry": "It accumulates negative ions in the atmosphere to generate lightning bolts." },
  { "name": "Flareon", "entry": "Its body stores flame sacs. When it exhales, the air temperature reaches 1,700°F." },
  { "name": "Porygon", "entry": "A Pokémon made completely out of programming code. It can move freely in cyberspace." },
  { "name": "Omanyte", "entry": "An ancient Pokémon revived from a fossil. It uses its tentacles to swim." },
  { "name": "Omastar", "entry": "Its heavy shell made it slow, which may have caused its extinction." },
  { "name": "Kabuto", "entry": "A Pokémon that was regenerated from a fossil. It hides under sand to avoid attack." },
  { "name": "Kabutops", "entry": "Its sharp claws are used to slice prey before draining their fluids." },
  { "name": "Aerodactyl", "entry": "A prehistoric Pokémon that ruled the skies. Its shriek echoes from ancient times." },
  { "name": "Snorlax", "entry": "Very lazy. It eats and sleeps all day. It only becomes active after eating 400 pounds of food." },
  { "name": "Articuno", "entry": "A legendary bird that controls ice. When it flaps its wings, snow falls." },
  { "name": "Zapdos", "entry": "A legendary bird that controls electricity. It lives in thunderclouds." },
  { "name": "Moltres", "entry": "A legendary bird that embodies fire. Its appearance signals the coming of spring." },
  { "name": "Dratini", "entry": "Long thought to be mythical, it sheds its skin as it grows larger." },
  { "name": "Dragonair", "entry": "Its crystalline orbs are said to give it control over the weather." },
  { "name": "Dragonite", "entry": "It can circle the globe in just 16 hours. It is kindhearted and helps shipwrecked people." },
  { "name": "Mewtwo", "entry": "Created from Mew’s DNA. It possesses incredible psychic power and a savage heart." },
  { "name": "Mew", "entry": "So rare that it is said to be a mirage. It can learn any move." },
  { "name": "Chikorita", "entry": "Its leaf emits a soothing aroma. It loves to bask in the sunlight." },
  { "name": "Bayleef", "entry": "The scent of its spicy leaves energizes those nearby." },
  { "name": "Meganium", "entry": "The fragrance of its flower soothes and calms emotions." },
  { "name": "Cyndaquil", "entry": "It is timid and curls into a ball. The flames on its back flare when it is startled." },
  { "name": "Quilava", "entry": "It protects itself by emitting flames and creating heat waves to repel attackers." },
  { "name": "Typhlosion", "entry": "When angered, it creates explosions by igniting the air around it." },
  { "name": "Totodile", "entry": "It has a habit of biting anything it sees. Its jaws are strong enough to crush bone." },
  { "name": "Croconaw", "entry": "Once it bites down, it never lets go until it tears apart its prey." },
  { "name": "Feraligatr", "entry": "It opens its huge jaws to intimidate foes. It can move fast despite its bulk." },
  { "name": "Sentret", "entry": "It stands on its tail to keep watch. It will not sleep if it feels unsafe." },
  { "name": "Furret", "entry": "A very quick and slender Pokémon. It can slip through narrow spaces easily." },
  { "name": "Hoothoot", "entry": "It always tilts its head in rhythm with the rotation of the earth." },
  { "name": "Noctowl", "entry": "Its eyes can see through the darkest night. It silently swoops down on prey." },
  { "name": "Ledyba", "entry": "It communicates using scent and touch. It lives in large groups." },
  { "name": "Ledian", "entry": "The stars on its back glow brighter the more starlight it absorbs." },
  { "name": "Spinarak", "entry": "It spins webs that are almost invisible. It waits motionless for prey." },
  { "name": "Ariados", "entry": "It traps prey with its silk, then binds and poisons it with fangs." },
  { "name": "Crobat", "entry": "It flits around silently using four wings. It can fly all night without rest." },
  { "name": "Chinchou", "entry": "It sends positive and negative electrical charges from its antennae to communicate." },
  { "name": "Lanturn", "entry": "The light it emits deep underwater is said to be the reason for its nickname, 'The Deep-Sea Star'." },
  { "name": "Pichu", "entry": "It stores electricity in its body, but it shocks itself when overcharged." },
  { "name": "Cleffa", "entry": "Often seen dancing joyfully under starlit skies. It is said to come from fallen stars." },
  { "name": "Igglybuff", "entry": "Its body is soft and squishy like a marshmallow. It loves to sing." },
  { "name": "Togepi", "entry": "It is said to share happiness with those who take care of it." },
  { "name": "Togetic", "entry": "It is filled with joy and flies around spreading happiness." },
  { "name": "Natu", "entry": "Because it cannot fly very well, it stays still and observes everything around it." },
  { "name": "Xatu", "entry": "It is said to see both the past and the future at once." },
  { "name": "Mareep", "entry": "Its fluffy wool builds static electricity. Touching it can give a shock." },
  { "name": "Flaaffy", "entry": "Its fleece stores electricity better than wool, allowing it to light up its surroundings." },
  { "name": "Ampharos", "entry": "Its bright tail acts as a beacon seen far across the sea." },
  { "name": "Bellossom", "entry": "When the heavy rainfall season ends, it opens its petals and dances joyfully in the sun." },
  { "name": "Marill", "entry": "Its tail is filled with oil that keeps it buoyant in the water." },
  { "name": "Azumarill", "entry": "It can make air bubbles to wrap its young and protect them underwater." },
  { "name": "Sudowoodo", "entry": "Although it looks like a tree, it dislikes water and hides during rain." },
  { "name": "Politoed", "entry": "Its croaking voice signals leadership to Poliwag and Poliwhirl groups." },
  { "name": "Hoppip", "entry": "It is carried away by the wind. It links leaves with others to avoid being blown off." },
  { "name": "Skiploom", "entry": "Its bloom opens and closes depending on the temperature." },
  { "name": "Jumpluff", "entry": "It drifts on seasonal winds, spreading cotton spores across the world." },
  { "name": "Aipom", "entry": "It uses its tail like a hand. It is skilled at picking fruits and stealing them." },
  { "name": "Sunkern", "entry": "It drinks dew at dawn and hides from the sun all day to conserve energy." },
  { "name": "Sunflora", "entry": "It converts sunlight into energy. In the morning, it faces the sun and blooms." },
  { "name": "Yanma", "entry": "Its large eyes can see all around. It never misses prey even in fast flight." },
  { "name": "Wooper", "entry": "It lives in both water and on land, keeping its body coated with a slimy film." },
  { "name": "Quagsire", "entry": "It’s carefree and bumping into things doesn’t bother it at all." },
  { "name": "Espeon", "entry": "Its fine fur acts as a sensor. It can predict its trainer’s emotions." },
  { "name": "Umbreon", "entry": "When it is angered, it secretes poisonous sweat from its pores." },
  { "name": "Murkrow", "entry": "It is feared as a bringer of bad luck. It loves shiny objects." },
  { "name": "Slowking", "entry": "A Shellder bite made it vastly intelligent. It can solve complex problems easily." },
  { "name": "Misdreavus", "entry": "Loves to scare people by wailing in the dark and pulling their hair." },
  { "name": "Unown", "entry": "Each form resembles a letter. It is said they communicate through telepathy." },
  { "name": "Wobbuffet", "entry": "It never attacks first. It endures hits and strikes back twice as hard." },
  { "name": "Girafarig", "entry": "Its tail has a small head of its own that never sleeps." },
  { "name": "Pineco", "entry": "It hangs from trees and explodes if disturbed." },
  { "name": "Forretress", "entry": "It hides its body inside its shell. The shell opens only to attack." },
  { "name": "Dunsparce", "entry": "It burrows backward into the ground using its tail drill." },
  { "name": "Gligar", "entry": "It glides silently using the membrane on its legs, attacking from above." },
  { "name": "Steelix", "entry": "It is said to live deeper underground than any other Pokémon." },
  { "name": "Snubbull", "entry": "Despite its fierce face, it is very timid and affectionate." },
  { "name": "Granbull", "entry": "Once it bites down, it never lets go. It is loyal and protective." },
  { "name": "Qwilfish", "entry": "It inflates its body and shoots poison spikes at enemies." },
  { "name": "Scizor", "entry": "Its steel-hard body resists most attacks. It threatens foes by raising its pincers." },
  { "name": "Shuckle", "entry": "Stores berries in its shell. Over time, the berries turn into juice." },
  { "name": "Heracross", "entry": "With its mighty horn, it tosses foes over its head with ease." },
  { "name": "Sneasel", "entry": "Sneaks into nests to steal eggs. It uses sharp claws for climbing and combat." },
  { "name": "Teddiursa", "entry": "It licks its paws to enjoy honey it collects daily." },
  { "name": "Ursaring", "entry": "It lives in forests, marking trees to remember where food is buried." },
  { "name": "Slugma", "entry": "Its body is made of magma. If it cools, it hardens and crumbles." },
  { "name": "Magcargo", "entry": "Its shell is made of hardened magma. It glows red-hot when angered." },
  { "name": "Swinub", "entry": "It rubs its snout on the ground to find food buried under snow." },
  { "name": "Piloswine", "entry": "Covered in thick fur, it endures freezing temperatures easily." },
  { "name": "Corsola", "entry": "Its branches break easily, but they regrow quickly underwater." },
  { "name": "Remoraid", "entry": "It shoots water jets with incredible accuracy to knock down prey." },
  { "name": "Octillery", "entry": "It clings to rocks with its tentacles. Its ink blasts confuse enemies." },
  { "name": "Delibird", "entry": "Carries food in its tail and shares it with others." },
  { "name": "Mantine", "entry": "It swims gracefully with Remoraid clinging to its fins." },
  { "name": "Skarmory", "entry": "Its wings are sharp as blades. They become stronger with each battle." },
  { "name": "Houndour", "entry": "Communicates with others using howls. It hunts in packs." },
  { "name": "Houndoom", "entry": "Its fiery breath causes lasting pain. The flames are said to come from hell." },
  { "name": "Kingdra", "entry": "Lives deep in the sea, creating whirlpools as it moves." },
  { "name": "Phanpy", "entry": "It loves playing in mud and water. Its trunk is strong enough to lift an adult human." },
  { "name": "Donphan", "entry": "It attacks by curling into a ball and rolling at high speed." },
  { "name": "Porygon2", "entry": "An upgraded version of Porygon. It can now move freely in cyberspace." },
  { "name": "Stantler", "entry": "The shape of its antlers can make people lose focus and see illusions." },
  { "name": "Smeargle", "entry": "Marks its territory with paint from its tail. No two Smeargle paint alike." },
  { "name": "Tyrogue", "entry": "It is always bursting with energy and loves to spar with others." },
  { "name": "Hitmontop", "entry": "Spins like a top to attack and dodge. Its style is elegant yet deadly." },
  { "name": "Smoochum", "entry": "Constantly checks its reflection. It kisses everything to learn its texture." },
  { "name": "Elekid", "entry": "It generates electricity by spinning its arms. It loves thunderstorms." },
  { "name": "Magby", "entry": "It breathes out 600°F flames. Its body glows when it is healthy." },
  { "name": "Miltank", "entry": "It produces milk daily. The milk is sweet and nutritious." },
  { "name": "Blissey", "entry": "Its heart is filled with compassion. It senses sadness and shares happiness." },
  { "name": "Raikou", "entry": "Embodies the speed of lightning. It races across the land in thunderclouds." },
  { "name": "Entei", "entry": "A volcano erupts each time it roars. It embodies the passion of magma." },
  { "name": "Suicune", "entry": "Purifies dirty water with a single touch. It embodies the grace of flowing water." },
  { "name": "Larvitar", "entry": "It eats soil and grows by consuming the earth beneath mountains." },
  { "name": "Pupitar", "entry": "Its body is as hard as steel. It can move by jetting compressed gas." },
  { "name": "Tyranitar", "entry": "It is so strong it can bring down entire mountains to make its nest." },
  { "name": "Lugia", "entry": "It dwells deep in the ocean. Its wings can cause storms that last for 40 days." },
  { "name": "Ho-Oh", "entry": "Its feathers glow in seven colors. It is said to bring eternal happiness." },
  { "name": "Celebi", "entry": "A mythical Pokémon that travels through time, bringing peace wherever it goes." }

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


/**
 * Bar Charades - A fun acting game for bar parties
 * Teams alternate acting out bar-themed prompts while being timed
 */

// Game State - Exposed to window for testing
window.gameState = {
    teamCount: 2,
    teams: [],
    currentTeamIndex: 0,
    currentRound: 0,
    turnDuration: 60,
    timeRemaining: 60,
    timerInterval: null,
    currentPrompt: null,
    isDoubleTrouble: false,
    promptPool: [],
    usedPrompts: []
};

// Alias for internal use
const gameState = window.gameState;

// Bar-themed Charades Prompts
const PROMPT_POOL = [
    {
        id: 'prompt1',
        text: 'Mixing a fancy cocktail',
        icon: '🍸',
        hint: 'Bartender action',
        category: 'bartending'
    },
    {
        id: 'prompt2',
        text: 'Cleaning beer glasses',
        icon: '🍺',
        hint: 'Bar maintenance',
        category: 'bartending'
    },
    {
        id: 'prompt3',
        text: 'Pouring a perfect draft beer',
        icon: '🍻',
        hint: 'Bartender skill',
        category: 'bartending'
    },
    {
        id: 'prompt4',
        text: 'Checking ID at the door',
        icon: '🆔',
        hint: 'Bouncer duty',
        category: 'security'
    },
    {
        id: 'prompt5',
        text: 'Dancing on the bar',
        icon: '💃',
        hint: 'Party action',
        category: 'party'
    },
    {
        id: 'prompt6',
        text: 'Singing karaoke badly',
        icon: '🎤',
        hint: 'Entertainment',
        category: 'entertainment'
    },
    {
        id: 'prompt7',
        text: 'Doing a beer pong shot',
        icon: '🏓',
        hint: 'Bar game',
        category: 'games'
    },
    {
        id: 'prompt8',
        text: 'Slipping on a wet floor',
        icon: '⚠️',
        hint: 'Bar mishap',
        category: 'accident'
    },
    {
        id: 'prompt9',
        text: 'Opening a bottle with teeth',
        icon: '🦷',
        hint: 'Bad idea',
        category: 'trick'
    },
    {
        id: 'prompt10',
        text: 'Carrying too many drinks',
        icon: '🍹',
        hint: 'Waitstaff challenge',
        category: 'service'
    },
    {
        id: 'prompt11',
        text: 'Arm wrestling at the bar',
        icon: '💪',
        hint: 'Competition',
        category: 'games'
    },
    {
        id: 'prompt12',
        text: 'Flirting with the bartender',
        icon: '😘',
        hint: 'Social interaction',
        category: 'social'
    },
    {
        id: 'prompt13',
        text: 'Taking a group selfie',
        icon: '📸',
        hint: 'Social media moment',
        category: 'social'
    },
    {
        id: 'prompt14',
        text: 'Spinning bottles to play truth or dare',
        icon: '🔄',
        hint: 'Classic bar game',
        category: 'games'
    },
    {
        id: 'prompt15',
        text: 'Trying to flag down a busy bartender',
        icon: '👋',
        hint: 'Getting attention',
        category: 'service'
    },
    {
        id: 'prompt16',
        text: 'Squeezing lime into a drink',
        icon: '🍋',
        hint: 'Drink preparation',
        category: 'bartending'
    },
    {
        id: 'prompt17',
        text: 'Breaking up a bar fight',
        icon: '🥊',
        hint: 'Bouncer action',
        category: 'security'
    },
    {
        id: 'prompt18',
        text: 'Spilling a drink on someone',
        icon: '💦',
        hint: 'Accident',
        category: 'accident'
    },
    {
        id: 'prompt19',
        text: 'Doing a shot and making a face',
        icon: '🥴',
        hint: 'Reaction',
        category: 'drinking'
    },
    {
        id: 'prompt20',
        text: 'Trying to read the menu in dim lighting',
        icon: '📱',
        hint: 'Bar ambiance problem',
        category: 'experience'
    },
    {
        id: 'prompt21',
        text: 'Shaking a cocktail shaker',
        icon: '🧊',
        hint: 'Bartender technique',
        category: 'bartending'
    },
    {
        id: 'prompt22',
        text: 'Cutting up fruit for garnishes',
        icon: '🍊',
        hint: 'Bar prep',
        category: 'bartending'
    },
    {
        id: 'prompt23',
        text: 'Wiping down the bar counter',
        icon: '🧽',
        hint: 'Cleaning duty',
        category: 'bartending'
    },
    {
        id: 'prompt24',
        text: 'Tipping the bartender generously',
        icon: '💵',
        hint: 'Bar etiquette',
        category: 'social'
    },
    {
        id: 'prompt25',
        text: 'Playing darts at the dartboard',
        icon: '🎯',
        hint: 'Classic bar game',
        category: 'games'
    },
    {
        id: 'prompt26',
        text: 'Choosing a song on the jukebox',
        icon: '🎵',
        hint: 'Music selection',
        category: 'entertainment'
    },
    {
        id: 'prompt27',
        text: 'High-fiving after a win',
        icon: '🙌',
        hint: 'Celebration',
        category: 'celebration'
    },
    {
        id: 'prompt28',
        text: 'Chomping on bar snacks',
        icon: '🥜',
        hint: 'Munchies',
        category: 'food'
    },
    {
        id: 'prompt29',
        text: 'Closing the tab and paying',
        icon: '💳',
        hint: 'End of night',
        category: 'service'
    },
    {
        id: 'prompt30',
        text: 'Calling a taxi or rideshare',
        icon: '🚕',
        hint: 'Responsible exit',
        category: 'leaving'
    },

    // 70 New Expansion Prompts
    {
        id: 'prompt31',
        text: 'Ordering a round of shots for the group',
        icon: '🥃',
        hint: 'Group drinking',
        category: 'drinking'
    },
    {
        id: 'prompt32',
        text: 'Blowing out birthday candles on a bar cake',
        icon: '🎂',
        hint: 'Celebration',
        category: 'celebration'
    },
    {
        id: 'prompt33',
        text: 'Sneaking a peek at someone else\'s hand in cards',
        icon: '🃏',
        hint: 'Cheeky move',
        category: 'games'
    },
    {
        id: 'prompt34',
        text: 'Catching a napkin blown by the fan',
        icon: '🌬️',
        hint: 'Bar breeze',
        category: 'experience'
    },
    {
        id: 'prompt35',
        text: 'Getting sprayed by a shaken soda bottle',
        icon: '💥',
        hint: 'Unexpected soaking',
        category: 'accident'
    },
    {
        id: 'prompt36',
        text: 'Convincing a friend to do one more round',
        icon: '🍺',
        hint: 'Peer pressure',
        category: 'social'
    },
    {
        id: 'prompt37',
        text: 'Showing a magic trick with a coin',
        icon: '🪙',
        hint: 'Bar entertainment',
        category: 'entertainment'
    },
    {
        id: 'prompt38',
        text: 'Sitting on a broken barstool',
        icon: '🪑',
        hint: 'Wobbly seat',
        category: 'accident'
    },
    {
        id: 'prompt39',
        text: 'Proposing a toast while standing on a chair',
        icon: '🥂',
        hint: 'Dramatic toast',
        category: 'celebration'
    },
    {
        id: 'prompt40',
        text: 'Whispering gossip into someone\'s ear',
        icon: '🤫',
        hint: 'Secret sharing',
        category: 'social'
    },
    {
        id: 'prompt41',
        text: 'Catching a pool ball that went off the table',
        icon: '🎱',
        hint: 'Quick reflexes',
        category: 'games'
    },
    {
        id: 'prompt42',
        text: 'Trying to pull a stuck cork from a wine bottle',
        icon: '🍾',
        hint: 'Stubborn cork',
        category: 'bartending'
    },
    {
        id: 'prompt43',
        text: 'Lighting sparklers inside the bar',
        icon: '✨',
        hint: 'Festive moment',
        category: 'celebration'
    },
    {
        id: 'prompt44',
        text: 'Trying to find your table in a dark bar',
        icon: '🔦',
        hint: 'Navigation challenge',
        category: 'experience'
    },
    {
        id: 'prompt45',
        text: 'Playing the slot machine',
        icon: '🎰',
        hint: 'Lucky spin',
        category: 'games'
    },
    {
        id: 'prompt46',
        text: 'Asking someone to move so you can squeeze past',
        icon: '↔️',
        hint: 'Tight squeeze',
        category: 'social'
    },
    {
        id: 'prompt47',
        text: 'Stacking empty cups into a tower',
        icon: '🏗️',
        hint: 'Creative stacking',
        category: 'games'
    },
    {
        id: 'prompt48',
        text: 'Getting glitter from a cocktail all over your face',
        icon: '💫',
        hint: 'Sparkly mishap',
        category: 'accident'
    },
    {
        id: 'prompt49',
        text: 'Teaching a line dance to the group',
        icon: '🕺',
        hint: 'Dance lesson',
        category: 'entertainment'
    },
    {
        id: 'prompt50',
        text: 'Accidentally bumping into someone carrying drinks',
        icon: '💧',
        hint: 'Collision course',
        category: 'accident'
    },
    {
        id: 'prompt51',
        text: 'Opening a tab at the bar',
        icon: '💳',
        hint: 'Setting up the night',
        category: 'service'
    },
    {
        id: 'prompt52',
        text: 'Doing limbo under the bar rail',
        icon: '🌴',
        hint: 'Flexible fun',
        category: 'party'
    },
    {
        id: 'prompt53',
        text: 'Spotting a celebrity at the bar',
        icon: '⭐',
        hint: 'Famous face',
        category: 'social'
    },
    {
        id: 'prompt54',
        text: 'Blowing on dice before rolling',
        icon: '🎲',
        hint: 'Superstitious gambler',
        category: 'games'
    },
    {
        id: 'prompt55',
        text: 'Getting the hiccups mid-sentence',
        icon: '🫁',
        hint: 'Interruption',
        category: 'drinking'
    },
    {
        id: 'prompt56',
        text: 'Trying to get a bartender\'s attention by waving money',
        icon: '💵',
        hint: 'Desperate thirst',
        category: 'service'
    },
    {
        id: 'prompt57',
        text: 'Attempting a bar trick that goes completely wrong',
        icon: '❌',
        hint: 'Failed trick',
        category: 'trick'
    },
    {
        id: 'prompt58',
        text: 'Accepting a free birthday shot you didn\'t want',
        icon: '🎁',
        hint: 'Polite acceptance',
        category: 'drinking'
    },
    {
        id: 'prompt59',
        text: 'Finding money in your coat pocket at the end of the night',
        icon: '💰',
        hint: 'Happy surprise',
        category: 'celebration'
    },
    {
        id: 'prompt60',
        text: 'Reading the specials board on the wall',
        icon: '📋',
        hint: 'Menu inspection',
        category: 'experience'
    },
    {
        id: 'prompt61',
        text: 'Competing in a bar trivia round',
        icon: '🧠',
        hint: 'Brain battle',
        category: 'games'
    },
    {
        id: 'prompt62',
        text: 'Doing a celebratory body roll on the dance floor',
        icon: '💃',
        hint: 'Victory dance',
        category: 'party'
    },
    {
        id: 'prompt63',
        text: 'Losing your voice from shouting over music',
        icon: '🔇',
        hint: 'Too loud to talk',
        category: 'experience'
    },
    {
        id: 'prompt64',
        text: 'Signing a bar tab on someone else\'s behalf',
        icon: '✍️',
        hint: 'Sneaky signing',
        category: 'service'
    },
    {
        id: 'prompt65',
        text: 'Getting a free round from the bartender',
        icon: '🎉',
        hint: 'Bartender\'s gift',
        category: 'celebration'
    },
    {
        id: 'prompt66',
        text: 'Accidentally sitting on someone else\'s jacket',
        icon: '🧥',
        hint: 'Awkward seat',
        category: 'accident'
    },
    {
        id: 'prompt67',
        text: 'Pouring beer into a frozen mug',
        icon: '🧊',
        hint: 'Chilled serve',
        category: 'bartending'
    },
    {
        id: 'prompt68',
        text: 'Setting up a photo booth at the bar',
        icon: '📸',
        hint: 'Memories in the making',
        category: 'entertainment'
    },
    {
        id: 'prompt69',
        text: 'Arguing over what song to put on the jukebox',
        icon: '🎵',
        hint: 'Music standoff',
        category: 'entertainment'
    },
    {
        id: 'prompt70',
        text: 'Trying to read someone\'s fortune using a drink glass',
        icon: '🔮',
        hint: 'Bar mystic',
        category: 'entertainment'
    },
    {
        id: 'prompt71',
        text: 'Winning an arm wrestling match',
        icon: '🏆',
        hint: 'Bar champion',
        category: 'games'
    },
    {
        id: 'prompt72',
        text: 'Putting sunglasses on indoors to look cool',
        icon: '😎',
        hint: 'Too cool for the bar',
        category: 'social'
    },
    {
        id: 'prompt73',
        text: 'Finding the last table available in a packed bar',
        icon: '🪑',
        hint: 'Seat hunter',
        category: 'experience'
    },
    {
        id: 'prompt74',
        text: 'Dramatically tasting a cocktail and deciding it\'s perfect',
        icon: '👌',
        hint: 'Connoisseur moment',
        category: 'drinking'
    },
    {
        id: 'prompt75',
        text: 'Being challenged to a flip cup match',
        icon: '🏓',
        hint: 'Classic bar game',
        category: 'games'
    },
    {
        id: 'prompt76',
        text: 'Running into your ex at the bar',
        icon: '😬',
        hint: 'Awkward reunion',
        category: 'social'
    },
    {
        id: 'prompt77',
        text: 'Watching a sports game and reacting to a winning goal',
        icon: '⚽',
        hint: 'Sports bar moment',
        category: 'entertainment'
    },
    {
        id: 'prompt78',
        text: 'Wiping up a huge spill before the staff notices',
        icon: '🧻',
        hint: 'Quick cover-up',
        category: 'accident'
    },
    {
        id: 'prompt79',
        text: 'Trying to split the bill equally among friends',
        icon: '🧮',
        hint: 'Math challenge',
        category: 'service'
    },
    {
        id: 'prompt80',
        text: 'Carrying a cake with lit candles through a crowded bar',
        icon: '🎂',
        hint: 'Obstacle course celebration',
        category: 'celebration'
    },
    {
        id: 'prompt81',
        text: 'Loudly singing Happy Birthday to a stranger',
        icon: '🎤',
        hint: 'Enthusiastic stranger',
        category: 'celebration'
    },
    {
        id: 'prompt82',
        text: 'Being the last one to leave the bar at closing time',
        icon: '🌙',
        hint: 'Closing time hero',
        category: 'leaving'
    },
    {
        id: 'prompt83',
        text: 'Dropping a coin into a tip jar dramatically',
        icon: '🫙',
        hint: 'Generous tipper',
        category: 'social'
    },
    {
        id: 'prompt84',
        text: 'Sneaking a sip from someone else\'s cocktail',
        icon: '👀',
        hint: 'Cheeky sip',
        category: 'drinking'
    },
    {
        id: 'prompt85',
        text: 'Doing a complicated handshake with the bartender',
        icon: '🤝',
        hint: 'Secret greeting',
        category: 'bartending'
    },
    {
        id: 'prompt86',
        text: 'Solving a bar puzzle or brainteaser game',
        icon: '🧩',
        hint: 'Brain teaser',
        category: 'games'
    },
    {
        id: 'prompt87',
        text: 'Requesting a song dedication over the bar mic',
        icon: '🎙️',
        hint: 'DJ request',
        category: 'entertainment'
    },
    {
        id: 'prompt88',
        text: 'Acting out a bar dare from a dare card',
        icon: '🃏',
        hint: 'Dare challenge',
        category: 'party'
    },
    {
        id: 'prompt89',
        text: 'Pouring the perfect pint of Guinness',
        icon: '🖤',
        hint: 'Irish pour perfection',
        category: 'bartending'
    },
    {
        id: 'prompt90',
        text: 'Challenging everyone to a thumb war tournament',
        icon: '👍',
        hint: 'Mini tournament',
        category: 'games'
    },
    {
        id: 'prompt91',
        text: 'Spilling a drink and pretending it was someone else',
        icon: '😇',
        hint: 'Innocent act',
        category: 'accident'
    },
    {
        id: 'prompt92',
        text: 'Trying to make a straw wrapper snake',
        icon: '🐍',
        hint: 'Bar origami',
        category: 'trick'
    },
    {
        id: 'prompt93',
        text: 'Doing karaoke on an actual stage for the first time',
        icon: '🎤',
        hint: 'Stage fright conquered',
        category: 'entertainment'
    },
    {
        id: 'prompt94',
        text: 'Waving a lit phone flashlight at a concert in the bar',
        icon: '📱',
        hint: 'Live music moment',
        category: 'entertainment'
    },
    {
        id: 'prompt95',
        text: 'Catching a lemon slice thrown by the bartender',
        icon: '🍋',
        hint: 'Reflex test',
        category: 'trick'
    },
    {
        id: 'prompt96',
        text: 'Playing foosball with intense concentration',
        icon: '⚽',
        hint: 'Tabletop soccer',
        category: 'games'
    },
    {
        id: 'prompt97',
        text: 'Toasting with the wrong glass',
        icon: '🥤',
        hint: 'Glassware confusion',
        category: 'accident'
    },
    {
        id: 'prompt98',
        text: 'Explaining the rules of a drinking game to a newcomer',
        icon: '📖',
        hint: 'Game master',
        category: 'games'
    },
    {
        id: 'prompt99',
        text: 'Doing a dramatic exit as the last song plays',
        icon: '🚪',
        hint: 'Grand finale',
        category: 'leaving'
    },
    {
        id: 'prompt100',
        text: 'Helping a friend who has had one too many get home safely',
        icon: '🤝',
        hint: 'Good friend award',
        category: 'leaving'
    },
    {
        id: 'prompt101',
        text: 'Shaking a cocktail shaker',
        icon: '🍸',
        hint: 'Think mixology',
        category: 'bartending'
    },
    {
        id: 'prompt102',
        text: 'Pouring a perfect pint of beer',
        icon: '🍺',
        hint: 'Tilt the glass',
        category: 'bartending'
    },
    {
        id: 'prompt103',
        text: 'Slicing a lime wedge',
        icon: '🍋',
        hint: 'Garnish time',
        category: 'bartending'
    },
    {
        id: 'prompt104',
        text: 'Muddling mint leaves',
        icon: '🌿',
        hint: 'Mojito prep',
        category: 'bartending'
    },
    {
        id: 'prompt105',
        text: 'Lighting a flaming shot',
        icon: '🔥',
        hint: 'Fire safety first',
        category: 'bartending'
    },
    {
        id: 'prompt106',
        text: 'Making a layered cocktail',
        icon: '🥃',
        hint: 'Slow pour technique',
        category: 'bartending'
    },
    {
        id: 'prompt107',
        text: 'Blending a frozen margarita',
        icon: '🍹',
        hint: 'Blender needed',
        category: 'bartending'
    },
    {
        id: 'prompt108',
        text: 'Polishing a wine glass',
        icon: '🍷',
        hint: 'Sparkling clean',
        category: 'bartending'
    },
    {
        id: 'prompt109',
        text: 'Cutting fruit for garnish',
        icon: '🍊',
        hint: 'Pretty presentation',
        category: 'bartending'
    },
    {
        id: 'prompt110',
        text: 'Measuring with a jigger',
        icon: '⚖️',
        hint: 'Precise pour',
        category: 'bartending'
    },
    {
        id: 'prompt111',
        text: 'Straining a cocktail',
        icon: '🍸',
        hint: 'No ice in the glass',
        category: 'bartending'
    },
    {
        id: 'prompt112',
        text: 'Opening a wine bottle with corkscrew',
        icon: '🍾',
        hint: 'Pop goes the cork',
        category: 'bartending'
    },
    {
        id: 'prompt113',
        text: 'Tapping a beer keg',
        icon: '🍺',
        hint: 'Party time',
        category: 'bartending'
    },
    {
        id: 'prompt114',
        text: 'Making a gin and tonic',
        icon: '🫗',
        hint: 'Classic combo',
        category: 'bartending'
    },
    {
        id: 'prompt115',
        text: 'Dropping in ice cubes',
        icon: '🧊',
        hint: 'Chill it down',
        category: 'bartending'
    },
    {
        id: 'prompt116',
        text: 'Making a Manhattan cocktail',
        icon: '🥃',
        hint: 'Stirred not shaken',
        category: 'bartending'
    },
    {
        id: 'prompt117',
        text: 'Rimming a glass with salt',
        icon: '🧂',
        hint: 'Margarita essential',
        category: 'bartending'
    },
    {
        id: 'prompt118',
        text: 'Flaming an orange peel',
        icon: '🍊',
        hint: 'Fancy garnish',
        category: 'bartending'
    },
    {
        id: 'prompt119',
        text: 'Pouring a shot of tequila',
        icon: '🥃',
        hint: 'Salt lime shot',
        category: 'bartending'
    },
    {
        id: 'prompt120',
        text: 'Making a Old Fashioned',
        icon: '🍊',
        hint: 'Classic whiskey drink',
        category: 'bartending'
    },
    {
        id: 'prompt121',
        text: 'Taking a body shot',
        icon: '🥃',
        hint: 'Spring break classic',
        category: 'drinking'
    },
    {
        id: 'prompt122',
        text: 'Doing a keg stand',
        icon: '🍺',
        hint: 'Upside down drinking',
        category: 'drinking'
    },
    {
        id: 'prompt123',
        text: 'Chugging a pint',
        icon: '🍺',
        hint: 'Speed drinking',
        category: 'drinking'
    },
    {
        id: 'prompt124',
        text: 'Waterfall drinking game',
        icon: '🍺',
        hint: 'Everyone drinks',
        category: 'drinking'
    },
    {
        id: 'prompt125',
        text: 'Taking a tequila shot',
        icon: '🥃',
        hint: 'With salt and lime',
        category: 'drinking'
    },
    {
        id: 'prompt126',
        text: 'Sipping expensive champagne',
        icon: '🥂',
        hint: 'Little finger up',
        category: 'drinking'
    },
    {
        id: 'prompt127',
        text: 'Drinking through a yard glass',
        icon: '🍺',
        hint: 'Tall challenge',
        category: 'drinking'
    },
    {
        id: 'prompt128',
        text: 'Trying a mystery cocktail',
        icon: '🍹',
        hint: 'What is in it',
        category: 'drinking'
    },
    {
        id: 'prompt129',
        text: 'Spinning before a shot',
        icon: '🥃',
        hint: 'Dizzy game',
        category: 'drinking'
    },
    {
        id: 'prompt130',
        text: 'Drinking with eyes closed',
        icon: '🍺',
        hint: 'Trust exercise',
        category: 'drinking'
    },
    {
        id: 'prompt131',
        text: 'Shotgunning a can of beer',
        icon: '🍺',
        hint: 'Hole in the can',
        category: 'drinking'
    },
    {
        id: 'prompt132',
        text: 'Wine tasting sip and swirl',
        icon: '🍷',
        hint: 'Sommelier mode',
        category: 'drinking'
    },
    {
        id: 'prompt133',
        text: 'Finishing the last drop',
        icon: '🍸',
        hint: 'Empty glass',
        category: 'drinking'
    },
    {
        id: 'prompt134',
        text: 'Sneaking a sip from someone else',
        icon: '🍺',
        hint: 'Sneaky drinker',
        category: 'drinking'
    },
    {
        id: 'prompt135',
        text: 'Drinking a flaming shot',
        icon: '🔥',
        hint: 'Blow it out first',
        category: 'drinking'
    },
    {
        id: 'prompt136',
        text: 'Sipping a smoothie at the bar',
        icon: '🧃',
        hint: 'Designated driver',
        category: 'drinking'
    },
    {
        id: 'prompt137',
        text: 'Gargling with mouthwash before kissing',
        icon: '🫧',
        hint: 'Fresh breath',
        category: 'drinking'
    },
    {
        id: 'prompt138',
        text: 'Pretending to be a wine connoisseur',
        icon: '🍷',
        hint: 'Fancy sniff',
        category: 'drinking'
    },
    {
        id: 'prompt139',
        text: 'Ordering water at an open bar',
        icon: '💧',
        hint: 'Being responsible',
        category: 'drinking'
    },
    {
        id: 'prompt140',
        text: 'Downing a energy drink',
        icon: '⚡',
        hint: 'Late night fuel',
        category: 'drinking'
    },
    {
        id: 'prompt141',
        text: 'Playing beer pong',
        icon: '🏓',
        hint: 'Bounce or toss',
        category: 'games'
    },
    {
        id: 'prompt142',
        text: 'Playing pool billiards',
        icon: '🎱',
        hint: 'Rack them up',
        category: 'games'
    },
    {
        id: 'prompt143',
        text: 'Throwing darts',
        icon: '🎯',
        hint: 'Bulls eye aim',
        category: 'games'
    },
    {
        id: 'prompt144',
        text: 'Playing flip cup',
        icon: '🍺',
        hint: 'Team relay race',
        category: 'games'
    },
    {
        id: 'prompt145',
        text: 'Shuffleboard at the bar',
        icon: '🏒',
        hint: 'Slide the puck',
        category: 'games'
    },
    {
        id: 'prompt146',
        text: 'Playing foosball',
        icon: '⚽',
        hint: 'Table soccer',
        category: 'games'
    },
    {
        id: 'prompt147',
        text: 'Playing bar trivia',
        icon: '📝',
        hint: 'Quiz night',
        category: 'games'
    },
    {
        id: 'prompt148',
        text: 'Arm wrestling at the bar',
        icon: '💪',
        hint: 'Strength contest',
        category: 'games'
    },
    {
        id: 'prompt149',
        text: 'Playing Jenga with shots',
        icon: '🧱',
        hint: 'Steady hands',
        category: 'games'
    },
    {
        id: 'prompt150',
        text: 'Playing card game at bar',
        icon: '♠️',
        hint: 'Deal me in',
        category: 'games'
    },
    {
        id: 'prompt151',
        text: 'Playing ring toss game',
        icon: '💍',
        hint: 'Hook the bottle',
        category: 'games'
    },
    {
        id: 'prompt152',
        text: 'Giant Jenga tower fall',
        icon: '🧱',
        hint: 'Timber',
        category: 'games'
    },
    {
        id: 'prompt153',
        text: 'Playing cornhole bags',
        icon: '🎯',
        hint: 'Bean bag toss',
        category: 'games'
    },
    {
        id: 'prompt154',
        text: 'Spin the bottle',
        icon: '🍾',
        hint: 'Party classic',
        category: 'games'
    },
    {
        id: 'prompt155',
        text: 'Playing drunk Uno',
        icon: '🃏',
        hint: 'Draw four again',
        category: 'games'
    },
    {
        id: 'prompt156',
        text: 'Truth or dare at bar',
        icon: '🎲',
        hint: 'Pick your poison',
        category: 'games'
    },
    {
        id: 'prompt157',
        text: 'Playing quarters coin game',
        icon: '🪙',
        hint: 'Bounce it in',
        category: 'games'
    },
    {
        id: 'prompt158',
        text: 'Playing Kings card game',
        icon: '♥️',
        hint: 'Rule the table',
        category: 'games'
    },
    {
        id: 'prompt159',
        text: 'Playing never have I ever',
        icon: '🙈',
        hint: 'Drink if you did',
        category: 'games'
    },
    {
        id: 'prompt160',
        text: 'Bar bingo night',
        icon: '🔢',
        hint: 'Bingo winner',
        category: 'games'
    },
    {
        id: 'prompt161',
        text: 'Blowing up balloons for party',
        icon: '🎈',
        hint: 'Inflate and tie',
        category: 'party'
    },
    {
        id: 'prompt162',
        text: 'Planning a surprise party',
        icon: '🎉',
        hint: 'Shh keep secret',
        category: 'party'
    },
    {
        id: 'prompt163',
        text: 'Decorating a bar for birthday',
        icon: '🎂',
        hint: 'Party prep',
        category: 'party'
    },
    {
        id: 'prompt164',
        text: 'Doing the YMCA dance',
        icon: '💃',
        hint: 'Iconic moves',
        category: 'party'
    },
    {
        id: 'prompt165',
        text: 'Starting a conga line',
        icon: '🕺',
        hint: 'Follow the leader',
        category: 'party'
    },
    {
        id: 'prompt166',
        text: 'Singing Happy Birthday',
        icon: '🎂',
        hint: 'Everyone join in',
        category: 'party'
    },
    {
        id: 'prompt167',
        text: 'Opening birthday presents',
        icon: '🎁',
        hint: 'Tear it open',
        category: 'party'
    },
    {
        id: 'prompt168',
        text: 'Popping champagne for party',
        icon: '🍾',
        hint: 'Cork in the air',
        category: 'party'
    },
    {
        id: 'prompt169',
        text: 'Starting a dance-off',
        icon: '💃',
        hint: 'Show your moves',
        category: 'party'
    },
    {
        id: 'prompt170',
        text: 'Setting up a photo booth',
        icon: '📸',
        hint: 'Pose and smile',
        category: 'party'
    },
    {
        id: 'prompt171',
        text: 'Playing limbo at party',
        icon: '🏝️',
        hint: 'How low can you go',
        category: 'party'
    },
    {
        id: 'prompt172',
        text: 'Party whistle blowing',
        icon: '🎉',
        hint: 'Make some noise',
        category: 'party'
    },
    {
        id: 'prompt173',
        text: 'Putting on party hat',
        icon: '🎉',
        hint: 'Celebration time',
        category: 'party'
    },
    {
        id: 'prompt174',
        text: 'Tossing confetti',
        icon: '🎊',
        hint: 'Colorful shower',
        category: 'party'
    },
    {
        id: 'prompt175',
        text: 'Cutting the birthday cake',
        icon: '🎂',
        hint: 'Make a wish first',
        category: 'party'
    },
    {
        id: 'prompt176',
        text: 'Doing the twist dance',
        icon: '💃',
        hint: 'Sixties classic',
        category: 'party'
    },
    {
        id: 'prompt177',
        text: 'Party horn surprise',
        icon: '📯',
        hint: 'Honk honk',
        category: 'party'
    },
    {
        id: 'prompt178',
        text: 'Crowd surfing at party',
        icon: '🎉',
        hint: 'Arms up high',
        category: 'party'
    },
    {
        id: 'prompt179',
        text: 'Ending the night early',
        icon: '😴',
        hint: 'Party pooper',
        category: 'party'
    },
    {
        id: 'prompt180',
        text: 'Being the last one at party',
        icon: '🥱',
        hint: 'Last person standing',
        category: 'party'
    },
    {
        id: 'prompt181',
        text: 'Air guitar solo',
        icon: '🎸',
        hint: 'Rock star moment',
        category: 'entertainment'
    },
    {
        id: 'prompt182',
        text: 'Miming playing piano',
        icon: '🎹',
        hint: 'Tickle the ivories',
        category: 'entertainment'
    },
    {
        id: 'prompt183',
        text: 'Performing a magic trick',
        icon: '🎩',
        hint: 'Abracadabra',
        category: 'entertainment'
    },
    {
        id: 'prompt184',
        text: 'Stand-up comedy routine',
        icon: '🎤',
        hint: 'Tell me a joke',
        category: 'entertainment'
    },
    {
        id: 'prompt185',
        text: 'Doing a dramatic monologue',
        icon: '🎭',
        hint: 'All the world stage',
        category: 'entertainment'
    },
    {
        id: 'prompt186',
        text: 'Impersonating a celebrity',
        icon: '👓',
        hint: 'Famous person',
        category: 'entertainment'
    },
    {
        id: 'prompt187',
        text: 'Shadow puppet performance',
        icon: '🐦',
        hint: 'Hands on wall',
        category: 'entertainment'
    },
    {
        id: 'prompt188',
        text: 'Juggling bar bottles',
        icon: '🍾',
        hint: 'Keep them up',
        category: 'entertainment'
    },
    {
        id: 'prompt189',
        text: 'Plate spinning act',
        icon: '🍽️',
        hint: 'Circus skill',
        category: 'entertainment'
    },
    {
        id: 'prompt190',
        text: 'Fire breathing performer',
        icon: '🔥',
        hint: 'Careful now',
        category: 'entertainment'
    },
    {
        id: 'prompt191',
        text: 'Beatboxing at the bar',
        icon: '🎵',
        hint: 'Human drum machine',
        category: 'entertainment'
    },
    {
        id: 'prompt192',
        text: 'Doing a ventriloquist act',
        icon: '🪆',
        hint: 'Dummy talks',
        category: 'entertainment'
    },
    {
        id: 'prompt193',
        text: 'Mime trapped in box',
        icon: '🤐',
        hint: 'Invisible walls',
        category: 'entertainment'
    },
    {
        id: 'prompt194',
        text: 'Sword swallowing act',
        icon: '⚔️',
        hint: 'Down the throat',
        category: 'entertainment'
    },
    {
        id: 'prompt195',
        text: 'Telling ghost stories',
        icon: '👻',
        hint: 'Spooky tales',
        category: 'entertainment'
    },
    {
        id: 'prompt196',
        text: 'Doing impressions of animals',
        icon: '🐻',
        hint: 'Animal kingdom',
        category: 'entertainment'
    },
    {
        id: 'prompt197',
        text: 'Balloon animal making',
        icon: '🎈',
        hint: 'Twist and shape',
        category: 'entertainment'
    },
    {
        id: 'prompt198',
        text: 'Riding a mechanical bull',
        icon: '🤠',
        hint: 'Hold on tight',
        category: 'entertainment'
    },
    {
        id: 'prompt199',
        text: 'Doing a hula hoop act',
        icon: '⭕',
        hint: 'Keep it spinning',
        category: 'entertainment'
    },
    {
        id: 'prompt200',
        text: 'Playing air drums',
        icon: '🥁',
        hint: 'Beat the rhythm',
        category: 'entertainment'
    },
    {
        id: 'prompt201',
        text: 'Singing off-key at karaoke',
        icon: '🎤',
        hint: 'Not quite right',
        category: 'karaoke'
    },
    {
        id: 'prompt202',
        text: 'Doing the Macarena on stage',
        icon: '🕺',
        hint: '90s hit',
        category: 'karaoke'
    },
    {
        id: 'prompt203',
        text: 'Forgetting lyrics mid-song',
        icon: '🎵',
        hint: 'Blank moment',
        category: 'karaoke'
    },
    {
        id: 'prompt204',
        text: 'Belting power ballad',
        icon: '🎤',
        hint: 'Hit that note',
        category: 'karaoke'
    },
    {
        id: 'prompt205',
        text: 'Dramatic karaoke exit',
        icon: '🎤',
        hint: 'Drop the mic',
        category: 'karaoke'
    },
    {
        id: 'prompt206',
        text: 'Singing a duet with stranger',
        icon: '🎶',
        hint: 'Harmony time',
        category: 'karaoke'
    },
    {
        id: 'prompt207',
        text: 'Picking up karaoke songbook',
        icon: '📖',
        hint: 'Flip through pages',
        category: 'karaoke'
    },
    {
        id: 'prompt208',
        text: 'Requesting a specific song',
        icon: '🎵',
        hint: 'DJ take note',
        category: 'karaoke'
    },
    {
        id: 'prompt209',
        text: 'Warming up vocal cords',
        icon: '🎤',
        hint: 'La la la',
        category: 'karaoke'
    },
    {
        id: 'prompt210',
        text: 'Crowd sings the chorus',
        icon: '🎵',
        hint: 'Audience takeover',
        category: 'karaoke'
    },
    {
        id: 'prompt211',
        text: 'Doing a boy band routine',
        icon: '💿',
        hint: 'Sync the moves',
        category: 'karaoke'
    },
    {
        id: 'prompt212',
        text: 'Holding the microphone wrong',
        icon: '🎤',
        hint: 'Upside down mic',
        category: 'karaoke'
    },
    {
        id: 'prompt213',
        text: 'Karaoke stage fright',
        icon: '😰',
        hint: 'Frozen on stage',
        category: 'karaoke'
    },
    {
        id: 'prompt214',
        text: 'Singing to your crush',
        icon: '🎤',
        hint: 'Serenade moment',
        category: 'karaoke'
    },
    {
        id: 'prompt215',
        text: 'Country music karaoke twang',
        icon: '🤠',
        hint: 'Yeehaw',
        category: 'karaoke'
    },
    {
        id: 'prompt216',
        text: 'Rapping at karaoke night',
        icon: '🎤',
        hint: 'Fast word flow',
        category: 'karaoke'
    },
    {
        id: 'prompt217',
        text: 'Opera singer at karaoke',
        icon: '🎭',
        hint: 'High notes only',
        category: 'karaoke'
    },
    {
        id: 'prompt218',
        text: 'Air guitar during karaoke',
        icon: '🎸',
        hint: 'Feel the music',
        category: 'karaoke'
    },
    {
        id: 'prompt219',
        text: 'Bowing after karaoke performance',
        icon: '🎤',
        hint: 'Take a bow',
        category: 'karaoke'
    },
    {
        id: 'prompt220',
        text: 'Karaoke host introducing acts',
        icon: '🎙️',
        hint: 'Next up please',
        category: 'karaoke'
    },
    {
        id: 'prompt221',
        text: 'Getting someone\'s number at bar',
        icon: '📱',
        hint: 'Smooth operator',
        category: 'social'
    },
    {
        id: 'prompt222',
        text: 'Bumping into your ex',
        icon: '😬',
        hint: 'Awkward moment',
        category: 'social'
    },
    {
        id: 'prompt223',
        text: 'Making a new friend at bar',
        icon: '🤝',
        hint: 'Social butterfly',
        category: 'social'
    },
    {
        id: 'prompt224',
        text: 'Wing-manning for a friend',
        icon: '👋',
        hint: 'Help a pal out',
        category: 'social'
    },
    {
        id: 'prompt225',
        text: 'Buying a round of drinks',
        icon: '🍺',
        hint: 'Big spender',
        category: 'social'
    },
    {
        id: 'prompt226',
        text: 'Gossipping in bar bathroom',
        icon: '🤫',
        hint: 'Whisper circle',
        category: 'social'
    },
    {
        id: 'prompt227',
        text: 'Trying to remember a name',
        icon: '🤔',
        hint: 'Tip of tongue',
        category: 'social'
    },
    {
        id: 'prompt228',
        text: 'Introducing two strangers',
        icon: '🤝',
        hint: 'Let me connect you',
        category: 'social'
    },
    {
        id: 'prompt229',
        text: 'Taking group selfie',
        icon: '📸',
        hint: 'Everyone squeeze in',
        category: 'social'
    },
    {
        id: 'prompt230',
        text: 'Complimenting someone\'s outfit',
        icon: '👔',
        hint: 'Nice look',
        category: 'social'
    },
    {
        id: 'prompt231',
        text: 'Starting awkward conversation',
        icon: '😅',
        hint: 'Breaking the ice',
        category: 'social'
    },
    {
        id: 'prompt232',
        text: 'Leaving conversation politely',
        icon: '👋',
        hint: 'Gotta go now',
        category: 'social'
    },
    {
        id: 'prompt233',
        text: 'Helping someone who is lost',
        icon: '🗺️',
        hint: 'Let me show you',
        category: 'social'
    },
    {
        id: 'prompt234',
        text: 'Catching up with old friend',
        icon: '🤗',
        hint: 'Long time no see',
        category: 'social'
    },
    {
        id: 'prompt235',
        text: 'Flirting at the bar',
        icon: '😏',
        hint: 'Smooth moves',
        category: 'social'
    },
    {
        id: 'prompt236',
        text: 'Playing matchmaker',
        icon: '💘',
        hint: 'Cupid strikes',
        category: 'social'
    },
    {
        id: 'prompt237',
        text: 'Crowd pleaser joke',
        icon: '😂',
        hint: 'Everyone laughs',
        category: 'social'
    },
    {
        id: 'prompt238',
        text: 'Eavesdropping on conversation',
        icon: '👂',
        hint: 'Nosy neighbor',
        category: 'social'
    },
    {
        id: 'prompt239',
        text: 'Joining a group without invite',
        icon: '🚶',
        hint: 'Can I sit here',
        category: 'social'
    },
    {
        id: 'prompt240',
        text: 'Being the social glue',
        icon: '🤝',
        hint: 'Keeping everyone together',
        category: 'social'
    },
    {
        id: 'prompt241',
        text: 'Flagging down a bartender',
        icon: '🙋',
        hint: 'Over here please',
        category: 'service'
    },
    {
        id: 'prompt242',
        text: 'Paying a large bar tab',
        icon: '💳',
        hint: 'Swipe the card',
        category: 'service'
    },
    {
        id: 'prompt243',
        text: 'Splitting the bill equally',
        icon: '🧮',
        hint: 'Math time',
        category: 'service'
    },
    {
        id: 'prompt244',
        text: 'Leaving a generous tip',
        icon: '💵',
        hint: 'Big tipper',
        category: 'service'
    },
    {
        id: 'prompt245',
        text: 'Complaining about slow service',
        icon: '😤',
        hint: 'Waiting forever',
        category: 'service'
    },
    {
        id: 'prompt246',
        text: 'Sending back a wrong drink',
        icon: '↩️',
        hint: 'That is not mine',
        category: 'service'
    },
    {
        id: 'prompt247',
        text: 'Ordering for the whole table',
        icon: '📋',
        hint: 'I will handle this',
        category: 'service'
    },
    {
        id: 'prompt248',
        text: 'Carrying a tray of drinks',
        icon: '🍸',
        hint: 'Steady as she goes',
        category: 'service'
    },
    {
        id: 'prompt249',
        text: 'Wiping down the bar counter',
        icon: '🧹',
        hint: 'Clean sweep',
        category: 'service'
    },
    {
        id: 'prompt250',
        text: 'Stacking empty glasses',
        icon: '🥃',
        hint: 'Tower of glasses',
        category: 'service'
    },
    {
        id: 'prompt251',
        text: 'Taking a drink order',
        icon: '📝',
        hint: 'What will it be',
        category: 'service'
    },
    {
        id: 'prompt252',
        text: 'Checking ID at the door',
        icon: '🪪',
        hint: 'How old are you',
        category: 'service'
    },
    {
        id: 'prompt253',
        text: 'Making change for customer',
        icon: '💰',
        hint: 'Coins and bills',
        category: 'service'
    },
    {
        id: 'prompt254',
        text: 'Dealing with a spill',
        icon: '🧽',
        hint: 'Mop it up',
        category: 'service'
    },
    {
        id: 'prompt255',
        text: 'Running a happy hour special',
        icon: '🎉',
        hint: 'Discounts galore',
        category: 'service'
    },
    {
        id: 'prompt256',
        text: 'Closing out a tab',
        icon: '💳',
        hint: 'Last call math',
        category: 'service'
    },
    {
        id: 'prompt257',
        text: 'Restocking the bar fridge',
        icon: '🍺',
        hint: 'Restock duty',
        category: 'service'
    },
    {
        id: 'prompt258',
        text: 'Washing glasses behind bar',
        icon: '🚿',
        hint: 'Squeaky clean',
        category: 'service'
    },
    {
        id: 'prompt259',
        text: 'Inventory check of bottles',
        icon: '📊',
        hint: 'Count them up',
        category: 'service'
    },
    {
        id: 'prompt260',
        text: 'Handling a drink complaint',
        icon: '😤',
        hint: 'Customer unhappy',
        category: 'service'
    },
    {
        id: 'prompt261',
        text: 'Spilling drink on someone',
        icon: '😱',
        hint: 'Oh no sorry',
        category: 'accident'
    },
    {
        id: 'prompt262',
        text: 'Breaking a wine glass',
        icon: '🍷',
        hint: 'Crash and shatter',
        category: 'accident'
    },
    {
        id: 'prompt263',
        text: 'Slipping on wet floor',
        icon: '🫠',
        hint: 'Watch your step',
        category: 'accident'
    },
    {
        id: 'prompt264',
        text: 'Knocking over a bar stool',
        icon: '💺',
        hint: 'Timber',
        category: 'accident'
    },
    {
        id: 'prompt265',
        text: 'Dropping a tray of drinks',
        icon: '🍸',
        hint: 'Crash landing',
        category: 'accident'
    },
    {
        id: 'prompt266',
        text: 'Accidentally texting ex',
        icon: '📱',
        hint: 'Wrong person sent',
        category: 'accident'
    },
    {
        id: 'prompt267',
        text: 'Spilling nachos everywhere',
        icon: '🫙',
        hint: 'Cheesy mess',
        category: 'accident'
    },
    {
        id: 'prompt268',
        text: 'Walking into glass door',
        icon: '🚪',
        hint: 'Ouch that hurts',
        category: 'accident'
    },
    {
        id: 'prompt269',
        text: 'Falling off bar stool',
        icon: '💺',
        hint: 'Bottom meets floor',
        category: 'accident'
    },
    {
        id: 'prompt270',
        text: 'Spitting out a bad drink',
        icon: '🤢',
        hint: 'That was awful',
        category: 'accident'
    },
    {
        id: 'prompt271',
        text: 'Getting drink splashed on you',
        icon: '💦',
        hint: 'Instant shower',
        category: 'accident'
    },
    {
        id: 'prompt272',
        text: 'Phone falling in drink',
        icon: '📱',
        hint: 'Not waterproof',
        category: 'accident'
    },
    {
        id: 'prompt273',
        text: 'Tripping over someone',
        icon: '🫠',
        hint: 'Tangled feet',
        category: 'accident'
    },
    {
        id: 'prompt274',
        text: 'Spilling hot coffee on lap',
        icon: '☕',
        hint: 'That is burning',
        category: 'accident'
    },
    {
        id: 'prompt275',
        text: 'Accidentally starting a fight',
        icon: '😳',
        hint: 'Did not mean that',
        category: 'accident'
    },
    {
        id: 'prompt276',
        text: 'Locking keys in car',
        icon: '🔑',
        hint: 'Left inside',
        category: 'accident'
    },
    {
        id: 'prompt277',
        text: 'Losing wallet at bar',
        icon: '👜',
        hint: 'Where did it go',
        category: 'accident'
    },
    {
        id: 'prompt278',
        text: 'Dropping phone on dance floor',
        icon: '📱',
        hint: 'Cracked screen',
        category: 'accident'
    },
    {
        id: 'prompt279',
        text: 'Ordering wrong drink twice',
        icon: '🍹',
        hint: 'Not what I wanted',
        category: 'accident'
    },
    {
        id: 'prompt280',
        text: 'Getting shoe stuck in crack',
        icon: '👟',
        hint: 'Caught in gap',
        category: 'accident'
    },
    {
        id: 'prompt281',
        text: 'Coin behind ear trick',
        icon: '🪙',
        hint: 'Sleight of hand',
        category: 'trick'
    },
    {
        id: 'prompt282',
        text: 'Card disappearing act',
        icon: '♠️',
        hint: 'Now you see it',
        category: 'trick'
    },
    {
        id: 'prompt283',
        text: 'Levitating off the floor',
        icon: '🧙',
        hint: 'Anti gravity',
        category: 'trick'
    },
    {
        id: 'prompt284',
        text: 'Mind reading someone',
        icon: '🔮',
        hint: 'I know your card',
        category: 'trick'
    },
    {
        id: 'prompt285',
        text: 'Making object vanish',
        icon: '🎩',
        hint: 'Poof gone',
        category: 'trick'
    },
    {
        id: 'prompt286',
        text: 'Guess the hidden card',
        icon: '♣️',
        hint: 'Pick a card any card',
        category: 'trick'
    },
    {
        id: 'prompt287',
        text: 'Bottle cap flipping trick',
        icon: '🍺',
        hint: 'Off the thumb',
        category: 'trick'
    },
    {
        id: 'prompt288',
        text: 'Balancing pint on forehead',
        icon: '🍺',
        hint: 'Head act',
        category: 'trick'
    },
    {
        id: 'prompt289',
        text: 'Straw paper spitball trick',
        icon: '🥤',
        hint: 'Flying projectile',
        category: 'trick'
    },
    {
        id: 'prompt290',
        text: 'Sugar packet magic trick',
        icon: '🧂',
        hint: 'Now it is full',
        category: 'trick'
    },
    {
        id: 'prompt291',
        text: 'Signed card revelation',
        icon: '♦️',
        hint: 'That is your card',
        category: 'trick'
    },
    {
        id: 'prompt292',
        text: 'Floating drink illusion',
        icon: '🥃',
        hint: 'Mid air hover',
        category: 'trick'
    },
    {
        id: 'prompt293',
        text: 'Coin through glass trick',
        icon: '🪙',
        hint: 'Solid matter',
        category: 'trick'
    },
    {
        id: 'prompt294',
        text: 'Disappearing toothpick',
        icon: '🦷',
        hint: 'Gone in a blink',
        category: 'trick'
    },
    {
        id: 'prompt295',
        text: 'Color changing liquid',
        icon: '🍹',
        hint: 'Mood ring drink',
        category: 'trick'
    },
    {
        id: 'prompt296',
        text: 'Three cup shuffle',
        icon: '🥤',
        hint: 'Find the ball',
        category: 'trick'
    },
    {
        id: 'prompt297',
        text: 'Knot untying trick',
        icon: '🪢',
        hint: 'How did that',
        category: 'trick'
    },
    {
        id: 'prompt298',
        text: 'Bending spoon mentally',
        icon: '🥄',
        hint: 'Uri Geller style',
        category: 'trick'
    },
    {
        id: 'prompt299',
        text: 'Rope through neck trick',
        icon: '🪢',
        hint: 'Impossible move',
        category: 'trick'
    },
    {
        id: 'prompt300',
        text: 'Predicting the future',
        icon: '🔮',
        hint: 'I knew that',
        category: 'trick'
    },
    {
        id: 'prompt301',
        text: 'Bouncer checking ID',
        icon: '🪪',
        hint: 'ID please friend',
        category: 'security'
    },
    {
        id: 'prompt302',
        text: 'Removing rowdy customer',
        icon: '🚪',
        hint: 'Time to go pal',
        category: 'security'
    },
    {
        id: 'prompt303',
        text: 'Breaking up a bar fight',
        icon: '✋',
        hint: 'Cool it down',
        category: 'security'
    },
    {
        id: 'prompt304',
        text: 'Escorting someone out',
        icon: '🚶',
        hint: 'Walk this way',
        category: 'security'
    },
    {
        id: 'prompt305',
        text: 'Watching the door at club',
        icon: '👀',
        hint: 'Eyes on entrance',
        category: 'security'
    },
    {
        id: 'prompt306',
        text: 'Searching bags at entry',
        icon: '👜',
        hint: 'Safety check',
        category: 'security'
    },
    {
        id: 'prompt307',
        text: 'Calling for backup',
        icon: '📞',
        hint: 'Need help now',
        category: 'security'
    },
    {
        id: 'prompt308',
        text: 'Dealing with drunk patron',
        icon: '🥴',
        hint: 'Steady there friend',
        category: 'security'
    },
    {
        id: 'prompt309',
        text: 'Confiscating fake ID',
        icon: '🪪',
        hint: 'This looks fake',
        category: 'security'
    },
    {
        id: 'prompt310',
        text: 'Patting down at the door',
        icon: '🤲',
        hint: 'Arms out please',
        category: 'security'
    },
    {
        id: 'prompt311',
        text: 'Walkie talkie communication',
        icon: '📻',
        hint: 'Copy that',
        category: 'security'
    },
    {
        id: 'prompt312',
        text: 'Monitoring surveillance camera',
        icon: '📹',
        hint: 'Watching all angles',
        category: 'security'
    },
    {
        id: 'prompt313',
        text: 'Refusing entry to bar',
        icon: '❌',
        hint: 'Not tonight friend',
        category: 'security'
    },
    {
        id: 'prompt314',
        text: 'Counting capacity at door',
        icon: '🔢',
        hint: 'Headcount check',
        category: 'security'
    },
    {
        id: 'prompt315',
        text: 'Helping lost customer',
        icon: '🗺️',
        hint: 'I will guide you',
        category: 'security'
    },
    {
        id: 'prompt316',
        text: 'Calling an Uber for patron',
        icon: '📱',
        hint: 'Safe ride home',
        category: 'security'
    },
    {
        id: 'prompt317',
        text: 'Handling noise complaint',
        icon: '🔇',
        hint: 'Keep it down please',
        category: 'security'
    },
    {
        id: 'prompt318',
        text: 'Checking wristband at venue',
        icon: '🎟️',
        hint: 'VIP or general',
        category: 'security'
    },
    {
        id: 'prompt319',
        text: 'Rope line crowd control',
        icon: '🪢',
        hint: 'Single file please',
        category: 'security'
    },
    {
        id: 'prompt320',
        text: 'Escorting VIP through crowd',
        icon: '⭐',
        hint: 'Make way folks',
        category: 'security'
    },
    {
        id: 'prompt321',
        text: 'New Year countdown at bar',
        icon: '🎆',
        hint: 'Ten nine eight',
        category: 'celebration'
    },
    {
        id: 'prompt322',
        text: 'Birthday shot tradition',
        icon: '🥃',
        hint: 'Happy birthday drink',
        category: 'celebration'
    },
    {
        id: 'prompt323',
        text: 'Toasting to promotion',
        icon: '🥂',
        hint: 'Congratulations clink',
        category: 'celebration'
    },
    {
        id: 'prompt324',
        text: 'Engagement announcement at bar',
        icon: '💍',
        hint: 'We are engaged',
        category: 'celebration'
    },
    {
        id: 'prompt325',
        text: 'Bachelor party bar crawl',
        icon: '🎉',
        hint: 'Last night out',
        category: 'celebration'
    },
    {
        id: 'prompt326',
        text: 'Bachelorette sash and tiara',
        icon: '👑',
        hint: 'Bride to be',
        category: 'celebration'
    },
    {
        id: 'prompt327',
        text: 'Sports victory celebration',
        icon: '🏆',
        hint: 'We won tonight',
        category: 'celebration'
    },
    {
        id: 'prompt328',
        text: 'Graduation night out',
        icon: '🎓',
        hint: 'Diploma earned',
        category: 'celebration'
    },
    {
        id: 'prompt329',
        text: 'Retirement party toast',
        icon: '🥂',
        hint: 'Cheers to freedom',
        category: 'celebration'
    },
    {
        id: 'prompt330',
        text: 'Anniversary dinner toast',
        icon: '🍷',
        hint: 'Years together',
        category: 'celebration'
    },
    {
        id: 'prompt331',
        text: 'Job offer celebration drinks',
        icon: '🍾',
        hint: 'I got the job',
        category: 'celebration'
    },
    {
        id: 'prompt332',
        text: 'Birthday tiara wearing',
        icon: '👑',
        hint: 'Queen for a day',
        category: 'celebration'
    },
    {
        id: 'prompt333',
        text: 'Sparkler birthday cake moment',
        icon: '✨',
        hint: 'Make a wish',
        category: 'celebration'
    },
    {
        id: 'prompt334',
        text: 'Surprise celebration reveal',
        icon: '🎊',
        hint: 'Surprise everyone',
        category: 'celebration'
    },
    {
        id: 'prompt335',
        text: 'Award winning toast',
        icon: '🏆',
        hint: 'I accept this drink',
        category: 'celebration'
    },
    {
        id: 'prompt336',
        text: 'Milestone birthday shots',
        icon: '🥃',
        hint: 'Thirty is the new twenty',
        category: 'celebration'
    },
    {
        id: 'prompt337',
        text: 'Holiday office party',
        icon: '🎄',
        hint: 'Work hard play hard',
        category: 'celebration'
    },
    {
        id: 'prompt338',
        text: 'Super Bowl victory bar',
        icon: '🏈',
        hint: 'Championship moment',
        category: 'celebration'
    },
    {
        id: 'prompt339',
        text: 'Moving to new city goodbye',
        icon: '👋',
        hint: 'Final farewell round',
        category: 'celebration'
    },
    {
        id: 'prompt340',
        text: 'Ringing in New Year kiss',
        icon: '🎆',
        hint: 'Midnight moment',
        category: 'celebration'
    },
    {
        id: 'prompt341',
        text: 'Swirling red wine in glass',
        icon: '🍷',
        hint: 'Aerate the tannins',
        category: 'wine'
    },
    {
        id: 'prompt342',
        text: 'Sniffing the wine bouquet',
        icon: '🍷',
        hint: 'Nose in the glass',
        category: 'wine'
    },
    {
        id: 'prompt343',
        text: 'Spitting at wine tasting',
        icon: '🍷',
        hint: 'Pro move',
        category: 'wine'
    },
    {
        id: 'prompt344',
        text: 'Holding wine glass properly',
        icon: '🍷',
        hint: 'Stem not bowl',
        category: 'wine'
    },
    {
        id: 'prompt345',
        text: 'Opening a vintage bottle',
        icon: '🍾',
        hint: 'Careful with cork',
        category: 'wine'
    },
    {
        id: 'prompt346',
        text: 'Decanting red wine',
        icon: '🍷',
        hint: 'Let it breathe',
        category: 'wine'
    },
    {
        id: 'prompt347',
        text: 'Pairing wine with cheese',
        icon: '🧀',
        hint: 'Perfect match',
        category: 'wine'
    },
    {
        id: 'prompt348',
        text: 'Checking wine temperature',
        icon: '🌡️',
        hint: 'Not too warm',
        category: 'wine'
    },
    {
        id: 'prompt349',
        text: 'Corking a half-empty bottle',
        icon: '🍷',
        hint: 'Save for later',
        category: 'wine'
    },
    {
        id: 'prompt350',
        text: 'Serving wine to table',
        icon: '🍷',
        hint: 'Taste first please',
        category: 'wine'
    },
    {
        id: 'prompt351',
        text: 'Reading wine menu',
        icon: '📋',
        hint: 'So many options',
        category: 'wine'
    },
    {
        id: 'prompt352',
        text: 'White wine summer sip',
        icon: '🥂',
        hint: 'Chilled perfection',
        category: 'wine'
    },
    {
        id: 'prompt353',
        text: 'Rosé afternoon drinking',
        icon: '🌸',
        hint: 'Pretty pink drink',
        category: 'wine'
    },
    {
        id: 'prompt354',
        text: 'Champagne tower building',
        icon: '🥂',
        hint: 'Stack them up',
        category: 'wine'
    },
    {
        id: 'prompt355',
        text: 'Prosecco brunch pouring',
        icon: '🥂',
        hint: 'Fancy morning',
        category: 'wine'
    },
    {
        id: 'prompt356',
        text: 'Mulled wine stirring',
        icon: '🍷',
        hint: 'Winter warmer',
        category: 'wine'
    },
    {
        id: 'prompt357',
        text: 'Wine cooler icing down',
        icon: '🧊',
        hint: 'Keep it cold',
        category: 'wine'
    },
    {
        id: 'prompt358',
        text: 'Natural wine explaining',
        icon: '🍷',
        hint: 'No additives',
        category: 'wine'
    },
    {
        id: 'prompt359',
        text: 'Boxed wine pouring',
        icon: '📦',
        hint: 'Classy evening',
        category: 'wine'
    },
    {
        id: 'prompt360',
        text: 'Ice wine tasting',
        icon: '🧊',
        hint: 'Sweet dessert wine',
        category: 'wine'
    },
    {
        id: 'prompt361',
        text: 'Pouring beer with proper head',
        icon: '🍺',
        hint: 'Two fingers foam',
        category: 'beer'
    },
    {
        id: 'prompt362',
        text: 'Tasting craft IPA hoppy beer',
        icon: '🍺',
        hint: 'Bitter notes',
        category: 'beer'
    },
    {
        id: 'prompt363',
        text: 'Choosing beer at tap wall',
        icon: '🍺',
        hint: 'So many handles',
        category: 'beer'
    },
    {
        id: 'prompt364',
        text: 'Beer flight sampling',
        icon: '🍺',
        hint: 'Four small glasses',
        category: 'beer'
    },
    {
        id: 'prompt365',
        text: 'Growler fill at brewery',
        icon: '🍺',
        hint: 'Take home a jug',
        category: 'beer'
    },
    {
        id: 'prompt366',
        text: 'Beer can crusher',
        icon: '🍺',
        hint: 'Flat can now',
        category: 'beer'
    },
    {
        id: 'prompt367',
        text: 'Opening beer with lighter',
        icon: '🔥',
        hint: 'No bottle opener',
        category: 'beer'
    },
    {
        id: 'prompt368',
        text: 'Beer pong victory dance',
        icon: '🏓',
        hint: 'Champion move',
        category: 'beer'
    },
    {
        id: 'prompt369',
        text: 'Drinking from a boot glass',
        icon: '🥾',
        hint: 'German tradition',
        category: 'beer'
    },
    {
        id: 'prompt370',
        text: 'Craft beer smelling aroma',
        icon: '🍺',
        hint: 'Hoppy bouquet',
        category: 'beer'
    },
    {
        id: 'prompt371',
        text: 'Tallboy can at stadium',
        icon: '🏟️',
        hint: 'Sports beer',
        category: 'beer'
    },
    {
        id: 'prompt372',
        text: 'Dark stout tasting',
        icon: '🍺',
        hint: 'Roasted coffee notes',
        category: 'beer'
    },
    {
        id: 'prompt373',
        text: 'Wheat beer with lemon',
        icon: '🍋',
        hint: 'Belgian style',
        category: 'beer'
    },
    {
        id: 'prompt374',
        text: 'Lager vs ale debate',
        icon: '🍺',
        hint: 'Pick a side',
        category: 'beer'
    },
    {
        id: 'prompt375',
        text: 'Home brewer explaining recipe',
        icon: '🍺',
        hint: 'Secret formula',
        category: 'beer'
    },
    {
        id: 'prompt376',
        text: 'Beer battered fish and chips',
        icon: '🐟',
        hint: 'Bar food pairing',
        category: 'beer'
    },
    {
        id: 'prompt377',
        text: 'Oktoberfest stein raising',
        icon: '🍺',
        hint: 'Prosit cheer',
        category: 'beer'
    },
    {
        id: 'prompt378',
        text: 'Session beer all night sip',
        icon: '🍺',
        hint: 'Pacing yourself',
        category: 'beer'
    },
    {
        id: 'prompt379',
        text: 'Sour beer face reaction',
        icon: '😖',
        hint: 'Pucker up',
        category: 'beer'
    },
    {
        id: 'prompt380',
        text: 'Nitro stout slow pour',
        icon: '🍺',
        hint: 'Wait for it',
        category: 'beer'
    },
    {
        id: 'prompt381',
        text: 'Watching game on bar TV',
        icon: '📺',
        hint: 'Eyes on screen',
        category: 'sports'
    },
    {
        id: 'prompt382',
        text: 'Celebrating a touchdown',
        icon: '🏈',
        hint: 'Arms in the air',
        category: 'sports'
    },
    {
        id: 'prompt383',
        text: 'Arguing a bad referee call',
        icon: '😤',
        hint: 'That was out',
        category: 'sports'
    },
    {
        id: 'prompt384',
        text: 'Fantasy sports checking scores',
        icon: '📱',
        hint: 'My team doing well',
        category: 'sports'
    },
    {
        id: 'prompt385',
        text: 'Pool table break shot',
        icon: '🎱',
        hint: 'Scatter them all',
        category: 'sports'
    },
    {
        id: 'prompt386',
        text: 'Dart throw bulls eye',
        icon: '🎯',
        hint: 'Right on target',
        category: 'sports'
    },
    {
        id: 'prompt387',
        text: 'Victory lap after win',
        icon: '🏆',
        hint: 'Show the trophy',
        category: 'sports'
    },
    {
        id: 'prompt388',
        text: 'Switching bar to game channel',
        icon: '📺',
        hint: 'Change it please',
        category: 'sports'
    },
    {
        id: 'prompt389',
        text: 'Explaining offsides rule',
        icon: '🏒',
        hint: 'Complex call',
        category: 'sports'
    },
    {
        id: 'prompt390',
        text: 'High five after a score',
        icon: '✋',
        hint: 'Slap of victory',
        category: 'sports'
    },
    {
        id: 'prompt391',
        text: 'Wearing rival team jersey',
        icon: '😤',
        hint: 'Bold choice tonight',
        category: 'sports'
    },
    {
        id: 'prompt392',
        text: 'Fantasy draft pick reveal',
        icon: '📋',
        hint: 'Got my player',
        category: 'sports'
    },
    {
        id: 'prompt393',
        text: 'Soccer penalty kick mime',
        icon: '⚽',
        hint: 'Shoot and score',
        category: 'sports'
    },
    {
        id: 'prompt394',
        text: 'Baseball home run swing',
        icon: '⚾',
        hint: 'Going going gone',
        category: 'sports'
    },
    {
        id: 'prompt395',
        text: 'Basketball free throw motion',
        icon: '🏀',
        hint: 'Swish sound',
        category: 'sports'
    },
    {
        id: 'prompt396',
        text: 'Golf swing at bar',
        icon: '⛳',
        hint: 'Fore warning',
        category: 'sports'
    },
    {
        id: 'prompt397',
        text: 'Wrestling move on friend',
        icon: '🤼',
        hint: 'Body slam',
        category: 'sports'
    },
    {
        id: 'prompt398',
        text: 'Rugby scrum formation',
        icon: '🏉',
        hint: 'Push and shove',
        category: 'sports'
    },
    {
        id: 'prompt399',
        text: 'Tennis serve motion',
        icon: '🎾',
        hint: 'Ace serve',
        category: 'sports'
    },
    {
        id: 'prompt400',
        text: 'Bowling spare dance',
        icon: '🎳',
        hint: 'Strike not spare',
        category: 'sports'
    },
    {
        id: 'prompt401',
        text: 'Eating nachos messily',
        icon: '🫙',
        hint: 'Cheese everywhere',
        category: 'food'
    },
    {
        id: 'prompt402',
        text: 'Ordering bar sliders',
        icon: '🍔',
        hint: 'Small burgers please',
        category: 'food'
    },
    {
        id: 'prompt403',
        text: 'Stealing a fry from plate',
        icon: '🍟',
        hint: 'Just one more',
        category: 'food'
    },
    {
        id: 'prompt404',
        text: 'Dunking chicken wings in sauce',
        icon: '🍗',
        hint: 'Full dunk method',
        category: 'food'
    },
    {
        id: 'prompt405',
        text: 'Eating a huge pretzel',
        icon: '🥨',
        hint: 'Giant snack',
        category: 'food'
    },
    {
        id: 'prompt406',
        text: 'Sharing mozzarella sticks',
        icon: '🧀',
        hint: 'Pull the cheese',
        category: 'food'
    },
    {
        id: 'prompt407',
        text: 'Late night bar pizza slice',
        icon: '🍕',
        hint: 'After bar food',
        category: 'food'
    },
    {
        id: 'prompt408',
        text: 'Eating jalapeños for bet',
        icon: '🌶️',
        hint: 'Hot dare',
        category: 'food'
    },
    {
        id: 'prompt409',
        text: 'Fish and chips at pub',
        icon: '🐟',
        hint: 'Classic pub fare',
        category: 'food'
    },
    {
        id: 'prompt410',
        text: 'Bar charcuterie board',
        icon: '🧀',
        hint: 'Fancy grazing',
        category: 'food'
    },
    {
        id: 'prompt411',
        text: 'Spicy wings heat reaction',
        icon: '🔥',
        hint: 'Face is melting',
        category: 'food'
    },
    {
        id: 'prompt412',
        text: 'Cheese dip with chips',
        icon: '🫙',
        hint: 'Double dipping',
        category: 'food'
    },
    {
        id: 'prompt413',
        text: 'Deep fried everything basket',
        icon: '🍟',
        hint: 'Fried overload',
        category: 'food'
    },
    {
        id: 'prompt414',
        text: 'Slider mountain challenge',
        icon: '🍔',
        hint: 'Eating competition',
        category: 'food'
    },
    {
        id: 'prompt415',
        text: 'Guacamole making tableside',
        icon: '🥑',
        hint: 'Fresh made now',
        category: 'food'
    },
    {
        id: 'prompt416',
        text: 'Beer cheese pretzel pairing',
        icon: '🍺',
        hint: 'Perfect combo',
        category: 'food'
    },
    {
        id: 'prompt417',
        text: 'Onion ring tower',
        icon: '🧅',
        hint: 'Stack them high',
        category: 'food'
    },
    {
        id: 'prompt418',
        text: 'Late night grilled cheese',
        icon: '🧀',
        hint: 'Drunk munchies',
        category: 'food'
    },
    {
        id: 'prompt419',
        text: 'Oysters at the bar',
        icon: '🦪',
        hint: 'Fancy slurp',
        category: 'food'
    },
    {
        id: 'prompt420',
        text: 'Hot dog eating contest',
        icon: '🌭',
        hint: 'Speed eating',
        category: 'food'
    },
    {
        id: 'prompt421',
        text: 'Calling an Uber after bar',
        icon: '📱',
        hint: 'Safe ride booked',
        category: 'leaving'
    },
    {
        id: 'prompt422',
        text: 'Finding coat at end of night',
        icon: '🧥',
        hint: 'Where did I put it',
        category: 'leaving'
    },
    {
        id: 'prompt423',
        text: 'Saying goodbye to everyone',
        icon: '👋',
        hint: 'Long farewell tour',
        category: 'leaving'
    },
    {
        id: 'prompt424',
        text: 'Last round before leaving',
        icon: '🍺',
        hint: 'One for the road',
        category: 'leaving'
    },
    {
        id: 'prompt425',
        text: 'Sneaking out the back door',
        icon: '🚪',
        hint: 'Irish goodbye',
        category: 'leaving'
    },
    {
        id: 'prompt426',
        text: 'Promising to text everyone',
        icon: '📱',
        hint: 'I will message you',
        category: 'leaving'
    },
    {
        id: 'prompt427',
        text: 'Drunk walk to taxi stand',
        icon: '🚕',
        hint: 'Steady footsteps',
        category: 'leaving'
    },
    {
        id: 'prompt428',
        text: 'Trying to remember where parked',
        icon: '🚗',
        hint: 'Where is my car',
        category: 'leaving'
    },
    {
        id: 'prompt429',
        text: 'Convincing friend to leave',
        icon: '👋',
        hint: 'Time to go now',
        category: 'leaving'
    },
    {
        id: 'prompt430',
        text: 'Collecting tabs before leaving',
        icon: '💳',
        hint: 'Money owed',
        category: 'leaving'
    },
    {
        id: 'prompt431',
        text: 'Sobering up with water',
        icon: '💧',
        hint: 'Clear headed now',
        category: 'leaving'
    },
    {
        id: 'prompt432',
        text: 'Borrowing phone charger to stay',
        icon: '🔋',
        hint: 'Need ten percent',
        category: 'leaving'
    },
    {
        id: 'prompt433',
        text: 'Missing last train home',
        icon: '🚂',
        hint: 'Stranded again',
        category: 'leaving'
    },
    {
        id: 'prompt434',
        text: 'Finding lost phone at bar',
        icon: '📱',
        hint: 'It was in pocket',
        category: 'leaving'
    },
    {
        id: 'prompt435',
        text: 'Debating one more round',
        icon: '🍺',
        hint: 'Stay or go',
        category: 'leaving'
    },
    {
        id: 'prompt436',
        text: 'Early morning bar departure',
        icon: '🌅',
        hint: 'Walk of shame',
        category: 'leaving'
    },
    {
        id: 'prompt437',
        text: 'Farewell speech to bartender',
        icon: '🎤',
        hint: 'Best bar ever',
        category: 'leaving'
    },
    {
        id: 'prompt438',
        text: 'Stumbling to the exit',
        icon: '🚪',
        hint: 'Navigate the crowd',
        category: 'leaving'
    },
    {
        id: 'prompt439',
        text: 'Designated driver picking up',
        icon: '🚗',
        hint: 'Sober savior arrives',
        category: 'leaving'
    },
    {
        id: 'prompt440',
        text: 'Planning next bar visit',
        icon: '📅',
        hint: 'Same time next week',
        category: 'leaving'
    },
    {
        id: 'prompt441',
        text: 'Free pouring practice',
        icon: '🍸',
        hint: 'No jigger needed',
        category: 'bartending'
    },
    {
        id: 'prompt442',
        text: 'Flair bartending bottle flip',
        icon: '🍾',
        hint: 'Showtime pour',
        category: 'bartending'
    },
    {
        id: 'prompt443',
        text: 'Making a Negroni cocktail',
        icon: '🍊',
        hint: 'Italian classic',
        category: 'bartending'
    },
    {
        id: 'prompt444',
        text: 'Dry shake cocktail method',
        icon: '🍸',
        hint: 'No ice first',
        category: 'bartending'
    },
    {
        id: 'prompt445',
        text: 'Burnt citrus garnish',
        icon: '🔥',
        hint: 'Toasted peel',
        category: 'bartending'
    },
    {
        id: 'prompt446',
        text: 'Foamy egg white cocktail',
        icon: '🥚',
        hint: 'Silky smooth',
        category: 'bartending'
    },
    {
        id: 'prompt447',
        text: 'Smoked glass cocktail',
        icon: '💨',
        hint: 'Smoky flavor',
        category: 'bartending'
    },
    {
        id: 'prompt448',
        text: 'Homemade bitters dash',
        icon: '🌿',
        hint: 'Aromatic splash',
        category: 'bartending'
    },
    {
        id: 'prompt449',
        text: 'Ice sphere in whiskey',
        icon: '🧊',
        hint: 'Round perfection',
        category: 'bartending'
    },
    {
        id: 'prompt450',
        text: 'Barrel aged cocktail pour',
        icon: '🪣',
        hint: 'Oak notes',
        category: 'bartending'
    },
    {
        id: 'prompt451',
        text: 'Infused spirit shaking',
        icon: '🍓',
        hint: 'Fruit forward',
        category: 'bartending'
    },
    {
        id: 'prompt452',
        text: 'Effervescent carbonated finish',
        icon: '🫧',
        hint: 'Bubbles on top',
        category: 'bartending'
    },
    {
        id: 'prompt453',
        text: 'Paper straw placement',
        icon: '🥤',
        hint: 'Eco friendly sip',
        category: 'bartending'
    },
    {
        id: 'prompt454',
        text: 'Cocktail napkin origami',
        icon: '📄',
        hint: 'Fancy fold',
        category: 'bartending'
    },
    {
        id: 'prompt455',
        text: 'Cherry stem tying in mouth',
        icon: '🍒',
        hint: 'Party trick',
        category: 'bartending'
    },
    {
        id: 'prompt456',
        text: 'Speed bartending competition',
        icon: '⏱️',
        hint: 'Fast hands win',
        category: 'bartending'
    },
    {
        id: 'prompt457',
        text: 'Taste testing new recipe',
        icon: '🧪',
        hint: 'Needs more citrus',
        category: 'bartending'
    },
    {
        id: 'prompt458',
        text: 'Syrup making reduction',
        icon: '🫙',
        hint: 'Sweet base ready',
        category: 'bartending'
    },
    {
        id: 'prompt459',
        text: 'Espresso martini pour',
        icon: '☕',
        hint: 'Coffee buzz drink',
        category: 'bartending'
    },
    {
        id: 'prompt460',
        text: 'Zero-proof mocktail making',
        icon: '🌿',
        hint: 'No booze needed',
        category: 'bartending'
    },
    {
        id: 'prompt461',
        text: 'Photo booth funny props',
        icon: '📸',
        hint: 'Oversized glasses',
        category: 'party'
    },
    {
        id: 'prompt462',
        text: 'Party bus dancing',
        icon: '🚌',
        hint: 'Moving dancefloor',
        category: 'party'
    },
    {
        id: 'prompt463',
        text: 'Woo girl group entrance',
        icon: '👯',
        hint: 'High energy squad',
        category: 'party'
    },
    {
        id: 'prompt464',
        text: 'Matching outfits arrival',
        icon: '👗',
        hint: 'Coordinated crew',
        category: 'party'
    },
    {
        id: 'prompt465',
        text: 'Speakeasy themed party',
        icon: '🎩',
        hint: 'Secret password needed',
        category: 'party'
    },
    {
        id: 'prompt466',
        text: 'Masquerade ball mask',
        icon: '🎭',
        hint: 'Hide your identity',
        category: 'party'
    },
    {
        id: 'prompt467',
        text: 'Hawaiian luau bar night',
        icon: '🌺',
        hint: 'Aloha everyone',
        category: 'party'
    },
    {
        id: 'prompt468',
        text: 'Pajama bar crawl',
        icon: '😴',
        hint: 'Comfy and out',
        category: 'party'
    },
    {
        id: 'prompt469',
        text: 'Ugly sweater competition',
        icon: '🎄',
        hint: 'Christmas at bar',
        category: 'party'
    },
    {
        id: 'prompt470',
        text: 'Pirate themed bar night',
        icon: '🏴‍☠️',
        hint: 'Argh matey drink',
        category: 'party'
    },
    {
        id: 'prompt471',
        text: 'Neon glow party',
        icon: '🟢',
        hint: 'Glow in dark',
        category: 'party'
    },
    {
        id: 'prompt472',
        text: 'Decades themed costume',
        icon: '🕺',
        hint: 'Pick your era',
        category: 'party'
    },
    {
        id: 'prompt473',
        text: 'Karaoke contest winner',
        icon: '🏆',
        hint: 'Best voice trophy',
        category: 'party'
    },
    {
        id: 'prompt474',
        text: 'Bar crawl map planning',
        icon: '🗺️',
        hint: 'Next stop please',
        category: 'party'
    },
    {
        id: 'prompt475',
        text: 'Silent disco headphones',
        icon: '🎧',
        hint: 'Invisible music',
        category: 'party'
    },
    {
        id: 'prompt476',
        text: 'Murder mystery dinner',
        icon: '🔍',
        hint: 'Whodunit night',
        category: 'party'
    },
    {
        id: 'prompt477',
        text: 'Costume contest judging',
        icon: '🏆',
        hint: 'Pick the winner',
        category: 'party'
    },
    {
        id: 'prompt478',
        text: 'Trivia team huddle',
        icon: '🧠',
        hint: 'Whisper the answer',
        category: 'party'
    },
    {
        id: 'prompt479',
        text: 'Group toast formation',
        icon: '🥂',
        hint: 'All glasses up',
        category: 'party'
    },
    {
        id: 'prompt480',
        text: 'End of night wrap up',
        icon: '🌙',
        hint: 'Good night friends',
        category: 'party'
    },
    {
        id: 'prompt481',
        text: 'Doing the worm dance move',
        icon: '🪱',
        hint: 'Floor level dance',
        category: 'entertainment'
    },
    {
        id: 'prompt482',
        text: 'Breakdancing at the bar',
        icon: '💃',
        hint: 'Spin on the floor',
        category: 'entertainment'
    },
    {
        id: 'prompt483',
        text: 'Thriller zombie dance',
        icon: '🧟',
        hint: 'Michael Jackson tribute',
        category: 'entertainment'
    },
    {
        id: 'prompt484',
        text: 'Running man dance',
        icon: '🏃',
        hint: 'Classic 90s move',
        category: 'entertainment'
    },
    {
        id: 'prompt485',
        text: 'Floss dance viral move',
        icon: '💃',
        hint: 'Hip swinging',
        category: 'entertainment'
    },
    {
        id: 'prompt486',
        text: 'Robot dance at bar',
        icon: '🤖',
        hint: 'Mechanical moves',
        category: 'entertainment'
    },
    {
        id: 'prompt487',
        text: 'Salsa dancing lesson',
        icon: '💃',
        hint: 'Hip movements',
        category: 'entertainment'
    },
    {
        id: 'prompt488',
        text: 'Swing dancing partners',
        icon: '🕺',
        hint: 'Lindy hop style',
        category: 'entertainment'
    },
    {
        id: 'prompt489',
        text: 'Irish jig at the pub',
        icon: '🍀',
        hint: 'Quick foot steps',
        category: 'entertainment'
    },
    {
        id: 'prompt490',
        text: 'Bollywood dance moves',
        icon: '💫',
        hint: 'Colorful gestures',
        category: 'entertainment'
    },
    {
        id: 'prompt491',
        text: 'Electric slide line dance',
        icon: '🕺',
        hint: 'Step touch step',
        category: 'entertainment'
    },
    {
        id: 'prompt492',
        text: 'Gangnam style riding',
        icon: '🐴',
        hint: 'Horse riding dance',
        category: 'entertainment'
    },
    {
        id: 'prompt493',
        text: 'Cha cha slide call',
        icon: '🕺',
        hint: 'Everybody clap hands',
        category: 'entertainment'
    },
    {
        id: 'prompt494',
        text: 'Moonwalk Michael tribute',
        icon: '🌙',
        hint: 'Glide backwards',
        category: 'entertainment'
    },
    {
        id: 'prompt495',
        text: 'Cotton eye joe spin',
        icon: '🤠',
        hint: 'Where did you come',
        category: 'entertainment'
    },
    {
        id: 'prompt496',
        text: 'Vogue dance posing',
        icon: '💅',
        hint: 'Strike a pose',
        category: 'entertainment'
    },
    {
        id: 'prompt497',
        text: 'Twerking contest bar',
        icon: '💃',
        hint: 'Bounce and drop',
        category: 'entertainment'
    },
    {
        id: 'prompt498',
        text: 'Belly dancing performance',
        icon: '💫',
        hint: 'Fluid hip moves',
        category: 'entertainment'
    },
    {
        id: 'prompt499',
        text: 'Tap dancing on bar stool',
        icon: '👟',
        hint: 'Click clack rhythm',
        category: 'entertainment'
    },
    {
        id: 'prompt500',
        text: 'Riverdance Irish step',
        icon: '🍀',
        hint: 'Feet barely touch',
        category: 'entertainment'
    },
    {
        id: 'prompt501',
        text: 'Drunk texting regret',
        icon: '📱',
        hint: 'Delete that now',
        category: 'social'
    },
    {
        id: 'prompt502',
        text: 'Pocket dial from purse',
        icon: '📱',
        hint: 'Butt dial horror',
        category: 'social'
    },
    {
        id: 'prompt503',
        text: 'Social media checking at bar',
        icon: '📱',
        hint: 'Put the phone down',
        category: 'social'
    },
    {
        id: 'prompt504',
        text: 'Taking unflattering photos',
        icon: '📸',
        hint: 'No that one bad',
        category: 'social'
    },
    {
        id: 'prompt505',
        text: 'Oversharing personal story',
        icon: '🗣️',
        hint: 'Too much info',
        category: 'social'
    },
    {
        id: 'prompt506',
        text: 'Friend zone discussion',
        icon: '💔',
        hint: 'Just friends though',
        category: 'social'
    },
    {
        id: 'prompt507',
        text: 'Giving unsolicited advice',
        icon: '🤓',
        hint: 'Let me tell you',
        category: 'social'
    },
    {
        id: 'prompt508',
        text: 'Meeting a bar legend',
        icon: '⭐',
        hint: 'Everyone knows them',
        category: 'social'
    },
    {
        id: 'prompt509',
        text: 'Arguing politics at bar',
        icon: '😤',
        hint: 'Wrong venue choice',
        category: 'social'
    },
    {
        id: 'prompt510',
        text: 'Being a total regular',
        icon: '🪑',
        hint: 'Same seat same drink',
        category: 'social'
    },
    {
        id: 'prompt511',
        text: 'Texting someone at same bar',
        icon: '📱',
        hint: 'Wave across room',
        category: 'social'
    },
    {
        id: 'prompt512',
        text: 'Name dropping at party',
        icon: '⭐',
        hint: 'I know that person',
        category: 'social'
    },
    {
        id: 'prompt513',
        text: 'Humble bragging about job',
        icon: '💼',
        hint: 'Casual mention only',
        category: 'social'
    },
    {
        id: 'prompt514',
        text: 'Group chat coordinating',
        icon: '📱',
        hint: 'Where is everyone',
        category: 'social'
    },
    {
        id: 'prompt515',
        text: 'Running into neighbor out',
        icon: '😮',
        hint: 'Small world moment',
        category: 'social'
    },
    {
        id: 'prompt516',
        text: 'Being terrible with names',
        icon: '😬',
        hint: 'I forgot your name',
        category: 'social'
    },
    {
        id: 'prompt517',
        text: 'Telling same story twice',
        icon: '🔄',
        hint: 'Did I mention that',
        category: 'social'
    },
    {
        id: 'prompt518',
        text: 'Overstaying your welcome',
        icon: '⏰',
        hint: 'Hint not taken',
        category: 'social'
    },
    {
        id: 'prompt519',
        text: 'Making round of introductions',
        icon: '👋',
        hint: 'Meet my friend',
        category: 'social'
    },
    {
        id: 'prompt520',
        text: 'Inviting self to VIP',
        icon: '⭐',
        hint: 'I am with them',
        category: 'social'
    },
    {
        id: 'prompt521',
        text: 'Trying bizarre new cocktail',
        icon: '🍹',
        hint: 'What even is this',
        category: 'drinking'
    },
    {
        id: 'prompt522',
        text: 'Refusing final round',
        icon: '✋',
        hint: 'I am done tonight',
        category: 'drinking'
    },
    {
        id: 'prompt523',
        text: 'Peer pressure to drink more',
        icon: '😰',
        hint: 'One more they said',
        category: 'drinking'
    },
    {
        id: 'prompt524',
        text: 'Hydrating between rounds',
        icon: '💧',
        hint: 'Smart drinker',
        category: 'drinking'
    },
    {
        id: 'prompt525',
        text: 'Switching from beer to spirits',
        icon: '🍺',
        hint: 'Time to escalate',
        category: 'drinking'
    },
    {
        id: 'prompt526',
        text: 'Hair of the dog morning drink',
        icon: '🌅',
        hint: 'Hangover cure',
        category: 'drinking'
    },
    {
        id: 'prompt527',
        text: 'Drinking game losing streak',
        icon: '😩',
        hint: 'Drink again penalty',
        category: 'drinking'
    },
    {
        id: 'prompt528',
        text: 'Mixing drinks bad idea',
        icon: '🤢',
        hint: 'Regret incoming',
        category: 'drinking'
    },
    {
        id: 'prompt529',
        text: 'Finishing someone elses drink',
        icon: '🍺',
        hint: 'Waste not want not',
        category: 'drinking'
    },
    {
        id: 'prompt530',
        text: 'Speed drinking competition',
        icon: '⏱️',
        hint: 'Fastest sipper wins',
        category: 'drinking'
    },
    {
        id: 'prompt531',
        text: 'Trying every tap beer',
        icon: '🍺',
        hint: 'Flight sampling',
        category: 'drinking'
    },
    {
        id: 'prompt532',
        text: 'Discovering signature drink',
        icon: '🍹',
        hint: 'This is my drink',
        category: 'drinking'
    },
    {
        id: 'prompt533',
        text: 'Refusing round on principle',
        icon: '✋',
        hint: 'Not my turn tonight',
        category: 'drinking'
    },
    {
        id: 'prompt534',
        text: 'Drink spilling on phone',
        icon: '📱',
        hint: 'Water damage panic',
        category: 'drinking'
    },
    {
        id: 'prompt535',
        text: 'Buying round for strangers',
        icon: '🍺',
        hint: 'Generous stranger',
        category: 'drinking'
    },
    {
        id: 'prompt536',
        text: 'Forgetting what you ordered',
        icon: '😕',
        hint: 'What was it again',
        category: 'drinking'
    },
    {
        id: 'prompt537',
        text: 'Double fisting drinks',
        icon: '🍺',
        hint: 'One in each hand',
        category: 'drinking'
    },
    {
        id: 'prompt538',
        text: 'Claiming not to be drunk',
        icon: '🥴',
        hint: 'I am totally fine',
        category: 'drinking'
    },
    {
        id: 'prompt539',
        text: 'Pretending to sip alcohol',
        icon: '🍹',
        hint: 'All night actor',
        category: 'drinking'
    },
    {
        id: 'prompt540',
        text: 'Celebrating finding money',
        icon: '💵',
        hint: 'Round on me',
        category: 'drinking'
    },
    {
        id: 'prompt541',
        text: 'Losing at beer pong badly',
        icon: '🏓',
        hint: 'Every single time',
        category: 'games'
    },
    {
        id: 'prompt542',
        text: 'Arguing darts out of bounds',
        icon: '🎯',
        hint: 'That counts I think',
        category: 'games'
    },
    {
        id: 'prompt543',
        text: 'Sandbagging trivia team',
        icon: '🧠',
        hint: 'Pretending not to know',
        category: 'games'
    },
    {
        id: 'prompt544',
        text: 'Cheating at card game',
        icon: '♠️',
        hint: 'Hidden ace sleeve',
        category: 'games'
    },
    {
        id: 'prompt545',
        text: 'Dramatic chess move in pub',
        icon: '♟️',
        hint: 'Checkmate friend',
        category: 'games'
    },
    {
        id: 'prompt546',
        text: 'Slot machine pull at bar',
        icon: '🎰',
        hint: 'Lucky spin now',
        category: 'games'
    },
    {
        id: 'prompt547',
        text: 'Pinball machine focus',
        icon: '🎮',
        hint: 'Tilt warning',
        category: 'games'
    },
    {
        id: 'prompt548',
        text: 'Pac-Man arcade cabinet',
        icon: '👾',
        hint: 'Eat the dots',
        category: 'games'
    },
    {
        id: 'prompt549',
        text: 'Golden tee golf swing',
        icon: '⛳',
        hint: 'Digital golf game',
        category: 'games'
    },
    {
        id: 'prompt550',
        text: 'Buck hunter rifle aim',
        icon: '🦌',
        hint: 'Shoot the deer',
        category: 'games'
    },
    {
        id: 'prompt551',
        text: 'Connect four strategy',
        icon: '🔴',
        hint: 'Four in a row',
        category: 'games'
    },
    {
        id: 'prompt552',
        text: 'Speed round in trivia',
        icon: '⏱️',
        hint: 'Think fast now',
        category: 'games'
    },
    {
        id: 'prompt553',
        text: 'Wager on pool game',
        icon: '💰',
        hint: 'Side bet agreed',
        category: 'games'
    },
    {
        id: 'prompt554',
        text: 'Air hockey slap shot',
        icon: '🏒',
        hint: 'Fast puck action',
        category: 'games'
    },
    {
        id: 'prompt555',
        text: 'Skee ball toss aim',
        icon: '🎳',
        hint: 'Roll up the ramp',
        category: 'games'
    },
    {
        id: 'prompt556',
        text: 'Photo hunt spot difference',
        icon: '🖼️',
        hint: 'Find the change',
        category: 'games'
    },
    {
        id: 'prompt557',
        text: 'Crane machine frustration',
        icon: '🎮',
        hint: 'So close yet far',
        category: 'games'
    },
    {
        id: 'prompt558',
        text: 'Buzzer quiz show answer',
        icon: '🔔',
        hint: 'First to buzz wins',
        category: 'games'
    },
    {
        id: 'prompt559',
        text: 'Penalty shootout bar game',
        icon: '⚽',
        hint: 'Score or drink',
        category: 'games'
    },
    {
        id: 'prompt560',
        text: 'Snooker cue chalking',
        icon: '🎱',
        hint: 'Blue chalk up',
        category: 'games'
    },
    {
        id: 'prompt561',
        text: 'Champagne sabering technique',
        icon: '🍾',
        hint: 'Sword on bottle',
        category: 'celebration'
    },
    {
        id: 'prompt562',
        text: 'Confetti cannon blast',
        icon: '🎊',
        hint: 'Rainbow explosion',
        category: 'celebration'
    },
    {
        id: 'prompt563',
        text: 'Sparkler waving celebration',
        icon: '✨',
        hint: 'Bright light show',
        category: 'celebration'
    },
    {
        id: 'prompt564',
        text: 'Ribbon cutting ceremony',
        icon: '✂️',
        hint: 'Grand opening toast',
        category: 'celebration'
    },
    {
        id: 'prompt565',
        text: 'Balloon drop moment',
        icon: '🎈',
        hint: 'Let them fall',
        category: 'celebration'
    },
    {
        id: 'prompt566',
        text: 'Group photo timer pose',
        icon: '📸',
        hint: 'Run to position',
        category: 'celebration'
    },
    {
        id: 'prompt567',
        text: 'Crying happy tears toast',
        icon: '😭',
        hint: 'Emotional speech',
        category: 'celebration'
    },
    {
        id: 'prompt568',
        text: 'Best man wedding speech',
        icon: '🎤',
        hint: 'Roast the groom',
        category: 'celebration'
    },
    {
        id: 'prompt569',
        text: 'Maid of honor toast',
        icon: '🥂',
        hint: 'Funny stories time',
        category: 'celebration'
    },
    {
        id: 'prompt570',
        text: 'Retirement party roast',
        icon: '😂',
        hint: 'Career recap laughs',
        category: 'celebration'
    },
    {
        id: 'prompt571',
        text: 'Number candle birthday',
        icon: '🕯️',
        hint: 'Count those years',
        category: 'celebration'
    },
    {
        id: 'prompt572',
        text: 'Gold confetti anniversary',
        icon: '✨',
        hint: 'Years well spent',
        category: 'celebration'
    },
    {
        id: 'prompt573',
        text: 'Prom after party toast',
        icon: '🥂',
        hint: 'Growing up moment',
        category: 'celebration'
    },
    {
        id: 'prompt574',
        text: 'College acceptance drink',
        icon: '🎓',
        hint: 'Got in cheer',
        category: 'celebration'
    },
    {
        id: 'prompt575',
        text: 'First job promotion drinks',
        icon: '💼',
        hint: 'Career milestone',
        category: 'celebration'
    },
    {
        id: 'prompt576',
        text: 'Housewarming party toast',
        icon: '🏠',
        hint: 'New home cheers',
        category: 'celebration'
    },
    {
        id: 'prompt577',
        text: 'New baby shower toast',
        icon: '👶',
        hint: 'Welcome the baby',
        category: 'celebration'
    },
    {
        id: 'prompt578',
        text: 'Divorce celebration party',
        icon: '💔',
        hint: 'Freedom cheers',
        category: 'celebration'
    },
    {
        id: 'prompt579',
        text: 'Weight loss milestone toast',
        icon: '⚖️',
        hint: 'Goal achieved',
        category: 'celebration'
    },
    {
        id: 'prompt580',
        text: 'Marathon finish line drink',
        icon: '🏃',
        hint: 'Earned this beer',
        category: 'celebration'
    },
    {
        id: 'prompt581',
        text: 'Rush hour bartending frenzy',
        icon: '⏰',
        hint: 'Everyone wants drinks',
        category: 'service'
    },
    {
        id: 'prompt582',
        text: 'Memorizing regulars orders',
        icon: '🧠',
        hint: 'Same as always',
        category: 'service'
    },
    {
        id: 'prompt583',
        text: 'Handling drunk customer kindly',
        icon: '🥴',
        hint: 'Let me help you',
        category: 'service'
    },
    {
        id: 'prompt584',
        text: 'Speed serving busy bar',
        icon: '⚡',
        hint: 'Lightning fast hands',
        category: 'service'
    },
    {
        id: 'prompt585',
        text: 'Explaining cocktail menu',
        icon: '📋',
        hint: 'Let me describe this',
        category: 'service'
    },
    {
        id: 'prompt586',
        text: 'Suggesting wine pairing',
        icon: '🍷',
        hint: 'Try this with that',
        category: 'service'
    },
    {
        id: 'prompt587',
        text: 'Bar rescue style makeover',
        icon: '🔨',
        hint: 'Fix everything now',
        category: 'service'
    },
    {
        id: 'prompt588',
        text: 'Training new bar staff',
        icon: '👥',
        hint: 'Watch me do this',
        category: 'service'
    },
    {
        id: 'prompt589',
        text: 'End of shift cleanup duty',
        icon: '🧹',
        hint: 'Mop and bucket',
        category: 'service'
    },
    {
        id: 'prompt590',
        text: 'Opening the bar early',
        icon: '🔓',
        hint: 'Keys in lock turn',
        category: 'service'
    },
    {
        id: 'prompt591',
        text: 'Closing time announcement',
        icon: '🔔',
        hint: 'Last call everyone',
        category: 'service'
    },
    {
        id: 'prompt592',
        text: 'Refusing service decision',
        icon: '✋',
        hint: 'Cut off now',
        category: 'service'
    },
    {
        id: 'prompt593',
        text: 'Calling taxi for customer',
        icon: '🚕',
        hint: 'Safe ride arranged',
        category: 'service'
    },
    {
        id: 'prompt594',
        text: 'Tracking tab for table',
        icon: '📝',
        hint: 'Running total',
        category: 'service'
    },
    {
        id: 'prompt595',
        text: 'Upselling premium spirits',
        icon: '💎',
        hint: 'Worth the extra',
        category: 'service'
    },
    {
        id: 'prompt596',
        text: 'Handling card machine error',
        icon: '💳',
        hint: 'Try again please',
        category: 'service'
    },
    {
        id: 'prompt597',
        text: 'Running happy hour deals',
        icon: '🎉',
        hint: 'Half price time',
        category: 'service'
    },
    {
        id: 'prompt598',
        text: 'Entertainment booking call',
        icon: '🎤',
        hint: 'Can you perform here',
        category: 'service'
    },
    {
        id: 'prompt599',
        text: 'Social media post for bar',
        icon: '📱',
        hint: 'Tag us please',
        category: 'service'
    },
    {
        id: 'prompt600',
        text: 'Opening new bottle ceremony',
        icon: '🍾',
        hint: 'First pour honor',
        category: 'service'
    },
    {
        id: 'prompt601',
        text: 'Falling asleep at bar',
        icon: '😴',
        hint: 'Head on counter',
        category: 'accident'
    },
    {
        id: 'prompt602',
        text: 'Wallet left behind again',
        icon: '👜',
        hint: 'Forgot it again',
        category: 'accident'
    },
    {
        id: 'prompt603',
        text: 'Phone dead at bad time',
        icon: '🔋',
        hint: 'Battery betrayal',
        category: 'accident'
    },
    {
        id: 'prompt604',
        text: 'Wrong bar wrong night',
        icon: '🚪',
        hint: 'Where am I',
        category: 'accident'
    },
    {
        id: 'prompt605',
        text: 'Ordering from wrong bar',
        icon: '😕',
        hint: 'Wrong place order',
        category: 'accident'
    },
    {
        id: 'prompt606',
        text: 'Dress code fail at entry',
        icon: '👗',
        hint: 'Wrong outfit worn',
        category: 'accident'
    },
    {
        id: 'prompt607',
        text: 'Card declined at bar',
        icon: '💳',
        hint: 'Embarrassing moment',
        category: 'accident'
    },
    {
        id: 'prompt608',
        text: 'Tripping on dance floor',
        icon: '🕺',
        hint: 'Graceful fall',
        category: 'accident'
    },
    {
        id: 'prompt609',
        text: 'Spilling drink on DJ',
        icon: '🎧',
        hint: 'Technical error',
        category: 'accident'
    },
    {
        id: 'prompt610',
        text: 'Running into sliding door',
        icon: '🚪',
        hint: 'Automatic fail',
        category: 'accident'
    },
    {
        id: 'prompt611',
        text: 'Accidentally insulting staff',
        icon: '😳',
        hint: 'Did not mean it',
        category: 'accident'
    },
    {
        id: 'prompt612',
        text: 'Getting drink names mixed up',
        icon: '🍹',
        hint: 'Ordered wrong thing',
        category: 'accident'
    },
    {
        id: 'prompt613',
        text: 'Forgetting to pay tab',
        icon: '💳',
        hint: 'Did a runner',
        category: 'accident'
    },
    {
        id: 'prompt614',
        text: 'Sitting at reserved table',
        icon: '🪑',
        hint: 'That was taken',
        category: 'accident'
    },
    {
        id: 'prompt615',
        text: 'Breaking bathroom door lock',
        icon: '🔒',
        hint: 'Stuck inside',
        category: 'accident'
    },
    {
        id: 'prompt616',
        text: 'Losing group in the crowd',
        icon: '🎉',
        hint: 'Where did they go',
        category: 'accident'
    },
    {
        id: 'prompt617',
        text: 'Drunk dialing old flame',
        icon: '📱',
        hint: 'Calling who now',
        category: 'accident'
    },
    {
        id: 'prompt618',
        text: 'Confusing twins at bar',
        icon: '👥',
        hint: 'Oops wrong person',
        category: 'accident'
    },
    {
        id: 'prompt619',
        text: 'Dropping keys down drain',
        icon: '🔑',
        hint: 'Gone forever',
        category: 'accident'
    },
    {
        id: 'prompt620',
        text: 'Wardrobe malfunction dancing',
        icon: '👗',
        hint: 'Needs fixing now',
        category: 'accident'
    },
    {
        id: 'prompt621',
        text: 'Egg balancing trick',
        icon: '🥚',
        hint: 'Perfect balance act',
        category: 'trick'
    },
    {
        id: 'prompt622',
        text: 'Lemon squeezed with fingers',
        icon: '🍋',
        hint: 'Surprise strength',
        category: 'trick'
    },
    {
        id: 'prompt623',
        text: 'Napkin folding complex',
        icon: '📄',
        hint: 'Origami mastery',
        category: 'trick'
    },
    {
        id: 'prompt624',
        text: 'Impossible knot undoing',
        icon: '🪢',
        hint: 'Fingers only method',
        category: 'trick'
    },
    {
        id: 'prompt625',
        text: 'Dollar bill impossible fold',
        icon: '💵',
        hint: 'Origami money',
        category: 'trick'
    },
    {
        id: 'prompt626',
        text: 'Olive throwing and catching',
        icon: '🫒',
        hint: 'Mouth catch trick',
        category: 'trick'
    },
    {
        id: 'prompt627',
        text: 'Multiple bottle spin',
        icon: '🍾',
        hint: 'Spin them all',
        category: 'trick'
    },
    {
        id: 'prompt628',
        text: 'Glass balancing pyramid',
        icon: '🥃',
        hint: 'Steady structure',
        category: 'trick'
    },
    {
        id: 'prompt629',
        text: 'Floating match illusion',
        icon: '🔥',
        hint: 'Gravity defying',
        category: 'trick'
    },
    {
        id: 'prompt630',
        text: 'Cigarette through coin trick',
        icon: '🪙',
        hint: 'Paper or coin',
        category: 'trick'
    },
    {
        id: 'prompt631',
        text: 'Water pouring illusion',
        icon: '💧',
        hint: 'Endless stream',
        category: 'trick'
    },
    {
        id: 'prompt632',
        text: 'Invisible ball catch',
        icon: '⚾',
        hint: 'Mime magic',
        category: 'trick'
    },
    {
        id: 'prompt633',
        text: 'Thread through needle fast',
        icon: '🧵',
        hint: 'Speed threading',
        category: 'trick'
    },
    {
        id: 'prompt634',
        text: 'Bottle spin direction control',
        icon: '🍾',
        hint: 'I called left',
        category: 'trick'
    },
    {
        id: 'prompt635',
        text: 'Card to pocket teleport',
        icon: '♥️',
        hint: 'Check your jacket',
        category: 'trick'
    },
    {
        id: 'prompt636',
        text: 'Rising card revelation',
        icon: '♠️',
        hint: 'It rose by itself',
        category: 'trick'
    },
    {
        id: 'prompt637',
        text: 'Torn bill restoration',
        icon: '💵',
        hint: 'Back to one piece',
        category: 'trick'
    },
    {
        id: 'prompt638',
        text: 'Invisible dice roll',
        icon: '🎲',
        hint: 'I see the number',
        category: 'trick'
    },
    {
        id: 'prompt639',
        text: 'Matchstick puzzle solve',
        icon: '🔥',
        hint: 'Think creatively',
        category: 'trick'
    },
    {
        id: 'prompt640',
        text: 'Linking rubber bands',
        icon: '🟡',
        hint: 'Connected now',
        category: 'trick'
    },
    {
        id: 'prompt641',
        text: 'De-escalating bar argument',
        icon: '✋',
        hint: 'Let us calm down',
        category: 'security'
    },
    {
        id: 'prompt642',
        text: 'Lost child announcement',
        icon: '📢',
        hint: 'Announcing over PA',
        category: 'security'
    },
    {
        id: 'prompt643',
        text: 'Medical emergency response',
        icon: '🚑',
        hint: 'Call an ambulance',
        category: 'security'
    },
    {
        id: 'prompt644',
        text: 'Fire alarm evacuation',
        icon: '🔥',
        hint: 'Everyone out now',
        category: 'security'
    },
    {
        id: 'prompt645',
        text: 'Crowd crush prevention',
        icon: '🧑‍🤝‍🧑',
        hint: 'Give people space',
        category: 'security'
    },
    {
        id: 'prompt646',
        text: 'Nightclub capacity limit',
        icon: '🔢',
        hint: 'No more inside',
        category: 'security'
    },
    {
        id: 'prompt647',
        text: 'Confronting pickpocket',
        icon: '🖐️',
        hint: 'Stop that person',
        category: 'security'
    },
    {
        id: 'prompt648',
        text: 'Preventing bar brawl',
        icon: '✋',
        hint: 'Stand between them',
        category: 'security'
    },
    {
        id: 'prompt649',
        text: 'CCTV footage review',
        icon: '📹',
        hint: 'Play it back now',
        category: 'security'
    },
    {
        id: 'prompt650',
        text: 'Emergency exit route',
        icon: '🚪',
        hint: 'This way people',
        category: 'security'
    },
    {
        id: 'prompt651',
        text: 'Drunk driver intervention',
        icon: '🚗',
        hint: 'Give me the keys',
        category: 'security'
    },
    {
        id: 'prompt652',
        text: 'Noise ordinance warning',
        icon: '🔇',
        hint: 'Volume down please',
        category: 'security'
    },
    {
        id: 'prompt653',
        text: 'Undercover officer reveal',
        icon: '🕵️',
        hint: 'Badge coming out',
        category: 'security'
    },
    {
        id: 'prompt654',
        text: 'Emergency protocol drill',
        icon: '📋',
        hint: 'Practice run now',
        category: 'security'
    },
    {
        id: 'prompt655',
        text: 'Crowd surfing intervention',
        icon: '🙋',
        hint: 'Bring them down',
        category: 'security'
    },
    {
        id: 'prompt656',
        text: 'Drug detection search',
        icon: '🔍',
        hint: 'Empty your pockets',
        category: 'security'
    },
    {
        id: 'prompt657',
        text: 'Trespass warning issued',
        icon: '📝',
        hint: 'Do not come back',
        category: 'security'
    },
    {
        id: 'prompt658',
        text: 'Last call enforcement',
        icon: '🔔',
        hint: 'Drinks down now',
        category: 'security'
    },
    {
        id: 'prompt659',
        text: 'Physical altercation break',
        icon: '✋',
        hint: 'Separate the fighters',
        category: 'security'
    },
    {
        id: 'prompt660',
        text: 'Radio code communication',
        icon: '📻',
        hint: 'Code ten twenty',
        category: 'security'
    },
    {
        id: 'prompt661',
        text: 'Wine aerator attachment use',
        icon: '🍷',
        hint: 'Instant decant',
        category: 'wine'
    },
    {
        id: 'prompt662',
        text: 'Tannin structure explaining',
        icon: '🍷',
        hint: 'Dry mouth feeling',
        category: 'wine'
    },
    {
        id: 'prompt663',
        text: 'Vintage year importance talk',
        icon: '🍾',
        hint: 'Great year for grapes',
        category: 'wine'
    },
    {
        id: 'prompt664',
        text: 'Wine label reading carefully',
        icon: '📋',
        hint: 'Region and grape',
        category: 'wine'
    },
    {
        id: 'prompt665',
        text: 'Blind wine tasting guess',
        icon: '🍷',
        hint: 'I think Bordeaux',
        category: 'wine'
    },
    {
        id: 'prompt666',
        text: 'Wine cellar temperature check',
        icon: '🌡️',
        hint: 'Correct storage',
        category: 'wine'
    },
    {
        id: 'prompt667',
        text: 'Sparkling wine wire cage remove',
        icon: '🥂',
        hint: 'Twist and lift',
        category: 'wine'
    },
    {
        id: 'prompt668',
        text: 'Wine flight progression',
        icon: '🍷',
        hint: 'Light to heavy',
        category: 'wine'
    },
    {
        id: 'prompt669',
        text: 'Natural cork vs screw cap',
        icon: '🍷',
        hint: 'Open either way',
        category: 'wine'
    },
    {
        id: 'prompt670',
        text: 'Late harvest dessert wine',
        icon: '🍯',
        hint: 'Sweet finish',
        category: 'wine'
    },
    {
        id: 'prompt671',
        text: 'Orange wine explanation',
        icon: '🍊',
        hint: 'Skin contact method',
        category: 'wine'
    },
    {
        id: 'prompt672',
        text: 'Biodynamic wine chat',
        icon: '🌙',
        hint: 'Moon phase farming',
        category: 'wine'
    },
    {
        id: 'prompt673',
        text: 'Wine region geography lesson',
        icon: '🗺️',
        hint: 'Old vs new world',
        category: 'wine'
    },
    {
        id: 'prompt674',
        text: 'Wine score discussion',
        icon: '📊',
        hint: 'Ninety eight points',
        category: 'wine'
    },
    {
        id: 'prompt675',
        text: 'Sommelier certification test',
        icon: '🎓',
        hint: 'Advanced palate',
        category: 'wine'
    },
    {
        id: 'prompt676',
        text: 'Wine and chocolate pairing',
        icon: '🍫',
        hint: 'Sweet combination',
        category: 'wine'
    },
    {
        id: 'prompt677',
        text: 'Pour over lees method',
        icon: '🍷',
        hint: 'Sediment sitting',
        category: 'wine'
    },
    {
        id: 'prompt678',
        text: 'Ice bucket chilling',
        icon: '🧊',
        hint: 'Getting it cold',
        category: 'wine'
    },
    {
        id: 'prompt679',
        text: 'Grand cru explaining',
        icon: '🏆',
        hint: 'Premier vineyard',
        category: 'wine'
    },
    {
        id: 'prompt680',
        text: 'Riddling champagne method',
        icon: '🥂',
        hint: 'Turn the bottle',
        category: 'wine'
    },
    {
        id: 'prompt681',
        text: 'Dry hopping process explain',
        icon: '🍺',
        hint: 'Late hop addition',
        category: 'beer'
    },
    {
        id: 'prompt682',
        text: 'Yeast pitch homebrewing',
        icon: '🧫',
        hint: 'Fermentation begins',
        category: 'beer'
    },
    {
        id: 'prompt683',
        text: 'ABV percentage guessing',
        icon: '🍺',
        hint: 'How strong is it',
        category: 'beer'
    },
    {
        id: 'prompt684',
        text: 'Beer label art admiring',
        icon: '🎨',
        hint: 'Craft packaging',
        category: 'beer'
    },
    {
        id: 'prompt685',
        text: 'Beer festival crowd walk',
        icon: '🍺',
        hint: 'Many tents many beers',
        category: 'beer'
    },
    {
        id: 'prompt686',
        text: 'CAMRA pub crawl tradition',
        icon: '🇬🇧',
        hint: 'Real ale lovers',
        category: 'beer'
    },
    {
        id: 'prompt687',
        text: 'Cask conditioned pour',
        icon: '🍺',
        hint: 'Gravity fed tap',
        category: 'beer'
    },
    {
        id: 'prompt688',
        text: 'Triple fermented ale',
        icon: '🍺',
        hint: 'Complex flavor',
        category: 'beer'
    },
    {
        id: 'prompt689',
        text: 'Märzen Oktoberfest style',
        icon: '🍺',
        hint: 'Seasonal lager',
        category: 'beer'
    },
    {
        id: 'prompt690',
        text: 'Nitro cream ale smoothness',
        icon: '🍺',
        hint: 'Silky texture',
        category: 'beer'
    },
    {
        id: 'prompt691',
        text: 'Belgian trappist debate',
        icon: '⛪',
        hint: 'Monk made brew',
        category: 'beer'
    },
    {
        id: 'prompt692',
        text: 'Adjunct lager criticism',
        icon: '🍺',
        hint: 'Corn rice added',
        category: 'beer'
    },
    {
        id: 'prompt693',
        text: 'Imperial stout sipping',
        icon: '🍺',
        hint: 'Strong dark heavy',
        category: 'beer'
    },
    {
        id: 'prompt694',
        text: 'Gose sour salted beer',
        icon: '🧂',
        hint: 'Unusual combination',
        category: 'beer'
    },
    {
        id: 'prompt695',
        text: 'Hefeweizen glass pour',
        icon: '🍺',
        hint: 'Banana clove notes',
        category: 'beer'
    },
    {
        id: 'prompt696',
        text: 'Pint glass nucleation',
        icon: '🍺',
        hint: 'Bubble cascade',
        category: 'beer'
    },
    {
        id: 'prompt697',
        text: 'Real ale handpump pull',
        icon: '🍺',
        hint: 'Traditional pour',
        category: 'beer'
    },
    {
        id: 'prompt698',
        text: 'Beer keg delivery receipt',
        icon: '📦',
        hint: 'Signed for delivery',
        category: 'beer'
    },
    {
        id: 'prompt699',
        text: 'Tasting room brewery tour',
        icon: '🏭',
        hint: 'Behind the scenes',
        category: 'beer'
    },
    {
        id: 'prompt700',
        text: 'Mystery beer challenge',
        icon: '🍺',
        hint: 'Guess the brewery',
        category: 'beer'
    },
    {
        id: 'prompt701',
        text: 'Truffle fries eating',
        icon: '🍟',
        hint: 'Fancy upgrade',
        category: 'food'
    },
    {
        id: 'prompt702',
        text: 'Lobster roll at bar',
        icon: '🦞',
        hint: 'Fancy bar food',
        category: 'food'
    },
    {
        id: 'prompt703',
        text: 'Poutine late night order',
        icon: '🍟',
        hint: 'Canadian classic',
        category: 'food'
    },
    {
        id: 'prompt704',
        text: 'Bar olives in martini',
        icon: '🫒',
        hint: 'Dirty martini snack',
        category: 'food'
    },
    {
        id: 'prompt705',
        text: 'Edamame pod popping',
        icon: '🌿',
        hint: 'Japanese bar snack',
        category: 'food'
    },
    {
        id: 'prompt706',
        text: 'Pretzel sticks with beer',
        icon: '🥨',
        hint: 'Classic pairing',
        category: 'food'
    },
    {
        id: 'prompt707',
        text: 'Loaded potato skins eating',
        icon: '🥔',
        hint: 'Cheese and bacon',
        category: 'food'
    },
    {
        id: 'prompt708',
        text: 'Ceviche bar appetizer',
        icon: '🍋',
        hint: 'Fresh citrus cured',
        category: 'food'
    },
    {
        id: 'prompt709',
        text: 'Tacos at bar taco tuesday',
        icon: '🌮',
        hint: 'Weekly tradition',
        category: 'food'
    },
    {
        id: 'prompt710',
        text: 'Calamari ring pull apart',
        icon: '🦑',
        hint: 'Fried squid ring',
        category: 'food'
    },
    {
        id: 'prompt711',
        text: 'Shrimp cocktail fancy bar',
        icon: '🍤',
        hint: 'Sauce on the side',
        category: 'food'
    },
    {
        id: 'prompt712',
        text: 'Spinach artichoke dip',
        icon: '🌿',
        hint: 'Hot creamy dip',
        category: 'food'
    },
    {
        id: 'prompt713',
        text: 'Slider tower stacking',
        icon: '🍔',
        hint: 'How high can go',
        category: 'food'
    },
    {
        id: 'prompt714',
        text: 'Bruschetta topping spread',
        icon: '🍅',
        hint: 'Fresh tomato basil',
        category: 'food'
    },
    {
        id: 'prompt715',
        text: 'Quesadilla cutting wedges',
        icon: '🧀',
        hint: 'Cheese pull shot',
        category: 'food'
    },
    {
        id: 'prompt716',
        text: 'Hummus and pita plate',
        icon: '🫙',
        hint: 'Mediterranean snack',
        category: 'food'
    },
    {
        id: 'prompt717',
        text: 'Soft pretzel with mustard',
        icon: '🥨',
        hint: 'Dip and bite',
        category: 'food'
    },
    {
        id: 'prompt718',
        text: 'Charcuterie grape placement',
        icon: '🍇',
        hint: 'Artful arrangement',
        category: 'food'
    },
    {
        id: 'prompt719',
        text: 'Waffle fries with dip',
        icon: '🍟',
        hint: 'Grid pattern fry',
        category: 'food'
    },
    {
        id: 'prompt720',
        text: 'Scotch egg at English pub',
        icon: '🥚',
        hint: 'Wrapped in sausage',
        category: 'food'
    },
    {
        id: 'prompt721',
        text: 'Group photo final round',
        icon: '📸',
        hint: 'Memories captured',
        category: 'leaving'
    },
    {
        id: 'prompt722',
        text: 'Bar crawl final bar',
        icon: '🍺',
        hint: 'Last stop tonight',
        category: 'leaving'
    },
    {
        id: 'prompt723',
        text: 'Promise to return soon',
        icon: '🤝',
        hint: 'Back next Friday',
        category: 'leaving'
    },
    {
        id: 'prompt724',
        text: 'Exchanging numbers leaving',
        icon: '📱',
        hint: 'Let us stay connected',
        category: 'leaving'
    },
    {
        id: 'prompt725',
        text: 'Forgotten jacket retrieval',
        icon: '🧥',
        hint: 'Left at the bar',
        category: 'leaving'
    },
    {
        id: 'prompt726',
        text: 'After party planning',
        icon: '🏠',
        hint: 'Continue at mine',
        category: 'leaving'
    },
    {
        id: 'prompt727',
        text: 'Pre-dawn bar departure',
        icon: '🌙',
        hint: 'Very late night',
        category: 'leaving'
    },
    {
        id: 'prompt728',
        text: 'Emotional goodnight hug',
        icon: '🤗',
        hint: 'Best night ever',
        category: 'leaving'
    },
    {
        id: 'prompt729',
        text: 'Walking buddy to Uber',
        icon: '🚗',
        hint: 'Safe travels friend',
        category: 'leaving'
    },
    {
        id: 'prompt730',
        text: 'Quick bathroom before leaving',
        icon: '🚽',
        hint: 'Last stop first',
        category: 'leaving'
    },
    {
        id: 'prompt731',
        text: 'Checking nothing forgotten',
        icon: '🔍',
        hint: 'Phone keys wallet',
        category: 'leaving'
    },
    {
        id: 'prompt732',
        text: 'Final selfie at bar door',
        icon: '📸',
        hint: 'Before we go',
        category: 'leaving'
    },
    {
        id: 'prompt733',
        text: 'Getting stamp for re-entry',
        icon: '🖊️',
        hint: 'Back soon I hope',
        category: 'leaving'
    },
    {
        id: 'prompt734',
        text: 'Waving to bartender leaving',
        icon: '👋',
        hint: 'See you next time',
        category: 'leaving'
    },
    {
        id: 'prompt735',
        text: 'Missing shoe search',
        icon: '👟',
        hint: 'It must be here',
        category: 'leaving'
    },
    {
        id: 'prompt736',
        text: 'Long slow goodbye tour',
        icon: '👋',
        hint: 'Ten minutes later still',
        category: 'leaving'
    },
    {
        id: 'prompt737',
        text: 'Cold weather shock outside',
        icon: '🥶',
        hint: 'Left the warm bar',
        category: 'leaving'
    },
    {
        id: 'prompt738',
        text: 'Splitting Uber with strangers',
        icon: '🚗',
        hint: 'Sharing ride home',
        category: 'leaving'
    },
    {
        id: 'prompt739',
        text: 'Last minute bathroom run',
        icon: '🚽',
        hint: 'Just one more minute',
        category: 'leaving'
    },
    {
        id: 'prompt740',
        text: 'Stumbling but finding home',
        icon: '🏠',
        hint: 'Made it safe',
        category: 'leaving'
    },
    {
        id: 'prompt741',
        text: 'Making a Paloma cocktail',
        icon: '🍋',
        hint: 'Tequila grapefruit',
        category: 'bartending'
    },
    {
        id: 'prompt742',
        text: 'Crafting a Aperol Spritz',
        icon: '🍊',
        hint: 'Italian afternoon',
        category: 'bartending'
    },
    {
        id: 'prompt743',
        text: 'Tom Collins preparation',
        icon: '🍋',
        hint: 'Tall summer drink',
        category: 'bartending'
    },
    {
        id: 'prompt744',
        text: 'Dark and Stormy mixing',
        icon: '🌊',
        hint: 'Rum and ginger beer',
        category: 'bartending'
    },
    {
        id: 'prompt745',
        text: 'Pisco Sour foam top',
        icon: '🥚',
        hint: 'South American gem',
        category: 'bartending'
    },
    {
        id: 'prompt746',
        text: 'Caipirinha lime muddling',
        icon: '🍋',
        hint: 'Brazilian cocktail',
        category: 'bartending'
    },
    {
        id: 'prompt747',
        text: 'Rum punch bowl making',
        icon: '🍹',
        hint: 'Party serving size',
        category: 'bartending'
    },
    {
        id: 'prompt748',
        text: 'Japanese whisky highball',
        icon: '🥃',
        hint: 'Precise dilution',
        category: 'bartending'
    },
    {
        id: 'prompt749',
        text: 'Michelada spicy beer',
        icon: '🌶️',
        hint: 'Tomato beer mix',
        category: 'bartending'
    },
    {
        id: 'prompt750',
        text: 'Harvey Wallbanger serve',
        icon: '🍊',
        hint: 'Galliano float',
        category: 'bartending'
    },
    {
        id: 'prompt751',
        text: 'Fog machine cocktail',
        icon: '💨',
        hint: 'Dry ice effect',
        category: 'bartending'
    },
    {
        id: 'prompt752',
        text: 'Cotton candy garnish',
        icon: '🍬',
        hint: 'Sweet cloud top',
        category: 'bartending'
    },
    {
        id: 'prompt753',
        text: 'Dehydrated wheel garnish',
        icon: '🍋',
        hint: 'Dried fruit art',
        category: 'bartending'
    },
    {
        id: 'prompt754',
        text: 'Caviar garnish luxury',
        icon: '🫧',
        hint: 'High end touch',
        category: 'bartending'
    },
    {
        id: 'prompt755',
        text: 'Pressed juice fresh squeeze',
        icon: '🍊',
        hint: 'Fresh squeezed only',
        category: 'bartending'
    },
    {
        id: 'prompt756',
        text: 'Activated charcoal cocktail',
        icon: '⚫',
        hint: 'Black dramatic drink',
        category: 'bartending'
    },
    {
        id: 'prompt757',
        text: 'Butterfly pea flower color',
        icon: '💜',
        hint: 'Color changing magic',
        category: 'bartending'
    },
    {
        id: 'prompt758',
        text: 'Sea buckthorn syrup pour',
        icon: '🟡',
        hint: 'Unusual ingredient',
        category: 'bartending'
    },
    {
        id: 'prompt759',
        text: 'Clarified milk punch',
        icon: '🥛',
        hint: 'Crystal clear cocktail',
        category: 'bartending'
    },
    {
        id: 'prompt760',
        text: 'Bar spoon twisted stir',
        icon: '🥄',
        hint: '45 rotations needed',
        category: 'bartending'
    },
    {
        id: 'prompt761',
        text: 'Introducing yourself badly',
        icon: '😬',
        hint: 'Wrong name first',
        category: 'social'
    },
    {
        id: 'prompt762',
        text: 'Pretending to know someone',
        icon: '😅',
        hint: 'I totally remember you',
        category: 'social'
    },
    {
        id: 'prompt763',
        text: 'Overhearing a proposal',
        icon: '💍',
        hint: 'Witnessed the moment',
        category: 'social'
    },
    {
        id: 'prompt764',
        text: 'Being a peacock at bar',
        icon: '🦚',
        hint: 'Look at me please',
        category: 'social'
    },
    {
        id: 'prompt765',
        text: 'Speed dating at bar',
        icon: '⏱️',
        hint: 'Two minute romance',
        category: 'social'
    },
    {
        id: 'prompt766',
        text: 'Joining stranger photo',
        icon: '📸',
        hint: 'Photobombing nicely',
        category: 'social'
    },
    {
        id: 'prompt767',
        text: 'Bar debate getting heated',
        icon: '🗣️',
        hint: 'Everyone has opinion',
        category: 'social'
    },
    {
        id: 'prompt768',
        text: 'Meeting bar cat or dog',
        icon: '🐱',
        hint: 'Venue mascot time',
        category: 'social'
    },
    {
        id: 'prompt769',
        text: 'Helping someone propose',
        icon: '💍',
        hint: 'Ring hidden in glass',
        category: 'social'
    },
    {
        id: 'prompt770',
        text: 'Toasting a stranger toast',
        icon: '🥂',
        hint: 'Cheers to you',
        category: 'social'
    },
    {
        id: 'prompt771',
        text: 'Neighborhood bar recognition',
        icon: '👋',
        hint: 'Everyone knows you',
        category: 'social'
    },
    {
        id: 'prompt772',
        text: 'Bartender therapy session',
        icon: '🛋️',
        hint: 'Pour and listen',
        category: 'social'
    },
    {
        id: 'prompt773',
        text: 'Phone number on receipt',
        icon: '📝',
        hint: 'Bartender liked you',
        category: 'social'
    },
    {
        id: 'prompt774',
        text: 'First date bar nerves',
        icon: '😰',
        hint: 'Order something cool',
        category: 'social'
    },
    {
        id: 'prompt775',
        text: 'Catching someone staring',
        icon: '👀',
        hint: 'Eye contact made',
        category: 'social'
    },
    {
        id: 'prompt776',
        text: 'Sending drink to stranger',
        icon: '🍺',
        hint: 'Drink from me',
        category: 'social'
    },
    {
        id: 'prompt777',
        text: 'Refusing a drink offer',
        icon: '✋',
        hint: 'No thank you kindly',
        category: 'social'
    },
    {
        id: 'prompt778',
        text: 'Group whisper chain',
        icon: '🤫',
        hint: 'Telephone game bar',
        category: 'social'
    },
    {
        id: 'prompt779',
        text: 'Bar bet handshake seal',
        icon: '🤝',
        hint: 'You are on',
        category: 'social'
    },
    {
        id: 'prompt780',
        text: 'Crowd parting entrance',
        icon: '😎',
        hint: 'Celebrity arrival',
        category: 'social'
    },
    {
        id: 'prompt781',
        text: 'Palate cleanser water sip',
        icon: '💧',
        hint: 'Reset the tongue',
        category: 'drinking'
    },
    {
        id: 'prompt782',
        text: 'Beer back whiskey order',
        icon: '🍺',
        hint: 'Chaser tradition',
        category: 'drinking'
    },
    {
        id: 'prompt783',
        text: 'Neat drink specification',
        icon: '🥃',
        hint: 'No ice no water',
        category: 'drinking'
    },
    {
        id: 'prompt784',
        text: 'On the rocks request',
        icon: '🧊',
        hint: 'Ice preferred please',
        category: 'drinking'
    },
    {
        id: 'prompt785',
        text: 'Virgin version order',
        icon: '🍹',
        hint: 'Non alcoholic please',
        category: 'drinking'
    },
    {
        id: 'prompt786',
        text: 'Wine spritzer summer choice',
        icon: '🍷',
        hint: 'Light and bubbly',
        category: 'drinking'
    },
    {
        id: 'prompt787',
        text: 'Craft beer trade off',
        icon: '🍺',
        hint: 'Try some of mine',
        category: 'drinking'
    },
    {
        id: 'prompt788',
        text: 'Half pint order choice',
        icon: '🍺',
        hint: 'Not a full pint',
        category: 'drinking'
    },
    {
        id: 'prompt789',
        text: 'Digestif after dinner',
        icon: '🥃',
        hint: 'Settle the stomach',
        category: 'drinking'
    },
    {
        id: 'prompt790',
        text: 'Pre-game warmup shots',
        icon: '🥃',
        hint: 'Before the bar',
        category: 'drinking'
    },
    {
        id: 'prompt791',
        text: 'Detox tea at bar',
        icon: '🍵',
        hint: 'Wellness check',
        category: 'drinking'
    },
    {
        id: 'prompt792',
        text: 'Kombucha at craft bar',
        icon: '🫧',
        hint: 'Fermented and fancy',
        category: 'drinking'
    },
    {
        id: 'prompt793',
        text: 'Sharing pitcher of beer',
        icon: '🍺',
        hint: 'Table gets jug',
        category: 'drinking'
    },
    {
        id: 'prompt794',
        text: 'Single malt tasting flight',
        icon: '🥃',
        hint: 'Scotch exploration',
        category: 'drinking'
    },
    {
        id: 'prompt795',
        text: 'Vermouth tasting straight',
        icon: '🍸',
        hint: 'Fortified wine sip',
        category: 'drinking'
    },
    {
        id: 'prompt796',
        text: 'Mezcal smoky reveal',
        icon: '🌵',
        hint: 'Not tequila friend',
        category: 'drinking'
    },
    {
        id: 'prompt797',
        text: 'Absinthe drip ceremony',
        icon: '💚',
        hint: 'Water over sugar',
        category: 'drinking'
    },
    {
        id: 'prompt798',
        text: 'Shochu straight Japanese',
        icon: '🇯🇵',
        hint: 'Spirit unique',
        category: 'drinking'
    },
    {
        id: 'prompt799',
        text: 'Rum agricole tasting',
        icon: '🌿',
        hint: 'Grassy sugarcane',
        category: 'drinking'
    },
    {
        id: 'prompt800',
        text: 'Genever gin history sip',
        icon: '🇳🇱',
        hint: 'Dutch original gin',
        category: 'drinking'
    },
    {
        id: 'prompt801',
        text: 'Choosing a power anthem',
        icon: '🎤',
        hint: 'Stadium rock choice',
        category: 'karaoke'
    },
    {
        id: 'prompt802',
        text: 'Upstaging the main singer',
        icon: '😤',
        hint: 'Harmony takeover',
        category: 'karaoke'
    },
    {
        id: 'prompt803',
        text: 'Slow jam with stranger',
        icon: '🎵',
        hint: 'Intimate duet',
        category: 'karaoke'
    },
    {
        id: 'prompt804',
        text: 'Country song arm wave',
        icon: '🤠',
        hint: 'Sway together',
        category: 'karaoke'
    },
    {
        id: 'prompt805',
        text: 'Rock song head banging',
        icon: '🎸',
        hint: 'Hair everywhere',
        category: 'karaoke'
    },
    {
        id: 'prompt806',
        text: '80s hair band ballad',
        icon: '💈',
        hint: 'Big hair power',
        category: 'karaoke'
    },
    {
        id: 'prompt807',
        text: 'Karaoke host joke bombing',
        icon: '😬',
        hint: 'Crickets response',
        category: 'karaoke'
    },
    {
        id: 'prompt808',
        text: 'Crowd request shouting',
        icon: '📢',
        hint: 'Play that song',
        category: 'karaoke'
    },
    {
        id: 'prompt809',
        text: 'Bonus round encore demand',
        icon: '🎤',
        hint: 'One more song',
        category: 'karaoke'
    },
    {
        id: 'prompt810',
        text: 'Karaoke trophy accepting',
        icon: '🏆',
        hint: 'Best singer here',
        category: 'karaoke'
    },
    {
        id: 'prompt811',
        text: 'Dramatic lyric misread',
        icon: '😂',
        hint: 'Wrong word sung',
        category: 'karaoke'
    },
    {
        id: 'prompt812',
        text: 'Whisper singing shyly',
        icon: '🎤',
        hint: 'So quiet now',
        category: 'karaoke'
    },
    {
        id: 'prompt813',
        text: 'Scream singing metal song',
        icon: '🤘',
        hint: 'Too much volume',
        category: 'karaoke'
    },
    {
        id: 'prompt814',
        text: 'Dancing and singing combo',
        icon: '💃',
        hint: 'Multi tasker',
        category: 'karaoke'
    },
    {
        id: 'prompt815',
        text: 'Song dedication announcement',
        icon: '🎤',
        hint: 'This one for you',
        category: 'karaoke'
    },
    {
        id: 'prompt816',
        text: 'Karaoke machine malfunction',
        icon: '🎵',
        hint: 'Buffer moment',
        category: 'karaoke'
    },
    {
        id: 'prompt817',
        text: 'Prop use during song',
        icon: '🎸',
        hint: 'Pretend guitar',
        category: 'karaoke'
    },
    {
        id: 'prompt818',
        text: 'Song choice anxiety',
        icon: '😰',
        hint: 'Too many options',
        category: 'karaoke'
    },
    {
        id: 'prompt819',
        text: 'Harmony part holding long',
        icon: '🎵',
        hint: 'Sustained note',
        category: 'karaoke'
    },
    {
        id: 'prompt820',
        text: 'Standing ovation receiving',
        icon: '👏',
        hint: 'Bow gracefully',
        category: 'karaoke'
    },
    {
        id: 'prompt821',
        text: 'March madness bracket reveal',
        icon: '📋',
        hint: 'My picks are set',
        category: 'sports'
    },
    {
        id: 'prompt822',
        text: 'World Cup penalty watch',
        icon: '⚽',
        hint: 'Gripping moment',
        category: 'sports'
    },
    {
        id: 'prompt823',
        text: 'Watching overtime thriller',
        icon: '📺',
        hint: 'Do not blink now',
        category: 'sports'
    },
    {
        id: 'prompt824',
        text: 'Fantasy football trash talk',
        icon: '📱',
        hint: 'Your team is bad',
        category: 'sports'
    },
    {
        id: 'prompt825',
        text: 'Boxing match commentary',
        icon: '🥊',
        hint: 'Blow by blow',
        category: 'sports'
    },
    {
        id: 'prompt826',
        text: 'Pub quiz sports question',
        icon: '🧠',
        hint: 'Extra time answer',
        category: 'sports'
    },
    {
        id: 'prompt827',
        text: 'Horse racing bet watching',
        icon: '🐴',
        hint: 'Come on number five',
        category: 'sports'
    },
    {
        id: 'prompt828',
        text: 'Cricket pub watching',
        icon: '🏏',
        hint: 'Wicket celebration',
        category: 'sports'
    },
    {
        id: 'prompt829',
        text: 'Rugby pub viewing party',
        icon: '🏉',
        hint: 'Scrum reenactment',
        category: 'sports'
    },
    {
        id: 'prompt830',
        text: 'F1 race bar broadcast',
        icon: '🏎️',
        hint: 'Pit stop timing',
        category: 'sports'
    },
    {
        id: 'prompt831',
        text: 'Tennis match tie break',
        icon: '🎾',
        hint: 'Deuce again',
        category: 'sports'
    },
    {
        id: 'prompt832',
        text: 'Golf putt watching silently',
        icon: '⛳',
        hint: 'Quiet please gallery',
        category: 'sports'
    },
    {
        id: 'prompt833',
        text: 'NBA playoffs bar crowd',
        icon: '🏀',
        hint: 'Downtown three pointer',
        category: 'sports'
    },
    {
        id: 'prompt834',
        text: 'Tour de France watching',
        icon: '🚴',
        hint: 'Mountain stage climb',
        category: 'sports'
    },
    {
        id: 'prompt835',
        text: 'Olympics opening ceremony',
        icon: '🏅',
        hint: 'Flag bearer walk',
        category: 'sports'
    },
    {
        id: 'prompt836',
        text: 'Curling confused watching',
        icon: '🥌',
        hint: 'Strategy or luck',
        category: 'sports'
    },
    {
        id: 'prompt837',
        text: 'Snooker maximum break',
        icon: '🎱',
        hint: 'One four seven',
        category: 'sports'
    },
    {
        id: 'prompt838',
        text: 'Darts finish checkout',
        icon: '🎯',
        hint: 'Double bull finish',
        category: 'sports'
    },
    {
        id: 'prompt839',
        text: 'Pool shark run the table',
        icon: '🎱',
        hint: 'Eight ball last',
        category: 'sports'
    },
    {
        id: 'prompt840',
        text: 'Bowling perfect game',
        icon: '🎳',
        hint: 'Twelve strikes straight',
        category: 'sports'
    },
    {
        id: 'prompt841',
        text: 'Pub quiz team victory',
        icon: '🏆',
        hint: 'Trivia champions now',
        category: 'celebration'
    },
    {
        id: 'prompt842',
        text: 'Darts league cup win',
        icon: '🎯',
        hint: 'Sharp shooting champs',
        category: 'celebration'
    },
    {
        id: 'prompt843',
        text: 'Beer garden summer open',
        icon: '🌞',
        hint: 'Finally warm outside',
        category: 'celebration'
    },
    {
        id: 'prompt844',
        text: 'Bar anniversary milestone',
        icon: '🎂',
        hint: 'One year open tonight',
        category: 'celebration'
    },
    {
        id: 'prompt845',
        text: 'Newly legal first drink',
        icon: '🆔',
        hint: 'Finally twenty one',
        category: 'celebration'
    },
    {
        id: 'prompt846',
        text: 'Lost bet pay up',
        icon: '💰',
        hint: 'I owe you this',
        category: 'celebration'
    },
    {
        id: 'prompt847',
        text: 'First marathon finish drink',
        icon: '🏃',
        hint: 'Earned this beer',
        category: 'celebration'
    },
    {
        id: 'prompt848',
        text: 'Publishing deal toast',
        icon: '📚',
        hint: 'Book deal achieved',
        category: 'celebration'
    },
    {
        id: 'prompt849',
        text: 'Sobriety date celebration',
        icon: '🌟',
        hint: 'Milestone achievement',
        category: 'celebration'
    },
    {
        id: 'prompt850',
        text: 'Foster pet adoption toast',
        icon: '🐾',
        hint: 'Welcome home pet',
        category: 'celebration'
    },
    {
        id: 'prompt851',
        text: 'Successful surgery toast',
        icon: '🏥',
        hint: 'All clear cheers',
        category: 'celebration'
    },
    {
        id: 'prompt852',
        text: 'Concert after party drinks',
        icon: '🎵',
        hint: 'Show was amazing',
        category: 'celebration'
    },
    {
        id: 'prompt853',
        text: 'Leaving the country party',
        icon: '✈️',
        hint: 'Adventure calls',
        category: 'celebration'
    },
    {
        id: 'prompt854',
        text: 'Wrapping film production',
        icon: '🎬',
        hint: 'That is a wrap',
        category: 'celebration'
    },
    {
        id: 'prompt855',
        text: 'Book club finish drinks',
        icon: '📖',
        hint: 'Chapter completed',
        category: 'celebration'
    },
    {
        id: 'prompt856',
        text: 'Fantasy league winner toast',
        icon: '🏆',
        hint: 'Best picks this year',
        category: 'celebration'
    },
    {
        id: 'prompt857',
        text: 'Hot sauce challenge win',
        icon: '🌶️',
        hint: 'Face is on fire',
        category: 'celebration'
    },
    {
        id: 'prompt858',
        text: 'Escape room victory drink',
        icon: '🗝️',
        hint: 'We escaped together',
        category: 'celebration'
    },
    {
        id: 'prompt859',
        text: 'Open mic night success',
        icon: '🎤',
        hint: 'First performance done',
        category: 'celebration'
    },
    {
        id: 'prompt860',
        text: 'Dry January end party',
        icon: '🍾',
        hint: 'February first again',
        category: 'celebration'
    },
    {
        id: 'prompt861',
        text: 'Chartreuse shot ritual',
        icon: '💚',
        hint: 'Holy spirit pour',
        category: 'bartending'
    },
    {
        id: 'prompt862',
        text: 'Fernet digestif tradition',
        icon: '🍃',
        hint: 'After dinner bitter',
        category: 'bartending'
    },
    {
        id: 'prompt863',
        text: 'Calvados apple brandy',
        icon: '🍎',
        hint: 'Norman French spirit',
        category: 'bartending'
    },
    {
        id: 'prompt864',
        text: 'Grappa grape pomace sip',
        icon: '🍇',
        hint: 'Italian digestif',
        category: 'bartending'
    },
    {
        id: 'prompt865',
        text: 'Aquavit caraway pour',
        icon: '🌿',
        hint: 'Scandinavian spirit',
        category: 'bartending'
    },
    {
        id: 'prompt866',
        text: 'Baijiu Chinese spirit',
        icon: '🇨🇳',
        hint: 'Strong grain spirit',
        category: 'bartending'
    },
    {
        id: 'prompt867',
        text: 'Cachaça Caipirinha base',
        icon: '🌿',
        hint: 'Brazilian sugarcane',
        category: 'bartending'
    },
    {
        id: 'prompt868',
        text: 'Singani South American spirit',
        icon: '🇧🇴',
        hint: 'Bolivian heritage',
        category: 'bartending'
    },
    {
        id: 'prompt869',
        text: 'Sotol Mexican desert spirit',
        icon: '🌵',
        hint: 'Not quite mezcal',
        category: 'bartending'
    },
    {
        id: 'prompt870',
        text: 'Poitin Irish moonshine',
        icon: '🇮🇪',
        hint: 'Illegal no longer',
        category: 'bartending'
    },
    {
        id: 'prompt871',
        text: 'Amaro liqueur collection',
        icon: '🌿',
        hint: 'Bitter herbal pour',
        category: 'bartending'
    },
    {
        id: 'prompt872',
        text: 'Sherry cobbler serve',
        icon: '🍊',
        hint: 'Crushed ice mound',
        category: 'bartending'
    },
    {
        id: 'prompt873',
        text: 'Punch bowl ladle serve',
        icon: '🍹',
        hint: 'Communal drinking',
        category: 'bartending'
    },
    {
        id: 'prompt874',
        text: 'Temperance mocktail menu',
        icon: '🌿',
        hint: 'Sober options here',
        category: 'bartending'
    },
    {
        id: 'prompt875',
        text: 'Low ABV session serve',
        icon: '🍸',
        hint: 'Mindful drinking choice',
        category: 'bartending'
    },
    {
        id: 'prompt876',
        text: 'Fermented tea cocktail',
        icon: '🍵',
        hint: 'Kombucha base mix',
        category: 'bartending'
    },
    {
        id: 'prompt877',
        text: 'Shrub vinegar drink',
        icon: '🍓',
        hint: 'Drinking vinegar yes',
        category: 'bartending'
    },
    {
        id: 'prompt878',
        text: 'Oleo saccharum squeeze',
        icon: '🍋',
        hint: 'Oil sugar technique',
        category: 'bartending'
    },
    {
        id: 'prompt879',
        text: 'Lacto fermented syrup',
        icon: '🫙',
        hint: 'Probiotic sweetness',
        category: 'bartending'
    },
    {
        id: 'prompt880',
        text: 'Garum umami cocktail',
        icon: '🐟',
        hint: 'Savory surprise drink',
        category: 'bartending'
    },
    {
        id: 'prompt881',
        text: 'Escape room puzzle solve',
        icon: '🗝️',
        hint: 'Think think faster',
        category: 'games'
    },
    {
        id: 'prompt882',
        text: 'Axe throwing at bar',
        icon: '🪓',
        hint: 'Stick it in wood',
        category: 'games'
    },
    {
        id: 'prompt883',
        text: 'Bowling league signup',
        icon: '🎳',
        hint: 'Weekly competition',
        category: 'games'
    },
    {
        id: 'prompt884',
        text: 'Bocce ball outdoor bar',
        icon: '⚪',
        hint: 'Roll near pallino',
        category: 'games'
    },
    {
        id: 'prompt885',
        text: 'Croquet lawn bar game',
        icon: '🏑',
        hint: 'Through the hoops',
        category: 'games'
    },
    {
        id: 'prompt886',
        text: 'Badminton set up bar',
        icon: '🏸',
        hint: 'Net in the garden',
        category: 'games'
    },
    {
        id: 'prompt887',
        text: 'KanJam frisbee toss',
        icon: '🥏',
        hint: 'Slot in the can',
        category: 'games'
    },
    {
        id: 'prompt888',
        text: 'Hammerschlagen nail drive',
        icon: '🔨',
        hint: 'One hit per turn',
        category: 'games'
    },
    {
        id: 'prompt889',
        text: 'Kubb lawn game throw',
        icon: '🪵',
        hint: 'Knock the blocks',
        category: 'games'
    },
    {
        id: 'prompt890',
        text: 'Mölkky Finnish pins game',
        icon: '🎯',
        hint: 'Numbered pin score',
        category: 'games'
    },
    {
        id: 'prompt891',
        text: 'Giant chess outdoor',
        icon: '♟️',
        hint: 'Life size pieces',
        category: 'games'
    },
    {
        id: 'prompt892',
        text: 'Ladder toss bolo throw',
        icon: '🪜',
        hint: 'Hook the rungs',
        category: 'games'
    },
    {
        id: 'prompt893',
        text: 'Washer toss pit game',
        icon: '🔩',
        hint: 'Drop in the box',
        category: 'games'
    },
    {
        id: 'prompt894',
        text: 'Spikeball bounce return',
        icon: '🏐',
        hint: 'Rim shot return',
        category: 'games'
    },
    {
        id: 'prompt895',
        text: 'Yard dice roll game',
        icon: '🎲',
        hint: 'Big foam cubes',
        category: 'games'
    },
    {
        id: 'prompt896',
        text: 'Disc golf frisbee toss',
        icon: '🥏',
        hint: 'Into the basket',
        category: 'games'
    },
    {
        id: 'prompt897',
        text: 'Table tennis bar match',
        icon: '🏓',
        hint: 'Back and forth',
        category: 'games'
    },
    {
        id: 'prompt898',
        text: 'Horseshoe pit throw',
        icon: '🧲',
        hint: 'Ringer lands perfect',
        category: 'games'
    },
    {
        id: 'prompt899',
        text: 'Caber toss bar contest',
        icon: '🪵',
        hint: 'Scottish bar game',
        category: 'games'
    },
    {
        id: 'prompt900',
        text: 'Tug of war bar teams',
        icon: '🪢',
        hint: 'Pull together now',
        category: 'games'
    },
    {
        id: 'prompt901',
        text: 'Late night confession time',
        icon: '🌙',
        hint: 'Secrets come out',
        category: 'social'
    },
    {
        id: 'prompt902',
        text: 'Philosophy drunk talk',
        icon: '🤔',
        hint: 'Meaning of life now',
        category: 'social'
    },
    {
        id: 'prompt903',
        text: 'Conspiracy theory sharing',
        icon: '🛸',
        hint: 'Bar stool theories',
        category: 'social'
    },
    {
        id: 'prompt904',
        text: 'Solving world problems',
        icon: '🌍',
        hint: 'Bar philosophers unite',
        category: 'social'
    },
    {
        id: 'prompt905',
        text: 'Crying over a film plot',
        icon: '😭',
        hint: 'That scene got me',
        category: 'social'
    },
    {
        id: 'prompt906',
        text: 'Bonding over bad sports team',
        icon: '😩',
        hint: 'We suffer together',
        category: 'social'
    },
    {
        id: 'prompt907',
        text: 'Exchanging playlists',
        icon: '📱',
        hint: 'Good music taste',
        category: 'social'
    },
    {
        id: 'prompt908',
        text: 'Debating best pizza topping',
        icon: '🍕',
        hint: 'Wrong take detected',
        category: 'social'
    },
    {
        id: 'prompt909',
        text: 'Arguing hotdog is sandwich',
        icon: '🌭',
        hint: 'Valid point maybe',
        category: 'social'
    },
    {
        id: 'prompt910',
        text: 'Best city comparison talk',
        icon: '🏙️',
        hint: 'Where is better',
        category: 'social'
    },
    {
        id: 'prompt911',
        text: 'Career pivot confession',
        icon: '💼',
        hint: 'Quitting my job soon',
        category: 'social'
    },
    {
        id: 'prompt912',
        text: 'Travel story sharing',
        icon: '✈️',
        hint: 'You have to go there',
        category: 'social'
    },
    {
        id: 'prompt913',
        text: 'Favorite childhood memory',
        icon: '👶',
        hint: 'Back in the day',
        category: 'social'
    },
    {
        id: 'prompt914',
        text: 'Relationship status update',
        icon: '💔',
        hint: 'It is complicated',
        category: 'social'
    },
    {
        id: 'prompt915',
        text: 'Dream life discussion',
        icon: '🌟',
        hint: 'What would you do',
        category: 'social'
    },
    {
        id: 'prompt916',
        text: 'Pet photo showing off',
        icon: '🐶',
        hint: 'Look at my dog',
        category: 'social'
    },
    {
        id: 'prompt917',
        text: 'Home renovation talk',
        icon: '🔨',
        hint: 'It takes forever',
        category: 'social'
    },
    {
        id: 'prompt918',
        text: 'Finance tip sharing',
        icon: '💰',
        hint: 'Invest they said',
        category: 'social'
    },
    {
        id: 'prompt919',
        text: 'Bar regular status claim',
        icon: '👑',
        hint: 'I am basically staff',
        category: 'social'
    },
    {
        id: 'prompt920',
        text: 'Last call conversation start',
        icon: '🔔',
        hint: 'Want to talk more',
        category: 'social'
    },
    {
        id: 'prompt921',
        text: 'Sipping really hot toddy',
        icon: '♨️',
        hint: 'Steam rising up',
        category: 'drinking'
    },
    {
        id: 'prompt922',
        text: 'Mixing own cocktail attempt',
        icon: '🍸',
        hint: 'Bar kit at home',
        category: 'drinking'
    },
    {
        id: 'prompt923',
        text: 'Wine glass size debate',
        icon: '🍷',
        hint: 'Standard pour only',
        category: 'drinking'
    },
    {
        id: 'prompt924',
        text: 'Cocktail competition judging',
        icon: '🏆',
        hint: 'Score each drink',
        category: 'drinking'
    },
    {
        id: 'prompt925',
        text: 'Amateur tasting notes write',
        icon: '📝',
        hint: 'Complex flavors here',
        category: 'drinking'
    },
    {
        id: 'prompt926',
        text: 'Pairing tequila with food',
        icon: '🌮',
        hint: 'Match the spirit',
        category: 'drinking'
    },
    {
        id: 'prompt927',
        text: 'Sensory evaluation class',
        icon: '👁️',
        hint: 'See smell taste',
        category: 'drinking'
    },
    {
        id: 'prompt928',
        text: 'Barrel tasting at distillery',
        icon: '🪣',
        hint: 'Straight from wood',
        category: 'drinking'
    },
    {
        id: 'prompt929',
        text: 'Cask strength pour heat',
        icon: '🔥',
        hint: 'Dilute if needed',
        category: 'drinking'
    },
    {
        id: 'prompt930',
        text: 'Mead honey wine tasting',
        icon: '🍯',
        hint: 'Viking brew sip',
        category: 'drinking'
    },
    {
        id: 'prompt931',
        text: 'Cider flight tasting orchard',
        icon: '🍎',
        hint: 'Many apple types',
        category: 'drinking'
    },
    {
        id: 'prompt932',
        text: 'Hard seltzer variety pack',
        icon: '🫧',
        hint: 'Flavored bubbles',
        category: 'drinking'
    },
    {
        id: 'prompt933',
        text: 'CBD infused drink curiosity',
        icon: '🌿',
        hint: 'Relaxing cocktail',
        category: 'drinking'
    },
    {
        id: 'prompt934',
        text: 'Protein cocktail gym bar',
        icon: '💪',
        hint: 'Shaken not stirred',
        category: 'drinking'
    },
    {
        id: 'prompt935',
        text: 'Cold brew coffee cocktail',
        icon: '☕',
        hint: 'Caffeine plus booze',
        category: 'drinking'
    },
    {
        id: 'prompt936',
        text: 'Matcha latte cocktail',
        icon: '🍵',
        hint: 'Green color drink',
        category: 'drinking'
    },
    {
        id: 'prompt937',
        text: 'Turmeric shot at health bar',
        icon: '💛',
        hint: 'Anti inflammatory',
        category: 'drinking'
    },
    {
        id: 'prompt938',
        text: 'Pickle back shot tradition',
        icon: '🥒',
        hint: 'Shot then brine',
        category: 'drinking'
    },
    {
        id: 'prompt939',
        text: 'Oyster shooter slurp',
        icon: '🦪',
        hint: 'Sea in a glass',
        category: 'drinking'
    },
    {
        id: 'prompt940',
        text: 'Bloody Mary meal drink',
        icon: '🍅',
        hint: 'Breakfast cocktail',
        category: 'drinking'
    },
    {
        id: 'prompt941',
        text: '70s disco revival night',
        icon: '🕺',
        hint: 'Funky moves only',
        category: 'party'
    },
    {
        id: 'prompt942',
        text: 'Punk rock bar night',
        icon: '🤘',
        hint: 'Safety pins fashion',
        category: 'party'
    },
    {
        id: 'prompt943',
        text: 'Rave themed bar event',
        icon: '🎧',
        hint: 'Glow sticks out',
        category: 'party'
    },
    {
        id: 'prompt944',
        text: 'Hip hop night at bar',
        icon: '🎤',
        hint: 'Rap battle starts',
        category: 'party'
    },
    {
        id: 'prompt945',
        text: 'Jazz night at cocktail bar',
        icon: '🎷',
        hint: 'Smooth sounds night',
        category: 'party'
    },
    {
        id: 'prompt946',
        text: 'Blues night pub gathering',
        icon: '🎸',
        hint: 'Twelve bar blues',
        category: 'party'
    },
    {
        id: 'prompt947',
        text: 'Reggae bar event night',
        icon: '🌴',
        hint: 'Riddim and drinks',
        category: 'party'
    },
    {
        id: 'prompt948',
        text: 'Country line dance night',
        icon: '🤠',
        hint: 'Boot scootin time',
        category: 'party'
    },
    {
        id: 'prompt949',
        text: 'Classical music bar event',
        icon: '🎻',
        hint: 'Formal drinking',
        category: 'party'
    },
    {
        id: 'prompt950',
        text: 'Speed dating night out',
        icon: '⏱️',
        hint: 'Three minute rounds',
        category: 'party'
    },
    {
        id: 'prompt951',
        text: 'Open mic poetry night',
        icon: '📝',
        hint: 'Verse and chorus',
        category: 'party'
    },
    {
        id: 'prompt952',
        text: 'Comedy open mic bar',
        icon: '😂',
        hint: 'Amateur hour night',
        category: 'party'
    },
    {
        id: 'prompt953',
        text: 'Art gallery opening bar',
        icon: '🖼️',
        hint: 'Wine and art night',
        category: 'party'
    },
    {
        id: 'prompt954',
        text: 'Game show bar night',
        icon: '🎮',
        hint: 'Contestant ready now',
        category: 'party'
    },
    {
        id: 'prompt955',
        text: 'Paint and sip evening',
        icon: '🎨',
        hint: 'Creative drinking',
        category: 'party'
    },
    {
        id: 'prompt956',
        text: 'Cocktail masterclass night',
        icon: '🍸',
        hint: 'Learn while drink',
        category: 'party'
    },
    {
        id: 'prompt957',
        text: 'Whiskey dinner pairing',
        icon: '🥃',
        hint: 'Course by course',
        category: 'party'
    },
    {
        id: 'prompt958',
        text: 'Beer garden opening day',
        icon: '🌞',
        hint: 'Sunny day drinks',
        category: 'party'
    },
    {
        id: 'prompt959',
        text: 'Outdoor terrace night',
        icon: '🌙',
        hint: 'Stars above sipping',
        category: 'party'
    },
    {
        id: 'prompt960',
        text: 'Speakeasy password night',
        icon: '🔐',
        hint: 'Know the code',
        category: 'party'
    },
    {
        id: 'prompt961',
        text: 'Fondue dipping station',
        icon: '🫕',
        hint: 'Swirl in the cheese',
        category: 'food'
    },
    {
        id: 'prompt962',
        text: 'Sushi bar counter eating',
        icon: '🍣',
        hint: 'Omakase please chef',
        category: 'food'
    },
    {
        id: 'prompt963',
        text: 'Taco truck outside bar',
        icon: '🌮',
        hint: 'Queue up hungry',
        category: 'food'
    },
    {
        id: 'prompt964',
        text: 'Pizza delivery to bar',
        icon: '🍕',
        hint: 'Late night arrives',
        category: 'food'
    },
    {
        id: 'prompt965',
        text: 'Cheese board selection',
        icon: '🧀',
        hint: 'Name each one',
        category: 'food'
    },
    {
        id: 'prompt966',
        text: 'Bar nuts sharing dispute',
        icon: '🥜',
        hint: 'That was my cashew',
        category: 'food'
    },
    {
        id: 'prompt967',
        text: 'Kimchi at fusion bar',
        icon: '🌶️',
        hint: 'Fermented and spicy',
        category: 'food'
    },
    {
        id: 'prompt968',
        text: 'Banh mi bar food',
        icon: '🥖',
        hint: 'Vietnamese sandwich',
        category: 'food'
    },
    {
        id: 'prompt969',
        text: 'Ramen late night bar',
        icon: '🍜',
        hint: 'Noodles after drinks',
        category: 'food'
    },
    {
        id: 'prompt970',
        text: 'Empanadas hand food',
        icon: '🫓',
        hint: 'South American snack',
        category: 'food'
    },
    {
        id: 'prompt971',
        text: 'Korean fried chicken',
        icon: '🍗',
        hint: 'Twice fried method',
        category: 'food'
    },
    {
        id: 'prompt972',
        text: 'Loaded fries tower eat',
        icon: '🍟',
        hint: 'Toppings falling off',
        category: 'food'
    },
    {
        id: 'prompt973',
        text: 'Bar cheesesteak Philly',
        icon: '🥩',
        hint: 'Whiz or provolone',
        category: 'food'
    },
    {
        id: 'prompt974',
        text: 'Pigs in blanket party',
        icon: '🌭',
        hint: 'Tiny sausage roll',
        category: 'food'
    },
    {
        id: 'prompt975',
        text: 'Caprese skewer eating',
        icon: '🍅',
        hint: 'Tomato mozzarella',
        category: 'food'
    },
    {
        id: 'prompt976',
        text: 'Halloumi fries crispy',
        icon: '🧀',
        hint: 'Squeaky cheese fry',
        category: 'food'
    },
    {
        id: 'prompt977',
        text: 'Chilli dog eating contest',
        icon: '🌭',
        hint: 'Sloppy and delicious',
        category: 'food'
    },
    {
        id: 'prompt978',
        text: 'Nachos with all toppings',
        icon: '🫙',
        hint: 'Supreme loaded order',
        category: 'food'
    },
    {
        id: 'prompt979',
        text: 'Tzatziki dip bread',
        icon: '🥒',
        hint: 'Greek mezze plate',
        category: 'food'
    },
    {
        id: 'prompt980',
        text: 'Popcorn shrimp basket',
        icon: '🍤',
        hint: 'Pop them whole',
        category: 'food'
    },
    {
        id: 'prompt981',
        text: 'Comedy roast of friend',
        icon: '😂',
        hint: 'Brutal but funny',
        category: 'entertainment'
    },
    {
        id: 'prompt982',
        text: 'Improv comedy yes and',
        icon: '😄',
        hint: 'Accept and build',
        category: 'entertainment'
    },
    {
        id: 'prompt983',
        text: 'Storytelling competition',
        icon: '📖',
        hint: 'Best tale wins',
        category: 'entertainment'
    },
    {
        id: 'prompt984',
        text: 'Poetry slam bar night',
        icon: '📝',
        hint: 'Spoken word power',
        category: 'entertainment'
    },
    {
        id: 'prompt985',
        text: 'Drag performance at bar',
        icon: '👑',
        hint: 'Lip sync to win',
        category: 'entertainment'
    },
    {
        id: 'prompt986',
        text: 'Burlesque show watching',
        icon: '🎭',
        hint: 'Tease and costume',
        category: 'entertainment'
    },
    {
        id: 'prompt987',
        text: 'Live band mosh pit',
        icon: '🎸',
        hint: 'Push and bounce',
        category: 'entertainment'
    },
    {
        id: 'prompt988',
        text: 'Open jam session join',
        icon: '🎵',
        hint: 'Sit in and play',
        category: 'entertainment'
    },
    {
        id: 'prompt989',
        text: 'Acoustic set listening',
        icon: '🎸',
        hint: 'Quiet please folk',
        category: 'entertainment'
    },
    {
        id: 'prompt990',
        text: 'DJ set first song drop',
        icon: '🎧',
        hint: 'Crowd erupts now',
        category: 'entertainment'
    },
    {
        id: 'prompt991',
        text: 'Saxophone solo wow',
        icon: '🎷',
        hint: 'Jazz improvise',
        category: 'entertainment'
    },
    {
        id: 'prompt992',
        text: 'Pianist bar sing along',
        icon: '🎹',
        hint: 'All know this tune',
        category: 'entertainment'
    },
    {
        id: 'prompt993',
        text: 'Fiddle Irish music pub',
        icon: '🎻',
        hint: 'Fast jig tempo',
        category: 'entertainment'
    },
    {
        id: 'prompt994',
        text: 'Steel drum beach bar',
        icon: '🥁',
        hint: 'Caribbean vibes',
        category: 'entertainment'
    },
    {
        id: 'prompt995',
        text: 'Gospel choir bar night',
        icon: '🎵',
        hint: 'Raise the roof',
        category: 'entertainment'
    },
    {
        id: 'prompt996',
        text: 'Flamenco dancer show',
        icon: '💃',
        hint: 'Stomp and clap',
        category: 'entertainment'
    },
    {
        id: 'prompt997',
        text: 'Harpist lounge bar',
        icon: '🎵',
        hint: 'Angelic bar sounds',
        category: 'entertainment'
    },
    {
        id: 'prompt998',
        text: 'Bluegrass picking circle',
        icon: '🎸',
        hint: 'Mountain string music',
        category: 'entertainment'
    },
    {
        id: 'prompt999',
        text: 'One man band performer',
        icon: '🥁',
        hint: 'Everything at once',
        category: 'entertainment'
    },
    {
        id: 'prompt1100',
        text: 'Encore applause demand',
        icon: '👏',
        hint: 'Play one more please',
        category: 'entertainment'
    }
];

// Buzzer sound using Web Audio API
function playBuzzer() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 300;
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
        console.log('Audio playback not available:', error);
    }
}

// Initialize game
function initGame() {
    // Initialize prompt pool
    gameState.promptPool = [...PROMPT_POOL];
    gameState.usedPrompts = [];
    
    // Setup event listeners
    document.getElementById('start-game-btn').addEventListener('click', startGame);
    document.getElementById('reveal-prompt-btn').addEventListener('click', revealPrompt);
    document.getElementById('correct-btn').addEventListener('click', handleCorrect);
    document.getElementById('pass-btn').addEventListener('click', handlePass);
    document.getElementById('add-custom-prompt-btn').addEventListener('click', addCustomPrompt);
    document.getElementById('play-again-btn').addEventListener('click', resetGame);
    
    // Allow Enter key to add custom prompts
    document.getElementById('custom-prompt-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addCustomPrompt();
        }
    });
}

// Start game
function startGame() {
    const teamCount = parseInt(document.getElementById('team-count').value);
    const turnDuration = parseInt(document.getElementById('turn-duration').value);
    
    if (teamCount < 2 || teamCount > 4) {
        alert('Please enter a valid number of teams (2-4).');
        return;
    }
    
    // Initialize game state
    gameState.teamCount = teamCount;
    gameState.turnDuration = turnDuration;
    gameState.timeRemaining = turnDuration;
    gameState.currentTeamIndex = 0;
    gameState.currentRound = 1;
    
    // Initialize teams
    gameState.teams = [];
    for (let i = 0; i < teamCount; i++) {
        gameState.teams.push({
            name: `Team ${i + 1}`,
            score: 0
        });
    }
    
    // Show game screen
    document.getElementById('setup-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    
    // Update UI
    updateTeamDisplay();
    updateScoreboard();
    resetTurnUI();
}

// Update team display
function updateTeamDisplay() {
    const currentTeam = gameState.teams[gameState.currentTeamIndex];
    document.getElementById('current-team-name').textContent = currentTeam.name;
}

// Reset turn UI
function resetTurnUI() {
    document.getElementById('prompt-hidden').classList.remove('hidden');
    document.getElementById('prompt-revealed').classList.add('hidden');
    document.getElementById('timer-display').textContent = gameState.turnDuration;
    document.getElementById('timer-bar').style.width = '100%';
    gameState.timeRemaining = gameState.turnDuration;
    
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
}

// Reveal prompt and start timer
function revealPrompt() {
    // Select a random prompt
    if (gameState.promptPool.length === 0) {
        // Refill pool with used prompts if empty
        gameState.promptPool = [...gameState.usedPrompts];
        gameState.usedPrompts = [];
    }
    
    const randomIndex = Math.floor(Math.random() * gameState.promptPool.length);
    gameState.currentPrompt = gameState.promptPool.splice(randomIndex, 1)[0];
    gameState.usedPrompts.push(gameState.currentPrompt);
    
    // Determine if this is a Double Trouble round (10% chance)
    gameState.isDoubleTrouble = Math.random() < 0.1;
    
    // Update UI
    document.getElementById('prompt-icon').textContent = gameState.currentPrompt.icon;
    document.getElementById('prompt-text').textContent = gameState.currentPrompt.text;
    document.getElementById('prompt-hint').textContent = `Hint: ${gameState.currentPrompt.hint}`;
    
    if (gameState.isDoubleTrouble) {
        document.getElementById('double-trouble-badge').classList.remove('hidden');
    } else {
        document.getElementById('double-trouble-badge').classList.add('hidden');
    }
    
    document.getElementById('prompt-hidden').classList.add('hidden');
    document.getElementById('prompt-revealed').classList.remove('hidden');
    
    // Start timer
    startTimer();
}

// Start countdown timer
function startTimer() {
    gameState.timeRemaining = gameState.turnDuration;
    
    gameState.timerInterval = setInterval(() => {
        gameState.timeRemaining--;
        
        // Update display
        document.getElementById('timer-display').textContent = gameState.timeRemaining;
        
        // Update progress bar
        const percentage = (gameState.timeRemaining / gameState.turnDuration) * 100;
        document.getElementById('timer-bar').style.width = `${percentage}%`;
        
        // Check if time is up
        if (gameState.timeRemaining <= 0) {
            clearInterval(gameState.timerInterval);
            gameState.timerInterval = null;
            handleTimeUp();
        }
    }, 1000);
}

// Handle time up
function handleTimeUp() {
    playBuzzer();
    
    // Flash the screen
    const promptCard = document.getElementById('prompt-card');
    promptCard.classList.add('buzzer-active');
    setTimeout(() => {
        promptCard.classList.remove('buzzer-active');
    }, 1500);
    
    // Apply penalty
    const currentTeam = gameState.teams[gameState.currentTeamIndex];
    currentTeam.score = Math.max(0, currentTeam.score - 1);
    
    // Show alert
    setTimeout(() => {
        alert(`⏰ Time's up! ${currentTeam.name} gets -1 point.`);
        nextTurn();
    }, 1500);
}

// Handle correct guess
function handleCorrect() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
    
    const currentTeam = gameState.teams[gameState.currentTeamIndex];
    const pointsEarned = gameState.isDoubleTrouble ? 2 : 1;
    currentTeam.score += pointsEarned;
    
    const message = gameState.isDoubleTrouble 
        ? `🎉 Correct! ${currentTeam.name} gets +2 points for Double Trouble!`
        : `✓ Correct! ${currentTeam.name} gets +1 point!`;
    
    alert(message);
    nextTurn();
}

// Handle pass
function handlePass() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
    
    const currentTeam = gameState.teams[gameState.currentTeamIndex];
    currentTeam.score = Math.max(0, currentTeam.score - 1);
    
    alert(`✗ Pass. ${currentTeam.name} gets -1 point.`);
    nextTurn();
}

// Move to next turn
function nextTurn() {
    updateScoreboard();
    
    // Check if any team has reached 10 points
    const winner = gameState.teams.find(team => team.score >= 10);
    if (winner) {
        endGame(winner);
        return;
    }
    
    // Move to next team
    gameState.currentTeamIndex = (gameState.currentTeamIndex + 1) % gameState.teamCount;
    
    // Increment round when we cycle back to team 1
    if (gameState.currentTeamIndex === 0) {
        gameState.currentRound++;
    }
    
    // Check if we've played enough rounds (max 20 rounds)
    if (gameState.currentRound > 20) {
        const highestScore = Math.max(...gameState.teams.map(t => t.score));
        const winners = gameState.teams.filter(t => t.score === highestScore);
        
        if (winners.length === 1) {
            endGame(winners[0]);
        } else {
            endGame(null, true); // Tie game
        }
        return;
    }
    
    updateTeamDisplay();
    resetTurnUI();
}

// Update scoreboard
function updateScoreboard() {
    const scoreDisplay = document.getElementById('score-display');
    scoreDisplay.innerHTML = '';
    
    gameState.teams.forEach((team, index) => {
        const isActive = index === gameState.currentTeamIndex;
        const teamCard = document.createElement('div');
        teamCard.className = `team-score-card ${isActive ? 'active' : ''}`;
        teamCard.innerHTML = `
            <h4 class="text-lg font-bold text-white mb-1">${team.name}</h4>
            <p class="text-3xl font-bold text-purple-400">${team.score}</p>
        `;
        scoreDisplay.appendChild(teamCard);
    });
}

// Add custom prompt
function addCustomPrompt() {
    const input = document.getElementById('custom-prompt-input');
    const customText = input.value.trim();
    
    if (customText === '') {
        alert('Please enter a prompt!');
        return;
    }
    
    // Add to prompt pool
    const customPrompt = {
        id: `custom_${Date.now()}`,
        text: customText,
        icon: '🎭',
        hint: 'Custom prompt',
        category: 'custom'
    };
    
    gameState.promptPool.push(customPrompt);
    
    // Clear input and show feedback
    input.value = '';
    alert(`✓ Custom prompt added: "${customText}"`);
}

// End game
function endGame(winner, isTie = false) {
    // Hide game screen
    document.getElementById('game-screen').classList.add('hidden');
    
    // Show result screen
    const resultContent = document.getElementById('result-content');
    
    if (isTie) {
        const highestScore = Math.max(...gameState.teams.map(t => t.score));
        const winners = gameState.teams.filter(t => t.score === highestScore);
        const winnerNames = winners.map(t => t.name).join(' and ');
        
        resultContent.innerHTML = `
            <h2 class="text-4xl font-bold text-yellow-400 mb-4 neon-glow-pink">🎭 It's a Tie! 🎭</h2>
            <p class="text-2xl text-gray-300 mb-6">${winnerNames} tied with ${highestScore} points each!</p>
            <p class="text-lg text-gray-400">Great performance from all teams!</p>
        `;
    } else {
        resultContent.innerHTML = `
            <h2 class="text-4xl font-bold text-purple-400 mb-4 neon-glow-purple">🏆 ${winner.name} Wins! 🏆</h2>
            <p class="text-2xl text-gray-300 mb-6">Final Score: ${winner.score} points</p>
            <p class="text-lg text-gray-400">Outstanding acting!</p>
        `;
    }
    
    // Show final scoreboard
    const finalScores = gameState.teams
        .sort((a, b) => b.score - a.score)
        .map(team => `<li class="text-xl">${team.name}: ${team.score} points</li>`)
        .join('');
    
    resultContent.innerHTML += `
        <div class="mt-8">
            <h3 class="text-2xl font-bold text-white mb-3">Final Standings:</h3>
            <ul class="text-gray-300 space-y-2">${finalScores}</ul>
        </div>
    `;
    
    document.getElementById('result-screen').classList.remove('hidden');
}

// Reset game
function resetGame() {
    // Reset game state
    gameState.teams = [];
    gameState.currentTeamIndex = 0;
    gameState.currentRound = 0;
    gameState.currentPrompt = null;
    gameState.isDoubleTrouble = false;
    
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
    
    // Reset prompt pools (keep custom prompts)
    const customPrompts = gameState.promptPool.filter(p => p.category === 'custom');
    const usedCustomPrompts = gameState.usedPrompts.filter(p => p.category === 'custom');
    gameState.promptPool = [...PROMPT_POOL, ...customPrompts, ...usedCustomPrompts];
    gameState.usedPrompts = [];
    
    // Show setup screen
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('setup-screen').classList.remove('hidden');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);

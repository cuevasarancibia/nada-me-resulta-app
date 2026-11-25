export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  pageHint: string;
}

export interface CharacterRiddle {
  id: string;
  name: string;
  role: string;
  color: string;
  emoji: string;
  image: string;
  clues: [string, string, string];
  funFact: string;
}

export interface MatchPair {
  id: string;
  left: string;
  right: string;
  emoji: string;
  image: string;
}

export interface StoryScene {
  id: string;
  order: number;
  title: string;
  description: string;
  emoji: string;
  image: string;
  chapterLabel: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '¿Por qué Victoria no quiso salir a jugar a la plaza con Cristóbal?',
    options: [
      'Porque tenía mucha tarea del colegio',
      'Porque estaba lloviendo',
      'Porque estaba enferma en cama',
      'Porque había salido con su papá',
    ],
    correctIndex: 1,
    explanation:
      'Victoria no quiso ir a la plaza porque estaba lloviendo, ¡y por eso Cristóbal se puso de pésimo humor!',
    pageHint: 'Capítulo: Un mal día (pág. 5)',
  },
  {
    id: 2,
    question: '¿Qué le gritó Cristóbal a su mamá cuando ella trató de consolarlo?',
    options: [
      '¡Quiero ir al cine ahora mismo!',
      '¡No me gusta la lluvia!',
      '¡A mí nada me resulta!',
      '¡Es culpa de Victoria!',
    ],
    correctIndex: 2,
    explanation:
      'Cristóbal se enrabió tanto que le gritó "¡A mí nada me resulta!", y su mamá le preguntó con calma si eso era verdad.',
    pageHint: 'Capítulo: Un mal día (pág. 5)',
  },
  {
    id: 3,
    question: '¿Qué solución le propuso Victoria cuando llamó por teléfono a Cristóbal?',
    options: [
      'Esperar hasta el otro fin de semana',
      'Salir con paraguas igual a la plaza',
      'Cambiar los planes e inventar algo para hacer en casa',
      'Ver televisión cada uno en su pieza',
    ],
    correctIndex: 2,
    explanation:
      'Victoria le dijo: "Cambiemos los planes. Como no podemos salir, inventemos algo que podamos hacer en casa".',
    pageHint: 'Capítulo: Sugiriendo alternativas (pág. 8)',
  },
  {
    id: 4,
    question: 'Cuando Cristóbal se calmó en su pieza, ¿de qué se dio cuenta al mirar a su alrededor?',
    options: [
      'De que tenía juguetes, música, libros y, lo mejor de todo, amigos',
      'De que su pieza estaba muy desordenada',
      'De que ya había dejado de llover',
      'De que tenía hambre y quería galletas',
    ],
    correctIndex: 0,
    explanation:
      'Pensó que decidir aburrirse no era muy inteligente, porque tenía juguetes, música, libros y grandes amigos.',
    pageHint: 'Capítulo: ¿Mala suerte o tozudez? (pág. 13)',
  },
  {
    id: 5,
    question: '¿Qué tuvo que hacer Cristóbal antes de poder ir a la casa de Victoria?',
    options: [
      'Ordenar toda su cama y sus zapatos',
      'Armarse de valor y pedirle perdón a su mamá',
      'Hacer la tarea de matemáticas',
      'Esperar a que su papá llegara del trabajo',
    ],
    correctIndex: 1,
    explanation:
      'Cristóbal se armó de valor y le pidió disculpas a su mamá, quien le dijo que estaba orgullosa de él.',
    pageHint: 'Capítulo: El valor de disculparse (pág. 20-22)',
  },
  {
    id: 6,
    question: '¿Qué hicieron Cristóbal y Victoria en la casa de ella para pasarlo genial?',
    options: [
      'Pintaron un cuadro de la lluvia',
      'Jugaron a un juego nuevo, hicieron limonada y comieron galletas',
      'Leyeron un libro de dinosaurios',
      'Hicieron un castillo con almohadas',
    ],
    correctIndex: 1,
    explanation:
      'Victoria tenía un juego nuevo súper entretenido, hicieron una limonada y comieron galletas. ¡Casi se lo pierde por estar amurrado!',
    pageHint: 'Capítulo: Lo pasamos genial (pág. 30)',
  },
  {
    id: 7,
    question: 'En la cena, ¿qué dijo la hermana de Cristóbal (Elisa) que había aprendido ese día?',
    options: [
      'A hacer un PowerPoint en el computador',
      'A andar en bicicleta sin rueditas',
      'La tabla del 5',
      'Una canción en flauta',
    ],
    correctIndex: 2,
    explanation:
      'Elisa dijo que aprendió la tabla del 5, mientras que la mamá aprendió a hacer un PowerPoint en el computador.',
    pageHint: 'Capítulo: ¿Qué aprendí hoy? (pág. 33)',
  },
  {
    id: 8,
    question: '¿Qué significa la moraleja del papá: "No llores en la noche porque no puedes ver el sol. Si lo haces, no podrás ver las estrellas"?',
    options: [
      'Que hay que acostarse temprano para ver el sol',
      'Que si lloramos por lo que no salió como queríamos, nos perdemos las cosas buenas que sí tenemos',
      'Que las estrellas brillan más cuando llueve',
      'Que es mejor jugar de noche que de día',
    ],
    correctIndex: 1,
    explanation:
      'El papá enseñó que siempre es posible mirar lo positivo y disfrutar lo bueno que tenemos, en vez de llorar por lo que nos falta.',
    pageHint: 'Capítulo: Una buena moraleja (pág. 36)',
  },
];

export const CHARACTER_RIDDLES: CharacterRiddle[] = [
  {
    id: 'cristobal',
    name: 'Cristóbal',
    role: 'El protagonista',
    color: '#D94E3B',
    emoji: '👦',
    image: '/images/cristobal.jpg',
    clues: [
      'Uso una camiseta a rayas rojas y negras, y me cuesta cambiar de idea cuando se me mete algo en la cabeza.',
      'Di un feroz portazo porque empezó a llover y no pude ir a la plaza.',
      'Al final me armé de valor, pedí disculpas y aprendí a mirar lo positivo.',
    ],
    funFact: 'Tiene un teléfono rojo en su mesa y juguetes como un auto verde, un avión y patines.',
  },
  {
    id: 'victoria',
    name: 'Victoria',
    role: 'La mejor amiga',
    color: '#E07A9B',
    emoji: '👧',
    image: '/images/victoria.jpg',
    clues: [
      'Uso una flor rosada en el pelo y una blusa con muchas florecitas.',
      'No dejo que la lluvia me arruine el día y siempre busco planes divertidos.',
      'Llamé por teléfono para invitar a jugar en mi casa, donde hicimos limonada y comimos galletas.',
    ],
    funFact: 'En su casa hay un gato negro muy curioso y un teléfono azul.',
  },
  {
    id: 'mama',
    name: 'La Mamá',
    role: 'Mamá de Cristóbal',
    color: '#5B9268',
    emoji: '👩',
    image: '/images/mama.jpg',
    clues: [
      'Visto un vestido verde con flores claras y soy muy cariñosa y paciente.',
      'Le sugerí a mi hijo que invitara a Victoria a jugar en la casa en vez de ir a la plaza.',
      'En la cena conté que aprendí a hacer un PowerPoint en el computador.',
    ],
    funFact: 'Le dijo a Cristóbal: "Sé que pedir disculpas es muy difícil: hay que tener valor para hacerlo".',
  },
  {
    id: 'papa',
    name: 'El Papá',
    role: 'Papá de Cristóbal',
    color: '#4A90E2',
    emoji: '👨',
    image: '/images/papa.jpg',
    clues: [
      'Uso camisa celeste a rayas y una corbata verde a rayas.',
      'Todas las noches en la mesa pregunto: "¿Aprendieron algo hoy?".',
      'Conté una historia sobre ver las estrellas de noche y leí fábulas de Esopo.',
    ],
    funFact: 'Siempre anima a sus hijos a preguntar, porque "preguntar ayuda a aprender".',
  },
  {
    id: 'elisa',
    name: 'Elisa',
    role: 'La hermana menor',
    color: '#9B6BC2',
    emoji: '🧒',
    image: '/images/elisa.jpg',
    clues: [
      'Soy la hermana más chica de Cristóbal y uso un cintillo rosado en la cabeza.',
      'En la cena conté muy orgullosa que me aprendí la tabla del 5.',
      'Le pregunté a mi papá: "¿Qué es una moraleja?".',
    ],
    funFact: 'Gracias a su pregunta, todos recordaron las fábulas de Esopo.',
  },
  {
    id: 'pajarito',
    name: 'El Pajarito',
    role: 'El testigo curioso',
    color: '#F5B82E',
    emoji: '🐦',
    image: '/images/pajarito.jpg',
    clues: [
      'Tengo alas y aparezco en casi todas las páginas mirando lo que hace Cristóbal.',
      'A veces me paro arriba de la ventana lluviosa y otras veces sobre la casa de Victoria.',
      '¡Hasta sobre la cabeza de Cristóbal me poso cuando está pensando!',
    ],
    funFact: 'En las ilustraciones de Loly & Bernardilla hay pajaritos azules, rojos y verdes.',
  },
];

export const MATCH_PAIRS: MatchPair[] = [
  {
    id: 'p1',
    left: 'Cristóbal',
    right: 'Dijo "¡A mí nada me resulta!" y luego pidió perdón',
    emoji: '👦',
    image: '/images/cristobal.jpg',
  },
  {
    id: 'p2',
    left: 'Victoria',
    right: 'Preparó limonada, galletas y un juego nuevo',
    emoji: '🍋',
    image: '/images/victoria.jpg',
  },
  {
    id: 'p3',
    left: 'La Mamá',
    right: 'Aprendió a hacer un PowerPoint en el computador',
    emoji: '💻',
    image: '/images/mama.jpg',
  },
  {
    id: 'p4',
    left: 'El Papá',
    right: 'Contó la moraleja del sol y las estrellas',
    emoji: '⭐',
    image: '/images/papa.jpg',
  },
  {
    id: 'p5',
    left: 'Elisa',
    right: 'Aprendió la tabla del 5 y preguntó qué es una moraleja',
    emoji: '🖐️',
    image: '/images/elisa.jpg',
  },
  {
    id: 'p6',
    left: 'El Pajarito',
    right: 'Observa toda la historia desde la ventana y los árboles',
    emoji: '🐦',
    image: '/images/pajarito.jpg',
  },
];

export const STORY_SCENES: StoryScene[] = [
  {
    id: 's1',
    order: 1,
    title: 'Lluvia y mal humor',
    description: 'Cristóbal quiere ir a la plaza, pero llueve. Se enoja y le grita a su mamá.',
    emoji: '🌧️',
    image: '/images/scene-rain.jpg',
    chapterLabel: 'Un mal día',
  },
  {
    id: 's2',
    order: 2,
    title: 'La llamada de Victoria',
    description: 'Victoria llama por el teléfono para jugar en casa, pero Cristóbal sigue taimado.',
    emoji: '☎️',
    image: '/images/victoria.jpg',
    chapterLabel: 'Sugiriendo alternativas',
  },
  {
    id: 's3',
    order: 3,
    title: 'Pensar en la pieza',
    description: 'Cristóbal se calma y nota que tiene juguetes, libros, música y amigos.',
    emoji: '💭',
    image: '/images/cristobal.jpg',
    chapterLabel: '¿Mala suerte o tozudez?',
  },
  {
    id: 's4',
    order: 4,
    title: 'El valor de disculparse',
    description: 'Se arma de valor, le pide perdón a su mamá y llama a Victoria para arreglar todo.',
    emoji: '🤗',
    image: '/images/mama.jpg',
    chapterLabel: 'Pedir disculpas',
  },
  {
    id: 's5',
    order: 5,
    title: 'Tarde de limonada y galletas',
    description: 'Va a casa de Victoria, estrenan un juego nuevo y lo pasan genial.',
    emoji: '🍪',
    image: '/images/scene-lemonade.jpg',
    chapterLabel: 'Lo pasamos genial',
  },
  {
    id: 's6',
    order: 6,
    title: 'Cena en familia y estrellas',
    description: 'Conversan sobre lo que aprendieron hoy y el papá cuenta la moraleja de las estrellas.',
    emoji: '🌟',
    image: '/images/scene-stars.jpg',
    chapterLabel: 'Mirar lo positivo',
  },
];

export const WORD_SEARCH_POOL = [
  'CRISTOBAL',
  'VICTORIA',
  'LLUVIA',
  'PLAZA',
  'PERDON',
  'LIMONADA',
  'ESTRELLA',
  'ELISA',
  'ESOPO',
  'MORALEJA',
  'TELEFONO',
  'GALLETAS',
  'PAJARITO',
  'PORTAZO',
  'JUGUETES',
  'MUSICA',
  'LIBROS',
  'AMIGOS',
  'DISCULPA',
  'POSITIVO',
  'FABULAS',
  'GATO',
  'CENA',
  'SOL',
];

export interface BookChapter {
  id: number;
  title: string;
  page: string;
  text: string;
  quote?: string;
  image: string;
  characterImage?: string;
  moodColor: string;
  effect: 'rain' | 'phone' | 'think' | 'hug' | 'lemonade' | 'stars';
}

export const BOOK_CHAPTERS: BookChapter[] = [
  {
    id: 1,
    title: 'Un mal día',
    page: 'Pág. 5',
    text: 'Hoy tenía pensado salir a jugar a la plaza con Victoria, pero ella no quiso porque estaba lloviendo. Me enrabié tanto que le contesté mal a mi mamá y le grité: "¡A mí nada me resulta!"',
    quote: '—¿Será verdad, Cristóbal? —me preguntó mi mamá.',
    image: '/images/scene-rain.jpg',
    characterImage: '/images/cristobal.jpg',
    moodColor: '#8CB3D9',
    effect: 'rain',
  },
  {
    id: 2,
    title: 'Cambiar de planes',
    page: 'Pág. 6',
    text: 'Mi mamá me sugirió invitar a Victoria a jugar a la casa en vez de ir a la plaza. Pero mi rabia aumentó, le grité que yo quería ir a la plaza y di un feroz portazo.',
    quote: 'Me cuesta mucho cambiar de idea cuando se me pone algo en la cabeza.',
    image: '/images/scene-rain.jpg',
    characterImage: '/images/mama.jpg',
    moodColor: '#C98A7A',
    effect: 'rain',
  },
  {
    id: 3,
    title: 'Sugiriendo alternativas',
    page: 'Pág. 8',
    text: 'Un rato después, Victoria me llamó por teléfono: "Cambiemos los planes. Como no podemos salir, inventemos algo que podamos hacer en casa". Pero también a ella le contesté de mal modo.',
    quote: '¡Yo quiero ir a la plaza!',
    image: '/images/scene-rain.jpg',
    characterImage: '/images/victoria.jpg',
    moodColor: '#A9C6E0',
    effect: 'phone',
  },
  {
    id: 4,
    title: 'Aprovechar el tiempo',
    page: 'Pág. 10',
    text: 'Victoria me respondió con calma: "También a mí me encanta ir a la plaza, pero no estoy dispuesta a que la lluvia me arruine el día. Tengo tiempo libre y lo voy a aprovechar pasándolo bien".',
    quote: '¡Allá tú si te picas y lo pasas mal! Es tu elección.',
    image: '/images/victoria.jpg',
    characterImage: '/images/pajarito.jpg',
    moodColor: '#B8D8BA',
    effect: 'phone',
  },
  {
    id: 5,
    title: '¿Mala suerte o tozudez?',
    page: 'Pág. 13',
    text: 'Me encerré en la pieza alegando contra mi mala suerte. Cuando me calmé, pensé en lo que dijo Victoria. Si miro a mi alrededor, tengo juguetes, música, libros y, lo mejor de todo, tengo amigos.',
    quote: 'Decidir aburrirme no parecía una elección muy inteligente.',
    image: '/images/cristobal.jpg',
    characterImage: '/images/pajarito.jpg',
    moodColor: '#F3DFB4',
    effect: 'think',
  },
  {
    id: 6,
    title: 'Dar pie atrás no es fácil',
    page: 'Pág. 14',
    text: 'Me moría de ganas de ir a la casa de Victoria. Pero necesitaba pedirle perdón a mi mamá para que me diera permiso, y tampoco sabía si Victoria me recibiría después de lo pesado que fui.',
    quote: '¿Cómo hacerlo sin reconocer que me había equivocado?',
    image: '/images/mama.jpg',
    characterImage: '/images/cristobal.jpg',
    moodColor: '#E8D6B9',
    effect: 'think',
  },
  {
    id: 7,
    title: 'Pensar antes de actuar',
    page: 'Pág. 17',
    text: 'El papá dice que me ofusco porque no razono y digo cosas de las que después me arrepiento. Sé que debo pensar que siempre es posible pasarlo bien, aunque no sea como uno lo planeó.',
    quote: 'Primero pensar, después actuar.',
    image: '/images/papa.jpg',
    characterImage: '/images/pajarito.jpg',
    moodColor: '#DCEBFA',
    effect: 'think',
  },
  {
    id: 8,
    title: '¿Malagradecido?',
    page: 'Pág. 18',
    text: 'De pronto me di cuenta de que soy poco agradecido de lo que tengo. Esto me dio vergüenza y no sabía cómo arreglarlo.',
    quote: 'Valorar todo lo bueno que ya tengo.',
    image: '/images/cristobal.jpg',
    moodColor: '#E6D9C2',
    effect: 'think',
  },
  {
    id: 9,
    title: 'El valor de disculparse',
    page: 'Pág. 20 - 23',
    text: 'Me armé de valor, fui donde mi mamá y le pedí perdón. Ella me abrazó cariñosamente y me dijo: "¡Qué bueno que seas capaz de reconocer tus errores! Me siento orgullosa de ti, Cristóbal".',
    quote: 'Sé que pedir disculpas es muy difícil: hay que tener valor para hacerlo.',
    image: '/images/mama.jpg',
    characterImage: '/images/cristobal.jpg',
    moodColor: '#CBE6CE',
    effect: 'hug',
  },
  {
    id: 10,
    title: 'Pensándolo mejor',
    page: 'Pág. 24 - 27',
    text: 'Llamé por teléfono a Victoria. "Veo que decidiste que este fuera un buen día", me dijo amable. Le respondí: "Tengo que reconocer que me equivoqué. Quiero jugar contigo a lo que tú quieras. ¿Me perdonas?"',
    quote: '¡Aló! Quiero aprovechar lo que queda del día.',
    image: '/images/victoria.jpg',
    characterImage: '/images/cristobal.jpg',
    moodColor: '#FDE8D7',
    effect: 'phone',
  },
  {
    id: 11,
    title: 'Me di cuenta',
    page: 'Pág. 28',
    text: 'Mi mamá me dio permiso para ir donde Victoria. Cuando la vi le dije: "¡Qué tonto fui, perdí tanto tiempo con mi enojo!". Aprendí que es más sabio aprovechar lo que se tiene que llorar por lo que no se tiene.',
    quote: 'Lo bueno es que te diste cuenta y aprendiste algo importante.',
    image: '/images/cristobal.jpg',
    characterImage: '/images/victoria.jpg',
    moodColor: '#DDF2DF',
    effect: 'hug',
  },
  {
    id: 12,
    title: 'Lo pasamos genial',
    page: 'Pág. 30',
    text: 'Victoria tenía un juego nuevo súper entretenido. Hicimos una deliciosa limonada y comimos galletas. ¡Y pensar que casi me lo pierdo por estar amurrado!',
    quote: '¡Qué tarde tan entretenida!',
    image: '/images/scene-lemonade.jpg',
    characterImage: '/images/victoria.jpg',
    moodColor: '#FCEBB6',
    effect: 'lemonade',
  },
  {
    id: 13,
    title: '¿Qué aprendí hoy?',
    page: 'Pág. 33 - 35',
    text: 'En la cena, papá preguntó: "¿Aprendieron algo hoy?". Elisa aprendió la tabla del 5; mamá aprendió a hacer un PowerPoint; y yo dije: "Aprendí a no permitir que cosas sin importancia me arruinen el día".',
    quote: 'Todas las cosas tienen un lado positivo, es cuestión de saber encontrarlo.',
    image: '/images/elisa.jpg',
    characterImage: '/images/papa.jpg',
    moodColor: '#E3F2E6',
    effect: 'lemonade',
  },
  {
    id: 14,
    title: 'Una buena moraleja',
    page: 'Pág. 36 - 38',
    text: 'Elisa preguntó qué es una moraleja y papá recordó las fábulas de Esopo. Luego contó un cuento que terminaba así: "No llores en la noche porque no puedes ver el sol. Si lo haces, no podrás ver las estrellas".',
    quote: 'Qué bueno que preguntaste, porque preguntar ayuda a aprender.',
    image: '/images/scene-stars.jpg',
    characterImage: '/images/papa.jpg',
    moodColor: '#1E314F',
    effect: 'stars',
  },
];


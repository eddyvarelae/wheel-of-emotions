/* Wheel of Emotions — data + translations.
 * Structure follows the approved feelings wheel (5 core emotions,
 * 25 secondary, 50 outer — 2 outer per secondary). To add a language,
 * add its code to every `t` object below and to UI_STRINGS, then add
 * a button in index.html.
 */

const UI_STRINGS = {
  en: {
    title: "Wheel of Emotions",
    tagline: "How are you feeling right now? Give the wheel a spin.",
    spin: "SPIN",
    resultLead: "You landed on…",
    again: "Spin again to explore another feeling.",
    credit: "Approved by MJ.",
    // check-in flow
    accuracy: "Does this feel accurate?",
    yes: "Yes, that's me",
    notQuite: "Not quite",
    intensityQ: "How strong is this emotion right now?",
    intensityHint: "Just naming it already turns the volume down.",
    bodyQ: "Where do you notice it in your body?",
    sensationsLead: "Common sensations people notice with this emotion:",
    noneBody: "I don't notice anything",
    triggerQ: "What happened right before you started feeling this?",
    thoughtQ: "What thought is going through your head?",
    thoughtPlaceholder: "Type your thought…",
    evidence: "Quick check: what evidence supports that thought — and what doesn't?",
    needQ: "What do you need most right now?",
    multiHint: "Tap all that apply.",
    understandTitle: "What it's telling you",
    noticingTpl: "You're noticing {e} — that's information, not a problem.",
    needTpl: "It often points to a need: {n}.",
    normalize: "Every emotion has a purpose. The problem isn't having it — it's what you do next.",
    regulateQ: "Try one of these right now",
    challengeTitle: "One tiny action",
    futureYou: "If Future You looked back at this moment a week from now, what advice would they give you?",
    rerateQ: "One more time — how strong is it now?",
    rerateHint: "Just noticing a feeling often changes it.",
    deltaDown: "From {0} to {1} — noticing helped.",
    deltaFlat: "Still at {1} — that's okay. Some feelings take their time.",
    next: "Next",
    doneBtn: "Done",
    completeTitle: "Check-in complete 🎉",
    completeMsg: "About a minute of noticing — it adds up.",
    // patterns dashboard
    patterns: "Your patterns",
    patternsEmpty: "Do a few check-ins to see your patterns here.",
    statCheckins: "check-ins",
    statLast7: "in the last 7 days",
    statIntensity: "Average intensity",
    statEmotions: "Most common emotions",
    statTriggers: "Most common triggers",
    statBody: "Where you feel it",
    statSensations: "Sensations you notice",
    statTools: "Tools you reach for",
    close: "Close",
  },
  es: {
    title: "La Rueda de las Emociones",
    tagline: "¿Cómo te sientes ahora mismo? Haz girar la rueda.",
    spin: "GIRAR",
    resultLead: "Te ha tocado…",
    again: "Vuelve a girar para explorar otra emoción.",
    credit: "Aprobado por MJ.",
    // check-in flow
    accuracy: "¿Se siente acertado?",
    yes: "Sí, así me siento",
    notQuite: "No exactamente",
    intensityQ: "¿Qué tan fuerte es esta emoción ahora mismo?",
    intensityHint: "Solo nombrarla ya le baja el volumen.",
    bodyQ: "¿En qué parte del cuerpo lo notas?",
    sensationsLead: "Sensaciones comunes que la gente nota con esta emoción:",
    noneBody: "No noto nada",
    triggerQ: "¿Qué pasó justo antes de sentirte así?",
    thoughtQ: "¿Qué pensamiento tienes en la cabeza?",
    thoughtPlaceholder: "Escribe tu pensamiento…",
    evidence: "Chequeo rápido: ¿qué evidencia apoya ese pensamiento… y cuál no?",
    needQ: "¿Qué necesitas más ahora mismo?",
    multiHint: "Toca todo lo que aplique.",
    understandTitle: "Qué te está diciendo",
    noticingTpl: "Estás notando {e}: es información, no un problema.",
    needTpl: "Suele señalar una necesidad: {n}.",
    normalize: "Toda emoción tiene un propósito. El problema no es sentirla, sino qué haces después.",
    regulateQ: "Prueba una de estas ahora",
    challengeTitle: "Una pequeña acción",
    futureYou: "Si tu yo del futuro viera este momento dentro de una semana, ¿qué consejo te daría?",
    rerateQ: "Una vez más: ¿qué tan fuerte es ahora?",
    rerateHint: "Solo notar una emoción muchas veces la cambia.",
    deltaDown: "De {0} a {1} — notarla ayudó.",
    deltaFlat: "Sigue en {1} y está bien. Algunas emociones toman su tiempo.",
    next: "Siguiente",
    doneBtn: "Listo",
    completeTitle: "Check-in completo 🎉",
    completeMsg: "Un minuto de darte cuenta — y suma.",
    // patterns dashboard
    patterns: "Tus patrones",
    patternsEmpty: "Haz algunos check-ins para ver tus patrones aquí.",
    statCheckins: "check-ins",
    statLast7: "en los últimos 7 días",
    statIntensity: "Intensidad promedio",
    statEmotions: "Emociones más comunes",
    statTriggers: "Detonantes más comunes",
    statBody: "Dónde lo sientes",
    statSensations: "Sensaciones que notas",
    statTools: "Herramientas que usas",
    close: "Cerrar",
  },
};

/* Order is clockwise from the top of the wheel, mirroring the poster. */
const WHEEL_DATA = [
  {
    id: "disgusted", color: "#58d68d",
    t: { en: "Disgusted", es: "Disgustado" },
    children: [
      { t: { en: "Repelled", es: "Repelido" }, children: [
        { t: { en: "Horrified", es: "Horrorizado" } },
        { t: { en: "Hesitant", es: "Vacilante" } },
      ]},
      { t: { en: "Awful", es: "Pésimo" }, children: [
        { t: { en: "Nauseated", es: "Nauseado" } },
        { t: { en: "Detestable", es: "Detestable" } },
      ]},
      { t: { en: "Disenchanted", es: "Desencantado" }, children: [
        { t: { en: "Appalled", es: "Escandalizado" } },
        { t: { en: "Revolted", es: "Repugnado" } },
      ]},
      { t: { en: "Disapproving", es: "En desacuerdo" }, children: [
        { t: { en: "Judgemental", es: "Criticón" } },
        { t: { en: "Embarrassed", es: "Abochornado" } },
      ]},
      { t: { en: "Startled", es: "Sobresaltado" }, children: [
        { t: { en: "Shocked", es: "Impactado" } },
        { t: { en: "Dismayed", es: "Consternado" } },
      ]},
    ],
  },
  {
    id: "happy", color: "#f4d03f",
    t: { en: "Happy", es: "Feliz" },
    children: [
      { t: { en: "Optimistic", es: "Optimista" }, children: [
        { t: { en: "Hopeful", es: "Esperanzado" } },
        { t: { en: "Inspired", es: "Inspirado" } },
      ]},
      { t: { en: "Peaceful", es: "Tranquilo" }, children: [
        { t: { en: "Loved", es: "Amado" } },
        { t: { en: "Thankful", es: "Agradecido" } },
      ]},
      { t: { en: "Proud", es: "Orgulloso" }, children: [
        { t: { en: "Successful", es: "Exitoso" } },
        { t: { en: "Confident", es: "Confiado" } },
      ]},
      { t: { en: "Excited", es: "Emocionado" }, children: [
        { t: { en: "Eager", es: "Entusiasmado" } },
        { t: { en: "Energetic", es: "Enérgico" } },
      ]},
      { t: { en: "Powerful", es: "Poderoso" }, children: [
        { t: { en: "Courageous", es: "Valiente" } },
        { t: { en: "Creative", es: "Creativo" } },
      ]},
    ],
  },
  {
    id: "sad", color: "#3498db",
    t: { en: "Sad", es: "Triste" },
    children: [
      { t: { en: "Lonely", es: "Solo" }, children: [
        { t: { en: "Isolated", es: "Aislado" } },
        { t: { en: "Abandoned", es: "Abandonado" } },
      ]},
      { t: { en: "Vulnerable", es: "Vulnerable" }, children: [
        { t: { en: "Victimised", es: "Victimizado" } },
        { t: { en: "Fragile", es: "Frágil" } },
      ]},
      { t: { en: "Despair", es: "Desesperado" }, children: [
        { t: { en: "Grief", es: "En duelo" } },
        { t: { en: "Powerless", es: "Impotente" } },
      ]},
      { t: { en: "Guilty", es: "Culpable" }, children: [
        { t: { en: "Remorseful", es: "Arrepentido" } },
        { t: { en: "Ashamed", es: "Avergonzado" } },
      ]},
      { t: { en: "Hurt", es: "Herido" }, children: [
        { t: { en: "Wounded", es: "Lastimado" } },
        { t: { en: "Disappointed", es: "Decepcionado" } },
      ]},
    ],
  },
  {
    id: "angry", color: "#ec7063",
    t: { en: "Angry", es: "Enojado" },
    children: [
      { t: { en: "Humiliated", es: "Humillado" }, children: [
        { t: { en: "Disrespected", es: "Menospreciado" } },
        { t: { en: "Ridiculed", es: "Ridiculizado" } },
      ]},
      { t: { en: "Bitter", es: "Resentido" }, children: [
        { t: { en: "Indignant", es: "Indignado" } },
        { t: { en: "Violated", es: "Violentado" } },
      ]},
      { t: { en: "Frustrated", es: "Frustrado" }, children: [
        { t: { en: "Infuriated", es: "Furioso" } },
        { t: { en: "Annoyed", es: "Molesto" } },
      ]},
      { t: { en: "Critical", es: "Crítico" }, children: [
        { t: { en: "Sceptical", es: "Escéptico" } },
        { t: { en: "Dismissive", es: "Desdeñoso" } },
      ]},
      { t: { en: "Distant", es: "Distante" }, children: [
        { t: { en: "Withdrawn", es: "Retraído" } },
        { t: { en: "Numb", es: "Insensible" } },
      ]},
    ],
  },
  {
    id: "fearful", color: "#af7ac5",
    t: { en: "Fearful", es: "Temeroso" },
    children: [
      { t: { en: "Anxious", es: "Ansioso" }, children: [
        { t: { en: "Overwhelmed", es: "Abrumado" } },
        { t: { en: "Worried", es: "Preocupado" } },
      ]},
      { t: { en: "Insecure", es: "Inseguro" }, children: [
        { t: { en: "Inadequate", es: "Inadecuado" } },
        { t: { en: "Inferior", es: "Inferior" } },
      ]},
      { t: { en: "Weak", es: "Débil" }, children: [
        { t: { en: "Worthless", es: "Sin valor" } },
        { t: { en: "Insignificant", es: "Insignificante" } },
      ]},
      { t: { en: "Rejected", es: "Rechazado" }, children: [
        { t: { en: "Excluded", es: "Excluido" } },
        { t: { en: "Persecuted", es: "Perseguido" } },
      ]},
      { t: { en: "Threatened", es: "Amenazado" }, children: [
        { t: { en: "Nervous", es: "Nervioso" } },
        { t: { en: "Exposed", es: "Expuesto" } },
      ]},
    ],
  },
];

/* ---------- guided check-in (MJ's spec): options shown after a spin ---------- */

const CHECKIN_DATA = {
  // tappable zones on the body silhouette (interoception by location)
  bodyZones: [
    { id: "head", t: { en: "Head", es: "Cabeza" } },
    { id: "throat", t: { en: "Throat", es: "Garganta" } },
    { id: "chest", t: { en: "Chest", es: "Pecho" } },
    { id: "stomach", t: { en: "Stomach", es: "Estómago" } },
    { id: "hands", t: { en: "Hands", es: "Manos" } },
    { id: "legs", t: { en: "Legs", es: "Piernas" } },
  ],
  triggers: [
    { id: "school", t: { en: "School", es: "Escuela" } },
    { id: "team", t: { en: "Team", es: "Equipo" } },
    { id: "family", t: { en: "Family", es: "Familia" } },
    { id: "friends", t: { en: "Friends", es: "Amistades" } },
    { id: "pitch", t: { en: "Pitch", es: "Pitch" } },
    { id: "grades", t: { en: "Grades", es: "Calificaciones" } },
    { id: "social", t: { en: "Social media", es: "Redes sociales" } },
    { id: "other", t: { en: "Something else", es: "Otra cosa" } },
    { id: "none", t: { en: "Nothing specific", es: "Nada en específico" } },
  ],
  thoughts: [
    { id: "fail", t: { en: "“I'm going to fail.”", es: "“Voy a fracasar.”" } },
    { id: "dislike", t: { en: "“They don't like me.”", es: "“No les caigo bien.”" } },
    { id: "behind", t: { en: "“I'm behind.”", es: "“Voy atrasado.”" } },
    { id: "notsmart", t: { en: "“I'm not smart enough.”", es: "“No soy lo suficientemente inteligente.”" } },
    { id: "judged", t: { en: "“They're judging me.”", es: "“Me están juzgando.”" } },
    { id: "own", t: { en: "Something else…", es: "Otra cosa…" } },
    { id: "none", t: { en: "No clear thought", es: "Ningún pensamiento claro" } },
  ],
  needs: [
    { id: "rest", t: { en: "Rest", es: "Descansar" } },
    { id: "support", t: { en: "Support", es: "Apoyo" } },
    { id: "space", t: { en: "Space", es: "Espacio" } },
    { id: "food", t: { en: "Food", es: "Comida" } },
    { id: "water", t: { en: "Water", es: "Agua" } },
    { id: "movement", t: { en: "Movement", es: "Moverme" } },
    { id: "talk", t: { en: "A conversation", es: "Una conversación" } },
    { id: "break", t: { en: "A break", es: "Una pausa" } },
    { id: "encouragement", t: { en: "Encouragement", es: "Ánimo" } },
    { id: "cry", t: { en: "To cry", es: "Llorar" } },
    { id: "celebrate", t: { en: "To celebrate", es: "Celebrar" } },
    { id: "unknown", t: { en: "I don't know", es: "No lo sé" } },
  ],
};

/* Per-core guidance, everything specific to the emotion (MJ's mapping):
 * noun       — for ACT phrasing ("You're noticing anger", not "you are angry")
 * sensations — common body sensations for THIS emotion, not a generic list
 * need       — what the emotion usually points to (emotion = information)
 * tools      — evidence-based regulation (or savoring) options
 * question   — one curious, non-therapy reflective question
 * challenge  — one tiny action to end on
 * overrides  — secondary emotions whose felt sense differs from the core
 *              (keyed by the secondary's English label)
 * savor      — optional hint when the emotion needs savoring, not fixing */
const CORE_GUIDANCE = {
  fearful: {
    noun: { en: "fear", es: "miedo" },
    purpose: {
      en: "Fear and anxiety are trying to protect you — they show up when something feels important or uncertain.",
      es: "El miedo y la ansiedad intentan protegerte: aparecen cuando algo se siente importante o incierto.",
    },
    need: { en: "safety", es: "seguridad" },
    sensations: [
      { en: "Tight chest", es: "Pecho apretado" },
      { en: "Knot in stomach", es: "Nudo en el estómago" },
      { en: "Racing heart", es: "Corazón acelerado" },
      { en: "Sweaty hands", es: "Manos sudorosas" },
      { en: "Fast breathing", es: "Respiración rápida" },
      { en: "Frozen body", es: "Cuerpo congelado" },
      { en: "Muscle tension", es: "Tensión muscular" },
    ],
    tools: [
      { en: "Physiological sigh: two short inhales, one long exhale", es: "Suspiro fisiológico: dos inhalaciones cortas, una exhalación larga" },
      { en: "Box breathing: in 4, hold 4, out 4, hold 4", es: "Respiración en caja: inhala 4, sostén 4, exhala 4, sostén 4" },
      { en: "Grounding 5-4-3-2-1: name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste", es: "Anclaje 5-4-3-2-1: nombra 5 cosas que ves, 4 que sientes, 3 que oyes, 2 que hueles y 1 que saboreas" },
      { en: "Reality check: how likely is it, really?", es: "Chequeo de realidad: ¿qué tan probable es, en serio?" },
    ],
    question: { en: "What is your brain trying to protect you from?", es: "¿De qué te está intentando proteger tu cerebro?" },
    challenge: { en: "Send the message you've been avoiding.", es: "Manda el mensaje que has estado evitando." },
  },
  angry: {
    noun: { en: "anger", es: "enojo" },
    purpose: {
      en: "Anger tells you something may feel unfair — or that a boundary was crossed.",
      es: "El enojo te avisa que algo puede ser injusto, o que se cruzó un límite.",
    },
    need: { en: "boundaries and fairness", es: "límites y justicia" },
    sensations: [
      { en: "Hot face", es: "Cara caliente" },
      { en: "Tight jaw", es: "Mandíbula apretada" },
      { en: "Clenched fists", es: "Puños cerrados" },
      { en: "Tight shoulders", es: "Hombros tensos" },
      { en: "Racing heart", es: "Corazón acelerado" },
      { en: "Body ready to move", es: "Cuerpo listo para actuar" },
    ],
    tools: [
      { en: "Take a movement break — walk, stretch, shake it out", es: "Haz una pausa de movimiento: camina, estírate, sacúdete" },
      { en: "Splash cold water on your face", es: "Échate agua fría en la cara" },
      { en: "Delay responding for 10 minutes", es: "Espera 10 minutos antes de responder" },
      { en: "Progressive muscle relaxation: tense and release, head to toe", es: "Relajación muscular progresiva: tensa y suelta, de la cabeza a los pies" },
      { en: "Journal before acting", es: "Escribe antes de actuar" },
    ],
    question: { en: "What boundary might feel crossed?", es: "¿Qué límite se pudo haber cruzado?" },
    challenge: { en: "Wait 10 minutes before responding.", es: "Espera 10 minutos antes de responder." },
  },
  sad: {
    noun: { en: "sadness", es: "tristeza" },
    purpose: {
      en: "Sadness often signals loss or an unmet need. It asks you to slow down and care for yourself.",
      es: "La tristeza suele señalar una pérdida o una necesidad no cubierta. Te pide bajar el ritmo y cuidarte.",
    },
    need: { en: "comfort and connection", es: "consuelo y conexión" },
    sensations: [
      { en: "Heavy chest", es: "Pecho pesado" },
      { en: "Lump in throat", es: "Nudo en la garganta" },
      { en: "Low energy", es: "Poca energía" },
      { en: "Heavy limbs", es: "Cuerpo pesado" },
      { en: "Wanting to cry", es: "Ganas de llorar" },
      { en: "Looking downward", es: "Mirada hacia abajo" },
    ],
    tools: [
      { en: "Talk to yourself like you would to a friend", es: "Háblate como le hablarías a un amigo" },
      { en: "Reach out to someone you trust", es: "Busca a alguien de confianza" },
      { en: "Let yourself cry if it needs to come out", es: "Permítete llorar si lo necesitas" },
      { en: "Put on music that meets you where you are", es: "Pon música que te acompañe" },
      { en: "Do one small, easy win", es: "Logra algo pequeño y sencillo" },
    ],
    question: { en: "What would you say to a friend feeling this way?", es: "¿Qué le dirías a un amigo que se sintiera así?" },
    challenge: { en: "Spend 5 minutes outside or text someone you trust.", es: "Pasa 5 minutos afuera o escríbele a alguien de confianza." },
  },
  disgusted: {
    noun: { en: "disgust", es: "disgusto" },
    purpose: {
      en: "Disgust protects your boundaries — it can signal that something clashes with your values.",
      es: "El disgusto protege tus límites: puede señalar que algo choca con tus valores.",
    },
    need: { en: "distance and protection", es: "distancia y protección" },
    sensations: [
      { en: "Tight stomach", es: "Estómago apretado" },
      { en: "Feeling nauseous", es: "Náuseas" },
      { en: "Wanting to pull away", es: "Ganas de alejarte" },
      { en: "Wrinkling your nose", es: "Nariz arrugada" },
      { en: "Facial tension", es: "Tensión en la cara" },
    ],
    tools: [
      { en: "Ask yourself: is this physical or emotional?", es: "Pregúntate: ¿es físico o emocional?" },
      { en: "Notice if it points to a value or boundary of yours", es: "Nota si apunta a un valor o límite tuyo" },
      { en: "Journal for 2 minutes before reacting", es: "Escribe 2 minutos antes de reaccionar" },
    ],
    question: { en: "What boundary or value is this emotion protecting?", es: "¿Qué límite o valor está protegiendo esta emoción?" },
    challenge: { en: "Write one sentence naming the boundary or value this touched.", es: "Escribe en una frase el límite o valor que se tocó." },
  },
  happy: {
    noun: { en: "happiness", es: "felicidad" },
    purpose: {
      en: "Happiness reinforces what matters to you — it deserves your attention too.",
      es: "La felicidad refuerza lo que te importa. También merece tu atención.",
    },
    need: { en: "expression and celebration", es: "expresión y celebración" },
    savor: {
      en: "Positive emotions don't need fixing — savor them.",
      es: "Las emociones positivas no se arreglan: se saborean.",
    },
    sensations: [
      { en: "Warm chest", es: "Pecho cálido" },
      { en: "Relaxed shoulders", es: "Hombros relajados" },
      { en: "Smiling naturally", es: "Sonrisa natural" },
      { en: "Feeling lighter", es: "Sentirte ligero" },
      { en: "More energy", es: "Más energía" },
      { en: "Open posture", es: "Postura abierta" },
      { en: "Wanting to move", es: "Ganas de moverte" },
      { en: "Wanting to connect", es: "Ganas de conectar" },
    ],
    tools: [
      { en: "Share it with someone", es: "Compártelo con alguien" },
      { en: "Celebrate it, even in a small way", es: "Celébralo, aunque sea en pequeño" },
      { en: "Name three things you're grateful for", es: "Nombra tres cosas que agradeces" },
      { en: "Take a picture to remember this moment", es: "Toma una foto para recordar este momento" },
      { en: "Write one sentence about why today felt good", es: "Escribe una frase sobre por qué hoy se sintió bien" },
    ],
    question: { en: "What contributed to this feeling?", es: "¿Qué contribuyó a este sentimiento?" },
    challenge: { en: "Tell someone why you appreciate them.", es: "Dile a alguien por qué lo aprecias." },
    overrides: {
      "Peaceful": {
        sensations: [
          { en: "Slow breathing", es: "Respiración lenta" },
          { en: "Relaxed jaw", es: "Mandíbula relajada" },
          { en: "Loose shoulders", es: "Hombros sueltos" },
          { en: "Calm stomach", es: "Estómago tranquilo" },
          { en: "Feeling grounded", es: "Sentirte en tierra firme" },
          { en: "Comfortable posture", es: "Postura cómoda" },
        ],
        question: { en: "What helped you feel this way today?", es: "¿Qué te ayudó a sentirte así hoy?" },
      },
      "Excited": {
        purpose: {
          en: "Excitement and anxiety feel very similar in the body — racing heart, butterflies, energy. What matters is what your mind makes of it.",
          es: "La emoción y la ansiedad se sienten muy parecidas en el cuerpo: corazón acelerado, mariposas, energía. Lo que importa es cómo lo interpreta tu mente.",
        },
        sensations: [
          { en: "Butterflies", es: "Mariposas en el estómago" },
          { en: "Racing heart", es: "Corazón acelerado" },
          { en: "Smiling", es: "Sonrisa" },
          { en: "High energy", es: "Mucha energía" },
          { en: "Fast breathing", es: "Respiración rápida" },
          { en: "Restlessness", es: "Inquietud" },
        ],
        question: { en: "Does this feel like excitement, anxiety, or a little of both?", es: "¿Se siente como emoción, ansiedad o un poco de ambas?" },
      },
    },
  },
};

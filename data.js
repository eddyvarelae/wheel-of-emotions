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
    triggerQ: "What happened right before you started feeling this?",
    thoughtQ: "What thought is going through your head?",
    thoughtPlaceholder: "Type your thought…",
    evidence: "Quick check: what evidence supports that thought — and what doesn't?",
    needQ: "What do you need most right now?",
    multiHint: "Tap all that apply.",
    understandTitle: "What it's telling you",
    normalize: "Every emotion has a purpose. The problem isn't having it — it's what you do next.",
    regulateQ: "Try one of these right now",
    challengeTitle: "One tiny action",
    futureYou: "If Future You looked back at this moment a week from now, what advice would they give you?",
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
    triggerQ: "¿Qué pasó justo antes de sentirte así?",
    thoughtQ: "¿Qué pensamiento tienes en la cabeza?",
    thoughtPlaceholder: "Escribe tu pensamiento…",
    evidence: "Chequeo rápido: ¿qué evidencia apoya ese pensamiento… y cuál no?",
    needQ: "¿Qué necesitas más ahora mismo?",
    multiHint: "Toca todo lo que aplique.",
    understandTitle: "Qué te está diciendo",
    normalize: "Toda emoción tiene un propósito. El problema no es sentirla, sino qué haces después.",
    regulateQ: "Prueba una de estas ahora",
    challengeTitle: "Una pequeña acción",
    futureYou: "Si tu yo del futuro viera este momento dentro de una semana, ¿qué consejo te daría?",
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
  body: [
    { id: "chest", t: { en: "Tight chest", es: "Pecho apretado" } },
    { id: "heart", t: { en: "Racing heart", es: "Corazón acelerado" } },
    { id: "stomach", t: { en: "Upset stomach", es: "Estómago revuelto" } },
    { id: "jaw", t: { en: "Jaw tension", es: "Mandíbula tensa" } },
    { id: "hands", t: { en: "Sweaty hands", es: "Manos sudorosas" } },
    { id: "shoulders", t: { en: "Heavy shoulders", es: "Hombros pesados" } },
    { id: "throat", t: { en: "Lump in throat", es: "Nudo en la garganta" } },
    { id: "head", t: { en: "Headache", es: "Dolor de cabeza" } },
    { id: "legs", t: { en: "Restless legs", es: "Piernas inquietas" } },
    { id: "none", t: { en: "I don't notice anything", es: "No noto nada" } },
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

/* Per-core guidance: what the emotion signals, evidence-based regulation
 * tools, a reflective question, and one tiny action to end on. */
const CORE_GUIDANCE = {
  fearful: {
    purpose: {
      en: "Fear and anxiety are trying to protect you — they show up when something feels important or uncertain.",
      es: "El miedo y la ansiedad intentan protegerte: aparecen cuando algo se siente importante o incierto.",
    },
    tools: [
      { en: "Box breathing: in 4, hold 4, out 4, hold 4", es: "Respiración en caja: inhala 4, sostén 4, exhala 4, sostén 4" },
      { en: "Physiological sigh: two short inhales, one long exhale", es: "Suspiro fisiológico: dos inhalaciones cortas, una exhalación larga" },
      { en: "Grounding 5-4-3-2-1: name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste", es: "Anclaje 5-4-3-2-1: nombra 5 cosas que ves, 4 que sientes, 3 que oyes, 2 que hueles y 1 que saboreas" },
    ],
    question: { en: "What's one thing you can control right now?", es: "¿Qué cosa sí puedes controlar ahora mismo?" },
    challenge: { en: "Send the message you've been avoiding.", es: "Manda el mensaje que has estado evitando." },
  },
  angry: {
    purpose: {
      en: "Anger tells you something may feel unfair — or that a boundary was crossed.",
      es: "El enojo te avisa que algo puede ser injusto, o que se cruzó un límite.",
    },
    tools: [
      { en: "Take a movement break — walk, stretch, shake it out", es: "Haz una pausa de movimiento: camina, estírate, sacúdete" },
      { en: "Progressive muscle relaxation: tense and release, head to toe", es: "Relajación muscular progresiva: tensa y suelta, de la cabeza a los pies" },
      { en: "Delay responding for 10 minutes", es: "Espera 10 minutos antes de responder" },
    ],
    question: { en: "What boundary may have been crossed?", es: "¿Qué límite se pudo haber cruzado?" },
    challenge: { en: "Wait 10 minutes before responding.", es: "Espera 10 minutos antes de responder." },
  },
  sad: {
    purpose: {
      en: "Sadness often signals loss or an unmet need. It asks you to slow down and care for yourself.",
      es: "La tristeza suele señalar una pérdida o una necesidad no cubierta. Te pide bajar el ritmo y cuidarte.",
    },
    tools: [
      { en: "Reach out to someone you trust", es: "Busca a alguien de confianza" },
      { en: "Put on music that meets you where you are", es: "Pon música que te acompañe" },
      { en: "Go outside for 10 minutes", es: "Sal afuera 10 minutos" },
    ],
    question: { en: "What would you say to a friend feeling this way?", es: "¿Qué le dirías a un amigo que se sintiera así?" },
    challenge: { en: "Spend 5 minutes outside or text someone you trust.", es: "Pasa 5 minutos afuera o escríbele a alguien de confianza." },
  },
  disgusted: {
    purpose: {
      en: "Disgust protects your boundaries — it can signal that something clashes with your values.",
      es: "El disgusto protege tus límites: puede señalar que algo choca con tus valores.",
    },
    tools: [
      { en: "Ask yourself: is this physical or emotional?", es: "Pregúntate: ¿es físico o emocional?" },
      { en: "Notice if it points to a value or boundary of yours", es: "Nota si apunta a un valor o límite tuyo" },
      { en: "Journal for 2 minutes before reacting", es: "Escribe 2 minutos antes de reaccionar" },
    ],
    question: { en: "Which of your values feels touched?", es: "¿Qué valor tuyo se siente tocado?" },
    challenge: { en: "Write one sentence naming the boundary or value this touched.", es: "Escribe en una frase el límite o valor que se tocó." },
  },
  happy: {
    purpose: {
      en: "Happiness reinforces what matters to you — it deserves your attention too.",
      es: "La felicidad refuerza lo que te importa. También merece tu atención.",
    },
    tools: [
      { en: "Savor it: pause for 30 seconds and take the moment in", es: "Saboréalo: pausa 30 segundos y absorbe el momento" },
      { en: "Share it with someone", es: "Compártelo con alguien" },
      { en: "Write down what contributed to it", es: "Escribe qué lo hizo posible" },
    ],
    question: { en: "What made this possible?", es: "¿Qué lo hizo posible?" },
    challenge: { en: "Share your win with someone, or write down what made today good.", es: "Comparte tu logro con alguien o escribe qué hizo bueno el día de hoy." },
  },
};

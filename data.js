/* Wheel of Emotions — data + translations.
 * Structure follows Geoffrey Roberts' Emotion Wheel (7 core emotions,
 * 41 secondary, 82 outer). To add a language, add its code to every
 * `t` object below and to UI_STRINGS, then add a button in index.html.
 */

const UI_STRINGS = {
  en: {
    title: "Wheel of Emotions",
    tagline: "How are you feeling right now? Give the wheel a spin.",
    spin: "SPIN",
    resultLead: "You landed on…",
    again: "Spin again to explore another feeling.",
    credit: "Based on Geoffrey Roberts' Emotion Wheel.",
  },
  es: {
    title: "La Rueda de las Emociones",
    tagline: "¿Cómo te sientes ahora mismo? Haz girar la rueda.",
    spin: "GIRAR",
    resultLead: "Te ha tocado…",
    again: "Vuelve a girar para explorar otra emoción.",
    credit: "Basada en la rueda de las emociones de Geoffrey Roberts.",
  },
};

/* Order is clockwise from the top of the wheel, mirroring the poster. */
const WHEEL_DATA = [
  {
    id: "bad", color: "#79c7a2",
    t: { en: "Bad", es: "Mal" },
    children: [
      { t: { en: "Bored", es: "Aburrido" }, children: [
        { t: { en: "Indifferent", es: "Indiferente" } },
        { t: { en: "Apathetic", es: "Apático" } },
      ]},
      { t: { en: "Busy", es: "Ocupado" }, children: [
        { t: { en: "Rushed", es: "Apresurado" } },
        { t: { en: "Pressured", es: "Presionado" } },
      ]},
      { t: { en: "Stressed", es: "Estresado" }, children: [
        { t: { en: "Overwhelmed", es: "Desbordado" } },
        { t: { en: "Out of control", es: "Fuera de control" } },
      ]},
      { t: { en: "Tired", es: "Cansado" }, children: [
        { t: { en: "Sleepy", es: "Somnoliento" } },
        { t: { en: "Unfocused", es: "Disperso" } },
      ]},
    ],
  },
  {
    id: "fearful", color: "#f2b077",
    t: { en: "Fearful", es: "Temeroso" },
    children: [
      { t: { en: "Scared", es: "Asustado" }, children: [
        { t: { en: "Helpless", es: "Indefenso" } },
        { t: { en: "Frightened", es: "Espantado" } },
      ]},
      { t: { en: "Anxious", es: "Ansioso" }, children: [
        { t: { en: "Overwhelmed", es: "Agobiado" } },
        { t: { en: "Worried", es: "Preocupado" } },
      ]},
      { t: { en: "Insecure", es: "Inseguro" }, children: [
        { t: { en: "Inadequate", es: "Insuficiente" } },
        { t: { en: "Inferior", es: "Inferior" } },
      ]},
      { t: { en: "Weak", es: "Débil" }, children: [
        { t: { en: "Worthless", es: "Inútil" } },
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
  {
    id: "angry", color: "#e8756f",
    t: { en: "Angry", es: "Enfadado" },
    children: [
      { t: { en: "Let down", es: "Defraudado" }, children: [
        { t: { en: "Betrayed", es: "Traicionado" } },
        { t: { en: "Resentful", es: "Resentido" } },
      ]},
      { t: { en: "Humiliated", es: "Humillado" }, children: [
        { t: { en: "Disrespected", es: "Irrespetado" } },
        { t: { en: "Ridiculed", es: "Ridiculizado" } },
      ]},
      { t: { en: "Bitter", es: "Amargado" }, children: [
        { t: { en: "Indignant", es: "Indignado" } },
        { t: { en: "Violated", es: "Ultrajado" } },
      ]},
      { t: { en: "Mad", es: "Rabioso" }, children: [
        { t: { en: "Furious", es: "Furioso" } },
        { t: { en: "Jealous", es: "Celoso" } },
      ]},
      { t: { en: "Aggressive", es: "Agresivo" }, children: [
        { t: { en: "Provoked", es: "Provocado" } },
        { t: { en: "Hostile", es: "Hostil" } },
      ]},
      { t: { en: "Frustrated", es: "Frustrado" }, children: [
        { t: { en: "Infuriated", es: "Enfurecido" } },
        { t: { en: "Annoyed", es: "Irritado" } },
      ]},
      { t: { en: "Distant", es: "Distante" }, children: [
        { t: { en: "Withdrawn", es: "Retraído" } },
        { t: { en: "Numb", es: "Insensible" } },
      ]},
      { t: { en: "Critical", es: "Crítico" }, children: [
        { t: { en: "Sceptical", es: "Escéptico" } },
        { t: { en: "Dismissive", es: "Desdeñoso" } },
      ]},
    ],
  },
  {
    id: "disgusted", color: "#9aa1a7",
    t: { en: "Disgusted", es: "Asqueado" },
    children: [
      { t: { en: "Disapproving", es: "Desaprobador" }, children: [
        { t: { en: "Judgemental", es: "Moralista" } },
        { t: { en: "Embarrassed", es: "Avergonzado" } },
      ]},
      { t: { en: "Disappointed", es: "Decepcionado" }, children: [
        { t: { en: "Appalled", es: "Consternado" } },
        { t: { en: "Revolted", es: "Repugnado" } },
      ]},
      { t: { en: "Awful", es: "Horrible" }, children: [
        { t: { en: "Nauseated", es: "Nauseabundo" } },
        { t: { en: "Detestable", es: "Detestable" } },
      ]},
      { t: { en: "Repelled", es: "Repelido" }, children: [
        { t: { en: "Horrified", es: "Horrorizado" } },
        { t: { en: "Hesitant", es: "Vacilante" } },
      ]},
    ],
  },
  {
    id: "sad", color: "#7fb2d9",
    t: { en: "Sad", es: "Triste" },
    children: [
      { t: { en: "Hurt", es: "Herido" }, children: [
        { t: { en: "Disappointed", es: "Decepcionado" } },
        { t: { en: "Embarrassed", es: "Abochornado" } },
      ]},
      { t: { en: "Depressed", es: "Deprimido" }, children: [
        { t: { en: "Empty", es: "Vacío" } },
        { t: { en: "Inferior", es: "Inferior" } },
      ]},
      { t: { en: "Guilty", es: "Culpable" }, children: [
        { t: { en: "Ashamed", es: "Avergonzado" } },
        { t: { en: "Remorseful", es: "Arrepentido" } },
      ]},
      { t: { en: "Despair", es: "Desesperado" }, children: [
        { t: { en: "Grief", es: "Afligido" } },
        { t: { en: "Powerless", es: "Impotente" } },
      ]},
      { t: { en: "Vulnerable", es: "Vulnerable" }, children: [
        { t: { en: "Victimised", es: "Victimizado" } },
        { t: { en: "Fragile", es: "Frágil" } },
      ]},
      { t: { en: "Lonely", es: "Solo" }, children: [
        { t: { en: "Isolated", es: "Aislado" } },
        { t: { en: "Abandoned", es: "Abandonado" } },
      ]},
    ],
  },
  {
    id: "happy", color: "#f5d24f",
    t: { en: "Happy", es: "Feliz" },
    children: [
      { t: { en: "Optimistic", es: "Optimista" }, children: [
        { t: { en: "Inspired", es: "Inspirado" } },
        { t: { en: "Hopeful", es: "Esperanzado" } },
      ]},
      { t: { en: "Trusting", es: "Confiado" }, children: [
        { t: { en: "Intimate", es: "Íntimo" } },
        { t: { en: "Sensitive", es: "Sensible" } },
      ]},
      { t: { en: "Peaceful", es: "Pacífico" }, children: [
        { t: { en: "Thankful", es: "Agradecido" } },
        { t: { en: "Loving", es: "Cariñoso" } },
      ]},
      { t: { en: "Powerful", es: "Poderoso" }, children: [
        { t: { en: "Creative", es: "Creativo" } },
        { t: { en: "Courageous", es: "Valiente" } },
      ]},
      { t: { en: "Accepted", es: "Aceptado" }, children: [
        { t: { en: "Valued", es: "Valorado" } },
        { t: { en: "Respected", es: "Respetado" } },
      ]},
      { t: { en: "Proud", es: "Orgulloso" }, children: [
        { t: { en: "Confident", es: "Seguro" } },
        { t: { en: "Successful", es: "Exitoso" } },
      ]},
      { t: { en: "Interested", es: "Interesado" }, children: [
        { t: { en: "Inquisitive", es: "Inquisitivo" } },
        { t: { en: "Curious", es: "Curioso" } },
      ]},
      { t: { en: "Content", es: "Contento" }, children: [
        { t: { en: "Joyful", es: "Alegre" } },
        { t: { en: "Free", es: "Libre" } },
      ]},
      { t: { en: "Playful", es: "Juguetón" }, children: [
        { t: { en: "Cheeky", es: "Travieso" } },
        { t: { en: "Aroused", es: "Excitado" } },
      ]},
    ],
  },
  {
    id: "surprised", color: "#b391d6",
    t: { en: "Surprised", es: "Sorprendido" },
    children: [
      { t: { en: "Excited", es: "Entusiasmado" }, children: [
        { t: { en: "Energetic", es: "Enérgico" } },
        { t: { en: "Eager", es: "Entusiasta" } },
      ]},
      { t: { en: "Amazed", es: "Asombrado" }, children: [
        { t: { en: "Awe", es: "Maravillado" } },
        { t: { en: "Astonished", es: "Estupefacto" } },
      ]},
      { t: { en: "Confused", es: "Confundido" }, children: [
        { t: { en: "Perplexed", es: "Perplejo" } },
        { t: { en: "Disillusioned", es: "Desilusionado" } },
      ]},
      { t: { en: "Startled", es: "Sobresaltado" }, children: [
        { t: { en: "Dismayed", es: "Desconcertado" } },
        { t: { en: "Shocked", es: "Conmocionado" } },
      ]},
    ],
  },
];

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
  },
  es: {
    title: "La Rueda de las Emociones",
    tagline: "¿Cómo te sientes ahora mismo? Haz girar la rueda.",
    spin: "GIRAR",
    resultLead: "Te ha tocado…",
    again: "Vuelve a girar para explorar otra emoción.",
    credit: "Aprobado por MJ.",
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

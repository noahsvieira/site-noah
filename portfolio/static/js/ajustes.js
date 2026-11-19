/** Textos da reforma do layout. Sobrescrevem ou completam os de i18n.js, idioma por idioma. */
import { T } from "./i18n.js";

const AJUSTES = {
  pt: {
    avail: "Disponível para construir",
    verif: "verificando APIs e automações...",
    s2: "Projetos reais",
    h2b: "Código aplicado a problemas reais.",
    s4: "Experiência + formação",
    h2d: "Base técnica, prática constante.",
    st: [
      [
        "Mapear",
        "Entendo o fluxo completo, as dependências e onde o problema realmente começa.",
      ],
      [
        "Investigar",
        "Testo hipóteses com código, logs, dados e uma visão de segurança ofensiva e defensiva.",
      ],
      [
        "Resolver",
        "Construo uma solução clara, automatizo o repetitivo e documento o necessário.",
      ],
    ],
    made: "Projetado e construído com intenção",
    bp: "{a} em destaque · {b} projetos no total",
    bc: "{a} em destaque · {b} licenças e certificados no perfil",
    rest: "{n} outros no perfil",
    more: "mostrar mais",
    less: "mostrar menos",
  },
  en: {
    avail: "Available to build",
    verif: "checking APIs and automations...",
    s2: "Real projects",
    h2b: "Code applied to real problems.",
    s4: "Experience + education",
    h2d: "Technical foundation, constant practice.",
    st: [
      [
        "Map",
        "I understand the full flow, the dependencies and where the problem really starts.",
      ],
      [
        "Investigate",
        "I test hypotheses with code, logs, data and an offensive and defensive security view.",
      ],
      [
        "Solve",
        "I build a clear solution, automate the repetitive and document what is needed.",
      ],
    ],
    made: "Designed and built with intent",
    bp: "{a} featured · {b} projects in total",
    bc: "{a} featured · {b} licenses and certificates on my profile",
    rest: "{n} more on my profile",
    more: "show more",
    less: "show less",
  },
  es: {
    avail: "Disponible para construir",
    verif: "verificando APIs y automatizaciones...",
    s2: "Proyectos reales",
    h2b: "Código aplicado a problemas reales.",
    s4: "Experiencia + formación",
    h2d: "Base técnica, práctica constante.",
    st: [
      [
        "Mapear",
        "Entiendo el flujo completo, las dependencias y dónde empieza realmente el problema.",
      ],
      [
        "Investigar",
        "Pruebo hipótesis con código, logs, datos y una visión de seguridad ofensiva y defensiva.",
      ],
      [
        "Resolver",
        "Construyo una solución clara, automatizo lo repetitivo y documento lo necesario.",
      ],
    ],
    made: "Diseñado y construido con intención",
    bp: "{a} destacados · {b} proyectos en total",
    bc: "{a} destacados · {b} licencias y certificados en el perfil",
    rest: "{n} más en mi perfil",
    more: "mostrar más",
    less: "mostrar menos",
  },
  fr: {
    avail: "Disponible pour construire",
    verif: "vérification des API et des automatisations...",
    s2: "Projets réels",
    h2b: "Du code appliqué à des problèmes réels.",
    s4: "Expérience + formation",
    h2d: "Base technique, pratique constante.",
    st: [
      [
        "Cartographier",
        "Je comprends le flux complet, les dépendances et l’endroit où le problème commence vraiment.",
      ],
      [
        "Enquêter",
        "Je teste des hypothèses avec du code, des logs, des données et une vision de sécurité offensive et défensive.",
      ],
      [
        "Résoudre",
        "Je construis une solution claire, j’automatise le répétitif et je documente le nécessaire.",
      ],
    ],
    made: "Conçu et construit avec intention",
    bp: "{a} en vedette · {b} projets au total",
    bc: "{a} en vedette · {b} licences et certificats sur le profil",
    rest: "{n} autres sur mon profil",
    more: "afficher plus",
    less: "afficher moins",
  },
  no: {
    avail: "Tilgjengelig for å bygge",
    verif: "sjekker API-er og automatiseringer...",
    s2: "Ekte prosjekter",
    h2b: "Kode brukt på ekte problemer.",
    s4: "Erfaring + utdanning",
    h2d: "Teknisk grunnmur, jevn praksis.",
    st: [
      [
        "Kartlegge",
        "Jeg forstår hele flyten, avhengighetene og hvor problemet egentlig begynner.",
      ],
      [
        "Undersøke",
        "Jeg tester hypoteser med kode, logger, data og et offensivt og defensivt sikkerhetsblikk.",
      ],
      [
        "Løse",
        "Jeg bygger en tydelig løsning, automatiserer det repetitive og dokumenterer det nødvendige.",
      ],
    ],
    made: "Designet og bygget med hensikt",
    bp: "{a} fremhevet · {b} prosjekter totalt",
    bc: "{a} fremhevet · {b} lisenser og sertifikater på profilen",
    rest: "{n} til på profilen min",
    more: "vis mer",
    less: "vis mindre",
  },
  de: {
    avail: "Verfügbar zum Bauen",
    verif: "prüfe APIs und Automatisierungen...",
    s2: "Echte Projekte",
    h2b: "Code für echte Probleme.",
    s4: "Erfahrung + Ausbildung",
    h2d: "Technische Basis, ständige Praxis.",
    st: [
      [
        "Erfassen",
        "Ich verstehe den gesamten Ablauf, die Abhängigkeiten und wo das Problem wirklich beginnt.",
      ],
      [
        "Untersuchen",
        "Ich prüfe Hypothesen mit Code, Logs, Daten und einem offensiven wie defensiven Sicherheitsblick.",
      ],
      [
        "Lösen",
        "Ich baue eine klare Lösung, automatisiere Wiederkehrendes und dokumentiere das Nötige.",
      ],
    ],
    made: "Mit Absicht entworfen und gebaut",
    bp: "{a} hervorgehoben · {b} Projekte insgesamt",
    bc: "{a} hervorgehoben · {b} Lizenzen und Zertifikate im Profil",
    rest: "{n} weitere in meinem Profil",
    more: "mehr anzeigen",
    less: "weniger anzeigen",
  },
  it: {
    avail: "Disponibile per costruire",
    verif: "verifica di API e automazioni...",
    s2: "Progetti reali",
    h2b: "Codice applicato a problemi reali.",
    s4: "Esperienza + formazione",
    h2d: "Base tecnica, pratica costante.",
    st: [
      [
        "Mappare",
        "Capisco il flusso completo, le dipendenze e dove il problema inizia davvero.",
      ],
      [
        "Indagare",
        "Verifico ipotesi con codice, log, dati e uno sguardo di sicurezza offensiva e difensiva.",
      ],
      [
        "Risolvere",
        "Costruisco una soluzione chiara, automatizzo il ripetitivo e documento il necessario.",
      ],
    ],
    made: "Progettato e costruito con intenzione",
    bp: "{a} in evidenza · {b} progetti in totale",
    bc: "{a} in evidenza · {b} licenze e certificati sul profilo",
    rest: "altri {n} sul mio profilo",
    more: "mostra di più",
    less: "mostra meno",
  },
};

for (const [codigo, textos] of Object.entries(AJUSTES))
  Object.assign(T[codigo], textos);

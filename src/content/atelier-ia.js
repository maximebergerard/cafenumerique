// ─────────────────────────────────────────────────────────────────────────────
// ATELIER IA : seule source de texte de la section /atelier-ia
//
// Les composants n'écrivent aucun texte en dur : tout se modifie ici.
// Les valeurs "TODO: …" sont des emplacements à remplir.
//
// Dans les textes, {n}, {total}… sont remplacés automatiquement
// (ex. "Visuel {n} / {total}" → "Visuel 3 / 6").
//
// Médias du module "IA ou pas ?" : déposer les fichiers dans
// public/atelier-ia/medias/ et les référencer avec un chemin commençant par
// /atelier-ia/medias/…
// ─────────────────────────────────────────────────────────────────────────────

export const atelierIa = {

  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 1 : Consignes des défis (/atelier-ia/defis)
  // Page consultée sur téléphone par les participants.
  // ═══════════════════════════════════════════════════════════════════════════
  defis: {
    interface: {
      titrePage: "TODO: titre de la page des défis",
      intro: "TODO: phrase d'accueil (ex. Choisissez le défi annoncé par l'animateur)",
      numero: "Défi {n}",
      voirLeDefi: "Voir le défi",
      mission: "Votre mission",
      etapes: "Les étapes",
      socle: "L'essentiel",
      bonus: "Pour aller plus loin",
      siVousBloquez: "Si vous bloquez",
      retourDefis: "Revenir aux défis",
      defiIntrouvable: "Ce défi n'existe pas ou a changé d'adresse.",
    },

    // Structure par défi : id, titre, duree, mission, etapes[], socle[], bonus[], siVousBloquez[]
    // `id` apparaît dans l'adresse : /atelier-ia/defis/<id> (minuscules, tirets, sans accents)
    liste: [
      {
        id: "defi-1",
        titre: "TODO: titre du défi 1",
        duree: "TODO: durée (ex. 15 min)",
        mission: "TODO: mission du défi 1, 2 phrases maximum.",
        etapes: [
          "TODO: étape 1 du défi 1",
          "TODO: étape 2 du défi 1",
          "TODO: étape 3 du défi 1",
        ],
        socle: [
          "TODO: point essentiel 1 du défi 1",
          "TODO: point essentiel 2 du défi 1",
        ],
        bonus: [
          "TODO: pour aller plus loin 1 du défi 1",
        ],
        siVousBloquez: [
          "TODO: aide 1 du défi 1",
          "TODO: aide 2 du défi 1",
        ],
      },
      {
        id: "defi-2",
        titre: "TODO: titre du défi 2",
        duree: "TODO: durée",
        mission: "TODO: mission du défi 2, 2 phrases maximum.",
        etapes: [
          "TODO: étape 1 du défi 2",
          "TODO: étape 2 du défi 2",
        ],
        socle: [
          "TODO: point essentiel 1 du défi 2",
        ],
        bonus: [
          "TODO: pour aller plus loin 1 du défi 2",
        ],
        siVousBloquez: [
          "TODO: aide 1 du défi 2",
        ],
      },
      {
        id: "defi-3",
        titre: "TODO: titre du défi 3",
        duree: "TODO: durée",
        mission: "TODO: mission du défi 3, 2 phrases maximum.",
        etapes: [
          "TODO: étape 1 du défi 3",
          "TODO: étape 2 du défi 3",
        ],
        socle: [
          "TODO: point essentiel 1 du défi 3",
        ],
        bonus: [
          "TODO: pour aller plus loin 1 du défi 3",
        ],
        siVousBloquez: [
          "TODO: aide 1 du défi 3",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 2 : IA ou pas ? (/atelier-ia/ia-ou-pas)
  // Projection. Flèche droite = étape suivante, flèche gauche = retour,
  // F = plein écran, Échap = sortir du plein écran.
  // Déroulé d'un visuel : visuel seul → réponse → indices un par un → débrief.
  // ═══════════════════════════════════════════════════════════════════════════
  iaOuPas: {
    interface: {
      compteur: "Visuel {n} / {total}",
      pleinEcran: "Plein écran",
      quitter: "Quitter",
      precedent: "Précédent",
      suivant: "Suivant",
      indices: "Les indices",
      debrief: "À retenir",
      mediaManquant: "Fichier à ajouter : {src}",
      lancerVideo: "Cliquer pour lancer la vidéo",
    },

    // Libellé affiché pour chaque valeur possible de `reponse`
    reponses: {
      ia: "Généré par IA",
      authentique: "Authentique",
      indecidable: "Impossible à trancher à l'œil",
    },

    // Structure par visuel : id, type, src, alt, reponse, indices[], phraseDeDebrief
    //   type    : "image" | "video"
    //   reponse : "ia" | "authentique" | "indecidable"
    //   indices : [{ titre, detail, zone? }]
    //     zone (optionnelle) = rectangle entouré sur le visuel, en % de sa taille :
    //     { x, y, largeur, hauteur } ; x/y = coin haut gauche (0 à 100)
    //     Sans zone, l'indice s'affiche seulement en texte.
    visuels: [
      {
        id: "visuel-1",
        type: "image",
        src: "/atelier-ia/medias/visuel-1.jpg",
        alt: "TODO: description courte du visuel 1",
        reponse: "ia",
        indices: [
          {
            titre: "TODO: indice 1 (ex. Les mains)",
            detail: "TODO: explication courte de l'indice 1",
            zone: { x: 40, y: 55, largeur: 20, hauteur: 20 },
          },
          {
            titre: "TODO: indice 2",
            detail: "TODO: explication courte de l'indice 2",
          },
        ],
        phraseDeDebrief: "TODO: phrase de débrief du visuel 1",
      },
      {
        id: "visuel-2",
        type: "image",
        src: "/atelier-ia/medias/visuel-2.jpg",
        alt: "TODO: description courte du visuel 2",
        reponse: "authentique",
        indices: [
          {
            titre: "TODO: indice 1",
            detail: "TODO: explication",
            zone: { x: 10, y: 10, largeur: 30, hauteur: 25 },
          },
        ],
        phraseDeDebrief: "TODO: phrase de débrief du visuel 2",
      },
      {
        id: "visuel-3",
        type: "video",
        src: "/atelier-ia/medias/visuel-3.mp4",
        alt: "TODO: description courte du visuel 3",
        reponse: "indecidable",
        indices: [
          {
            titre: "TODO: indice 1",
            detail: "TODO: explication",
          },
        ],
        phraseDeDebrief: "TODO: phrase de débrief du visuel 3",
      },
      {
        id: "visuel-4",
        type: "image",
        src: "/atelier-ia/medias/visuel-4.jpg",
        alt: "TODO: description courte du visuel 4",
        reponse: "ia",
        indices: [
          {
            titre: "TODO: indice 1",
            detail: "TODO: explication",
          },
        ],
        phraseDeDebrief: "TODO: phrase de débrief du visuel 4",
      },
      {
        id: "visuel-5",
        type: "image",
        src: "/atelier-ia/medias/visuel-5.jpg",
        alt: "TODO: description courte du visuel 5",
        reponse: "authentique",
        indices: [
          {
            titre: "TODO: indice 1",
            detail: "TODO: explication",
          },
        ],
        phraseDeDebrief: "TODO: phrase de débrief du visuel 5",
      },
      {
        id: "visuel-6",
        type: "video",
        src: "/atelier-ia/medias/visuel-6.mp4",
        alt: "TODO: description courte du visuel 6",
        reponse: "ia",
        indices: [
          {
            titre: "TODO: indice 1",
            detail: "TODO: explication",
          },
        ],
        phraseDeDebrief: "TODO: phrase de débrief du visuel 6",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 4 : Après l'atelier (/atelier-ia/apres)
  // Page publique, consultée depuis chez soi.
  // ═══════════════════════════════════════════════════════════════════════════
  apres: {
    interface: {
      titrePage: "TODO: titre de la page (ex. Après l'atelier IA)",
      intro: "TODO: phrase d'introduction",
      defiDeLaSemaine: "Le défi de la semaine",
      outils: "Les outils pour essayer",
      ouvrir: "Ouvrir {nom}",
      recap: "Ce qu'on a vu ensemble",
      quiz: "Quelques questions pour s'entraîner",
      commencerQuiz: "Commencer",
      progressionQuiz: "Question {n} / {total}",
      bonneReponse: "Bien vu !",
      pasToutAFait: "Pas tout à fait, et c'est normal :",
      laBonneReponse: "La bonne réponse :",
      questionSuivante: "Question suivante",
      terminerQuiz: "Terminer",
      recommencerQuiz: "Refaire les questions",
    },

    // Mis en avant tout en haut de la page
    defiDeLaSemaine: {
      titre: "TODO: titre du défi de la semaine",
      texte: "TODO: description du défi de la semaine",
    },

    // Gros boutons, ouverts dans un nouvel onglet
    outils: [
      { id: "chatgpt", nom: "ChatGPT", url: "https://chatgpt.com", description: "TODO: une phrase sur ChatGPT" },
      { id: "claude", nom: "Claude", url: "https://claude.ai", description: "TODO: une phrase sur Claude" },
      { id: "gemini", nom: "Gemini", url: "https://gemini.google.com", description: "TODO: une phrase sur Gemini" },
    ],

    // Points courts
    recap: [
      "TODO: point clé 1 de la séance",
      "TODO: point clé 2 de la séance",
      "TODO: point clé 3 de la séance",
    ],

    // 5 questions de remobilisation, à faire quelques jours après.
    // Chaque choix a son propre feedback explicatif (jamais un simple "faux").
    quiz: {
      intro: "TODO: consigne (ex. À faire quelques jours après l'atelier, sans pression)",
      conclusion: "TODO: message de fin, encourageant",
      questions: [
        {
          id: "q1",
          question: "TODO: question 1",
          choix: [
            { texte: "TODO: choix A", correct: true, feedback: "TODO: pourquoi c'est la bonne réponse" },
            { texte: "TODO: choix B", correct: false, feedback: "TODO: explication bienveillante" },
            { texte: "TODO: choix C", correct: false, feedback: "TODO: explication bienveillante" },
          ],
        },
        {
          id: "q2",
          question: "TODO: question 2",
          choix: [
            { texte: "TODO: choix A", correct: false, feedback: "TODO: explication" },
            { texte: "TODO: choix B", correct: true, feedback: "TODO: explication" },
          ],
        },
        {
          id: "q3",
          question: "TODO: question 3",
          choix: [
            { texte: "TODO: choix A", correct: false, feedback: "TODO: explication" },
            { texte: "TODO: choix B", correct: true, feedback: "TODO: explication" },
          ],
        },
        {
          id: "q4",
          question: "TODO: question 4",
          choix: [
            { texte: "TODO: choix A", correct: true, feedback: "TODO: explication" },
            { texte: "TODO: choix B", correct: false, feedback: "TODO: explication" },
          ],
        },
        {
          id: "q5",
          question: "TODO: question 5",
          choix: [
            { texte: "TODO: choix A", correct: false, feedback: "TODO: explication" },
            { texte: "TODO: choix B", correct: true, feedback: "TODO: explication" },
          ],
        },
      ],
    },

    // Message affiché en haut de page selon la dernière visite (mémorisée sur l'appareil).
    // premiereVisite : null pour ne rien afficher la première fois.
    // retours : on prend le message au plus grand `apresJours` atteint.
    messagesVisite: {
      premiereVisite: "TODO: message de bienvenue (ou null)",
      retours: [
        { apresJours: 0, texte: "TODO: retour le même jour" },
        { apresJours: 1, texte: "TODO: retour après 1 jour ou plus" },
        { apresJours: 7, texte: "TODO: retour après une semaine ou plus" },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE ANIMATEUR (/atelier-ia/animateur) : privée, non indexée
  // ═══════════════════════════════════════════════════════════════════════════
  animateur: {
    interface: {
      titrePage: "Atelier IA · Animateur",
      modules: "Les modules",
      qrTitre: "QR code des défis",
      qrLegende: "Scannez pour voir les défis",
      qrAfficher: "Afficher en grand",
      qrFermer: "Fermer",
      minuteur: "Minuteur",
      minutes: "{n} min",
      dureePerso: "Autre durée (minutes)",
      valider: "OK",
      demarrer: "Démarrer",
      pause: "Pause",
      reprendre: "Reprendre",
      reinitialiser: "Remettre à zéro",
      tempsEcoule: "Temps écoulé !",
    },

    // `to` = adresse interne du site
    liens: [
      { to: "/atelier-ia/defis", titre: "Consignes des défis", description: "Page des participants (téléphone)" },
      { to: "/atelier-ia/ia-ou-pas", titre: "IA ou pas ?", description: "Projection, pilotage au clavier" },
      { to: "/atelier-ia/scores", titre: "Tableau des grains", description: "Scores, sur mon téléphone" },
      { to: "/atelier-ia/apres", titre: "Après l'atelier", description: "Page publique à retrouver chez soi" },
    ],

    // Durées proposées en boutons rapides (minutes)
    dureesMinuteur: [5, 10, 15, 20],
  },
};

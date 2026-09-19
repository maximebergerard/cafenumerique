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
      titrePage: "Les défis",
      intro: "Choisissez le défi annoncé par l'animateur.",
      numero: "Défi {n}",
      voirLeDefi: "Voir le défi",
      mission: "Votre mission",
      etapes: "Les étapes",
      socle: "L'essentiel",
      bonus: "Pour aller plus loin",
      siVousBloquez: "Si vous bloquez",
      retourDefis: "Revenir aux défis",
      defiIntrouvable: "Ce défi n'existe pas ou a changé d'adresse.",
      // Encadré rappelé en haut de chaque défi
      rappelTitre: "Les trois ingrédients",
      rappel: [
        "Qui je suis et à qui je parle",
        "Ce que je veux exactement, longueur comprise",
        "Comment je veux que ça sonne",
      ],
      // Lien discret en bas de la liste, pour ceux qui vont vite
      lienApres: "Déjà fini ? La page à garder pour après l'atelier",
    },

    // Structure par défi : id, titre, duree, mission, etapes[], socle[], bonus[], siVousBloquez[]
    // `id` apparaît dans l'adresse : /atelier-ia/defis/<id> (minuscules, tirets, sans accents)
    liste: [
      {
        id: "defi-1",
        titre: "Le mot au voisin",
        duree: "20 min",
        mission:
          "Votre voisin se gare régulièrement devant votre portail. Vous voulez lui laisser un mot dans sa boîte aux lettres, ferme, mais sans se fâcher.",
        etapes: [
          "Manche 1 : demandez à l'IA d'écrire ce mot, comme vous le sentez.",
          "On compare les résultats tous ensemble.",
          "Manche 2 : reformulez votre demande, et ajoutez un détail vrai de votre situation (le prénom du voisin, son chien, le bonjour du matin).",
        ],
        socle: [
          "Obtenir un mot plus court et plus personnel qu'à la manche 1.",
        ],
        bonus: [
          "Redemandez la même chose en deux lignes maximum.",
        ],
        siVousBloquez: [
          "Qu'est-ce que je sais de la situation que la machine ne peut pas deviner ?",
          "Dites-lui la longueur que vous voulez.",
          "Dites-lui sur quel ton vous voulez que ça sonne.",
        ],
      },
      {
        id: "defi-2",
        titre: "La commande impossible",
        duree: "15 min",
        mission:
          "Reproduire l'image affichée à l'écran. Un seul prompt, un seul essai, un seul téléphone par binôme.",
        etapes: [
          "Regardez l'image et listez tout ce que vous y voyez.",
          "Écrivez votre demande d'un seul coup.",
          "Envoyez votre résultat dans le groupe WhatsApp.",
        ],
        socle: [
          "Avoir décrit au moins quatre éléments de l'image.",
        ],
        bonus: [
          "Après la révélation du vrai prompt, corrigez une seule chose.",
        ],
        siVousBloquez: [
          "Qui ou quoi : le personnage principal.",
          "Quoi : ce qu'il est en train de faire.",
          "Comment : le décor, l'époque, l'angle de vue.",
        ],
      },
      {
        id: "defi-3",
        titre: "Le génie du quotidien",
        duree: "12 min",
        mission:
          "Trouvez-lui un vrai travail : quelque chose qui vous sert pour de vrai cette semaine.",
        etapes: [
          "Tirez deux papiers, gardez celui que vous préférez. Ou gardez votre propre idée si vous en avez une.",
          "Formulez votre demande avec les trois ingrédients.",
          "Relancez au moins une fois pour améliorer le résultat.",
          "Passez votre téléphone à la table d'à côté.",
        ],
        socle: [
          "Obtenir un résultat que vous pourriez vraiment utiliser.",
        ],
        bonus: [
          "Demandez le même contenu dans un autre format.",
        ],
        siVousBloquez: [
          "Dites-lui pour qui c'est.",
          "Dites-lui ce que vous voulez en faire.",
          "Si le résultat est trop long, dites-le-lui.",
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
      titrePage: "Après l'atelier",
      intro: "Tout ce qu'on a fait ensemble, à retrouver tranquillement chez vous.",
      defiDeLaSemaine: "Le défi de la semaine",
      outils: "Les outils pour essayer",
      outilsNote: "Tous gratuits pour ce qu'on a fait aujourd'hui.",
      regles: "Les deux règles",
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
      titre: "Le papier que vous ne comprenez pas",
      texte:
        "Prenez en photo un papier que vous ne comprenez pas, et demandez-lui de vous l'expliquer en trois phrases. C'est tout.",
    },

    // Gros boutons, ouverts dans un nouvel onglet
    outils: [
      { id: "chatgpt", nom: "ChatGPT", url: "https://chatgpt.com", description: "Le plus connu. Celui qu'on a utilisé pour les défis." },
      { id: "claude", nom: "Claude", url: "https://claude.ai", description: "Très à l'aise pour écrire des textes et des courriers." },
      { id: "gemini", nom: "Gemini", url: "https://gemini.google.com", description: "Celui de Google, pratique depuis un téléphone Android." },
    ],

    // Encadré : les deux règles à ne pas oublier
    regles: [
      {
        titre: "Ne tapez rien que vous ne diriez pas à voix haute dans une salle d'attente.",
        texte:
          "Jamais de numéro de sécurité sociale, de mot de passe, de coordonnées bancaires, ni la santé de quelqu'un d'autre.",
      },
      {
        titre: "Elle a toujours l'air sûre d'elle, même quand elle se trompe.",
        texte: "Dès que c'est un chiffre, une date, une adresse ou un prix, on vérifie ailleurs.",
      },
    ],

    // Points courts
    recap: [
      "Les trois ingrédients d'une bonne demande : qui je suis et à qui je parle, ce que je veux exactement (longueur comprise), comment je veux que ça sonne.",
      "On peut lui demander de recommencer autrement, autant de fois qu'on veut, sans tout retaper.",
      "Une image parfaitement normale peut avoir été fabriquée : vous en avez fabriqué une vous-mêmes.",
    ],

    // 5 questions de remobilisation, à faire quelques jours après.
    // Chaque choix a son propre feedback explicatif (jamais un simple "faux").
    quiz: {
      intro:
        "À faire quelques jours après l'atelier, tranquillement, sans pression. Se tromper fait partie du jeu : c'est comme ça qu'on retient.",
      conclusion:
        "Voilà, vous en savez déjà plus que la plupart des gens sur le sujet. Le reste vient en s'en servant, un petit peu chaque semaine.",
      questions: [
        {
          id: "q1",
          question: "Une réponse très bien écrite est forcément juste.",
          choix: [
            { texte: "Vrai", correct: false, feedback: "C'est le piège le plus courant : elle écrit toujours bien, même quand le fond est faux. La qualité du style ne dit rien de l'exactitude." },
            { texte: "Faux", correct: true, feedback: "Exactement. Elle écrit toujours bien, ça ne dit rien sur le fond. Un chiffre, une date, une adresse : on vérifie ailleurs." },
          ],
        },
        {
          id: "q2",
          question: "Ce que j'écris dans l'IA reste sur mon téléphone.",
          choix: [
            { texte: "Vrai", correct: false, feedback: "Non : ce que vous tapez part chez une entreprise, sur ses ordinateurs, et ça y reste. D'où la règle de la salle d'attente." },
            { texte: "Faux", correct: true, feedback: "Bien vu. Ça part chez une entreprise et ça reste chez elle. On n'y met donc rien qu'on ne dirait pas à voix haute dans une salle d'attente." },
          ],
        },
        {
          id: "q3",
          question: "Je peux lui demander de recommencer autrement sans tout retaper.",
          choix: [
            { texte: "Vrai", correct: true, feedback: "Oui, et autant de fois que vous voulez : « plus court », « plus simple », « plus chaleureux ». C'est même là que les bons résultats arrivent." },
            { texte: "Faux", correct: false, feedback: "Si, justement : elle se souvient de la conversation en cours. Un simple « plus court » suffit, pas besoin de tout réécrire." },
          ],
        },
        {
          id: "q4",
          question: "Une photo parfaitement normale peut avoir été fabriquée.",
          choix: [
            { texte: "Vrai", correct: true, feedback: "Oui, et vous en avez fabriqué une vous-mêmes pendant l'atelier. D'où le réflexe : qui publie cette image, et où est-elle déjà apparue ?" },
            { texte: "Faux", correct: false, feedback: "Si : souvenez-vous, vous en avez fabriqué une vous-mêmes pendant l'atelier, sans aucun défaut visible." },
          ],
        },
        {
          id: "q5",
          question: "Pour qu'elle réponde bien, il faut lui dire qui je suis, ce que je veux exactement et sur quel ton.",
          choix: [
            { texte: "Vrai", correct: true, feedback: "Ce sont les trois ingrédients. C'est ce qui a fait toute la différence entre la manche 1 et la manche 2 du mot au voisin." },
            { texte: "Faux", correct: false, feedback: "Ce sont pourtant les trois ingrédients vus ensemble : sans eux, elle répond à côté ou beaucoup trop long." },
          ],
        },
      ],
    },

    // Message affiché en haut de page selon la dernière visite (mémorisée sur l'appareil).
    // premiereVisite : null pour ne rien afficher la première fois.
    // retours : on prend le message au plus grand `apresJours` atteint.
    messagesVisite: {
      premiereVisite: null,
      retours: [
        { apresJours: 0, texte: "Content de vous revoir. Tout est là, prenez votre temps." },
        { apresJours: 1, texte: "Vous revoilà : c'est exactement comme ça qu'on retient. Essayez les questions, plus bas." },
        { apresJours: 7, texte: "Une semaine déjà. Si vous n'avez pas encore fait le défi de la semaine, c'est le moment." },
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

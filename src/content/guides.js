// ─────────────────────────────────────────────────────────────────────────────
// GUIDES : pages /guides et /guides/<slug>
//
// Des pages durables, pour le grand public, écrites à partir des ateliers.
// Idée : chaque séance peut donner naissance à un ou deux guides.
//
// Blocs possibles dans `sections[].blocs` :
//   { p: "paragraphe" }
//   { liste: ["…", "…"] }
//   { etapes: ["…", "…"] }                     liste numérotée
//   { indices: [["titre", "explication"], …] }  paires mises en valeur
//   { alerte: "texte important" }
// `misAJour` : date ISO, affichée et utilisée par les données structurées.
// ─────────────────────────────────────────────────────────────────────────────

export const GUIDES = [
  {
    slug: 'faux-sms-colis',
    theme: 'Arnaques en ligne',
    titre: 'Faux SMS de colis : comment le reconnaître et que faire',
    seoTitre: 'Faux SMS de colis : le reconnaître et que faire',
    seoDescription:
      "« Votre colis est en attente, frais de livraison à régler » : comment reconnaître un faux SMS de La Poste, Colissimo ou Chronopost, et que faire si vous avez cliqué ou payé.",
    resume:
      "Le SMS de colis bloqué est l'une des arnaques les plus répandues. Voici comment la repérer en 30 secondes, et quoi faire si vous êtes tombé dans le piège.",
    misAJour: '2026-09-17',
    atelier: 'arnaques-en-ligne',
    simulation: { path: '/sms-laposte', label: 'Examiner un faux SMS La Poste' },
    sections: [
      {
        titre: "À quoi ressemble l'arnaque",
        blocs: [
          {
            p: "Vous recevez un SMS : « Votre colis n'a pas pu être livré. Des frais de 1,95 € sont à régler avant ce soir. » Un lien vous invite à payer. La page ressemble à celle de La Poste, Colissimo ou Chronopost, et demande votre numéro de carte bancaire.",
          },
          {
            p: "Le petit montant n'est pas un hasard : il paraît anodin. En réalité, les escrocs récupèrent vos coordonnées bancaires pour faire ensuite des paiements bien plus importants, ou appellent quelques jours plus tard en se faisant passer pour votre banque.",
          },
        ],
      },
      {
        titre: 'Les signaux d’alarme',
        blocs: [
          {
            indices: [
              ["L'urgence", '« avant ce soir », « dernier avis » : on veut vous empêcher de réfléchir'],
              ['Le lien', "adresse raccourcie (bit.ly…) ou qui ne se termine pas par le vrai site, par exemple laposte.fr"],
              ['Le petit montant', 'quelques euros de « frais de douane » ou de « réexpédition »'],
              ["L'expéditeur", 'un numéro de portable classique (06, 07) au lieu du nom du transporteur'],
              ['Le contexte', "vous n'attendez aucun colis, ou vous ne l'avez pas commandé chez ce transporteur"],
            ],
          },
          {
            alerte:
              'Un transporteur ne vous demande jamais de payer des frais par un lien envoyé par SMS. Dans le doute, allez vous-même sur le site officiel en tapant son adresse, ou suivez votre colis depuis le site où vous l’avez commandé.',
          },
        ],
      },
      {
        titre: 'Le bon réflexe',
        blocs: [
          {
            etapes: [
              'Ne cliquez pas sur le lien, ne répondez pas au SMS.',
              'Signalez-le gratuitement en le transférant au 33700.',
              'Supprimez le message.',
            ],
          },
        ],
      },
      {
        titre: "J'ai cliqué ou payé : que faire ?",
        blocs: [
          {
            etapes: [
              'Faites immédiatement opposition sur votre carte bancaire, auprès de votre banque ou au 0 892 705 705 (serveur interbancaire, 7j/7).',
              'Surveillez vos comptes et contestez auprès de votre banque tout paiement que vous ne reconnaissez pas.',
              'Si vous avez saisi un mot de passe, changez-le partout où vous l’utilisez.',
              "Signalez les paiements frauduleux sur Perceval (service-public.fr) et portez plainte : c'est important pour être remboursé.",
              'Méfiez-vous des appels qui suivent : un faux conseiller bancaire peut vous contacter pour « annuler » la fraude. Raccrochez et rappelez vous-même votre banque.',
            ],
          },
          {
            p: 'Pour être accompagné, cybermalveillance.gouv.fr propose un diagnostic et des conseils gratuits. Info Escroqueries répond au 0 805 805 817 (appel gratuit).',
          },
        ],
      },
    ],
  },
  {
    slug: 'reconnaitre-image-ia',
    theme: 'Intelligence artificielle',
    titre: 'Image ou vidéo créée par IA : comment la repérer',
    seoTitre: 'Reconnaître une image ou une vidéo créée par IA',
    seoDescription:
      "Mains déformées, textes illisibles, arrière-plan incohérent : les indices pour repérer une image ou une vidéo générée par intelligence artificielle, et comment vérifier son origine avec Google Lens.",
    resume:
      "Les images créées par intelligence artificielle sont partout sur les réseaux sociaux. Quelques indices permettent souvent de les repérer, et quand l'œil ne suffit plus, on vérifie la source.",
    misAJour: '2026-09-17',
    atelier: 'intelligence-artificielle',
    sections: [
      {
        titre: 'Pourquoi c’est important',
        blocs: [
          {
            p: "Une photo émouvante qui fait le tour de Facebook, une célébrité qui recommande un placement, un journaliste qui annonce une fausse nouvelle : de plus en plus de contenus sont fabriqués par IA. Certains sont inoffensifs, d'autres servent à tromper, à faire peur ou à escroquer.",
          },
        ],
      },
      {
        titre: 'Les indices sur une image',
        blocs: [
          {
            indices: [
              ['Les mains', 'doigts en trop, soudés, tordus ou de longueurs étranges'],
              ['Les textes', 'panneaux, étiquettes ou affiches avec des lettres qui ne veulent rien dire'],
              ["L'arrière-plan", 'objets qui se fondent les uns dans les autres, lignes qui ne se raccordent pas'],
              ['Les détails', 'boucles d’oreilles différentes, branches de lunettes déformées, dents trop régulières'],
              ["L'ambiance", 'peau trop lisse, lumière parfaite, image « trop belle pour être vraie »'],
            ],
          },
        ],
      },
      {
        titre: 'Les indices sur une vidéo',
        blocs: [
          {
            liste: [
              'Les lèvres ne suivent pas tout à fait les paroles.',
              'Le contour du visage devient flou quand la personne tourne la tête.',
              'Les yeux clignent rarement ou bizarrement, le regard reste fixe.',
              'La voix est monotone, sans respiration, ou légèrement décalée avec l’image.',
            ],
          },
        ],
      },
      {
        titre: 'Quand l’œil ne suffit plus : vérifier la source',
        blocs: [
          {
            p: "Les IA progressent très vite et certaines images sont impossibles à distinguer d'une vraie photo. Dire « je ne sais pas » est alors la bonne réponse. On change de question : qui publie ce contenu ?",
          },
          {
            liste: [
              'Qui le publie ? Un média connu, un proche, ou une page inconnue créée récemment ?',
              "Un grand média en parle-t-il ? Une information spectaculaire reprise nulle part doit alerter.",
              "La publication joue-t-elle sur l'émotion, l'indignation ou l'urgence ? C'est souvent voulu.",
            ],
          },
          { alerte: 'Dans le doute, on ne partage pas.' },
        ],
      },
      {
        titre: "Retrouver l'origine d'une image avec Google Lens",
        blocs: [
          {
            etapes: [
              "Sur votre téléphone, ouvrez l'image dans Chrome ou dans l'application Google.",
              "Appuyez longuement sur l'image.",
              'Choisissez « Rechercher avec Google Lens ».',
              "Regardez où l'image apparaît déjà : sa date, le site d'origine, le contexte réel.",
            ],
          },
        ],
      },
      {
        titre: 'Deepfakes et arnaques',
        blocs: [
          {
            p: "Une IA peut imiter une voix à partir de quelques secondes d'enregistrement. Si un « proche » vous appelle en urgence pour réclamer de l'argent, raccrochez et rappelez-le sur son numéro habituel. Convenir en famille d'un mot de code secret est une excellente parade.",
          },
        ],
      },
    ],
  },
  {
    slug: 'arnaque-faux-proche-whatsapp',
    theme: 'WhatsApp',
    titre: 'Arnaque au faux proche sur WhatsApp : les bons réflexes',
    seoTitre: 'Arnaque « Maman, j’ai changé de numéro » sur WhatsApp',
    seoDescription:
      "« Coucou papa, j'ai cassé mon téléphone, voici mon nouveau numéro » : comment reconnaître l'arnaque au faux enfant ou petit-enfant sur WhatsApp et SMS, et comment réagir.",
    resume:
      "Un message d'un numéro inconnu se présente comme votre enfant ou petit-enfant, et finit par demander de l'argent en urgence. Voici comment déjouer cette arnaque très répandue.",
    misAJour: '2026-09-17',
    atelier: 'whatsapp',
    simulation: { path: '/whatsapp-lucas', label: 'Examiner un faux message de petit-fils' },
    sections: [
      {
        titre: 'Comment se déroule l’arnaque',
        blocs: [
          {
            etapes: [
              "Un numéro inconnu écrit : « Coucou mamie, c'est Lucas ! J'ai perdu mon téléphone, voici mon nouveau numéro. »",
              "La conversation est chaleureuse et naturelle, parfois pendant plusieurs heures. Le prénom est souvent deviné ou trouvé sur les réseaux sociaux.",
              "Puis vient la demande : une facture urgente à régler, 350 € à virer « avant ce soir » parce que son application bancaire ne marche pas sur le nouveau téléphone.",
              "L'escroc refuse d'appeler (« micro cassé », « je suis en réunion ») et insiste sur la discrétion.",
            ],
          },
        ],
      },
      {
        titre: 'Les signaux d’alarme',
        blocs: [
          {
            indices: [
              ['Un nouveau numéro', "le contact n'est pas enregistré, aucune photo ou une photo récupérée ailleurs"],
              ["L'urgence", '« aujourd’hui », « avant 17h », « je suis dans la galère »'],
              ["L'argent", "virement vers un compte à un autre nom, carte cadeau, paiement pour « quelqu'un d'autre »"],
              ["Pas d'appel possible", 'toujours une bonne excuse pour ne pas parler de vive voix'],
              ['Le secret', '« n’en parle pas à papa », « je t’expliquerai »'],
            ],
          },
        ],
      },
      {
        titre: 'Le bon réflexe',
        blocs: [
          {
            etapes: [
              "Ne répondez pas à la demande d'argent, même pour un petit montant.",
              "Appelez votre proche sur son numéro habituel, celui que vous avez enregistré. Dans l'immense majorité des cas, il n'a jamais changé de téléphone.",
              'Posez une question que seul votre proche connaît, ou demandez le mot de code familial si vous en avez convenu un.',
              'Bloquez et signalez le numéro dans WhatsApp : ouvrez la conversation, touchez le nom en haut, puis « Signaler ».',
            ],
          },
          {
            alerte:
              "Variante récente : l'appel vocal avec une voix imitée par IA. La règle est la même : urgence + argent = on raccroche et on rappelle soi-même.",
          },
        ],
      },
      {
        titre: 'Protéger son compte WhatsApp',
        blocs: [
          {
            liste: [
              'Ne communiquez jamais le code à 6 chiffres reçu par SMS, même à un proche : il sert à voler votre compte.',
              'Activez la vérification en deux étapes : Paramètres → Compte → Vérification en deux étapes.',
              'Réservez votre photo de profil et votre statut à vos contacts : Paramètres → Confidentialité.',
            ],
          },
        ],
      },
      {
        titre: "J'ai envoyé de l'argent : que faire ?",
        blocs: [
          {
            etapes: [
              'Contactez immédiatement votre banque pour tenter de bloquer ou rappeler le virement.',
              'Gardez les preuves : captures d’écran de la conversation, numéro, coordonnées bancaires de l’escroc.',
              'Portez plainte au commissariat ou à la gendarmerie.',
              'Info Escroqueries répond au 0 805 805 817 (appel gratuit), et cybermalveillance.gouv.fr vous guide pas à pas.',
            ],
          },
          {
            p: "Et surtout : ce n'est pas une question d'intelligence. Ces arnaques sont conçues par des professionnels pour jouer sur l'affection et l'urgence. En parler aide les autres à ne pas tomber dans le piège.",
          },
        ],
      },
    ],
  },
]

export function findGuide(slug) {
  return GUIDES.find((g) => g.slug === slug)
}

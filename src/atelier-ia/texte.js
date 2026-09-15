// Remplace les {cles} d'un texte du fichier de contenu : remplir("Défi {n}", { n: 2 })
export function remplir(texte, valeurs = {}) {
  return texte.replace(/\{(\w+)\}/g, (brut, cle) => (cle in valeurs ? valeurs[cle] : brut))
}

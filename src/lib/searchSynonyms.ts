// Intelligentes Synonym-System für die Wissensbibliothek-Suche
// Erlaubt es Menschen mit verschiedenen Begriffen die passenden Artikel zu finden

export const searchSynonyms: Record<string, string[]> = {
  // Angst & Nervosität
  'angst': ['nervosität', 'lampenfieber', 'panik', 'stress', 'unsicherheit', 'blackout', 'redeangst', 'präsentationsangst', 'sprechangst', 'bühnenangst'],
  'nervosität': ['angst', 'lampenfieber', 'aufregung', 'nervös', 'zittern', 'nervosität', 'redeangst'],
  'lampenfieber': ['angst', 'nervosität', 'redeangst', 'bühnenangst', 'präsentationsangst', 'sprechangst'],
  'redeangst': ['angst', 'nervosität', 'lampenfieber', 'präsentationsangst', 'sprechangst', 'bühnenangst', 'präsentation'],
  'präsentationsangst': ['angst', 'nervosität', 'lampenfieber', 'redeangst', 'präsentation', 'vortrag'],
  'blackout': ['vergessen', 'gedächtnis', 'aussetzer', 'filmriss', 'denkblockade'],

  // Stimme
  'stimme': ['sprechen', 'voice', 'stimmtraining', 'sprechtechnik', 'stimmbildung'],
  'sprechen': ['stimme', 'reden', 'voice', 'kommunikation', 'vortragen'],
  'atmen': ['atmung', 'atemtechnik', 'bauchatmung', 'atem'],
  'laut': ['lautstärke', 'volumen', 'schreien', 'leise'],

  // Kommunikation
  'kommunikation': ['sprechen', 'gespräch', 'dialog', 'austausch', 'verständigung'],
  'gespräch': ['kommunikation', 'dialog', 'unterhaltung', 'konversation'],
  'zuhören': ['zuhören', 'hören', 'aufmerksam', 'empathie'],
  'feedback': ['rückmeldung', 'kritik', 'beurteilung', 'bewertung'],

  // Überzeugung & Wirkung
  'überzeugen': ['überzeugung', 'persuasion', 'argumentation', 'beeinflussen'],
  'wirkung': ['ausstrahlung', 'präsenz', 'charisma', 'eindruck', 'impact'],
  'authentisch': ['authentizität', 'echt', 'ehrlich', 'glaubwürdig', 'natürlich'],
  'selbstbewusst': ['selbstbewusstsein', 'selbstsicher', 'sicher', 'confident'],

  // Präsentation & Reden
  'präsentation': ['vortrag', 'rede', 'präsentieren', 'speech'],
  'vortrag': ['präsentation', 'rede', 'talk', 'speech'],
  'rede': ['präsentation', 'vortrag', 'ansprache', 'speech'],
  'bühne': ['stage', 'auftritt', 'performance', 'präsentation'],
  'keynote': ['vortrag', 'hauptrede', 'keynote-speech', 'hauptvortrag'],

  // Körpersprache
  'körpersprache': ['gestik', 'mimik', 'nonverbal', 'haltung', 'gesten'],
  'hände': ['gestik', 'gesten', 'handbewegung'],
  'blickkontakt': ['augenkontakt', 'blick', 'augen'],
  'haltung': ['körperhaltung', 'posture', 'stand', 'pose'],

  // KI & Zukunft
  'ki': ['künstliche intelligenz', 'ai', 'artificial intelligence', 'chatgpt'],
  'zukunft': ['future', 'morgen', 'entwicklung', 'trend'],
  'relevant': ['relevanz', 'wichtig', 'bedeutend', 'wertvoll'],
  'job': ['arbeit', 'beruf', 'karriere', 'stelle', 'position'],

  // Führung & Team
  'führung': ['leadership', 'leitung', 'management', 'führungskraft'],
  'team': ['gruppe', 'mannschaft', 'mitarbeiter', 'kollegen'],
  'motivation': ['motivieren', 'antrieb', 'begeisterung', 'drive'],
  'vertrauen': ['trust', 'glaubwürdigkeit', 'zuverlässigkeit'],

  // Veränderung & Krise
  'veränderung': ['change', 'wandel', 'transformation', 'umstellung'],
  'krise': ['notfall', 'schwierigkeit', 'problem', 'herausforderung'],
  'konflikt': ['streit', 'auseinandersetzung', 'problem', 'meinungsverschiedenheit'],

  // Persönliche Entwicklung
  'grenzen': ['nein sagen', 'abgrenzung', 'boundaries', 'limits'],
  'nein': ['ablehnen', 'grenzen', 'boundaries', 'abgrenzung'],
  'personal branding': ['marke', 'positionierung', 'sichtbarkeit', 'personal brand'],
  'sichtbarkeit': ['präsenz', 'wahrnehmung', 'visibility', 'öffentlichkeit'],

  // Social Media
  'social media': ['soziale medien', 'linkedin', 'instagram', 'facebook', 'online'],
  'online': ['digital', 'internet', 'web', 'social media'],
  'authentizität': ['echt', 'authentisch', 'ehrlich', 'natürlich'],

  // Storytelling
  'storytelling': ['geschichten', 'erzählen', 'story', 'narrative'],
  'geschichte': ['story', 'erzählung', 'anekdote', 'storytelling'],

  // Spezifische Probleme
  'punkt kommen': ['prägnanz', 'kurz', 'knapp', 'klar', 'kompakt'],
  'schwierige gespräche': ['konfliktgespräche', 'kritikgespräche', 'konfrontation'],
  'konstruktiv': ['hilfreich', 'aufbauend', 'positiv', 'förderlich']
};

// Funktion um alle Synonyme für einen Suchbegriff zu finden
export function getSynonyms(searchTerm: string): string[] {
  const normalizedTerm = searchTerm.toLowerCase().trim();

  // Direkter Match
  if (searchSynonyms[normalizedTerm]) {
    return [normalizedTerm, ...searchSynonyms[normalizedTerm]];
  }

  // Reverse Lookup: Wenn der Suchbegriff ein Synonym ist
  for (const [key, synonyms] of Object.entries(searchSynonyms)) {
    if (synonyms.some(syn => syn.toLowerCase().includes(normalizedTerm) || normalizedTerm.includes(syn.toLowerCase()))) {
      return [key, ...synonyms, normalizedTerm];
    }
  }

  // Partial Match: Suche nach Teilstrings
  const partialMatches = Object.entries(searchSynonyms)
    .filter(([key, synonyms]) =>
      key.includes(normalizedTerm) ||
      synonyms.some(syn => syn.includes(normalizedTerm))
    )
    .flatMap(([key, synonyms]) => [key, ...synonyms]);

  if (partialMatches.length > 0) {
    return [...new Set([normalizedTerm, ...partialMatches])];
  }

  // Kein Match gefunden - nur Original-Term
  return [normalizedTerm];
}

// Funktion um zu prüfen ob ein Artikel zu einem Suchterm passt
export function articleMatchesSearch(
  article: {
    title: string;
    description: string;
    tags: string[];
    content?: Array<{ heading: string; paragraphs: string[] }>;
  },
  searchTerm: string
): boolean {
  if (!searchTerm || searchTerm.trim() === '') return true;

  const synonyms = getSynonyms(searchTerm);

  // Erstelle durchsuchbaren Text aus allen Artikel-Teilen
  const searchableText = [
    article.title,
    article.description,
    ...article.tags,
    ...(article.content?.flatMap(c => [c.heading, ...c.paragraphs]) || [])
  ]
    .filter(Boolean) // Entferne undefined/null
    .join(' ')
    .toLowerCase();

  // Prüfe ob irgendeines der Synonyme im Text vorkommt
  return synonyms.some(synonym => {
    const normalizedSynonym = synonym.toLowerCase();
    return searchableText.includes(normalizedSynonym);
  });
}

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const MONTHS = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
];

interface RequestBody {
  companyName: string;
  industry: string;
  targetAudience: string;
  goals: string;
  contentTypes: string[];
  channels: string[];
}

function generateContentIdeas(data: RequestBody) {
  const { companyName, industry, targetAudience, goals, contentTypes, channels } = data;
  const ideas = [];
  
  const topics = [
    { title: 'Jahresrückblick und Ausblick', description: 'Teile die wichtigsten Erfolge des vergangenen Jahres und die Pläne für das neue Jahr.', priority: 'Hoch' },
    { title: 'Kundenerfolgsgeschichte', description: 'Präsentiere eine inspirierende Geschichte eines zufriedenen Kunden oder Projekterfolgs.', priority: 'Hoch' },
    { title: 'Trend-Analyse der Branche', description: 'Analysiere aktuelle Trends und deren Auswirkungen auf deine Zielgruppe.', priority: 'Mittel' },
    { title: 'How-To Guide', description: 'Erstelle eine praktische Anleitung zu einem häufigen Problem deiner Zielgruppe.', priority: 'Hoch' },
    { title: 'Behind the Scenes', description: 'Gib Einblicke in die Arbeitsweise und Unternehmenskultur.', priority: 'Niedrig' },
    { title: 'Expert Interview', description: 'Führe ein Interview mit einem Branchenexperten oder Thought Leader.', priority: 'Mittel' },
    { title: 'Produktupdate oder Launch', description: 'Stelle neue Features, Produkte oder Dienstleistungen vor.', priority: 'Hoch' },
    { title: 'Infografik zu Branchendaten', description: 'Visualisiere wichtige Statistiken und Daten aus deiner Branche.', priority: 'Mittel' },
    { title: 'Häufige Fehler vermeiden', description: 'Kläre über typische Fehler auf und wie man sie vermeidet.', priority: 'Hoch' },
    { title: 'Team-Vorstellung', description: 'Stelle Teammitglieder und ihre Expertise vor.', priority: 'Niedrig' },
    { title: 'Saisonale Kampagne', description: 'Nutze saisonale Anlässe für relevante Content-Kampagnen.', priority: 'Mittel' },
    { title: 'Checkliste für Zielgruppe', description: 'Erstelle eine praktische Checkliste zu einem wichtigen Thema.', priority: 'Hoch' },
    { title: 'Live Q&A Session', description: 'Biete eine interaktive Fragerunde zu einem relevanten Thema an.', priority: 'Mittel' },
    { title: 'Branchen-News Kommentar', description: 'Kommentiere aktuelle Entwicklungen aus Expertensicht.', priority: 'Mittel' },
    { title: 'Tipps und Best Practices', description: 'Teile bewährte Methoden und praktische Tipps aus deiner Expertise.', priority: 'Hoch' },
    { title: 'Vergleich oder Gegenüberstellung', description: 'Vergleiche verschiedene Ansätze oder Lösungen objektiv.', priority: 'Mittel' },
    { title: 'Erfolgsmetriken transparent teilen', description: 'Zeige messbare Ergebnisse und Erfolge auf.', priority: 'Mittel' },
    { title: 'Tool-Empfehlung', description: 'Stelle nützliche Tools und Ressourcen vor.', priority: 'Niedrig' },
    { title: 'Mythen aufklären', description: 'Räume mit verbreiteten Missverständnissen in der Branche auf.', priority: 'Hoch' },
    { title: 'Zukunftsausblick', description: 'Gib Einschätzungen zu zukünftigen Entwicklungen.', priority: 'Mittel' },
    { title: 'Kollaboration ankündigen', description: 'Stelle Partnerschaften oder Kooperationen vor.', priority: 'Mittel' },
    { title: 'Interaktives Quiz', description: 'Erstelle ein unterhaltsames Quiz zu deinem Fachgebiet.', priority: 'Niedrig' },
    { title: 'Ressourcen-Sammlung', description: 'Kuratiere eine Liste wertvoller Ressourcen für deine Zielgruppe.', priority: 'Mittel' },
    { title: 'Milestone-Feier', description: 'Feiere wichtige Meilensteine mit deiner Community.', priority: 'Niedrig' },
    { title: 'Problem-Lösung Showcase', description: 'Zeige, wie du konkrete Probleme für Kunden gelöst hast.', priority: 'Hoch' },
    { title: 'Webinar Ankündigung', description: 'Lade zu einem informativen Webinar ein.', priority: 'Mittel' },
    { title: 'Experten-Roundtable', description: 'Organisiere eine Diskussionsrunde mit mehreren Experten.', priority: 'Mittel' },
    { title: 'Transformation Story', description: 'Erzähle eine Geschichte über Veränderung und Wachstum.', priority: 'Hoch' },
    { title: 'Industry Report Summary', description: 'Fasse wichtige Erkenntnisse aus Branchenstudien zusammen.', priority: 'Mittel' },
    { title: 'Community Spotlight', description: 'Hebe Community-Mitglieder oder Follower hervor.', priority: 'Niedrig' },
    { title: 'Jahresendzusammenfassung', description: 'Blicke auf das Jahr zurück und bedanke dich bei der Community.', priority: 'Hoch' },
    { title: 'Challenge starten', description: 'Starte eine interaktive Challenge für deine Zielgruppe.', priority: 'Mittel' },
    { title: 'Fallstudie veröffentlichen', description: 'Präsentiere eine detaillierte Analyse eines erfolgreichen Projekts.', priority: 'Hoch' },
    { title: 'Wertvolle Insights teilen', description: 'Teile tiefgehende Erkenntnisse aus deiner Praxis.', priority: 'Hoch' },
    { title: 'Networking Event ankündigen', description: 'Lade zu einem Networking-Event ein.', priority: 'Niedrig' },
    { title: 'Branchenvergleich', description: 'Vergleiche verschiedene Branchen-Ansätze.', priority: 'Mittel' }
  ];

  // Shuffle topics to create variety
  const shuffledTopics = topics.sort(() => Math.random() - 0.5);
  
  // Generate 3-4 ideas per month
  MONTHS.forEach((month, monthIndex) => {
    const numIdeas = Math.floor(Math.random() * 2) + 3; // 3 or 4 ideas
    
    for (let i = 0; i < numIdeas; i++) {
      const topicIndex = (monthIndex * 4 + i) % shuffledTopics.length;
      const topic = shuffledTopics[topicIndex];
      const contentType = contentTypes[Math.floor(Math.random() * contentTypes.length)];
      const channel = channels[Math.floor(Math.random() * channels.length)];
      
      // Add seasonal relevance
      let seasonalNote = '';
      if (month === 'Januar') seasonalNote = ' Nutze den Jahresstart für neue Impulse.';
      if (month === 'Februar' || month === 'März') seasonalNote = ' Frühjahr ist ideal für Neuanfänge.';
      if (month === 'April' || month === 'Mai') seasonalNote = ' Nutze die Frühlingsenergie.';
      if (month === 'Juni' || month === 'Juli' || month === 'August') seasonalNote = ' Sommerzeit - leichter und inspirierender Content.';
      if (month === 'September' || month === 'Oktober') seasonalNote = ' Herbst - Zeit für tiefere Inhalte.';
      if (month === 'November') seasonalNote = ' Vorbereitung auf das Jahresende.';
      if (month === 'Dezember') seasonalNote = ' Jahresabschluss und Dankbarkeit.';
      
      ideas.push({
        month,
        title: `${topic.title} für ${targetAudience}`,
        description: `${topic.description}${seasonalNote} Ausgerichtet auf: ${goals}`,
        contentType,
        channel,
        priority: topic.priority
      });
    }
  });
  
  return ideas;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const requestData: RequestBody = await req.json();
    
    // Validate required fields
    if (!requestData.companyName || !requestData.industry || !requestData.targetAudience || !requestData.goals) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    if (!requestData.contentTypes || requestData.contentTypes.length === 0 ||
        !requestData.channels || requestData.channels.length === 0) {
      return new Response(
        JSON.stringify({ error: 'At least one content type and channel required' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const contentPlan = generateContentIdeas(requestData);

    return new Response(
      JSON.stringify({ success: true, data: contentPlan }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error generating content plan:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
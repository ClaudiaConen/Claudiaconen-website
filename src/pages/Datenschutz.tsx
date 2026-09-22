import Navigation from '../components/Navigation';
import SEO from '../components/SEO';
import Footer from '../components/Footer';

export default function Datenschutz() {
  return (
    <>
      <Navigation />
      <SEO
        title="Datenschutzerklärung - Claudia Conen"
        description="Datenschutzerklärung von Claudia Conen - Die Umsatzstimme. Informationen zum Schutz deiner personenbezogenen Daten."
      />
      <div className="min-h-screen bg-gradient-to-b from-[#0A1628] via-[#0F1F3A] to-[#0A1628] pt-44 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-luxury-gold/20 shadow-2xl">
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#F7E7CE] bg-clip-text text-transparent mb-8">
              Datenschutzerklärung
            </h1>

            <div className="space-y-8 text-gray-900">
              <p className="leading-relaxed">
                Wir freuen uns über dein Interesse an unserer Website. Der Schutz deiner personenbezogenen Daten ist uns wichtig. Nachfolgend informieren wir über die Erhebung und Verwendung personenbezogener Daten gemäß der Datenschutzgrundverordnung (DSGVO) und des Telekommunikation-Digitale-Dienste-Datenschutz-Gesetzes (TDDDG).
              </p>

              <section>
                <h2 className="text-2xl font-montserrat font-semibold text-bright-gold mb-4">
                  1. Verantwortliche Stelle
                </h2>
                <p className="leading-relaxed">
                  Claudia Conen<br />
                  Beisenweg 20<br />
                  58452 Witten<br />
                  E-Mail: <a href="mailto:info@claudiaconen-akademie.de" className="text-bright-gold hover:underline">info@claudiaconen-akademie.de</a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-semibold text-bright-gold mb-4">
                  2. Datenerfassung auf dieser Website
                </h2>

                <h3 className="text-xl font-montserrat font-semibold text-bright-gold mb-3">
                  Wer ist verantwortlich für die Datenerfassung auf dieser Website?
                </h3>
                <p className="leading-relaxed mb-4">
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                </p>

                <h3 className="text-xl font-montserrat font-semibold text-bright-gold mb-3">
                  Wie erfassen wir Ihre Daten?
                </h3>
                <p className="leading-relaxed mb-4">
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
                </p>
                <p className="leading-relaxed mb-4">
                  Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
                </p>

                <h3 className="text-xl font-montserrat font-semibold text-bright-gold mb-3">
                  Wofür nutzen wir Ihre Daten?
                </h3>
                <p className="leading-relaxed mb-4">
                  Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                </p>

                <h3 className="text-xl font-montserrat font-semibold text-bright-gold mb-3">
                  Welche Rechte haben Sie bezüglich Ihrer Daten?
                </h3>
                <p className="leading-relaxed">
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
                </p>
                <p className="leading-relaxed">
                  Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-semibold text-bright-gold mb-4">
                  3. Erhebung und Speicherung personenbezogener Daten
                </h2>
                <p className="leading-relaxed">
                  Wir erheben personenbezogene Daten, wenn du unser Kontaktformular nutzt, dich zu Kursen anmeldest oder unsere Website besuchst. Dies umfasst Name, E-Mail-Adresse, Telefonnummer sowie Inhaltsdaten deiner Anfrage.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-semibold text-bright-gold mb-4">
                  4. Zwecke der Datenverarbeitung
                </h2>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li>Beantwortung von Anfragen</li>
                  <li>Abwicklung von Buchungen, Kursen, Mentorings und Zahlungen</li>
                  <li>Technische Bereitstellung der Website</li>
                  <li>Analyse und Verbesserung unserer Onlineangebote</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-semibold text-bright-gold mb-4">
                  5. Hosting
                </h2>
                <p className="leading-relaxed">
                  Diese Website wird über <strong>Cloudflare</strong> gehostet. Dabei können technische Daten (IP-Adresse, Zugriffszeiten etc.) auf Servern innerhalb der EU oder in den USA verarbeitet werden. Es besteht ein Data-Processing-Agreement (DPA) mit Cloudflare nach Art. 28 DSGVO.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-semibold text-bright-gold mb-4">
                  6. Einsatz von Cookies & Tracking
                </h2>
                <p className="leading-relaxed">
                  Wir verwenden essenzielle Cookies, um Grundfunktionen der Seite bereitzustellen. Optionale Cookies (z. B. für Statistik oder Marketing) werden nur nach ausdrücklicher Einwilligung gesetzt. Du kannst deine Einwilligung jederzeit im Cookie-Banner widerrufen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-semibold text-bright-gold mb-4">
                  7. Tools & Dienste
                </h2>
                <ul className="list-disc list-inside space-y-2 leading-relaxed mb-6">
                  <li><strong>Google Analytics</strong> – zur Reichweitenmessung (IP-Anonymisierung aktiviert)</li>
                  <li><strong>Meta-Pixel</strong> – zur Erfolgsmessung unserer Werbung (nur mit Einwilligung)</li>
                  <li><strong>ProvenExpert</strong> – zur Darstellung von Bewertungen</li>
                  <li><strong>Canva / Bolt.new</strong> – zur Webseitenerstellung und Verwaltung</li>
                </ul>

                <h3 className="text-xl font-montserrat font-semibold text-pearl-white mb-3 mt-6">
                  Vimeo
                </h3>
                <p className="leading-relaxed mb-4">
                  Diese Website nutzt Plugins des Videoportals Vimeo. Anbieter ist die Vimeo Inc., 555 West 18th Street, New York, New York 10011, USA.
                </p>
                <p className="leading-relaxed mb-4">
                  Wenn Sie eine unserer mit einem Vimeo-Video ausgestatteten Seiten besuchen, wird eine Verbindung zu den Servern von Vimeo hergestellt. Dabei wird dem Vimeo-Server mitgeteilt, welche unserer Seiten Sie besucht haben. Zudem erlangt Vimeo Ihre IP-Adresse. Dies gilt auch dann, wenn Sie nicht bei Vimeo eingeloggt sind oder keinen Account bei Vimeo besitzen. Die von Vimeo erfassten Informationen werden an den Vimeo-Server in den USA übermittelt.
                </p>
                <p className="leading-relaxed mb-4">
                  Wenn Sie in Ihrem Vimeo-Account eingeloggt sind, ermöglichen Sie Vimeo, Ihr Surfverhalten direkt Ihrem persönlichen Profil zuzuordnen. Dies können Sie verhindern, indem Sie sich aus Ihrem Vimeo-Account ausloggen.
                </p>
                <p className="leading-relaxed mb-4">
                  Zur Wiedererkennung der Websitebesucher verwendet Vimeo Cookies bzw. vergleichbare Wiedererkennungstechnologien (z.B. Device-Fingerprinting).
                </p>
                <p className="leading-relaxed mb-4">
                  Die Nutzung von Vimeo erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote. Dies stellt ein berechtigtes Interesse im Sinne des Art. 6 Abs. 1 lit. f DSGVO dar. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar.
                </p>
                <p className="leading-relaxed mb-4">
                  Vimeo verfügt über eine Zertifizierung nach dem EU-US-Privacy-Shield, der die Verarbeitung personenbezogener Daten in den USA nach EU-Standards sicherstellen soll.
                </p>
                <p className="leading-relaxed">
                  Weitere Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Vimeo unter:{' '}
                  <a href="https://vimeo.com/privacy" target="_blank" rel="noopener noreferrer" className="text-bright-gold hover:underline">
                    https://vimeo.com/privacy
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-semibold text-bright-gold mb-4">
                  8. Datenweitergabe
                </h2>
                <p className="leading-relaxed">
                  Eine Weitergabe deiner Daten an Dritte erfolgt ausschließlich im Rahmen gesetzlicher Vorschriften, etwa an Zahlungsanbieter, Kursplattformen oder Auftragsverarbeiter nach Art. 28 DSGVO.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-semibold text-bright-gold mb-4">
                  9. eCommerce und Zahlungsanbieter
                </h2>

                <h3 className="text-xl font-montserrat font-semibold text-bright-gold mb-3">
                  Verarbeiten von Daten (Kunden- und Vertragsdaten)
                </h3>
                <p className="leading-relaxed mb-4">
                  Wir erheben, verarbeiten und nutzen personenbezogene Daten nur, soweit sie für die Begründung, inhaltliche Ausgestaltung oder Änderung des Rechtsverhältnisses erforderlich sind (Bestandsdaten). Dies erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gestattet. Personenbezogene Daten über die Inanspruchnahme dieser Website (Nutzungsdaten) erheben, verarbeiten und nutzen wir nur, soweit dies erforderlich ist, um dem Nutzer die Inanspruchnahme des Dienstes zu ermöglichen oder abzurechnen.
                </p>
                <p className="leading-relaxed mb-6">
                  Die erhobenen Kundendaten werden nach Abschluss des Auftrags oder Beendigung der Geschäftsbeziehung gelöscht. Gesetzliche Aufbewahrungsfristen bleiben unberührt.
                </p>

                <h3 className="text-xl font-montserrat font-semibold text-bright-gold mb-3">
                  Datenübermittlung bei Vertragsschluss für Dienstleistungen und digitale Inhalte
                </h3>
                <p className="leading-relaxed mb-4">
                  Wir übermitteln personenbezogene Daten an Dritte nur dann, wenn dies im Rahmen der Vertragsabwicklung notwendig ist, etwa an das mit der Zahlungsabwicklung beauftragte Kreditinstitut.
                </p>
                <p className="leading-relaxed mb-6">
                  Eine weitergehende Übermittlung der Daten erfolgt nicht bzw. nur dann, wenn Sie der Übermittlung ausdrücklich zugestimmt haben. Eine Weitergabe Ihrer Daten an Dritte ohne ausdrückliche Einwilligung, etwa zu Zwecken der Werbung, erfolgt nicht. Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. b DSGVO, der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gestattet.
                </p>

                <h3 className="text-xl font-montserrat font-semibold text-bright-gold mb-3">
                  Digistore24
                </h3>
                <p className="leading-relaxed mb-4">
                  Einige unserer Produkte, Dienstleistungen und Inhalte werden von Digistore24 als Reseller angeboten. Anbieter und Vertragspartner ist die Digistore24 GmbH, St.-Godehard-Straße 32 in 31139 Hildesheim. Welche Daten Digistore24 bei diesem Website-Aufruf speichert und verarbeitet, legt die Digistore24 GmbH als Verantwortlicher in der eigenen Datenschutzerklärung dar. Weitere Informationen erhalten Sie in der Datenschutzerklärung von Digistore24:{' '}
                  <a href="https://www.digistore24.com/dataschutz" target="_blank" rel="noopener noreferrer" className="text-bright-gold hover:underline">
                    https://www.digistore24.com/dataschutz
                  </a>
                </p>

                <h3 className="text-xl font-montserrat font-semibold text-pearl-white mb-3 mt-6">
                  Conversion-Tools/Warenkorb
                </h3>
                <p className="leading-relaxed mb-4">
                  Digistore24 bietet die Möglichkeit, über HTML- und Javascript-Codes verschiedene Dienste auf der eigenen Website einzubinden, z. B. die Social-Proof-Bubble oder den Digistore24-Warenkorb.
                </p>
                <p className="leading-relaxed mb-4">
                  Bei jeder Einbindung werden nicht-personenbezogene Daten vom Digistore24-Server nachgeladen (z. B. eine Javascript-Datei). Bei diesem Nachladen ruft Ihr Webbrowser eine Webseite vom Digistore24-Server ab. Unser Server hat keinen Einfluss darauf, in welchem Umfang Ihr Webbrowser dabei Daten an den Digistore24-Server überträgt. Unser Server selbst übermittelt in diesem Zusammenhang keine Daten an die Digistore24-Server.
                </p>
                <p className="leading-relaxed">
                  Welche Daten Digistore24 bei diesem Webseiten-Aufruf speichert und verarbeitet, legt die Digistore24 GmbH als Verantwortlicher in der eigenen Datenschutzerklärung dar. Die Datenschutzerklärung von Digistore24 finden Sie hier:{' '}
                  <a href="https://www.digistore24.com/dataschutz" target="_blank" rel="noopener noreferrer" className="text-bright-gold hover:underline">
                    https://www.digistore24.com/dataschutz
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-semibold text-bright-gold mb-4">
                  10. Audio- und Videokonferenzen
                </h2>

                <h3 className="text-xl font-montserrat font-semibold text-bright-gold mb-3">
                  Datenverarbeitung
                </h3>
                <p className="leading-relaxed mb-4">
                  Für die Kommunikation mit unseren Kunden setzen wir unter anderen Online-Konferenz-Tools ein. Die im Einzelnen von uns genutzten Tools sind unten aufgelistet. Wenn Sie mit uns per Video- oder Audiokonferenz via Internet kommunizieren, werden Ihre personenbezogenen Daten von uns und dem Anbieter des jeweiligen Konferenz-Tools erfasst und verarbeitet.
                </p>
                <p className="leading-relaxed mb-4">
                  Die Konferenz-Tools erfassen dabei alle Daten, die Sie zur Nutzung der Tools bereitstellen/einsetzen (E-Mail-Adresse und/oder Ihre Telefonnummer). Ferner verarbeiten die Konferenz-Tools die Dauer der Konferenz, Beginn und Ende (Zeit) der Teilnahme an der Konferenz, Anzahl der Teilnehmer und sonstige „Kontextinformationen" im Zusammenhang mit dem Kommunikationsvorgang (Metadaten).
                </p>
                <p className="leading-relaxed mb-4">
                  Des Weiteren verarbeitet der Anbieter des Tools alle technischen Daten, die zur Abwicklung der Online-Kommunikation erforderlich sind. Dies umfasst insbesondere IP-Adressen, MAC-Adressen, Geräte-IDs, Gerätetyp, Betriebssystemtyp und -version, Client-Version, Kameratyp, Mikrofon oder Lautsprecher sowie die Art der Verbindung.
                </p>
                <p className="leading-relaxed mb-6">
                  Sofern innerhalb des Tools Inhalte ausgetauscht, hochgeladen oder in sonstiger Weise bereitgestellt werden, werden diese ebenfalls auf den Servern der Tool-Anbieter gespeichert. Zu solchen Inhalten zählen insbesondere Cloud-Aufzeichnungen, Chat-/ Sofortnachrichten, Voicemails hochgeladene Fotos und Videos, Dateien, Whiteboards und andere Informationen, die während der Nutzung des Dienstes geteilt werden.
                </p>
                <p className="leading-relaxed mb-6">
                  Bitte beachten Sie, dass wir nicht vollumfänglich Einfluss auf die Datenverarbeitungsvorgänge der verwendeten Tools haben. Unsere Möglichkeiten richten sich maßgeblich nach der Unternehmenspolitik des jeweiligen Anbieters. Weitere Hinweise zur Datenverarbeitung durch die Konferenztools entnehmen Sie den Datenschutzerklärungen der jeweils eingesetzten Tools, die wir unter diesem Text aufgeführt haben.
                </p>

                <h3 className="text-xl font-montserrat font-semibold text-bright-gold mb-3">
                  Zweck und Rechtsgrundlagen
                </h3>
                <p className="leading-relaxed mb-6">
                  Die Konferenz-Tools werden genutzt, um mit angehenden oder bestehenden Vertragspartnern zu kommunizieren oder bestimmte Leistungen gegenüber unseren Kunden anzubieten (Art. 6 Abs. 1 S. 1 lit. b DSGVO). Des Weiteren dient der Einsatz der Tools der allgemeinen Vereinfachung und Beschleunigung der Kommunikation mit uns bzw. unserem Unternehmen (berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO). Soweit eine Einwilligung abgefragt wurde, erfolgt der Einsatz der betreffenden Tools auf Grundlage dieser Einwilligung; die Einwilligung ist jederzeit mit Wirkung für die Zukunft widerrufbar.
                </p>

                <h3 className="text-xl font-montserrat font-semibold text-bright-gold mb-3">
                  Speicherdauer
                </h3>
                <p className="leading-relaxed mb-6">
                  Die unmittelbar von uns über die Video- und Konferenz-Tools erfassten Daten werden von unseren Systemen gelöscht, sobald Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt. Gespeicherte Cookies verbleiben auf Ihrem Endgerät, bis Sie sie löschen. Zwingende gesetzliche Aufbewahrungsfristen bleiben unberührt. Auf die Speicherdauer Ihrer Daten, die von den Betreibern der Konferenz-Tools zu eigenen Zwecken gespeichert werden, haben wir keinen Einfluss. Für Einzelheiten dazu informieren Sie sich bitte direkt bei den Betreibern der Konferenz-Tools.
                </p>

                <h3 className="text-xl font-montserrat font-semibold text-bright-gold mb-3">
                  Eingesetzte Konferenz-Tools
                </h3>
                <p className="leading-relaxed mb-4">
                  Wir setzen folgende Konferenz-Tools ein:
                </p>

                <h3 className="text-xl font-montserrat font-semibold text-pearl-white mb-3 mt-6">
                  Zoom
                </h3>
                <p className="leading-relaxed mb-4">
                  Wir nutzen Zoom. Anbieter dieses Dienstes ist die Zoom Communications Inc., San Jose, 55 Almaden Boulevard, 6th Floor, San Jose, CA 95113. Zoom verfügt über eine Zertifizierung nach dem EU-US-Privacy-Shield. Details zur Datenverarbeitung entnehmen Sie der Datenschutzerklärung von Zoom:{' '}
                  <a href="https://zoom.us/de-de/privacy.html" target="_blank" rel="noopener noreferrer" className="text-bright-gold hover:underline">
                    https://zoom.us/de-de/privacy.html
                  </a>
                </p>

                <h3 className="text-xl font-montserrat font-semibold text-pearl-white mb-3 mt-6">
                  Abschluss eines Vertrags über Auftragsverarbeitung
                </h3>
                <p className="leading-relaxed">
                  Wir haben mit dem Anbieter von Zoom einen Vertrag zur Auftragsverarbeitung abgeschlossen und setzen die strengen Vorgaben der deutschen Datenschutzbehörden bei der Nutzung von Zoom vollständig um.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-semibold text-bright-gold mb-4">
                  11. Speicherdauer
                </h2>
                <p className="leading-relaxed">
                  Daten werden nur so lange gespeichert, wie dies für die genannten Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-semibold text-bright-gold mb-4">
                  12. Rechte der betroffenen Personen
                </h2>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li>Auskunft (Art. 15 DSGVO)</li>
                  <li>Berichtigung (Art. 16 DSGVO)</li>
                  <li>Löschung (Art. 17 DSGVO)</li>
                  <li>Einschränkung (Art. 18 DSGVO)</li>
                  <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                  <li>Widerspruch gegen Verarbeitung (Art. 21 DSGVO)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-semibold text-bright-gold mb-4">
                  13. Widerruf von Einwilligungen
                </h2>
                <p className="leading-relaxed">
                  Du kannst eine bereits erteilte Einwilligung jederzeit widerrufen, ohne dass die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung berührt wird.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-semibold text-bright-gold mb-4">
                  14. Beschwerderecht
                </h2>
                <p className="leading-relaxed">
                  Dir steht das Recht zu, dich bei einer Datenschutzaufsichtsbehörde zu beschweren, insbesondere in dem Mitgliedstaat deines Aufenthaltsorts oder Arbeitsplatzes.
                </p>
              </section>

              <div className="pt-8 border-t border-luxury-gold/20">
                <p className="text-pearl-white/60 text-sm">
                  Letzte Aktualisierung: Oktober 2025
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-luxury-gold/30">
              <a
                href="/"
                className="inline-flex items-center gap-2 text-luxury-gold hover:text-bright-gold transition-colors font-semibold"
              >
                ← Zurück zur Startseite
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

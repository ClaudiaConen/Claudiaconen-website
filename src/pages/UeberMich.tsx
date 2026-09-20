import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

/**
 * Ueber mich.
 *
 * Drei Entscheidungen, die diese Seite tragen:
 *
 * 1. Sie beginnt HEUTE, nicht damals. Eine Seite, die mit einer Entfuehrung
 *    aufmacht, erzeugt Schreck und Abwehr. Wer zuerst sieht, wer da steht,
 *    und danach erfaehrt, woher sie kommt, liest die Geschichte als Narbe
 *    und nicht als Wunde. Genau das verlangt das FUNDAMENT.
 *
 * 2. Claudias eigene Worte bleiben woertlich stehen. Ihre Geschichte gehoert
 *    ihr. Geaendert wurde der Rahmen, nicht ihr Text.
 *
 * 3. Am Ende steht KEIN Angebot. Das FUNDAMENT sagt ausdruecklich, die
 *    Geschichte darf nie unmittelbar vor einem Verkaufsangebot stehen.
 *    Deshalb fuehrt der letzte Schritt auf die Hoeren-Seite, nicht in einen
 *    Kalender.
 *
 * Bewusst ENTFERNT: die Zwischenueberschrift "Vom Opfer zur erfolgreichen
 * Geschaeftsfrau". Sie stellt Claudia als Opfer vor und erzeugt genau das
 * Mitleid, das ihre eigenen Regeln ausschliessen. Der Weg wird jetzt ohne
 * dieses Wort erzaehlt.
 *
 * Bewusst NICHT ergaenzt: der Verein. Das FUNDAMENT erlaubt ihn genau auf
 * dieser Seite, getrennt von Geschichte und Angeboten. Erlaubt ist aber
 * nicht dasselbe wie beauftragt, und eine gemeinnuetzige Zugehoerigkeit
 * oeffentlich zu machen ist Claudias Entscheidung, nicht meine.
 */
export default function UeberMich() {
  return (
    <div className="min-h-screen bg-pearl-white">
      <SEO
        title="Über mich | Claudia Conen"
        description="Claudia Conen, Keynote Speakerin und KI-Managerin. Warum sie hört, wie Menschen sprechen, und was daraus wurde."
        path="/ueber-mich"
      />

      <Navigation />

      {/* 1. Heute */}
      <header className="pt-36 pb-4 sm:pt-44">
        <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-dark-gold">
              Über mich
            </p>
            <h1 className="mt-5 font-cormorant text-4xl italic leading-[1.1] text-midnight-blue sm:text-6xl">
              Ich höre, wie Menschen sprechen.
            </h1>
            <p className="mt-7 max-w-xl font-inter text-lg leading-relaxed text-midnight-blue/75">
              Das Wie ist mein Handwerk: Tempo, Pausen, der Moment, in dem eine Stimme fest wird
              oder nachgibt. Das ist keine Fähigkeit, die ich mir ausgesucht habe. Sie ist mir
              zugewachsen, in einem Alter, in dem andere Kinder Fahrradfahren lernen.
            </p>
            <p className="mt-4 max-w-xl font-inter text-lg leading-relaxed text-midnight-blue/75">
              Heute lebe ich davon. Auf Bühnen, in Unternehmen, mit Menschen, die etwas zu sagen
              haben und wollen, dass es ankommt.
            </p>
          </div>

          <figure className="relative mx-auto max-w-sm lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 hidden h-full w-full border border-luxury-gold/40 lg:block"
            />
            <img
              src="/claudiaconen.webp"
              width={853}
              height={1280}
              alt="Claudia Conen"
              loading="eager"
              className="relative w-full object-cover shadow-xl"
            />
          </figure>
        </div>
      </header>

      <main>
        {/* 2. Woher das kommt */}
        <section className="py-20 sm:py-28" aria-labelledby="damals">
          <div className="mx-auto max-w-2xl px-6">
            <h2
              id="damals"
              className="font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-dark-gold"
            >
              Woher das kommt
            </h2>

            <p className="mt-6 font-cormorant text-2xl italic leading-snug text-midnight-blue sm:text-3xl">
              Da steht ein kleines elfjähriges Mädchen in heller Jeans und Kuschelpullover,
              lächelnd am Eingang der Dorfkirmes.
            </p>

            <div className="mt-8 flex flex-col gap-5 font-inter text-lg leading-relaxed text-midnight-blue/80">
              <p>
                Sie spielt mit ihrer Zuckerwatte und bewundert ihre Freundin Michaela, die hoch
                oben im Karussell sitzt und winkt. Sie sind zusammen dorthin geschlichen.
              </p>
              <p>
                Dann wird ihr ein Sack über den Kopf gestülpt. Hände packen sie und schleppen sie
                weg. Der Schock lässt sie erstarren, sie bekommt keinen Ton heraus. Eine
                Autotür knallt zu. Fremde Stimmen.
              </p>
              <p>
                Zweiundsiebzig Stunden lang sieht sie nichts. Sie hört nur diese Stimmen. Nach der
                Befreiung schweigt sie sechs Monate.
              </p>
              <p>
                Eine Polizeipsychologin schenkt ihr ein leeres rotes Buch und sagt, sie solle alles
                aufschreiben, dann komme der Schmerz heraus und die Stimme zurück. Das Mädchen
                beschreibt darin pedantisch die Stimmen der Männer. Ein kindlich geschriebenes
                Stimmanalyse-Buch, damals ohne jeden Sinn.
              </p>
              <p>
                Die Täter wurden nie gefasst. Geblieben ist etwas anderes: ein Gehör, das nicht
                mehr aufhört hinzuhören. Wie jemand atmet, bevor er lügt. Wann eine Stimme fest
                wird und wann sie nachgibt.
              </p>
            </div>

            <p className="mt-10 font-cormorant text-2xl italic leading-snug text-midnight-blue sm:text-3xl">
              Dieses kleine Mädchen steckt heute noch in mir.
            </p>

            {/* Claudias eigene Vorgabe vom 19.09.2026, 06:01: Es darf nirgends
                nach Mitleid aussehen, und sie stellt sich nicht als Opfer dar.
                Ihre Formulierung: "Es war eine Entscheidung, der Vergangenheit
                nicht die Macht zu geben, mich zu zerstoeren, und stattdessen das
                Beste daraus zu entwickeln, weil es meine Berufung ist."
                Bewusst NICHT geschrieben: "Ich bin kein Opfer." Wer das
                ausspricht, ruft den Gedanken erst auf. Handlungsfaehigkeit zeigt
                man, indem man die Entscheidung benennt, nicht ihr Gegenteil. */}
            <div className="mt-8 border-l-4 border-luxury-gold pl-6">
              <p className="font-inter text-lg leading-relaxed text-midnight-blue/85">
                Irgendwann war es eine Entscheidung. Der Vergangenheit nicht die Macht zu geben,
                mich zu zerstören — sondern das Beste daraus zu entwickeln. Daraus ist
                meine Berufung geworden.
              </p>
            </div>

            <div className="mt-10 overflow-hidden rounded-lg bg-midnight-blue">
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                <iframe
                  src="https://player.vimeo.com/video/1140873666?badge=0&autopause=0&player_id=0&app_id=58479"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  title="Claudia Conen erzählt ihre Geschichte"
                />
              </div>
            </div>
            <p className="mt-3 font-inter text-sm text-midnight-blue/50">
              Claudia Conen erzählt ihre Geschichte selbst.
            </p>
          </div>
        </section>

        {/* 3. Was daraus wurde */}
        <section className="bg-warm py-20 sm:py-28" aria-labelledby="daraus">
          <div className="mx-auto max-w-2xl px-6">
            <h2
              id="daraus"
              className="font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-dark-gold"
            >
              Was daraus wurde
            </h2>

            <div className="mt-6 flex flex-col gap-5 font-inter text-lg leading-relaxed text-midnight-blue/80">
              <p>
                Aus dem Zuhören wurde ein Beruf. Über siebenunddreißig Jahre Arbeit mit Stimme,
                Bühne und Menschen. Kein Studium hat das hervorgebracht, sondern Übung, jeden Tag,
                seit dem roten Buch.
              </p>
              <p>
                Mein tiefstes Anliegen ist es, die Kunst und die Macht der Stimme zu vermitteln und
                Menschen mit meiner Stimme zu berühren. In Unternehmen zeige ich, dass Worte
                magisch wirken können wie ein Magnet und verletzend wie ein Messer.
              </p>
              <p>
                Heute arbeite ich am liebsten mit Menschen, die eine wertvolle Botschaft haben und
                wollen, dass sie in den Herzen anderer ankommt. Mit Unternehmen, deren Teams
                aneinander vorbeireden. Und mit denen, die sich nicht trauen, in einer Welt
                aufzufallen, in der Perfektion auf Knopfdruck entsteht.
              </p>
            </div>

            <blockquote className="mt-10 border-l-4 border-luxury-gold pl-6">
              <p className="font-cormorant text-2xl italic leading-snug text-midnight-blue sm:text-3xl">
                Finde deine Berufung. Nimm dir die Zeit, damit du weißt, warum du tust, was du
                tust. Und achte auf deine Worte.
              </p>
              <footer className="mt-4 font-inter text-sm text-midnight-blue/50">
                Meine Botschaft für dich
              </footer>
            </blockquote>
          </div>
        </section>

        {/* 4. Kein Angebot. Ein Angebot zum Hören. */}
        <section
          className="py-20 sm:py-24"
          style={{ background: 'linear-gradient(180deg, #0A1628 0%, #0F1F3A 50%, #0A1628 100%)' }}
          aria-labelledby="weiter"
        >
          <div className="mx-auto max-w-2xl px-6">
            <h2
              id="weiter"
              className="font-cormorant text-3xl italic leading-snug text-pearl-white sm:text-4xl"
            >
              So klingt das, wovon diese Seite handelt.
            </h2>
            <p className="mt-5 font-inter text-lg leading-relaxed text-pearl-white/75">
              Wenn du wissen willst, wie das klingt, wovon diese Seite handelt: Auf der Hören-Seite
              stehen sieben Gedanken, die meine Arbeit tragen. In meiner Stimme.
            </p>
            <Link
              to="/hoeren"
              className="mt-8 inline-block rounded-sm bg-luxury-gold px-8 py-4 font-montserrat text-base font-semibold text-midnight-blue transition-colors hover:bg-bright-gold"
            >
              Zur Hören-Seite
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

# Review completa del portfolio alternativo

22 ottobre 2026 · Solo `alternative/` · Base della review: `8cf50e5`.

La review ha coperto tutte le sei pagine, il percorso dalla home ai dettagli e ai contatti, la presentazione per recruiter e ricercatori, la lettura su schermi stretti e i principali comportamenti da tastiera. Le correzioni sono implementate. Non risultano problemi aperti nei casi verificati sotto.

## Percorsi revisionati

| Passo | Percorso | Esito |
| --- | --- | --- |
| 1 | Home: capire chi è Patrizio, il ruolo attuale e i lavori principali | Corretto: Purdue compare subito, introduzione più concreta, interessi personali dal CV |
| 2 | Projects: distinguere la ricerca, leggere i contributi e aprire gli approfondimenti | Verificato: tutti i 15 progetti; testo della ricerca più chiaro; visione futura distinta dai contributi |
| 3 | Experience: ricostruire ricerca e formazione | Corretto: due master distinti, quattro record formativi completi, periodi dello scambio e risultati dal CV |
| 4 | Ventures: capire attività, ruolo e scala di ogni iniziativa | Corretto: nomi brevi, descrizione dell’attività e metriche contestualizzate |
| 5 | Activities: scorrere riconoscimenti, interventi e contributi alla comunità | Corretto: categorie visibili e titoli più leggibili, conservando tutti gli otto record |
| 6 | Updates: leggere la cronologia e raggiungere un aggiornamento preciso | Verificato: nove record ordinati; etichette dei collegamenti distinte per data |
| 7 | Contatti, CV, menu, ancore e ritorno all’inizio | Corretto e verificato con/senza JavaScript e da tastiera; email copiata o selezionabile manualmente |

## Correzioni e motivi

1. **Ruolo attuale poco visibile nella home.** Purdue era principalmente nella didascalia del ritratto, in fondo al primo schermo e ancora più in basso su telefono. Ora compare nella prima riga; l’introduzione specifica il ruolo di R&D Assistant e il lavoro su manipolazione e percezione. Evidenza: `01-home-before/after.png`, `10-mobile-before/after.png`.
2. **Formazione troppo generica.** I due master erano accorpati, senza titoli, periodi e risultati. Ora sono separati; lo scambio Purdue ha anche il periodo finale e la selezione documentata. Sono presenti voto di laurea e lingue. Nessun titolo di dottorato è attribuito: il riferimento al PhD riguarda un corso. Evidenza: `05-education-before/after.png`.
3. **Titoli interni ingombranti o vaghi.** Ridotte dimensioni e spazi delle introduzioni; Experience, Ventures, Activities e Updates usano titoli più diretti. L’impianto editoriale e il nome grande nella home sono mantenuti. Evidenza: `03-projects-before/after.png`, `07-activities-before/after.png`, `08-updates-before/after.png`, `11-experience-after.png`.
4. **Testo della ricerca poco immediato in alcuni punti.** “The unfamiliar” diventa “unseen doors”; il toolkit audio e il percorso da video a dimostrazioni sono spiegati con meno gergo. Ruolo di mentore e obiettivi a lungo termine restano espliciti. Evidenza: `04-research-before/after.png` e sorgenti editoriali.
5. **Metriche Adunet interpretabili come analytics dell’app.** Le etichette ora indicano il pubblico giornaliero del festival e i luoghi mappati. Il CV descrive un’app realizzata *per* 8–10k visitatori al giorno; la pagina non trasforma quel dato in una nuova misura di utenti attivi. Migliorata anche l’etichetta del team BIF nei periodi di punta. Evidenza: `06-ventures-before/after.png`.
6. **Attività poco distinguibili a colpo d’occhio.** Aggiunte categorie come public speaking, community leadership e training; abbreviati i titoli visualizzati. Identità complete, date e testi originali rimangono disponibili. Evidenza: `07-activities-before/after.png`, `12-activities-details.png`.
7. **Microtesti troppo piccoli.** Date, tag, didascalie e dettagli prima da 9–10 px sono generalmente da 11–12 px; aumentata anche la dimensione di diversi paragrafi. Il controllo automatico considera tutto il testo HTML visibile, con rapporto di contrasto almeno 4.5:1 e dimensione minima di 11 px allo zoom normale.
8. **Spazio delle ancore contato due volte.** Eliminata la somma di scroll padding e scroll margin. Una sola misura dell’altezza della navigazione gestisce la distanza dai contenuti e si aggiorna al cambio di dimensioni, all’apertura del menu e all’ingrandimento del testo.
9. **Navigazione senza JavaScript e ritorno da tastiera.** Senza script il menu completo rimane nel normale flusso del documento. Il ritorno all’inizio usa un target nativo, focalizzabile e non sticky; il successivo Tab raggiunge il collegamento alla home. Verificato nei tre browser.
10. **Gerarchia semantica e nomi dei collegamenti.** Rimossi il titolo nascosto duplicato di Ventures e l’etichetta separata dai titoli di Selected work. Le sezioni della home hanno intestazioni contestualizzate; le grandi anteprime hanno nomi accessibili brevi. I collegamenti agli aggiornamenti distinguono le date e il CV è identificato come PDF.
11. **Casi limite a 320 px con testo al 200%.** La verifica ampliata ha evidenziato fuoriuscite nei titoli BiellaInFesta e TOYP. I testi ora hanno contenitori espliciti che possono adattarsi; il riconoscimento mantiene il proprio trattamento grafico. Le metriche possono passare su più righe senza schiacciare le cifre.
12. **Verifica delle ancore incomplete nella build.** Il controllo ora verifica anche i collegamenti che iniziano con `#`, oltre a rotte, asset e frammenti verso altre pagine.

## Evidenza visiva

Tutte le catture sono state prodotte e ispezionate durante questa review nel browser integrato. I file sono locali in `.artifacts/audit/`, ignorati da Git; non sono dipendenze del sito né immagini ricostruite. I collegamenti “prima” consentono il confronto nella stessa cartella.

### 1. Home — ruolo riconoscibile subito

[Prima](.artifacts/audit/01-home-before.png)

![Home aggiornata](.artifacts/audit/01-home-after.png)

### 2. Projects — ricerca e contributo

[Prima](.artifacts/audit/04-research-before.png)

![Progetto di ricerca aggiornato](.artifacts/audit/04-research-after.png)

### 3. Experience — formazione documentata

[Prima](.artifacts/audit/05-education-before.png)

![Formazione aggiornata](.artifacts/audit/05-education-after.png)

### 4. Ventures — attività e metriche

[Prima](.artifacts/audit/06-ventures-before.png)

![Adunet aggiornato](.artifacts/audit/06-ventures-after.png)

### 5. Activities — categorie e titoli

[Prima](.artifacts/audit/07-activities-before.png)

![Attività aggiornate](.artifacts/audit/07-activities-after.png)

### 6. Updates — cronologia leggibile

[Prima](.artifacts/audit/08-updates-before.png)

![Aggiornamenti](.artifacts/audit/08-updates-after.png)

### 7. Contatti — azioni e download

![Contatti aggiornati](.artifacts/audit/09-contact-after.png)

## Fonti e verifiche

- CV locale identico all’originale e alla copia nella build: SHA-256 `3d665a4d1bdeac09177906d102b6dd092269ff83e60086af2a1e35db34b58b26`. Titoli, periodi, voti, selezione per lo scambio, lingue e interessi aggiunti alla presentazione provengono da questo documento.
- Snapshot `siteData` confrontato automaticamente con l’originale: identico, con 15 progetti, 5 esperienze di ricerca, 3 iniziative, 8 attività e 9 aggiornamenti. Quattro record formativi sono aggiunti nello strato editoriale.
- Ricerca: confini e attribuzioni documentati in [ROBOTICS_SOURCES.md](ROBOTICS_SOURCES.md), mantenuti anche nella revisione del testo.
- GitHub: verificata la visibilità pubblica dei 15 repository già collegati. Non è stato aggiunto un collegamento pubblico al repository privato SquadBot.
- Risposta HTTP 200 e titolo pertinente verificati senza autenticazione per [Isaac Audio Sensors V1](https://isaac-audio-showcase-site.vercel.app/), [STM32N6](https://patrizioacquadro.github.io/stm32n6-docs/) e [tesi VLA](https://websitepresentation.vercel.app/).
- Alternativa, Node 24.19.0: **9 test unitari e 33 test browser passati**, 11 per Chromium, Firefox e WebKit; build e verifica degli asset passate. Controlli mirati di reflow e contrasto ripetuti dopo l’ultimo ritocco alle frecce delle anteprime.
- Originale, Node 24.19.0: **5 test unitari e 17 test Chromium passati**, con build, baseline di sicurezza e budget degli asset.
- Layout: 320, 390, 765, 1120 e 1440 px; testo al 200% a 320, 390 e 1440 px. Verificati ancore dopo ingrandimento, tastiera, movimento ridotto, menu mobile, contatti, assenza di errori/asset mancanti e funzionamento senza JavaScript.
- JavaScript iniziale: **1,122 byte gzip**, sotto il budget di 8 KB. Nessuna dipendenza aggiunta e nessuna richiesta di asset esterni necessaria durante la visita.

## Limiti delle verifiche

Le catture mostrano composizioni desktop e a larghezza ridotta; le altre larghezze e l’ingrandimento sono coperti dai test dei browser. Il contrasto automatico riguarda il testo HTML, non le scritte interne alle illustrazioni: queste hanno descrizioni alternative e didascalie. La review non è una certificazione WCAG o una prova con dispositivi fisici e VoiceOver. I collegamenti esterni sono verificati alla data della review; non sono stati testati invio di email, accesso ai social o tutti i comportamenti dei siti esterni. Non sono stati rieseguiti esperimenti di robotica né fatte nuove affermazioni di prestazioni scientifiche.

## Indicazioni utili per AGENTS.md

- I due progetti hanno comandi npm con gli stessi nomi: dalla root usare `npm --prefix alternative run check` per l’alternativa e `npm run check` per l’originale.
- L’offset delle ancore deve avere un solo proprietario. Non sommare nuovi scroll margin all’altezza della navigazione; il target “Back to top” deve restare fuori dall’elemento sticky.
- Mantenere il caso 320 px + testo al 200%: la sola verifica a 390 px non intercettava le fuoriuscite dei testi grafici. Nei contenitori flex/grid, controllare anche il testo anonimo, non soltanto i rettangoli degli elementi.

Anteprima da ispezionare: [portfolio alternativo](http://127.0.0.1:5174/). Le modifiche tracciate sono confinate ad `alternative/`; nessun push o pubblicazione.

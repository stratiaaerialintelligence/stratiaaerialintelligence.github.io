# Blog STRATIA — come si pubblica un articolo

## 1. Una volta sola (sul computer o in Codespaces)
    pip install markdown

## 2. Per ogni articolo
1. Crea un file in `blog/posts/` chiamato `AAAA-MM-GG-titolo-breve.md`
   (la data nel nome è solo per ordine; vale quella scritta dentro).
2. Copia l'intestazione da un articolo esistente e cambia i campi:

       ---
       title: Titolo dell'articolo
       date: 2026-12-03
       author: fernando          (oppure: redazione; gli autori stanno in blog/authors.json)
       tags: [Qui si costruisce, Salerno]
       series: Qui si costruisce  (facoltativo)
       episode: 1                 (facoltativo)
       image: images/blog/salerno-lungomare.jpg
       image_alt: Descrizione dell'immagine
       image_credit: Foto: STRATIA
       excerpt: Due frasi: compaiono nell'anteprima e quando si condivide su LinkedIn e WhatsApp.
       linkedin_url: https://...  (facoltativo, aggiungilo dopo aver pubblicato il post LinkedIn)
       draft: false               (true = bozza, non viene pubblicato)
       ---
       Qui il testo in Markdown. ## per i titoletti, > per una citazione, - per gli elenchi.

3. Genera le pagine dalla cartella principale del sito:

       python scripts/build_blog.py

   Lo script crea `blog/index.html`, `blog/<titolo>/index.html`, `blog/feed.xml` e `sitemap.xml`. Poi `git add`, `commit`, `push`: GitHub Pages pubblica da solo.

## Attenzione: il repository è pubblico
Tutto ciò che fai `push` su GitHub può essere letto da chiunque, anche prima che l'articolo
compaia nel blog. Quindi **le bozze e gli articoli da lanciare non vanno in `blog/posts/`**:
tienili in una cartella fuori dal repository (o nel progetto STRATIA su Claude) e copiali in
`blog/posts/` solo il giorno della pubblicazione.

## Programmare un articolo (lancio del 24 novembre)
1. Fino al 24: il file del manifesto resta fuori dal repository.
2. Il 24 mattina: copialo in `blog/posts/`, lancia `python scripts/build_blog.py`, fai commit e push.
   Dopo 1-2 minuti l'articolo è online.
3. Anteprima in locale prima di pubblicare: copia il file in `blog/posts/`, lancia
   `python scripts/build_blog.py --future`, apri `blog/index.html` nel browser, poi NON fare push
   e rimuovi il file.

## Immagini
Metti le copertine in `images/blog/` (16:9, circa 1600x900, sotto i 400 KB).
Se esiste anche una versione `nome-og.jpg` (1200x630) viene usata per le anteprime sui social.

## Come rispondono i lettori (blog di sola lettura)
Il blog non ha database, commenti né moduli. In fondo a ogni articolo ci sono:
- **Segui il blog:** link a LinkedIn, Instagram e al feed RSS (`blog/feed.xml`).
- **Dì la tua:** pulsanti per rispondere sotto il post social dell'articolo e per scrivere alla email di contatto.
  Per far comparire "Rispondi su LinkedIn" (o Instagram), aggiungi nell'intestazione dell'articolo,
  dopo aver pubblicato il post: `linkedin_url: https://www.linkedin.com/...` e rilancia lo script.
I link ai profili e l'email sono all'inizio di `scripts/build_blog.py` (LINKEDIN_URL, INSTAGRAM_URL, CONTACT_EMAIL):
quando esiste la pagina LinkedIn di STRATIA, sostituisci LINKEDIN_URL.

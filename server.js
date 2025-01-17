import fs from "fs";
import path from "path";
import express from "express";
import { createServer as createViteServer } from "vite";
import {book, songs, verses} from './db/schema.js'
import db from './db/db.js';
import { eq, sql, and, like } from 'drizzle-orm';

const isProduction = process.env.NODE_ENV === "production";
const Port = process.env.PORT || 5173;
const Base = process.env.BASE || "/";

const templateHtml = isProduction
    ? fs.readFileSync("./dist/client/index.html", "utf-8")
    : "";

const ssrManifest = isProduction
    ? await fs.readFile("./dist/client/ssr-manifest.json", "utf-8")
    : undefined;

const app = express();
let vite;

// ? Add vite or respective production middlewares
if (!isProduction) {
    vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "custom",
    });

    app.use(vite.middlewares);
} else {
    const sirv = (await import("sirv")).default;
    const compression = (await import("compression")).default;
    app.use(compression());
    app.use(Base, sirv("./dist/client", {
        extensions: [],
        gzip: true,
    }));
}

app.use("/*", async (req, res, next) => {

  if (req.originalUrl.startsWith("/api/")){
    next();
    return;
  }

    // ! Favicon Fix
    if (req.originalUrl === "/favicon.ico") {
        return res.sendFile(path.resolve("./public/vite.svg"));
    }


    // ! SSR Render - Do not Edit if you don't know what heare whats going on
    let template, render;

    try {
        if (!isProduction) {
            template = fs.readFileSync(path.resolve("./index.html"), "utf-8");
            template = await vite.transformIndexHtml(req.originalUrl, template);
            render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
        } else {
            template = templateHtml;
            render = (await import("./dist/server/entry-server.js")).render;
        }

        const rendered = await render({ path: req.originalUrl }, ssrManifest);
        const html = template.replace(`<!--app-html-->`, rendered ?? '');

        res.status(200).setHeader("Content-Type", "text/html").end(html);
    } catch (error) {
        vite.ssrFixStacktrace(error);
        next(error);
    }
});

app.get("/api/getBooks", async (req, res) => {
  let t = db.select().from(book).all();
  res.json(t);
});

app.get("/api/getLanguages", async(req, res) =>{
  let L = db.selectDistinct({language: songs.language}).from(songs).orderBy(songs.language).all();
  res.json(L);
})

app.post("/api/addBook", async (req, res) => {
  try {
    const body = JSON.parse(await getBody(req));
    const { book_id, name } = body;
    let query = db.insert(book).values({
      book_id,
      name
    }).onConflictDoNothing();
    const result = await query.execute();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add book", error: error.message });
  }
})

app.post("/api/addHymn", async (req, res) => {
  try {
    const body = JSON.parse(await getBody(req));
    const { song_id, book_id, title, language } = body;
    let query = db.insert(songs).values({
      song_id,
      book_id,
      title,
      language
    }).onConflictDoNothing();
    const result = await query.execute();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add hymn", error: error.message });
  }
})

app.post("/api/addVerse", async (req, res) => {
  try {
    const body = JSON.parse(await getBody(req));
    const { song_id, book_id, verse_id, verse } = body;
    let query = db.insert(verses).values({
      song_id,
      book_id,
      verse_id,
      verse
    }).onConflictDoNothing();
    const result = await query.execute();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add verse", error: error.message });
  }
})

app.post("/api/editHymn", async (req, res) => {
  try {
    const body = JSON.parse(await getBody(req));
    const { song_id, book_id, title, language } = body;

    let query = await db.update(songs)
      .set({ book_id: book_id, title: title, language: language })
      .where(
        and(
          eq(songs.song_id, song_id),
          eq(songs.book_id, book_id)
        )
      )
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to edit hymn", error: error.message });
  }
})

  app.post("/api/deleteHymn", async (req, res) => {
    try {
      const body = JSON.parse(await getBody(req));
      const {song_id, book_id } = body;
  
      await db.delete(songs)
        .where(
          and(
            eq(songs.song_id, song_id),
            eq(songs.book_id, book_id),
          )
        )
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete hymn", error: error.message });
    }
  })


app.post("/api/editVerse", async (req, res) => {
  try {
    const body = JSON.parse(await getBody(req));
    const { song_id, book_id, verse_id, verse } = body;

    let query = await db.update(verses)
      .set({ verse: verse })
      .where(
        and(
          eq(verses.song_id, song_id),
          eq(verses.book_id, book_id),
          eq(verses.verse_id, verse_id)
        )
      )
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to edit verse", error: error.message });
  }
})

  app.post("/api/deleteVerse", async (req, res) => {
    try {
      const body = JSON.parse(await getBody(req));
      const { song_id, book_id, verse_id } = body;
  
      await db.delete(verses)
        .where(
          and(
            eq(verses.song_id, song_id),
            eq(verses.book_id, book_id),
            eq(verses.verse_id, verse_id)
          )
        )
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete verse", error: error.message });
    }
  })

app.get("/api/getSongs", async (req, res) => {
  try {
    let query = db.select().from(songs)
      .innerJoin(book, eq(songs.book_id, book.book_id));

    let where = [];

    let bookname = req.query['book'];
    console.log(bookname);
    if (bookname && bookname.length > 0)
      where.push(like(book.name, bookname));


    let songnumber = req.query['number'];
    if (songnumber && songnumber.length > 0)
      where.push(eq(songs.song_id, songnumber))

    let songtitle = req.query['title'];
    if (songtitle && songtitle.length > 0)
      where.push(like(songs.title, `%${songtitle}%`))

    let language = req.query['language'];
    if (language && language.length > 0)
      where.push(like(songs.language, language))

    if (where.length > 0)
      query = query.where(and(...where));

    query = query.orderBy(songs.song_id);
    res.json(query.all().map(r => r.songs));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve songs", error: error.message });
  }
});

app.get("/api/getVerse", async (req, res) => {
  try {
    let query = db.select().from(book)
      .innerJoin(songs, eq(songs.book_id, book.book_id))
      .leftJoin(verses, eq(verses.song_id, songs.song_id));

    let where = [];

    let bookname = req.query['book'];
    console.log(bookname);
    if (bookname && bookname.length > 0)
      where.push(eq(book.name, bookname));

    let songnumber = req.query['number'];
    if (songnumber && songnumber.length > 0)
      where.push(eq(songs.song_id, songnumber))

    query = query.where(and(...where)).orderBy(verses.song_id); 
    res.json(query.all().map(r => ({...r.verses, songtitle: r.songs.title }) ));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve verse", error: error.message });
  }
});


// ? Start http server
app.listen(Port, () => {
    console.log(`Server running on http://localhost:${Port}`);
});

// function:
function getBody(request) {
  return new Promise((resolve) => {
    const bodyParts = [];
    let body;
    request.on('data', (chunk) => {
      bodyParts.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(bodyParts).toString();
      resolve(body)
    });
  });
}
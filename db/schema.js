import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

const book = sqliteTable('book', {
  book_id: integer('book_id').primaryKey(),
  name: text('name'),
});

const songs = sqliteTable('songs', {
    song_id: integer('song_id').primaryKey(),
    book_id: integer('book_id').primaryKey().references( ()=>book.book_id),
    title: text('title'),
    language: text('language'),
    html: text('html'),
    text: text('text')
  });

  const verses = sqliteTable('verses', {
    song_id: integer('song_id').primaryKey().references( ()=>songs.song_id),
    book_id: integer('book_id').primaryKey().references( ()=>book.book_id),
    verse_id: integer('verse_id').primaryKey(),
    verse: text('verse')
  })
 
export {book, songs, verses}
import sqlite from 'sqlite3'
import Movie from "../models/movie";

export default class MatchingStorage {
  readonly database: sqlite

  constructor() {
    this.database = new sqlite.Database(':memory:')
    this.database.run(
      `CREATE TABLE matches(
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        room text NOT NULL, 
        movie text NOT NULL,
        tmbdbId integer NOT NULL,
        user text NOT NULL, 
        match integer NOT NULL, 
        matched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`
    )
  }

  saveMovieVote(room: string, movie: Movie, user: string, isMatch: boolean) {
    this.database.run(
      'insert into matches(room, movie, tmbdbId, user, match) values(?, ?, ?, ?, ?)',
      [room, movie.title, movie.id, user, isMatch],
      function (error) {
        if (error) {
          return console.error(error)
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`)
      }
    )

    this.database.all('select * from matches', [], function (error, rows) {
      console.table(rows)
    })
  }
}

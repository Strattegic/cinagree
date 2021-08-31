<template>
  <div>
    <div class="movie-matching" v-if="!matchedMovie">
      <div class="cards">
        <div v-if="currentMovie" class="card">
          <img :src="currentMovie.imageUrl" alt="" />
          <h3>{{ currentMovie.title }}</h3>
        </div>
      </div>
      <div class="buttons">
        <button @click="voteNay()">😡</button>
        <button @click="voteYay()">😀</button>
      </div>
    </div>
    <div v-else>
      <MovieMatched :movie="matchedMovie"></MovieMatched>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { MovieDb } from 'moviedb-promise/dist'
import { io } from 'socket.io-client'
import Movie, { fromMovieResult } from '@/models/movie'
import MovieMatched from "@/components/MovieMatched.vue";

const socket = io('ws://localhost:3000')
const movieDb = new MovieDb(process.env.VUE_APP_TMDB_API_KEY!)

interface MovieVoteEvent {
  isMatch: boolean
  movie: Movie
}

interface UserVote {
  movie: Movie
  user: string
}

export default defineComponent({
  name: 'MovieMatching',
  components: {
    MovieMatched,
  },
  props: {
    movieName: String,
  },
  data: () => {
    return {
      matchedMovie: {} as Movie | undefined,
      userId: '',
      userCount: -1,
      movieCount: 0,
      currentMovie: {} as Movie | undefined,
      movieVotes: new Map(),
      movies: [] as Movie[],
    }
  },
  mounted: function () {
    this.loadMovies()

    socket.on('movie-vote', (userVote: UserVote) => {
      console.debug(
        `A new user vote was received. User '${userVote.user}' voted for '${userVote.movie.title}'`
      )
      this.addMovieVote(userVote)
      this.checkForMatchedMovie()
    })

    socket.on('room-update', (userCount: number) => {
      console.log(`${userCount} users online`)
      this.userCount = userCount
    })

    socket.on('connect', () => {

      this.userId = socket.id
    })
  },
  methods: {
    checkForMatchedMovie() {
      const matchedMovieId = this.getMatchedMovieId()
      if (matchedMovieId) {
        this.matchedMovie = this.movies.find(movie => movie.id === matchedMovieId)
        console.log(`Match found! ${this.matchedMovie}`)
      }
    },

    getMatchedMovieId(): string | undefined {
      let matchedMovie
      this.movieVotes.forEach((userVotes: string[], movieId: string) => {
        console.log(`Looking for match: ${userVotes.length} for ${movieId}`)
        if(userVotes.length >= this.userCount) {
          matchedMovie = movieId
          console.log(`Match found! ${matchedMovie}`)
          return
        }
      })

      return matchedMovie
    },

    addMovieVote(userVote: UserVote) {
      if (!this.movieVotes.has(userVote.movie.id)) {
        this.movieVotes.set(userVote.movie.id, [])
      }
      this.movieVotes.get(userVote.movie.id).push(userVote.user)
    },

    voteYay: function () {
      this.sendMovieVoteEvent(this.currentMovie!, true)
      this.nextMovie()
    },

    voteNay: function () {
      this.nextMovie()
    },

    nextMovie: function () {
      if (this.movieCount + 1 < this.movies.length) {
        this.currentMovie = this.movies[++this.movieCount]
      }
    },

    loadMovies: function () {
      movieDb.moviePopular().then((data: any) => {
        this.movies = data.results.map((result: any) => {
          return fromMovieResult(result)
        })
        this.currentMovie = this.movies[0]

        // TODO: for testing
        this.matchedMovie = this.currentMovie
        console.log(this.matchedMovie)
      })
    },

    sendMovieVoteEvent(movie: Movie, votedYes: boolean) {
      socket.emit('movie-vote', {
        movie,
      } as MovieVoteEvent)
    },
  },
})
</script>

<style scoped>
.cards {
  display: flex;
  justify-content: center;
  flex-direction: row;
}

.card {
  margin: auto;
}

.card h3 {
  color: #fff;
}

.card img {
  max-height: 500px;
  width: auto;
  max-width: 90%;
}

.buttons {
  flex: 0 0 100px;
}

.buttons button {
  border-radius: 50%;
  border: 0;
  margin: 0 8px;
  display: inline-block;
  width: 60px;
  line-height: 60px;
  background: #fff;
  font-size: large;
  cursor: pointer;
}

.buttons button:hover {
  background: #ccc;
}
</style>

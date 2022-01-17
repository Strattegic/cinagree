<template>
  <div>
    <div v-if="!Object.keys(matchedMovie).length" class="movie-matching">
      <div class="cards">
        <div v-if="currentMovie" class="card">
          <img :src="currentMovie.imageUrl" alt="" />
          <h3>{{ currentMovie.title }}</h3>
        </div>
      </div>
      <VoteButtons v-on:vote="voteReceived" />
    </div>
    <div v-else>
      <MovieResult :movie="matchedMovie"></MovieResult>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { MovieDb } from 'moviedb-promise/dist'
import { io } from 'socket.io-client'
import Movie, { fromMovieResult } from '../models/movie'
import MovieResult from '../components/MovieResult.vue'
import VoteButtons from '../components/VoteButtons.vue'

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
    MovieResult,
    VoteButtons,
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
    socket.on('movies:loaded', (movies: Movie[]) => {
      console.log(`${movies.length} movies have loaded!`)
      this.currentMovie = movies[0]
      this.movies = movies
    })

    socket.on('movie:voted', (userVote: UserVote) => {
      console.debug(
        `A new user vote was received. User '${userVote.user}' voted for '${userVote.movie.title}'`
      )
      this.addMovieVote(userVote)
      this.checkForMatchedMovie()
    })

    socket.on('room:userCountUpdated', (userCount: number) => {
      console.log(`${userCount} users online`)
      this.userCount = userCount
    })

    socket.on('connect', () => {
      this.userId = socket.id
    })
  },
  methods: {
    voteReceived(vote: boolean) {
      console.log('user clicked: ' + vote)
      socket.emit('movie:vote', {
        movie: this.currentMovie,
        user: this.userId,
        vote: vote
      })
      this.nextMovie()
    },

    checkForMatchedMovie() {
      const matchedMovieId = this.getMatchedMovieId()
      if (matchedMovieId) {
        console.log('matched movie: ' + this.matchedMovie)
        this.matchedMovie = this.movies.find(
          (movie) => movie.id === matchedMovieId
        )
        console.log(`Match found! ${this.matchedMovie}`)
      }
    },

    getMatchedMovieId(): string | undefined {
      let matchedMovie
      this.movieVotes.forEach((userVotes: string[], movieId: string) => {
        console.log(`Looking for match: ${userVotes.length} for ${movieId}`)
        if (userVotes.length >= this.userCount) {
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

    nextMovie: function () {
      if (this.movieCount + 1 < this.movies.length) {
        this.currentMovie = this.movies[++this.movieCount]
      }
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
</style>

<template>
  <div>
    <div class="movie-matching">
      <div class="cards">
        <!--                <div class="card" v-bind:key="movie.name" v-for="movie of movies">-->
        <!--                    <img v-bind:src=movie.url alt="">-->
        <!--                    <h3>{{ movie.name }}</h3>-->
        <!--                </div>-->
        <div v-if="currentMovie" class="card">
          <img :src="currentMovie.imageUrl" alt="" />
          <h3>{{ currentMovie.title }}</h3>
        </div>
      </div>
      <div class="buttons">
        <button id="nope" @click="voteNay()">😡</button>
        <button id="yeah" @click="voteYay()">😀</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { MovieDb } from 'moviedb-promise/dist'
import { io } from 'socket.io-client'
import Movie from "@/models/movie";

const socket = io('ws://localhost:3000')
const movieDb = new MovieDb(process.env.VUE_APP_TMDB_API_KEY!)

interface MovieVoteEvent {
  isMatch: boolean
  movie: Movie
}

export default defineComponent({
  name: 'MovieMatching',
  props: {
    movieName: String,
  },
  data: () => {
    return {
      movieCount: 0,
      currentMovie: {
        title: 'n/a',
        imageUrl: '',
      } as Movie,
      matchedMovies: [] as Movie[],
      movies: [],
    }
  },
  mounted: function () {
    this.loadMovies()
  },
  methods: {
    voteYay: function () {
      this.sendVoteEvent(this.currentMovie, true)
      this.matchedMovies.push(this.currentMovie)
      this.nextMovie()
    },
    voteNay: function () {
      this.sendVoteEvent(this.currentMovie, false)
      this.nextMovie()
    },
    nextMovie: function () {
      if (this.movieCount + 1 < this.movies.length) {
        console.log(this.currentMovie)
        this.currentMovie = this.movies[++this.movieCount]
        console.log(this.currentMovie)
      }
    },

    loadMovies: function () {
      movieDb.moviePopular().then((data: any) => {
        console.log(data)
        this.movies = data.results.map((result: any) => {
          return Movie.fromMovieResult(result)
        })
        this.currentMovie = this.movies[0]
      })
    },

    sendVoteEvent(movie: Movie, isMatch: boolean) {
      socket.emit('movie-matching', {
        isMatch,
        movie,
      } as MovieVoteEvent)
    },
  },
})
</script>

<style scoped>
.movie-matching {
}

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

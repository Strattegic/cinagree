<template>
    <div>
        {{ websocketData }}
        <div class="movie-matching">
            <div class="cards">
<!--                <div class="card" v-bind:key="movie.name" v-for="movie of movies">-->
<!--                    <img v-bind:src=movie.url alt="">-->
<!--                    <h3>{{ movie.name }}</h3>-->
<!--                </div>-->
                <div class="card" v-if="currentMovie">
                    <img v-bind:src=currentMovie.url alt="">
                    <h3>{{ currentMovie.name }}</h3>
                </div>
            </div>
            <div class="buttons">
                <button id="nope" v-on:click="voteNay()">😡</button>
                <button id="yeah" v-on:click="voteYay()">😀</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import { io } from "socket.io-client";
    const socket = io('ws://localhost:3000')

    interface Movie {
        name: string
        url: string
    }

    interface MovieMatchingEvent {
        isMatch: boolean
        movie: Movie
    }

    export default defineComponent({
        name: "MovieMatching",
        methods: {
            voteYay: function() {
                this.sendMatchingEvent(this.currentMovie, true)
                this.matchedMovies.push(this.currentMovie)
                this.nextMovie()
            },
            voteNay: function() {
                this.sendMatchingEvent(this.currentMovie, false)
                this.nextMovie()
            },
            nextMovie: function() {
                if (this.movieCount + 1 < this.movies.length) {
                    console.log(this.currentMovie)
                    this.currentMovie = this.movies[++this.movieCount]
                    console.log(this.currentMovie)
                }
            },

            sendMatchingEvent(movie: Movie, isMatch: boolean) {
                socket.emit('movie-matching', {
                    isMatch,
                    movie
                } as MovieMatchingEvent)
            }
        },
        mounted: function() {
            this.currentMovie = this.movies[0]
            socket.on("data", (data) => {
                this.websocketData = data
            });
        },
        data: () => {
            return {
                websocketData: null,
                movieCount: 0,
                currentMovie: {
                    name: 'n/a',
                    url: '',
                },
                matchedMovies: [] as Movie[],
                movies: [
                    {
                        name: '12 Angry Men',
                        url: require('../assets/movie_posters/12_angry_men.jpg'),
                    },
                    {
                        name: 'Lord Of The Rings',
                        url: require('../assets/movie_posters/lord_of_the_rings.jpg'),
                    }
                ],
            }
        },
        props: {
            movieName: String,
        },
    });
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

    /*
    .movie-matching {
        width: 100vw;
        height: 90vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .cards {
        padding-top: 40px;
        margin: auto;
    }

    .card {
        width: 90vw;
        height: 70vh;
        max-width: 400px;
        padding-bottom: 20px;
        border-radius: 8px;
    }

    .card img {
        max-width: 100%;
    }

    .movie-matching {
        width: 100vh;
        height: 100vh;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .cards {
        flex-grow: 1;
        padding-top: 40px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        z-index: 1;
    }

    .card {
        display: inline-block;
        width: 90vw;
        max-width: 400px;
        height: 70vh;
        background: #FFFFFF;
        padding-bottom: 20px;
        border-radius: 8px;
        overflow: hidden;
        position: absolute;
        will-change: transform;
        transition: all 0.3s ease-in-out;
        cursor: grab;
    }

    .card img {
        max-width: 100%;
        pointer-events: none;
    }

     */
</style>

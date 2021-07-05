<template>
    <div>
        <h2>{{ movieName }}</h2>
        <div class="movie-matching">
            <div class="cards">
                <div class="card" v-bind:key="movie.name" v-for="movie of movies">
                    <img v-bind:src=movie.url alt="">
                    <h3>{{ movie.name }}</h3>
                </div>
            </div>
            <div class="buttons">
                <button id="nope">😡</button>
                <button id="yeah">😀</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    export default defineComponent({
        name: "HelloWorld",
        data: () => {
            return {
                movies: [
                    {
                        name: '12 Angry Men',
                        url: require('../assets/movie_posters/12_angry_men.jpg'),
                    },
                    {
                        name: 'Lord Of The Rings',
                        url: require('../assets/movie_posters/lord_of_the_rings.jpg'),
                    }
                ]
            }
        },
        props: {
            movieName: String,
        },
    });
</script>

<style scoped>
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

    .buttons {
        flex: 0 0 100px;
        margin-top: 20px
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
    }
</style>

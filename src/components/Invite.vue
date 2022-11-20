<template>
  <div v-if="error">
    {{ error }}
  </div>
  <div class="hero" v-else>
    <div class="title">Your Invite Link is:</div>
    <div class="box">
      <div ref="text" class="w-full">{{ currentUrl }}</div>
      <button class="button" @click="copyToClipBoard()">
        Copy this link to clipboard.
      </button>
    </div>
    <div class="columns is-vcentered" v-if="(!partnerUsername && creatorUsername) || (!creatorUsername && partnerUsername)">
      <div class="column is-6">
        <p class="bd-notification is-primary">{{ creatorUsername }}</p>
      </div>
      <div class="column is-6">
        <p class="bd-notification is-primary">
          Waiting...
        </p>
      </div>
    </div>
    <div class="columns is-vcentered" v-else>
      <div class="column is-6">
        <p class="bd-notification is-primary">{{ creatorUsername }}</p>
      </div>
      <div class="column is-6">
        <p class="bd-notification is-primary">
          {{ partnerUsername }}
        </p>
      </div>
    </div>
  </div>
  <div class="container" v-if="(recommendations?.length ?? 0) > 0">
    <section class="section watchlist">
      <p class="title">Recommendations</p>
      <div class="columns is-8 is-multiline card-equal-height">
        <div v-for="movie in recommendations" :key="movie.id" class="column is-one-quarter">
          <movie-card :movie="movie" />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, Ref, ref } from "vue";
import PocketBase from "pocketbase";
import axios from "axios";
import { Movie } from "../models/movie";
import MovieCard from "./MovieCard.vue";

export default defineComponent({
  name: "Invite",
  components: {
    MovieCard: MovieCard,
  },
  data() {
    const recommendations: Ref<Movie[]> = ref([]);
    return {
      creatorUsername: ref(""),
      partnerUsername: ref(""),
      recommendations,
      role: "",
      error: "",
      sessionId: "" + this.$route.params.id,
      currentUrl: location.toString(),
      pb: inject("pb") as PocketBase,
    };
  },
  mounted() {
    console.log("mounted");
    this.joinSession();
  },
  methods: {
    async joinSession() {
      try {
        let response = await axios.post(
          this.pb.buildUrl("/session/join"),
          null,
          {
            params: {
              id: this.sessionId,
            },
            headers: {
              Authorization: `${this.pb.authStore.token}`,
            },
          }
        );

        if (response.status !== 200) {
          console.log("error", response.data);
          this.error =
            response.data?.error || "Unknown error while joining session";
          return;
        }

        this.role = response.data.role;

        this.pollForJoin();
      } catch (e) {
        this.error = String(e);
      }
    },
    async pollForJoin() {
      try {
        let session = await this.pb
          .collection("sessions")
          .getOne(this.sessionId, {
            expand: "creator,partner",
          });


        this.creatorUsername = (session.expand.creator as any)?.username || "";
        this.partnerUsername = (session.expand.partner as any)?.username || "";

        // If the other user has not yet joined, we poll again
        if (
          !(this.creatorUsername) ||
          !(this.partnerUsername)
        ) {
          setTimeout(() => {
            this.pollForJoin();
          }, 1000);
          return;
        }

        // Now that we know tat the user has joined, we can get the recommendations
        let recommendations = await this.pb.collection('recommendations').getFullList(100, {
          filter: `session = ${JSON.stringify(this.sessionId)}`,
          expand: 'movie'
        });

        this.recommendations = recommendations.map((w) => w.expand.movie) as unknown as Movie[];
      } catch (e) {
        this.pb.authStore.clear();
        window.location.pathname = "/";
      }
    },
    async copyToClipBoard() {
      try {
        await navigator.clipboard.writeText(this.currentUrl);
        console.log("copied");
      } catch (e) {
        console.log(e);
      }
    },
  },
});
</script>

<style>
.hero {
  background: none !important;
  background-color: transparent !important;
  padding-top: 25px !important;
}

.box {
  width: 500px !important;
  text-align: center;
  align-content: center;
  align-self: center !important;
}

.w-full {
  padding-bottom: 15px;
}

.columns {
  align-content: center !important;
  align-self: center !important;
  text-align: center !important;
}

.column {
  max-width: 500px;
}
</style>


<style scoped>
.watchlist {
  padding-top: 2rem !important;
  max-width: 90%;
  margin: 0 auto;
}
</style>

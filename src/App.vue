<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="/apple-touch-icon.png" alt="wat2watch logo" />
        <span class="is-size-4 ml-2">what2watch</span>
      </router-link>
      <a class="navbar-burger" :class="{ 'is-active': menuOpen }" @click="menuOpen = !menuOpen">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-end">
      <div class="navbar-menu" :class="{ 'is-active': menuOpen }">
        <router-link class="navbar-item" to="/search">Search</router-link>
        <a @click.prevent="logout" class="navbar-item">Logout</a>
        <router-link class="navbar-item" to="/login">Login</router-link>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script lang="ts">
import { inject, ref } from 'vue';
import PocketBase from 'pocketbase';

export default {
  name: 'App',
  setup() {
    return {
      menuOpen: ref(false),
      pb: inject("pb") as PocketBase,
    };
  },
  methods: {
    logout() {
      this.pb.authStore.clear();

      window.location.href = "/";
    },
  },
};
</script>

<style>
@import "../node_modules/bulma/css/bulma.min.css";
@import "../node_modules/bulma-prefers-dark/css/bulma-prefers-dark.css";
@import "../node_modules/@mdi/font/css/materialdesignicons.min.css";

:root {
  --font-color: #1f2933;
  --border-color: #ccc;
  --green: #00ff55;
  --yellow: #f7ae40;
  --font-color-on-yellow: var(--font-color);
  --blue: #6fcaff;
  --card-color: #fff;
  --button-color: #bbb;
}

@media (prefers-color-scheme: dark) {
  :root {
    --font-color: #eed7c0;
    --border-color: #999;
    --green: #158c11;
    --yellow: #df8b1d;
    --font-color-on-yellow: #333;
    --blue: #004770;
    --card-color: #222;
    --button-color: #333;
  }

  .help {
    color: #aaa;
  }

  .invert-dm {
    filter: invert()
  }
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

html,
body,
#app {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}
</style>

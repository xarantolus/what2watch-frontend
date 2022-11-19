<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <nav class="navbar is-fixed-top is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="/apple-touch-icon.png" alt="wat2watch logo" />
          <span class="is-size-4 ml-2">what2watch</span>
        </router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <router-link class="navbar-item" to="/login">Login</router-link>
          <router-link class="navbar-item" to="/register">Register</router-link>
        </div>
      </div>
    </nav>
    <router-view />
  </div>

</template>

<style>
@import "../node_modules/bulma/css/bulma.min.css";
@import "../node_modules/bulma-prefers-dark/css/bulma-prefers-dark.css";

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

  /* Some additional color fixes */
  .help {
    color: #aaa;
  }

  .invert-dm {
    filter: invert()
  }
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

html,
body {
  height: 100vh;
}
</style>

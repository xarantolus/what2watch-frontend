<template>
  <!-- Bulma.css Login or registration page -->
  <form class="box container" @submit.prevent="login">
    <div class="hero">
      <div class="hero-body">
        <img src="/android-chrome-512x512.png" width="120" height="120" />
        <div class="title">Login</div>
      </div>
    </div>

    <div class="field">
      <label class="label">Username</label>
      <div>
        <input class="input" type="text" v-model="username" placeholder="Username" />
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div>
        <input class="input" type="password" v-model="password" placeholder="Password" />
      </div>
    </div>

    <div class="field" v-if="error">
      <div class="notification is-danger">
        {{ error }}
      </div>
    </div>

    <div class="field">
      <button :class="{ 'is-loading': loading }" class="button is-primary" type="submit">Login</button>
    </div>

    <div>
      <span>Don't have an account?
        <router-link to="/register">Sign Up Here</router-link>
      </span>
    </div>
  </form>
</template>

<script lang="ts">
import { inject, ref } from 'vue';
import PocketBase from 'pocketbase';
import { useRoute } from 'vue-router'

export default {
  name: "Login",
  setup() {
    return {
      username: ref(""),
      password: ref(""),
      error: ref(""),
      loading: ref(false),
      pb: inject("pb") as PocketBase,
    };
  },
  methods: {
    async login() {
      // TODO: Make API call and store token in localstorage OR show that login was not successful
      try {
        this.loading = true;

        const authData = await this.pb.collection('users').authWithPassword(
          this.username, this.password
        );

        if (!authData) {
          this.error = "Invalid username or password";
          return;
        }

        const params = new URLSearchParams(window.location.search);
        this.$router.push(params.get("redirect") || '/');
      } catch (error) {
        this.error = String(error);
        console.log(error);
      } finally {
        this.loading = false;
        console.log("finished loading")
      }
    },
  },
};
</script>

<style scoped>
.title {
  text-align: center;
}

.container {
  margin-left: auto;
  margin-right: auto;
}

.hero {
  background: rgba(0, 0, 0, 0.5) !important;
}
</style>

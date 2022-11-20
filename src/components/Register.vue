<template>
  <!-- Bulma.css Login or registration page -->
  <form @submit.prevent="register" class="box container">
    <div class="hero">
      <div class="hero-body">
        <img src="/android-chrome-512x512.png" width="120" height="120" />
        <div class="title">Register</div>
        <div class="subtitle">Welcome!</div>
      </div>
    </div>

    <div class="field">
      <label class="label">E-Mail</label>
      <div>
        <input class="input" type="text" v-model="username" placeholder="Email" />
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div>
        <input class="input" type="password" v-model="password" placeholder="Password" />
      </div>
    </div>

    <div class="field">
      <div class="notification is-danger" v-if="error">
        {{ error }}
      </div>
    </div>

    <div class="field">
      <button :class="{ 'is-loading': loading }" class="button is-primary" type="submit">Register</button>
    </div>

    <div>
      <span>Already have an account?
        <router-link to="/login">Login here</router-link>
      </span>
    </div>
  </form>
</template>

<script lang="ts">
import { inject, ref } from 'vue';
import PocketBase from 'pocketbase';

export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      error: "",
      loading: false,
      pb: inject("pb") as PocketBase,
    };
  },
  methods: {
    async register() {
      //TODO API call to register user
      try {
        this.loading = true;

        let result = await this.pb.collection("users").create({
          username: this.username,
          password: this.password,
          passwordConfirm: this.password,
        });

        await this.pb.collection('users').authWithPassword(
          this.username, this.password
        );

        this.$router.push("/");
        this.$forceUpdate();
      } catch (error) {
        this.error = String(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Login page style bulma.css */
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

.box {
        padding-top: 20px !important;
        width: 500px !important;
        text-align: center;
        align-content: center;
        align-self: center !important;
}
</style>

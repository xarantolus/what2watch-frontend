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
      <label class="label">E-Mail</label>
      <div>
        <input class="input" type="text" v-model="email" placeholder="Email" />
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
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
      loading: false
    };
  },
  methods: {
    async login() {
      // TODO: Make API call and store token in localstorage OR show that login was not successful
      try {
        this.loading = true;

        await new Promise(resolve => setTimeout(resolve, 2000));

        throw new Error("Login not implemented yet");
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

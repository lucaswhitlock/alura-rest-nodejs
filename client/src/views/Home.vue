<template>
  <div class="home">
    <div class="login-img">
      <img src="https://img.icons8.com/cotton/2x/login-rounded-right--v2.png" alt="Login Logo">
    </div>
    <div class="component login-component" v-if="isLogin">
      <login v-on:swap-component="swapComponent" />
    </div>
    <div class="component register-component" v-else>
      <register v-on:swap-component="swapComponent" />
    </div>
  </div>
</template>

<script>
import Login from "@/components/login/Login.vue";
import Register from "@/components/login/Register.vue";

export default {
  name: "Home",
  components: {
    login: Login,
    register: Register
  },
  data: () => {
    return {
      isLogin: true
    }
  },
  methods: {
    swapComponent() {
      this.isLogin = !this.isLogin;
    }
  }
};
</script>

<style scoped>
.login-img {
  margin-top: 2%;
  margin-bottom: 2%;
}
.component {
  margin-left: 30%;
  margin-right: 30%;
  margin-top: 1%;
  margin-bottom: 1%;
}
</style>
<template>
  <b-container fluid>
    <messages />
    <b-form @submit.prevent="onSubmit">
      <b-form-group id="loginInputGroup">
        <b-form-input
          id="loginInput"
          type="text"
          v-model="loginForm.login"
          required
          placeholder="Login"
          autocomplete="on"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="passwordInputGroup">
        <b-form-input
          id="passwordInput"
          type="password"
          v-model="loginForm.password"
          required
          placeholder="Password"
          autocomplete="on"
        ></b-form-input>
      </b-form-group>
      <b-button
        class="ml-1 mr-1"
        type="submit"
        variant="primary"
        :disabled="isFormBusy"
        ><b-spinner type="grow" small v-if="isFormBusy"></b-spinner>
        {{ !isFormBusy ? "&nbsp;Login" : "&nbsp;Authenticating..." }}</b-button
      >
      <b-button
        class="ml-1 mr-1"
        variant="success"
        :disabled="isFormBusy"
        @click.prevent="swapComponent"
        >Register</b-button
      >
    </b-form>
  </b-container>
</template>

<script>
import Message from "@/components/error/Message.vue";
import { mapActions } from "vuex";
export default {
  components: {
    messages: Message,
  },
  data: () => {
    return {
      isFormBusy: false,
      loginForm: {
        login: null,
        password: null,
      },
    };
  },
  methods: {
    onSubmit() {
      this.isFormBusy = true;
      this.authUser(this.loginForm).then(() => {
        this.isFormBusy = false;
      });
    },
    swapComponent() {
      this.$emit("swap-component");
    },
    ...mapActions("login", ["authUser"]),
  },
};
</script>
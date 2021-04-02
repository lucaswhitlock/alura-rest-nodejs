<template>
  <b-container fluid id="register-container">
    <messages />
    <b-form @submit.prevent="onSubmit" @reset="onReset">
      <b-form-group id="nameInputGroup">
        <b-form-input
          id="nameInput"
          type="text"
          v-model="registerForm.name"
          required
          placeholder="Tell us your name"
          autocomplete="on"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="genderInputGroup">
        <b-form-select
          v-model="registerForm.gender"
          :options="selectOptions"
        ></b-form-select>
      </b-form-group>
      <b-form-group id="emailInputGroup">
        <b-form-input
          id="emailInput"
          type="email"
          v-model="registerForm.email"
          required
          placeholder="Tell us your e-mail address"
          autocomplete="on"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="birthInputGroup">
        <b-form-input
          id="birthInput"
          type="date"
          v-model="registerForm.birth"
          required
          placeholder="Tell us your birth date"
          autocomplete="on"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="loginInputGroup">
        <b-form-input
          id="loginInput"
          type="text"
          v-model="registerForm.login"
          required
          placeholder="Choose your desired login"
          autocomplete="on"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="passwordInputGroup">
        <b-form-input
          id="passwordInput"
          type="password"
          v-model="registerForm.password"
          required
          placeholder="Choose your desired password"
          autocomplete="on"
        ></b-form-input>
      </b-form-group>
      <b-button
        class="ml-1 mr-1"
        type="submit"
        variant="primary"
        :disabled="isFormBusy"
        ><b-spinner type="grow" small v-if="isFormBusy"></b-spinner>
        {{ !isFormBusy ? "&nbsp;Sign up" : "&nbsp;Signin up..." }}</b-button
      >
      <b-button
        class="ml-1 mr-1"
        type="reset"
        variant="warning"
        :disabled="isFormBusy"
        >Reset</b-button
      >
      <b-button
        class="ml-1 mr-1"
        variant="danger"
        :disabled="isFormBusy"
        @click.prevent="swapComponent"
        >Cancel</b-button
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
      registerForm: {
        name: null,
        email: null,
        gender: null,
        birth: null,
        login: null,
        password: null,
      },
      selectOptions: [
        { text: "Tell us your gender", value: null },
        { text: "Male", value: "M" },
        { text: "Female", value: "F" },
        { text: "Other", value: "O" },
      ],
    };
  },
  methods: {
    onSubmit() {
      this.isFormBusy = true;
      this.registerUser(this.registerForm).then(() => {
        this.isFormBusy = false;
      })
    },
    onReset() {
      this.registerForm = {
        name: null,
        email: null,
        gender: null,
        birth: null,
        login: null,
        password: null,
      };
    },
    swapComponent() {
      this.$emit("swap-component");
    },
    ...mapActions("login", ["registerUser"]),
  },
};
</script>
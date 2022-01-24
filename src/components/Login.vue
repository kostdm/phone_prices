<script setup lang="ts">
import store from '../store';
import { ref } from 'vue';

const token = ref('');
const { dispatch, state } = store;

</script>

<template>
  <div class="login-container">
    <div class="login-window">
      <h1>Login</h1>
      <input type="text" v-model="token">
      <div class="error" v-if="state.isError">{{ state.errorMessage }}</div>
      <button @click="dispatch('login', { token })" :disabled="state.isLoading">{{ state.isLoading ? 'Loading': 'Login' }}</button>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
.login-window {
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.login-window h1{
  font-size: 2rem;
  margin: 0;
  padding: 0;
  text-align: center;
}
.error {
  padding: 0.5rem;
  background-color: palevioletred;
  color: darkred;
}
</style>

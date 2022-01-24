<script setup lang="ts">
import store from './store';
import Login from './components/Login.vue';
import Table from './components/Table.vue';

const { state } = store;

</script>

<template>
  <Table v-if="state.isAuth"></Table>
  <Login v-else />
</template>

<style>

</style>

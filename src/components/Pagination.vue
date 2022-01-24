<script setup lang="ts">
import store from '../store';
import { computed } from 'vue';

const { dispatch, state, getters } = store;
const maxPages = computed(() => {
  return Math.ceil(getters.filteredPhones.length / 100);
});

</script>

<template>
  <div class="filter">
    <button @click="dispatch('decreasePage')" :disabled="state.page === 1">Назад</button>
    <div>Страница {{ state.page }} из {{ maxPages }}</div>
    <button @click="dispatch('increasePage')" :disabled="state.page === maxPages">Вперед</button>
  </div>
</template>

<style scoped>
.filter {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
</style>

<script setup lang="ts">
import store from '../store';
import { ref } from 'vue';
import Pagination from './Pagination.vue';

const search = ref('');
const category = ref('all');

const options = [
  { label: 'ВСЕ', value: 'all' },
  { label: 'Обычный', value: 'regular' },
  { label: 'Бронзовый', value: 'bronze' },
  { label: 'Серебряный', value: 'silver' },
  { label: 'Золотой', value: 'gold' },
  { label: 'Платиновый', value: 'platinum' },
  { label: 'Эксклюзивный', value: 'exclusive' },
];

const changeHandler = () => { 
  store.dispatch('changeFilter', {
    search: search.value,
    category: category.value,
  });
};

</script>

<template>
  <div class="filter">
    <input type="number" v-model="search" @input="changeHandler">
    <select v-model="category" @change="changeHandler">
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :selected="option.value === category"
        @change="changeHandler"
      >{{ option.label }}</option>
    </select>
    <Pagination />
  </div>
</template>

<style scoped>
.filter {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}
</style>

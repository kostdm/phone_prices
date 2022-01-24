<script setup lang="ts">
import store from '../store';
import Row from './Row.vue';
import Filter from './Filter.vue';
import Saver from './Saver.vue';

const { commit, state, getters } = store;

</script>

<template>
  <div class="page-container">
    <h1>App</h1>
    <Saver />
    <Filter />
    <table>
      <thead>
        <tr>
          <th>Номер</th>
          <th>Категория</th>
          <th>Цена</th>
        </tr>
      </thead>
      <tbody>
        <Row v-for="item in getters.filteredPage" :key="item.phone" :phone="item.phone" :category="item.category" :price="item.price"/>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 960px;
  margin: 0 auto;
}

table {
  width: 100%;
}
</style>

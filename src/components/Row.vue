<script setup lang="ts">
import { ref } from 'vue';
import store from '../store';

const props = defineProps({
  phone: String,
  category: String,
  price: Number,
});

const category = ref(props.category);
const price = ref(props.price);

const options = [
  { label: 'Обычный', value: 'regular' },
  { label: 'Бронзовый', value: 'bronze' },
  { label: 'Серебряный', value: 'silver' },
  { label: 'Золотой', value: 'gold' },
  { label: 'Платиновый', value: 'platinum' },
  { label: 'Эксклюзивный', value: 'exclusive' },
];

const changeHandler = () => {
  store.dispatch('changePhone', { phone: props.phone, category: category.value, price: price.value });
};

</script>

<template>
  <tr :class="props.category">
    <td>{{ props.phone }}</td>
    <td>
      <select v-model="category" @change="changeHandler">
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :selected="option.value === props.category"
        >{{ option.label }}</option>
      </select>
    </td>
    <td>
      <input type="number" v-model="price" @change="changeHandler">
    </td>
  </tr>
</template>

<style scoped>
.regular {
  background-color: none;
}
.bronze {
  background-color: #cd7f32;
}
.silver {
  background-color: #c0c0c0;
}
.gold {
  background-color: #ffd700;
}
.platinum {
  background-color: #e5e4e2;
}
.exclusive {
  background-color: rgb(7, 159, 206);
}
</style>

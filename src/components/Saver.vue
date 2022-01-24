<script setup lang="ts">
import store from '../store';
import { ref } from 'vue';
import { savePhones } from '../api/phones';

const isSaved = ref(false);

const saveHandler = async () => {
  const { phones, token } = store.state;
  try {
    const resp = await savePhones(token, phones);
    if (resp.status !== 201 || resp?.data?.result !== 'success') throw Error('Save error: ' + resp?.data?.message);
    isSaved.value = true;
  } catch (err) {
    console. log(err);
  }
};

</script>

<template>
  <div class="saver">
    <button @click="saveHandler">Save changes</button>
    <div v-if="isSaved">saved success...</div>
  </div>
</template>

<style scoped>
.saver {
  display: flex;
  gap: 1rem;
}
</style>

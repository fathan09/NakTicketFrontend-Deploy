<template>
  <div class="merch-add-section">
    <button @click="$emit('open-popup')" class="merch-add-card">
      <div class="merch-add-card-info">
        <p>Add Merchandise</p>
      </div>
      <PlusCircleIcon :style="{ width: '32px', height: '32px' }" />
    </button>
  </div>
</template>

<script>
import { PlusCircleIcon } from '@heroicons/vue/24/solid';

export default {
  name: "CreateMerchButton",
  components: {
    PlusCircleIcon
  },
  emits: ['open-popup'] 
};
</script>

<style scoped>
.merch-add-section {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.merch-add-card {
  width: 200px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dashed #ccc;
  border-radius: 10px;
  cursor: pointer;
  gap: 0.5rem;
  background-color: #f9f9f9;
  transition: background 0.3s ease;
}

.merch-add-card:hover {
  background-color: #eef6ff;
}
</style>

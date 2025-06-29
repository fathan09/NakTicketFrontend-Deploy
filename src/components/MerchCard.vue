<template>
  <div class="merch-card">
    <div class="merch-image">
      <img :src="merch.image" alt="Merch Image" />
    </div>
    <div class="merch-info">
      <h4>{{ merch.name }}</h4>
      <p>{{ merch.details }}</p>
      <p><strong>Price:</strong> {{ merch.price }}</p>
      <p><strong>Quantity:</strong> {{ merch.stock }}</p>
    </div>
    <div class="card-buttons">
      <button class="icon-button" @click="$emit('edit-merch', index)">
        <PencilIcon :style="{ width: '24px', height: '24px' }" />
      </button>
      <button class="icon-button" @click="$emit('delete-merch', index)">
        <TrashIcon :style="{ width: '24px', height: '24px' }" />
      </button>
    </div>
  </div>
</template>

<script>
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/solid';

export default {
  name: 'MerchCard',
  props: {
    merch: Object,
    index: Number
  },
  components: {
    PencilIcon,
    TrashIcon
  }
};
</script>


<style scoped>
.merch-card {
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.merch-image img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.merch-info h4 {
  margin: 0;
  font-size: 1rem;
}

.merch-info p {
  margin: 0.25rem 0;
  font-size: 0.85rem;
}

.card-buttons {
  margin-top: 0.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>

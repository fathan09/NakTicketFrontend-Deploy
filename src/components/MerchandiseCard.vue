<template>
  <div class="merch-card">
    <img :src="product.image" :alt="product.name" />
    <div class="info">
      <h4>{{ product.name }}</h4>
      <p class="description">{{ product.details }}</p>
      <p class="stock">Stock: {{ product.stock }}</p>
      <p class="price">Price: {{ product.price }} {{ product.currency }}</p>

      <div class="action-row">
        <input type="number" v-model.number="quantity" min="1" :max="product.stock" />
        <button @click="handleAddToCart" :disabled="quantity < 1 || quantity > product.stock">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import { useMerchStore } from '@/store/merch';

export default {
  name: 'MerchandiseCard',
  props: {
    product: Object
  },
  data() {
    return {
      quantity: 0
    };
  },
  methods: {
    handleAddToCart() {
      const merchStore = useMerchStore();
      merchStore.addToCart({
        ...this.product,
        quantity: this.quantity
      });
      this.quantity = 0;
    }
  }
};
</script>

<style scoped>
.merch-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.merch-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.info h4 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
}

.description {
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
}

.stock {
  font-size: 0.85rem;
  margin-bottom: 0.3rem;
  color: #666;
}

.price {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.action-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.action-row input[type="number"] {
  width: 60px;
  padding: 4px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.action-row button {
  flex-grow: 1;
  background: #799887;
  color: white;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.action-row button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>

<template>
  <div class="detail-page">
    <div v-if="product" class="detail-container">
      <div class="image-box">
        <img :src="product.image || '/images/placeholder.png'" :alt="product.name" />
      </div>
      <div class="info-box">
        <h2>{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <p class="price">Price: {{ product.price }} {{ product.currency }}</p>
        <button @click="addToCart" class="add-btn">Add to Cart</button>
        <div v-if="feedbackMessage" class="feedback">{{ feedbackMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMerchStore } from '@/store/merch';
import { useCartStore } from '@/store/cart';

export default {
  name: 'MerchandiseDetail',
  data() {
    return {
      product: null,
      feedbackMessage: ''
    };
  },
  props: {
    routeId: {
      type: Number,
      default: null
    }
  },
  mounted() {
    const merchStore = useMerchStore();
    const id = this.routeId ?? Number(this.$route.params.id);
    this.product = merchStore.getMerchById(id);
  },

  methods: {
    addToCart() {
      const cart = useCartStore();
      cart.addItem(this.product);
      this.feedbackMessage = `${this.product.name} added to cart!`;
      setTimeout(() => (this.feedbackMessage = ''), 2000);
    }
  }
};
</script>

<style scoped>
.detail-page {
  background: #f9f9f9;
  min-height: 100vh;
  padding: 2rem 1rem;
  font-family: poppins, sans-serif;
}

.detail-container {
  max-width: 1000px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  gap: 2rem;
}

.image-box {
  flex: 1 1 300px;
  max-width: 400px;
  height: 300px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-box img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.info-box {
  flex: 1 1 300px;
}

.price {
  margin: 1rem 0;
  font-size: 1.1rem;
}

.add-btn {
  background-color: #799887;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.add-btn:hover {
  background-color: #657a70;
}

.feedback {
  background-color: #dff0d8;
  color: #3c763d;
  padding: 10px;
  margin-top: 1rem;
  border: 1px solid #d0e9c6;
  border-radius: 5px;
}
</style>

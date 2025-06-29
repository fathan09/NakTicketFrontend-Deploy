<template>
  <div class="cart-page">
    <div class="container">
      <h2>Merchandise Cart</h2>

      <div v-if="cart.merchItems.length > 0" class="cart-table">
        <div class="cart-header">
          <span>Product</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Subtotal</span>
          <span></span>
        </div>

        <div
          v-for="item in cart.merchItems"
          :key="item.name"
          class="cart-row"
        >
          <div class="product-info">
            <img :src="item.image || '/images/placeholder.png'" alt="product" />
            <div>
              <strong>{{ item.name }}</strong>
            </div>
          </div>

          <div class="price">{{ item.price }} {{ item.currency || 'MYR' }}</div>

          <div class="qty-controls">
            <button @click="updateQty(item.name, item.quantity - 1)" :disabled="item.quantity <= 1">−</button>
            <input type="number" :value="item.quantity" readonly />
            <button @click="updateQty(item.name, item.quantity + 1)">+</button>
          </div>

          <div class="subtotal">
            {{ (item.price * item.quantity).toFixed(2) }} {{ item.currency || 'MYR' }}
          </div>

          <button class="remove" @click="cart.reduceFromCart(item)">✕</button>
        </div>

        <div class="cart-actions">
          <div class="totals">
            <strong>Total:</strong> {{ totalPrice }} MYR
          </div>
          
        </div>
      </div>

      <div v-else>
        <p>Your cart is empty.</p>
      </div>
    </div>

  </div>
</template>

<script>
import { useMerchStore } from '@/store/merch';
import { computed } from 'vue';

export default {
  name: 'MerchandiseCart',
  components: {
   
  },
  setup() {
    const cart = useMerchStore();

    const updateQty = (name, newQty) => {
      const item = cart.merchItems.find(i => i.name === name);
      if (!item) return;

      if (newQty > item.quantity) {
        cart.addToCart({ ...item, quantity: 1 });
      } else if (newQty < item.quantity && newQty > 0) {
        cart.reduceFromCart(item);
      }
    };

    const totalPrice = computed(() =>
      cart.merchItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
    );

    return {
      cart,
      updateQty,
      totalPrice,
    };
  },
};
</script>


<style scoped>
.cart-page {
  background: #f9f9f9;
  font-family: 'poppins', sans-serif;
  padding: 2rem 0;
}
.container {
  max-width: 1100px;
  margin: auto;
  background: white;
  padding: 2rem;
  border-radius: 8px;
}
.cart-header,
.cart-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr auto;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #ddd;
}
.cart-header {
  font-weight: bold;
}
.product-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.product-info img {
  width: 80px;
  height: auto;
  border-radius: 4px;
}
.price,
.subtotal,
.qty-controls {
  text-align: center;
}
.qty-controls {
  display: flex;
  align-items: center;
  justify-content: center;
}
.qty-controls button {
  background: #799887;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 4px;
}
.qty-controls input {
  width: 40px;
  text-align: center;
  margin: 0 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.remove {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: red;
  cursor: pointer;
}
.cart-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
}
.totals {
  font-size: 1.2rem;
}
.buttons {
  display: flex;
  gap: 1rem;
}
button.primary,
.secondary {
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
}
button.primary {
  background: #799887;
  color: white;
  border: none;
}
.secondary {
  background: white;
  color: #799887;
  border: 2px solid #799887;
}
.secondary:hover {
  background: #799887;
  color: white;
}
</style>

<template>
    <div class="container-cart">
        <h1>Confirm Your Tickets</h1>
        <div class="box-cart">
            <h2> Items In Cart </h2>

            <div v-for="(ticket, index) in ticketItems" :key="index" class="cart-item"> 
                <div class="ticket-info">
                    <p>{{ticket.name}}</p>
                    <p>End In {{formatDate(ticket.endDate)}}</p>
                    <div class="details-button">
                        <button class="reduce-button" @click="reduceFromCart(ticket)">
                            <MinusIcon :style="{ width: '25px', height: '25px'}" />
                        </button>
                        <input type="number" :value="ticket.quantity" readonly />
                        <button class="add-button" @click="addToCart(ticket)">
                            <PlusIcon :style="{ width: '25px', height: '25px'}" />
                        </button>
                    </div>
                </div>
                <div class="unit-price">
                    <p><b> RM {{ticket.quantity * ticket.price}}</b></p>
                </div>   
                <hr v-if="index < ticketItems.length - 1" class="divider" />
            </div>


            <div class="total-price">
                <p><b> Total Price RM {{totalTicketPrice}} </b> </p>
            </div>
        </div>

        <MerchandiseCart />

        <div class="grand-total">
            <h3>Total (Tickets + Merchandise): RM {{ combinedTotal }}</h3>
        </div>


        <div class="buttons">
            <router-link to="/home" class="secondary">Find Another Event</router-link>
            <router-link to="/home"><button @click="submitOrder" class="primary">Proceed to Checkout</button></router-link>
        </div>
    </div>
</template>

<script>
import {useTicketState} from "../store/ticketStore.js";
import { PlusIcon, MinusIcon } from '@heroicons/vue/24/outline';
import { useMerchStore } from "../store/merch.js";
import MerchandiseCart from '../components/MerchandiseCart.vue';
import axios from 'axios';

export default {
    name: "EventCart",
    components: {
        MerchandiseCart,
        PlusIcon,
        MinusIcon
    },
    data() {
        return {
            order: {
                userId: 0,
                timestamp: '',
                totalAmount: 0.0
            }
        }
    } ,
    computed: {
        ticketItems() {
            return this.ticketStore.ticketItems;
        },
        totalTicketPrice() {
            return parseFloat(this.ticketStore.totalPrice);
        },
        totalMerchPrice() {
            return parseFloat(this.merchStore.totalPrice);
        },
        combinedTotal() {
            return(this.totalTicketPrice + this.totalMerchPrice).toFixed(2);
        }
    },
    setup() {
        const ticketStore = useTicketState();
        const merchStore = useMerchStore();
        return {ticketStore, merchStore};
    },
    methods: {
        addToCart(ticket) {
            this.ticketStore.addToCart(ticket);
        },
        reduceFromCart(ticket) {
            this.ticketStore.reduceFromCart(ticket);
        },
        getQuantity(ticket) {
            const item = this.ticketStore.ticketItems.find(
                (t) => t.ticketName === ticket.ticketName
            );
            return item ? item.quantity : 0;
        },
        async submitOrder() {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser?.userId) {
          alert("User not logged in or invalid user data.");
          return;
        }

        this.order.userId = storedUser.userId;
        this.order.timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.order.totalAmount = parseFloat(this.combinedTotal); 
        const eventResponse = await axios.post('https://nakticketbackend-deploy-production.up.railway.app/order',this.order);

        console.log("Order submitted:", eventResponse.data);

        const orderId = parseInt(eventResponse.data.orderId); 


        const ticketRequests = this.ticketStore.ticketItems.map(ticket => {
            return axios.post('https://nakticketbackend-deploy-production.up.railway.app/order-ticket', {
                orderId: orderId,
                ticketId: ticket.ticketId,         
                quantity: ticket.quantity,
                subtotal: ticket.price * ticket.quantity
            });
        });

        console.log("Merch Payloads:", this.merchStore.merchItems);

       const merchRequests = this.merchStore.merchItems.map(merch => {
        return axios.post('https://nakticketbackend-deploy-production.up.railway.app/order-merchandise', {
            orderId : orderId,
            merchandiseId: merch.merchandiseId,
            quantity: merch.quantity,
            subtotal: merch.quantity * merch.price
        });
        });


        const allResponses = await Promise.allSettled([...ticketRequests, ...merchRequests]);

        const failed = allResponses.filter(r => r.status === 'rejected');
        if (failed.length > 0) {
        console.warn("Some order items failed:", failed);
        alert("Some items failed to submit. Please check console.");
        } else {
        alert("Order submitted successfully!");
        }

        this.ticketStore.ticketItems = [];
        this.merchStore.clearCart();

      } catch (error) {
        console.error("Order submission failed:", error);
        alert("Failed to submit order. Please try again.");
      }
    },
    formatDate(dateStr) {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
            });
    }
    }
}
</script>

<style scoped>
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
<template>
    <div class="container-ticket">
        <h1>Ticket Information</h1>

        <div v-for="(ticket, index) in tickets" :key="index" class="ticket-item">
            <div class="ticket-item-info">
                <h3>{{ ticket.name }}</h3>
                <p>End In {{ formatDate(ticket.endDate) }}</p>
                <p>{{ ticket.description }}</p>
            </div>
            <div class="ticket-item-add">
                <p class="price-text"> <b> RM {{ ticket.price }} </b> </p>
                <div class="details-button">
                    <button class="reduce-button" @click="reduceFromCart(ticket)">
                        <MinusIcon :style="{ width: '25px', height: '25px'}" />
                    </button>
                    <input type="number" :value="getQuantity(ticket)" readonly />
                    <button class="add-button" @click="addToCart(ticket)">
                        <PlusIcon :style="{ width: '25px', height: '25px'}" />
                    </button>
                </div>
            </div>
        </div>

        
    </div>
</template>

<script>
import { useTicketState } from '../store/ticketStore.js';
import { PlusIcon, MinusIcon } from '@heroicons/vue/24/outline';


export default {
    name: "TicketList",
    props: ["tickets"],
    components: {
        PlusIcon,
        MinusIcon
    },
    data() {
        return {
            ticketStore: useTicketState()
        };
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
                (t) => t.name === ticket.name
            );
            return item ? item.quantity : 0;
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


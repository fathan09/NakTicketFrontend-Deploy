<template>
    <div class="popup-overlay">
        <div class="popup-create-ticket-section">
            <button class="close-button" @click="$emit('close')">×</button>
            <h2> Ticket Details </h2>
            <form @submit.prevent="submitTicket">
                <label>Ticket Name</label>
                <input type="text" v-model="ticket.name" placeholder="Ticket Name" />

                <label>Number of Tickets</label>
                <input type="number" v-model="ticket.quantity" placeholder="Number of Tickets" />

                <label>Ticket Price</label>
                <input type="number" v-model="ticket.price" step="0.01" placeholder="Price" />

                <label>Ticket Description</label>
                <textarea v-model="ticket.description" placeholder="Description"></textarea>

                <label>Start Date</label>
                <input v-model="ticket.startDate" type="date" />

                <label>Start Time</label>
                <input type="time" v-model="ticket.startTime" />

                <label>End Date</label>
                <input v-model="ticket.endDate" type="date" />

                <label>End Time</label>
                <input v-model="ticket.endTime" type="time" />

                <button class="form-button">Create Ticket</button>
            </form>
        </div>
    </div>
</template>


<script>
export default {
    name: "TicketPopUp",
    data() {
        return {
            ticket: {
                name: '',
                quantity : 0,
                price : 0.0,
                description: '',
                startDate: '',
                startTime: '',
                endDate: '',
                endTime: ''
            }
        }
    },
    methods: {
        submitTicket() {
            this.$emit('add-ticket', this.ticket);
            this.$emit('close');
        }
    }
}
</script>
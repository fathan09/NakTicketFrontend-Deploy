<template>
  <div class="popup-overlay">
    <div class="popup-create-ticket-section">
      <button class="close-button" @click="$emit('close')">×</button>
      <h2>Edit Ticket</h2>

      <form @submit.prevent="updateTicket">
        <label>Ticket Name</label>
        <input type="text" v-model="ticket.name" />

        <label>Number of Tickets</label>
        <input type="number" v-model="ticket.quantity" />

        <label>Ticket Price</label>
        <input type="number" v-model="ticket.price" step="0.01" />

        <label>Ticket Description</label>
        <textarea v-model="ticket.description"></textarea>

        <label>Start Date</label>
        <input type="date" v-model="ticket.startDate" />

        <label>Start Time</label>
        <input type="time" v-model="ticket.startTime" />

        <label>End Date</label>
        <input type="date" v-model="ticket.endDate" />

        <label>End Time</label>
        <input type="time" v-model="ticket.endTime" />

        <button class="form-button">Update Ticket</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EditTicketPopUp',
  props: {
    ticketId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      ticket: {
        name: '',
        quantity: 0,
        price: 0.0,
        description: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        eventId: null
      }
    };
  },
  mounted() {
    this.fetchTicket();
  },
  methods: {
    async fetchTicket() {
      try {
        const res = await axios.get(`https://nakticketbackend-deploy-production.up.railway.app/ticket/${this.ticketId}`);
        this.ticket = res.data;
      } catch (err) {
        alert('Failed to fetch ticket details.');
      }
    },
    validateForm() {
      if (!this.ticket.name.trim()) return 'Ticket name is required.';
      if (!this.ticket.quantity || this.ticket.quantity <= 0) return 'Quantity must be greater than 0.';
      if (!this.ticket.price || this.ticket.price <= 0) return 'Price must be greater than 0.';
      if (!this.ticket.startDate) return 'Start date is required.';
      if (!this.ticket.startTime) return 'Start time is required.';
      if (!this.ticket.endDate) return 'End date is required.';
      if (!this.ticket.endTime) return 'End time is required.';
      return null;
    },
    async updateTicket() {
      const error = this.validateForm();
      if (error) {
        alert(error);
        return;
      }

      try {
        await axios.put(`https://nakticketbackend-deploy-production.up.railway.app/ticket/${this.ticketId}`, this.ticket);
        alert('Ticket updated successfully.');
        this.$emit('updated');
        this.$emit('close');
      } catch (err) {
        console.error(err);
        alert('Failed to update ticket.');
      }
    }
  }
};
</script>

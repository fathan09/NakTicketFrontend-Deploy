<template>
  <div class="ticket-list">
    <h3>Edit Tickets</h3>

    <div v-if="tickets.length === 0">
      <p>No tickets found for this event.</p>
    </div>

    <div v-else class="ticket-grid">
      <EditTicketCard
        v-for="ticket in tickets"
        :key="ticket.ticketId"
        :ticket="ticket"
        @edit="openEditPopup"
        @deleted="removeTicket"
      />
    </div>

    <EditTicketPopUp
      v-if="showPopup"
      :ticket-id="selectedTicketId"
      @close="closePopup"
    />
  </div>
</template>

<script>
import EditTicketCard from '@/components/EditTicketCard.vue';
import EditTicketPopUp from '@/components/EditTicketPopUp.vue';

export default {
  name: 'EditTicketList',
  props: {
    tickets: Array
  },
  components: {
    EditTicketCard,
    EditTicketPopUp
  },
  data() {
    return {
      showPopup: false,
      selectedTicketId: null
    };
  },
  methods: {
    openEditPopup(id) {
      this.selectedTicketId = id;
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
      this.selectedTicketId = null;
    },
    refreshTickets() {
      this.$emit('refresh'); 
    },

  }
};
</script>

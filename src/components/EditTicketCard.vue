<template>
  <div class="create-ticket-card">
    <div class="upper-section">
      <h3>{{ ticket.name }}</h3>
      <p>End In {{ ticket.endDate }} | {{ ticket.endTime }}</p>
    </div>
    <hr />
    <div class="lower-section">
      <h4>{{ ticket.price }}</h4>
      <div class="buttons-wrapper">
        <button class="create-ticket-card-icon" @click="$emit('edit', ticket.ticketId)">
          <PencilIcon :style="{ width: '32px', height: '32px' }" />
        </button>
        <button class="create-ticket-card-icon" @click="deleteTicket(ticket.ticketId)">
          <TrashIcon :style="{ width: '32px', height: '32px' }" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { PencilIcon } from '@heroicons/vue/24/solid'
import { TrashIcon } from '@heroicons/vue/24/solid'
import axios from 'axios'

export default {
  name: 'EditTicketCard',
  props: {
    ticket: Object
  },
  components: {
    PencilIcon,
    TrashIcon
  },
  methods: {
    deleteTicket(id) {
      if (confirm('Are you sure you want to delete this ticket?')) {
        axios
          .delete(`https://nakticketbackend-deploy-production.up.railway.app/ticket/${id}`)
          .then(() => {
            alert('Ticket deleted successfully.')
            this.$emit('deleted', id) 
          })
          .catch((err) => {
            console.error('Error deleting ticket:', err)
            alert('Failed to delete ticket.')
          })
      }
    }
  }
}
</script>

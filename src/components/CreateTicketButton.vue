<template>
  <div class="ticket-add-section">
    <button @click="$emit('open-popup')" class="ticket-add-card" id="ticket-paid">
      <p id="create-ticket-text">Create Ticket</p>
      <PlusCircleIcon class="create-ticket-icon" :style="{ width: '25px', height: '25px'}" />
    </button>
  </div>
</template>

<script>
import { PlusCircleIcon } from '@heroicons/vue/24/solid'

export default {
  name: "CreateTicketButton",
  components: {
    PlusCircleIcon
  }
}
</script>

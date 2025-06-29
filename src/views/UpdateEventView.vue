<template>
  <div class="create-event-section">
    <h1>Edit Event Information</h1>
    <EventEdit :event-id="eventId" />
    <EditTicketList :tickets="tickets" />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import EventEdit from '@/components/EventEdit.vue';
import EditTicketList from '@/components/EditTicketList.vue';

export default {
  components: {
    EventEdit,
    EditTicketList
  },
  setup() {
    const route = useRoute();
    const eventId = route.params.id;
    const tickets = ref([]);

    onMounted(async () => {
      try {
        const res = await axios.get(`https://nakticketbackend-deploy-production.up.railway.app/ticket-event/${eventId}`);
        tickets.value = res.data;
      } catch (err) {
        console.error('Error fetching tickets:', err);
      }
    });

    return {
      eventId,
      tickets
    };
  }
};
</script>

<style scoped>
.create-event-section {
  padding: 2rem;
}

.submit-btn {
  background-color: #2d8cf0;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 2rem;
}

.submit-btn:hover {
  background-color: #1a73e8;
}
</style>

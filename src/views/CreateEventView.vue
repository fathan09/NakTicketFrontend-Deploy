<template>
  <div class="create-event-section">
    <EventCreate v-model="event" />

    <CreateTicketCard 
      v-for="(ticket, index) in tickets"
      :key="index"
      :ticket="ticket"
    />

    <CreateTicketButton @open-popup="showPopUp = true" />
    <TicketPopUp
      v-if="showPopUp"
      @close="showPopUp = false"
      @add-ticket="addTicket"
    />

    <MerchandiseGrid @update-merchandise="updateMerchandises" />

    <button @click="submitAllData" class="submit-btn">Create Event Now</button>
  </div>
</template>

<script>
import axios from 'axios';
import CreateTicketButton from "@/components/CreateTicketButton.vue";
import TicketPopUp from "@/components/TicketPopUp.vue";
import EventCreate from '@/components/EventCreate.vue';
import CreateTicketCard from '@/components/CreateTicketCard.vue';
import MerchandiseGrid from '@/components/MerchandiseGrid.vue';

export default {
  components: {
    CreateTicketButton,
    TicketPopUp,
    EventCreate,
    CreateTicketCard,
    MerchandiseGrid
  },
  data() {
    return {
      showPopUp: false,
      tickets: [],
      merchandises: [],
      event: {
        name: '',
        category: '',
        date: '',
        time: '',
        location: '',
        description: '',
        productImage: null,
        userId: ''
      },
      
    };
  },
  methods: {
  addTicket(ticket) {
    this.tickets.push({ ...ticket });
  }, 
  updateMerchandises(merchList) {
    this.merchandises = merchList
  },
  async submitAllData() {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser?.userId) {
        alert("User not logged in or invalid user data.");
        return;
      }

      this.event.userId = storedUser.userId;

      const eventResponse = await axios.post('https://nakticketbackend-deploy-production.up.railway.app/event', this.event);

      if (!eventResponse.data.eventId) {
        alert("Event creation failed.");
        return;
      }

      const eventId = eventResponse.data.eventId;
      const ticketResponses = await Promise.allSettled(
        this.tickets.map(ticket => axios.post('https://nakticketbackend-deploy-production.up.railway.app/ticket', {
          ...ticket,
          eventId
        }))
      );

      const merchResponses = await Promise.allSettled(
      this.merchandises.map(merch => {
        const formData = new FormData();
        formData.append('name', merch.name);
        formData.append('description', merch.description); 
        formData.append('quantity', merch.quantity);
        formData.append('price', merch.price);
        formData.append('merchandiseImage', merch.merchandiseImage); 
        formData.append('eventId', eventId);

        return axios.post('https://nakticketbackend-deploy-production.up.railway.app/merchandise', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      })
    );

    const failedCount = ticketResponses.filter(res => res.status === 'rejected').length;

    const merchFailedCount = merchResponses.filter(res => res.status === 'rejected').length;

    alert(
      failedCount > 0
        ? `Event created, but ${failedCount} ticket(s) failed.`
        : "Event and all tickets created successfully."
    );


    alert(
      merchFailedCount > 0 || failedCount > 0
        ? `Event created. ${failedCount} ticket(s) and ${merchFailedCount} merch(s) failed.`
        : "Event, tickets, and merchandise created successfully!"
    );

      this.$router.push('/myevent'); 

    } catch (error) {
      alert("Error: " + (error.response?.data?.error || error.message));
    }
  }
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

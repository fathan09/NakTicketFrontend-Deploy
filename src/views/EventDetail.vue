<template>
  <div class="event-detail" v-if="event">
    <div class="event-info">
      <img :src="event.productImage" alt="Event Image" />

      <h2>{{ event.name }}</h2>
      <p><strong>Category:</strong> {{ event.category }}</p>

      <p>
        <CalendarIcon class="icon"/>
        {{ event.date }}
      </p>
      <br />
      <p>
        <ClockIcon class="icon" />
        {{ event.time }}
      </p>
      <br />
      <p>
        <MapPinIcon class="icon" />
        {{ event.location }}
      </p>
      <br />
      <p><strong>Organizer:</strong> {{ organizer }}</p>
      <br />
      <p class="description">{{ event.description }}</p>
    </div>
    <TicketList :tickets="tickets"/>
    <MerchandiseList :merchList="merchandise"/>

    
    <router-link to="/event-cart" class="router"><button id="button-buy">Proceed To Checkout </button></router-link>
   
  </div>
</template>

<script>
import axios from 'axios';
import TicketList from '@/components/TicketList.vue';
import { CalendarIcon, ClockIcon, MapPinIcon } from "@heroicons/vue/24/outline";
import MerchandiseList from '@/components/MerchandiseList.vue';

export default {
  name: "EventDetail",
  components: {
    TicketList,
    MerchandiseList,
    CalendarIcon,
    ClockIcon,
    MapPinIcon
  },
  data() {
    return {
      event: null,
      tickets: [],
      merchandise: [],
      organizer: '',
      userId: 0
    };
  },
  mounted() {
    const eventId = this.$route.params.id; 

    axios.get(`http://localhost/NakTicketBackend/api/event/${eventId}`)
      .then(res => {
        console.log('Event API Response:', res.data);
        this.event = res.data;
        this.userId = res.data.userId;

        return axios.get(`http://localhost/NakTicketBackend/api/user/${res.data.userId}`);
      })
      .then(userRes => {
        this.organizer = userRes.data.fullname;
      })
      .catch(err => {
        console.error('Error:', err);
      });

    
    axios.get(`http://localhost/NakTicketBackend/api/ticket-event/${eventId}`)
      .then(res => {
        this.tickets = res.data;
      })
      .catch(err => {
        console.error('Error status:', err.response?.status);
      });

    axios.get(`http://localhost/NakTicketBackend/api/merchandise-event/${eventId}`)
      .then(res => {
        this.merchandise = res.data;
      })
      .catch(err => {
        console.error('Merchandise fetch error:', err);
      });
}
};
</script>


<style scoped>
.event-detail {
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.event-banner {
  width: 100%;
  max-height: 360px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eaeaea;
}

.event-banner img {
  width: 100%;
  max-height: 360px;
  object-fit: cover;
  border-bottom: 2px solid #ccc;
}

.event-content {
  max-width: 900px;
  margin: 2rem auto;
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.event-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  max-width: 800px;
  width: 100%;
  text-align: center;
}

.event-info h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.event-info p {
  font-size: 1.1rem;
  margin: 0.5rem 0;
}

.description {
  margin-top: 1rem;
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  text-align: left;
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  vertical-align: middle;
  display: inline;
}

.purchase-box {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  max-width: 300px;
  background: #f9f9f9;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
}

button {
  padding: 0.6rem 1.2rem;
  background-color: #88a391;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
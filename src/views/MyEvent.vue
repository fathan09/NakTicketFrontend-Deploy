<template>
  <div class="my-event-page">
    <h2 class="title">My Events</h2>

    <div class="event-list">
      <div
        v-for="event in events"
        :key="event.eventId"
        class="event-card"
      >
        <img :src="event.banner" alt="Event Banner" class="event-img" />
        <div class="event-info">
          <h3>{{ event.name }}</h3>
           <p class="status">Category: {{event.category}}</p>
          <p><strong>Date:</strong> {{ event.date }}</p>
          <p><strong>Location:</strong> {{ event.location }}</p>
        </div>

        <div class="actions">
          <button class="edit-btn" @click="goToEdit(event.eventId)">Edit</button>
          <button class="delete-btn" @click="deleteEvent(event.eventId)">Delete</button>
        </div>
      </div>

      <div v-if="events.length === 0" class="no-events">
        <p>No events found.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MyEvent',
  data() {
    return {
      events: [],
    };
  },
  methods: {
    deleteEvent(id) {
      if (confirm("Are you sure you want to delete this event?")) {
        axios
          .delete(`https://nakticketbackend-deploy-production.up.railway.app/event/${id}`)
          .then(() => {
            this.events = this.events.filter(event => event.eventId !== id);
            alert("Event deleted successfully.");
          })
          .catch((err) => {
            console.error("Error deleting event:", err);
            alert("Failed to delete event.");
          });
      }
    },
     goToEdit(eventId) {
      this.$router.push(`/update-event/${eventId}`);
    }
  },
  mounted() {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser?.userId) {
      alert("User not logged in or invalid user data.");
      return;
    }

    axios.get('https://nakticketbackend-deploy-production.up.railway.app/event')
      .then((res) => {
        this.events = res.data.filter(event => event.userId == storedUser.userId);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
      });
  },
};
</script>


<style scoped>
.my-event-page {
  padding: 2rem;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.event-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.event-card {
  display: flex;
  align-items: flex-start;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  width: 800px;
}

.event-img {
  width: 150px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 1.5rem;
}

.event-info {
  flex: 1;
}

.status {
  color: #888;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: 1rem;
}

.edit-btn,
.delete-btn {
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.edit-btn {
  background-color: #2d8cf0;
  color: white;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
}
</style>

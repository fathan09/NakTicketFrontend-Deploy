<template>
  <div class="home-page">
    
    <main class="main-content">
      <section class="hero">
        <h2>Discover The Upcoming Event!</h2>
        <EventCarousel />
      </section>

      <section class="categories">
        <div class="category-box">
          <div class="category-tabs">
            <button>Entertainment & Performances</button>
            <button>Exhibitions</button>
            <button>Sports</button>
            <button>Attractions</button>
            <button>Others</button>
          </div>
        </div>
      </section>

      <section class="event-grid">
        <EventCard v-for="event in events" :key="event.eventId" :event="event" />
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

import EventCard from '../components/EventCard.vue';
import EventCarousel from '../components/EventCarousel.vue';

export default {
  name: "HomePage",
  components: {
    EventCard,
    EventCarousel,
  },
  data() {
    return {
      events: [],
    };
  },
  mounted() {
    axios.get('https://nakticketbackend-deploy-production.up.railway.app/event')
      .then((res) => {
        this.events = res.data;
      }) 
      .catch((err) => {
        console.error("Error: ", err);
      });
  },
};
</script>

<style scoped>
.home-page {
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  flex-direction: column;
  background-color: #88a391;
  padding: 1rem;
  color: white;
}

.logo-search {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  height: 50px;
}

.search-bar {
  flex-grow: 1;
  padding: 0.5rem;
  border-radius: 20px;
  border: none;
}

.search-btn {
  background: white;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
}

.nav-links {
  display: flex;
  justify-content: flex-end;
  gap: 1.5rem;
  margin-top: 1rem;
  align-items: center;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.profile-circle {
  width: 35px;
  height: 35px;
  background: white;
  border-radius: 50%;
}

.hero {
  text-align: center;
  background-color: #88a391;
  color: white;
  padding: 2rem 1rem;
}

.categories {
  padding: 2rem 1rem;
  background-color: #fff;
  text-align: center;
}

.category-box {
  background-color: #f4f4f4;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid #ddd;
  max-width: 800px;
  margin: 0 auto;
}

.category-tabs {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0.5rem;
}

.category-tabs button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: white;
  cursor: pointer;
  transition: background 0.3s ease;
}

.category-tabs button:hover {
  background-color: #e0e0e0;
}

.event-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 2rem;
}

.event-card {
  background-color: #e0e0e0;
  width: 200px;
  height: 150px;
  border-radius: 15px;
}
</style>

<template>
  <div class="event-card">
    <router-link :to="`/event/${event.eventId}`">
      <img :src="`../assets/${event.thumbnail}`" :alt="event.name + ' thumbnail'" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: "EventCard",
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.event-card {
  width: 180px;
  height: 130px;
  background-color: #ddd;
  border-radius: 15px;
}

.event-card img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}
</style>

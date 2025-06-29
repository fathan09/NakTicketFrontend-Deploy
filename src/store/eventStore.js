import { defineStore } from "pinia";
import eventData from "../../public/dummyEvent.json";

export const useEventStore = defineStore('eventStore', {
  state: () => ({
    events: [],
    // selectedEvent: null,
  }),
  getters: {
    getAllEvents: (state) => state.events,
  },
  actions: {
    initializeEvents() {
      if (!this.events || this.events.length === 0) {
        this.events = eventData;
      }      
    },
    getEventById(id) {
      this.selectedEvent = this.events.find((e) => e.id === parseInt(id));
    },

    updateEventDescription(eventId, desc) {
      const eventDesc = this.events.find((i) => i.id === eventId);
      if (eventDesc) {
        eventDesc.description = desc;
      }
    },

    removeEventListener(eventId) {
      this.events = this.events.filter((event) => event.id !== eventId);
    },
  },
});

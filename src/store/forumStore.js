import { defineStore } from 'pinia';
import axios from 'axios';

export const useForumStore = defineStore('forumStore', {
  state: () => ({
    threads: [],
    selectedThread: null,
    loading: false,
    submitting: false
  }),
  
  getters: {
    getAllThreads: (state) => state.threads,
    
    getThreadById: (state) => (id) => {
      return state.threads.find(thread => thread.id === parseInt(id));
    },
    
    getOrganizerThreads: (state) => {
      return state.threads.filter(thread => thread.isOrganizer); 
    },
    
    getRecentThreads: (state) => {
      return [...state.threads].sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at) 
      );
    }
  },
  
  actions: {
    async fetchForumData() {
      this.loading = true;
      try {
        const response = await axios.get('https://nakticketbackend-deploy-production.up.railway.app/forum');
        this.threads = response.data;
      } catch (error) {
        console.error('Error loading forum data:', error);
      } finally {
        this.loading = false;
      }
    },

    async createThread(newThread) {
      this.submitting = true;
      try {
        await axios.post('https://nakticketbackend-deploy-production.up.railway.app/forum', newThread);
        await this.fetchForumData(); // Refresh threads
      } catch (error) {
        console.error('Error creating new thread:', error);
      } finally {
        this.submitting = false;
      }
    },
    
    selectThread(id) {
      this.selectedThread = this.getThreadById(id);
    }
  }
});

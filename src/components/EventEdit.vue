<template>
  <div class="event-create-box">
    <div class="banner-upload" @click="triggerImageUpload">
      <input type="file" ref="imageInput" accept="image/*" @change="handleImage" hidden />
      <img v-if="bannerPreview" :src="bannerPreview" alt="Banner Preview" />
      <div v-else class="upload-placeholder">
        <span class="plus">+</span>
        <p>Upload poster/banner</p>
        <p class="note">Recommended 724 x 340px and not more than 2Mb</p>
      </div>
    </div>

    <div class="form-section">
      <input type="text" v-model="event.name" placeholder="Event Name" />

      <select v-model="event.category">
        <option disabled value="">Choose Category</option>
        <option value="performance">Entertainment & Performances</option>
        <option value="exhibition">Exhibition</option>
        <option value="sports">Sports</option>
        <option value="others">Others</option>
      </select>

      <div class="grid-row">
        <div class="field">
          <label>Date & Time</label>
          <input type="date" v-model="event.date" />
          <input type="time" v-model="event.time" />
        </div>

        <div class="field">
          <label>Location</label>
          <input type="text" v-model="event.location" />
        </div>
      </div>

      <div class="field">
        <label>Event Description</label>
        <textarea
          v-model="event.description"
          rows="6"
          placeholder="Describe your event..."
          class="description-textarea"
        ></textarea>
      </div>

      <div class="form-actions">
        <button class="submit-btn" @click="submitForm">Update Event</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  name: "EventEdit",
  data() {
    return {
      event: {
        name: "",
        category: "",
        date: "",
        time: "",
        location: "",
        description: "",
        productImage: "",
        userId: 1 
      },
      bannerPreview: null,
      route: useRoute()
    };
  },
    props: {
    eventId: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.loadEvent();
  },
  methods: {
    triggerImageUpload() {
      this.$refs.imageInput.click();
    },
    handleImage(e) {
      const file = e.target.files[0];
      if (file && file.size <= 2 * 1024 * 1024) {
        this.bannerPreview = URL.createObjectURL(file);
        this.event.productImage = this.bannerPreview;
      } else {
        alert("File size should not exceed 2MB");
      }
    },
    async loadEvent() {
      try {
        const res = await axios.get(`https://nakticketbackend-deploy-production.up.railway.app/event/${this.eventId}`);
        this.event = res.data;
        this.bannerPreview = res.data.productImage || null;
      } catch (err) {
        console.error(err);
        alert("Failed to load event");
      }
    },
    async submitForm() {
      const eventId = this.route.params.id;
      const { name, category, date, time, location, description } = this.event;

      if (!name || !category || !date || !time || !location || !description) {
        alert("Please fill in all the required fields");
        return;
      }

      try {
        await axios.put(`https://nakticketbackend-deploy-production.up.railway.app/event/${eventId}`, this.event);
        alert("Event updated successfully!");
      } catch (error) {
        console.error(error);
        alert("Error updating event");
      }
    }
  }
};
</script>

<style scoped>
.event-create-box {
  width: 1200px;
  margin: 2rem auto;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-family: "Arial", sans-serif;
}

.banner-upload {
  height: 340px;
  background: #f5f5f5;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-upload img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-placeholder {
  text-align: center;
  color: #666;
}

.plus {
  font-size: 2rem;
  font-weight: bold;
}

.note {
  font-size: 0.8rem;
  color: #aaa;
}

.form-section {
  padding: 2rem;
}

.form-section input,
.form-section select {
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin: 1rem 0;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.form-actions {
  margin-top: 2rem;
  text-align: center;
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
}

.submit-btn:hover {
  background-color: #1a73e8;
}

.grid-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.field {
  flex: 1;
}

.description-textarea {
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  resize: vertical;
  font-size: 1rem;
  font-family: inherit;
  min-height: 150px;
}

.field label {
  font-weight: bold;
  margin-bottom: 0.3rem;
  display: block;
}
</style>
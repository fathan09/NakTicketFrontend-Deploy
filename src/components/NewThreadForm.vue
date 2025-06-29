<template>
  <div class="new-thread-form">
    <h2>Create New Discussion</h2>
    
    <form @submit.prevent="submitThread">
      <div class="form-group">
        <label for="thread-title">Discussion Title</label>
        <input 
          type="text" 
          id="thread-title" 
          v-model="title" 
          placeholder="Enter a descriptive title for your discussion"
          required
        />
      </div>
      
      <div class="form-group">
        <label for="thread-content">Content</label>
        <textarea 
          id="thread-content" 
          v-model="content" 
          placeholder="What would you like to discuss?"
          rows="6"
          required
        ></textarea>
      </div>
      
      <div class="form-actions">
        <button type="button" class="cancel-btn" @click="$emit('cancel')">
          Cancel
        </button>
        <button type="submit" class="submit-btn" :disabled="!isValid || submitting">
          {{ submitting ? 'Posting...' : 'Post Discussion' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "NewThreadForm",
  props: {
    submitting: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      required: true 
    }
  },
  data() {
    return {
      title: '',
      content: '',
      posting: false
    };
  },
  computed: {
    isValid() {
      return this.title.trim() !== '' && this.content.trim() !== '';
    }
  },
  methods: {
    async submitThread() {
      if (!this.isValid || this.posting) return;

      this.posting = true;

      try {
        const response = await fetch('https://nakticketbackend-deploy-production.up.railway.app/forum', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: this.title.trim(),
            content: this.content.trim(),
            author: this.user?.fullname || "Anonymous"
          })
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to post discussion.');
        }

        this.$emit('success', result);
        this.resetForm();
      } catch (err) {
        console.error(err);
        alert(err.message);
      } finally {
        this.posting = false;
      }
    },
    resetForm() {
      this.title = '';
      this.content = '';
    }
  }
};
</script>



<style scoped>
.new-thread-form {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
}

.new-thread-form h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #444;
}

input, textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #87a190;
  box-shadow: 0 0 0 2px rgba(135, 161, 144, 0.2);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.cancel-btn, .submit-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.cancel-btn {
  background-color: #f0f0f0;
  color: #555;
}

.cancel-btn:hover {
  background-color: #e0e0e0;
}

.submit-btn {
  background-color: #87a190;
  color: white;
}

.submit-btn:hover {
  background-color: #758e7e;
}

.submit-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style> 
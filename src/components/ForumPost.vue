<template>
  <div class="forum-post">
    <div class="post-header">
      <div class="user-info">
        <div class="avatar"></div>
        <div class="user-details">
          <h4>{{ post.author }}</h4>
          <span class="post-date">{{ formatDate(post.date) }}</span>
        </div>
      </div>
      <div class="post-badge" v-if="post.isOrganizer">Organizer</div>
    </div>
    <div class="post-content">
      <p>{{ post.content }}</p>
    </div>
    <div class="post-actions">
      <button class="action-button" @click="$emit('reply')">
        <span>Reply</span>
      </button>
      <button class="action-button" @click="$emit('like')">
        <span>{{ post.likes }} Likes</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForumPost",
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  emits: ['reply', 'like'],
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
};
</script>

<style scoped>
.forum-post {
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
}

.user-details h4 {
  margin: 0;
  font-size: 1rem;
}

.post-date {
  color: #777;
  font-size: 0.8rem;
}

.post-badge {
  background-color: #87a190;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.post-content {
  margin-bottom: 1rem;
}

.post-actions {
  display: flex;
  gap: 1rem;
}

.action-button {
  background: none;
  border: none;
  color: #555;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
}

.action-button:hover {
  color: #87a190;
}
</style> 
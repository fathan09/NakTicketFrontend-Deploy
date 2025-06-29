<template>
  <div class="forum-thread">
    <div class="thread-main-post">
      <h3 class="thread-title">{{ thread.title }}</h3>
      <ForumPost 
        :post="thread.mainPost" 
        @like="handleMainPostLike"
        @reply="showReplyForm = true"
      />
    </div>
    
    <div class="reply-form" v-if="showReplyForm">
      <div class="form-group">
        <label for="reply-content">Your Reply</label>
        <textarea 
          id="reply-content" 
          v-model="replyContent" 
          placeholder="Write your reply..."
          rows="4"
          required
        ></textarea>
      </div>
      
      <div class="form-actions">
        <button type="button" class="cancel-btn" @click="cancelReply">
          Cancel
        </button>
        <button 
          type="button" 
          class="submit-btn" 
          :disabled="!replyContent.trim() || submitting"
          @click="submitReply"
        >
          {{ submitting ? 'Posting...' : 'Post Reply' }}
        </button>
      </div>
    </div>
    
    <div class="thread-replies" v-if="thread.replies && thread.replies.length > 0">
      <h4 class="replies-heading">{{ thread.replies.length }} Replies</h4>
      <ForumPost 
        v-for="(reply, index) in thread.replies" 
        :key="index" 
        :post="reply"
        class="thread-reply"
        @like="handleReplyLike(index)"
      />
    </div>
    
    <div class="no-replies" v-else-if="!showReplyForm">
      <p>No replies yet. Be the first to reply!</p>
      <button class="reply-btn" @click="showReplyForm = true">Reply to this discussion</button>
    </div>
  </div>
</template>

<script>
import ForumPost from './ForumPost.vue';
import { ref } from 'vue';
import { useForumStore } from '@/store/forumStore';

export default {
  name: "ForumThread",
  components: {
    ForumPost
  },
  props: {
    thread: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const forumStore = useForumStore();
    const showReplyForm = ref(false);
    const replyContent = ref('');
    const submitting = ref(false);
    
    const handleMainPostLike = () => {
      forumStore.toggleLike(props.thread.id);
    };
    
    const handleReplyLike = (index) => {
      forumStore.toggleLike(props.thread.id, index);
    };
    
    const cancelReply = () => {
      showReplyForm.value = false;
      replyContent.value = '';
    };
    
    const submitReply = () => {
      if (!replyContent.value.trim()) return;
      
      submitting.value = true;
      
      const replyData = {
        author: 'Current User', // Would be replaced with actual user info
        content: replyContent.value,
        date: new Date().toISOString(),
        likes: 0,
        isOrganizer: false // Would be determined by user role
      };
      
      forumStore.addReply(props.thread.id, replyData)
        .then(() => {
          replyContent.value = '';
          showReplyForm.value = false;
          submitting.value = false;
        });
    };
    
    return {
      showReplyForm,
      replyContent,
      submitting,
      handleMainPostLike,
      handleReplyLike,
      cancelReply,
      submitReply
    };
  }
};
</script>

<style scoped>
.forum-thread {
  background-color: #f8f8f8;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.thread-title {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.2rem;
}

.thread-main-post {
  margin-bottom: 1.5rem;
}

.replies-heading {
  margin-bottom: 1rem;
  color: #555;
  font-size: 1rem;
  font-weight: 500;
}

.thread-reply {
  margin-left: 1.5rem;
  border-left: 3px solid #e0e0e0;
  padding-left: 1rem;
}

.no-replies {
  padding: 1rem;
  background-color: #eee;
  border-radius: 8px;
  text-align: center;
  color: #777;
}

.reply-form {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #444;
}

textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
}

textarea:focus {
  outline: none;
  border-color: #87a190;
  box-shadow: 0 0 0 2px rgba(135, 161, 144, 0.2);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.reply-btn, .cancel-btn, .submit-btn {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.reply-btn {
  background-color: #87a190;
  color: white;
  margin-top: 0.5rem;
}

.cancel-btn {
  background-color: #f0f0f0;
  color: #555;
}

.submit-btn {
  background-color: #87a190;
  color: white;
}

.cancel-btn:hover {
  background-color: #e0e0e0;
}

.reply-btn:hover, .submit-btn:hover {
  background-color: #758e7e;
}

.submit-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style> 
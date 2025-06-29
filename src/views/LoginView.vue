<template>
  <div class="auth-container">
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <router-link to="/register">Register</router-link></p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async loginUser() {
      if (!this.email || !this.password) {
        alert("Please fill in all fields");
        return;
      }

      try {
        const attemptUser = {
          email: this.email,
          password: this.password,
        };

        const response = await axios.post('https://nakticketbackend-deploy-production.up.railway.app/login', attemptUser);

        const { user } = response.data;

    

        localStorage.setItem('user', JSON.stringify(user));

        this.$router.push('/home'); 
      } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        alert(error.response?.data?.error || "Login failed. Please try again.");
      }
    }
  }
};
</script>


<style scoped>
.auth-container {
  max-width: 400px;
  margin: 3rem auto;
  padding: 2rem;
  border-radius: 10px;
  background-color: #f5f5f5;
  text-align: center;
}
input {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}
button {
  background-color: #2d8cf0;
  color: white;
  padding: 0.75rem;
  width: 100%;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}
</style>
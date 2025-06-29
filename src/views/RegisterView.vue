<template>
  <div class="auth-container">
    <h2>Register</h2>
    <form @submit.prevent="registerUser">
      <input type="text" v-model="name" placeholder="Full Name" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <input type="password" v-model="confirmPass" placeholder="Confirm Password" required />

      <div class="role-selection">
        <label>
          <input type="radio" value="customer" v-model="role" required />
          Customer
        </label>
        <label>
          <input type="radio" value="organizer" v-model="role" required />
          Event Organizer
        </label>
      </div>

      <button type="submit">Register</button>
      <p>Already have an account? <router-link to="/">Login</router-link></p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "RegisterPage",
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPass: '',
      role: ''
    };
  },
  methods: {
    async registerUser() {
      if (!this.name || !this.email || !this.password || !this.confirmPass || !this.role) {
        alert("Please fill in all fields");
        return;
      }

      if (this.password !== this.confirmPass) {
        alert("Passwords do not match");
        return;
      }

      try {
        const newUser = {
          fullname: this.name,
          email: this.email,
          password: this.password,
          role: this.role,
        };

        await axios.post('https://nakticketbackend-deploy-production.up.railway.app/register', newUser);

        alert("User registered successfully!");
        this.$router.push('/'); 
      } catch (error) {
        console.error("Registration error:", error.response?.data || error.message);
        alert("Registration failed. Check your inputs or server.");
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

input[type="text"],
input[type="email"],
input[type="password"] {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.role-selection {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}

.role-selection label {
  font-weight: normal;
  font-size: 0.95rem;
}

button {
  background-color: #28a745;
  color: white;
  padding: 0.75rem;
  width: 100%;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}
</style>
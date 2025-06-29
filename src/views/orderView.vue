<template>
  <div class="my-orders-page">
    <h2 class="title">My Orders</h2>
    <div class="order-list">
      <div class="order-wrapper" v-for="order in orders" :key="order.orderId">
        <div class="heading-section">  
          <h3>Order #{{ order.orderId }}</h3>
          <p><strong>Date:</strong> {{ formatDate(order.timestamp) }}</p>
        </div>

        <div class="item-section">
          <div class="ticket-section">
            <h4>Tickets</h4>
            <table>
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Quantity</th>
                  <th>Subtotal (RM)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="ticket in tickets.filter(t => t.orderId == order.orderId)" :key="ticket.orderTicketId">
                  <td>{{ ticket.ticketId }}</td>
                  <td>{{ ticket.quantity }}</td>
                  <td>{{ ticket.subtotal }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="merch-section">
            <h4>Merchandise</h4>
            <table>
              <thead>
                <tr>
                  <th>Merchandise ID</th>
                  <th>Quantity</th>
                  <th>Subtotal (RM)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="merch in merchandises.filter(m => m.orderId == order.orderId)" :key="merch.orderMerchandiseId">
                  <td>{{ merch.merchandiseId }}</td>
                  <td>{{ merch.quantity }}</td>
                  <td>{{ merch.subtotal }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p class="total"><strong>Total:</strong> RM {{ order.totalAmount }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: "MyOrdersPage",
  data() {
    return {
      orders:[],
      tickets: [],
      merchandises: [],
    };
  },
  mounted() {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (!storedUser?.userId) {
    alert("User not logged in.");
    return;
  }

  const userId = storedUser.userId;

  axios.get(`https://nakticketbackend-deploy-production.up.railway.app/order?userId=${userId}`)
    .then((res) => {
      this.orders = res.data;

      return Promise.all([
        axios.get("https://nakticketbackend-deploy-production.up.railway.app/order-ticket"),
        axios.get("https://nakticketbackend-deploy-production.up.railway.app/order-merchandise")
      ]);
    })
    .then(([ticketRes, merchRes]) => {
      this.tickets = ticketRes.data;
      this.merchandises = merchRes.data;
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
    });
}, methods: {
  formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  }
}

};
</script>

<style>
.my-orders-page {
  padding: 2rem auto;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.order-list {
  width: 800px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.event-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}


.order-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.item-section {
  display: flex;
  flex-direction: row;
  gap: 50px;
}



.order-card h3 {
    margin-bottom: 0.5rem;
}


table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.5rem;
  font-size: 0.95rem;
}

th, td {
  text-align: left;
  padding: 8px 10px;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f0f0f0;
  font-weight: 600;
}


.total {
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: #2c3e50;
}
</style>

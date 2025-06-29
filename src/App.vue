<template>
  <div id="app">
    <HeaderComponent v-if="showHeader && userRole === 'organizer'" />
    <HeaderComponentCustomer v-else-if="showHeader && userRole === 'customer'" />

    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

import HeaderComponent from './components/HeaderComponent.vue';
import HeaderComponentCustomer from './components/HeaderComponentCustomer.vue';

export default {
  name: "App",
  components: {
    HeaderComponent,
    HeaderComponentCustomer
  },
  setup() {
    const route = useRoute();
    const userRole = ref(null);

    const showHeader = computed(() => {
      return !['/', '/register'].includes(route.path);
    });

    watch(
      () => route.fullPath,
      () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        userRole.value = storedUser?.role || null;
      },
      { immediate: true } 
    );

    return {
      showHeader,
      userRole
    };
  }
};
</script>


<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #fff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>





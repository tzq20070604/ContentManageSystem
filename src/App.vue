<template>
   <LoginView v-if="route.path == '/login'"></LoginView>
   <HomeView v-else></HomeView>
</template>

<script setup>
import HomeView from './views/HomeView.vue'
import LoginView from './views/LoginView.vue'
import { useRoute } from 'vue-router';
const route = useRoute()
</script>

<style scoped></style>
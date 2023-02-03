<script setup lang="ts">

import { RouterView } from 'vue-router'
import Header from './components/header.vue';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import jwt from '@/utils/jwt'


const authStore = useAuthStore();

onMounted(() => {
  if(jwt.getToken()) authStore.verifyToken()   
})

</script>

<template>
  <Header />
  
  <RouterView />
</template>
<script setup lang="ts">

import { RouterView } from 'vue-router'
import Header from './components/header.vue';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import jwt from '@/utils/jwt'
import { storeToRefs } from 'pinia';
import { useProductStore } from '@/stores/product'
import { baseCompile } from '@vue/compiler-core';


// export default function fa(): void {
    
// }
const useProduct = useProductStore()
const { brandsData ,filterLoading ,category,params ,price ,search ,tags ,productLoading ,product ,filters} = storeToRefs(useProduct)
console.log(tags)



const authStore = useAuthStore();

onMounted(() => {
  if(jwt.getToken()) authStore.verifyToken()   
})

</script>

<template>
  <Header />
  
  <RouterView />
</template>
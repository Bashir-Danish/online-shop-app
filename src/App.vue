<script setup lang="ts">

import { RouterView } from 'vue-router'
import { onBeforeMount } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useProductStore } from '@/stores/product';
import Notifee from '@/components/smallComponents/customNotife.vue';
import jwt from '@/utils/jwt'

const authStore = useAuthStore();
const productStore = useProductStore();

onBeforeMount(() => {
  if (jwt.getToken()) authStore.verifyToken()
})

const scroll = (e: any) => {

  const { scrollTop, clientHeight, scrollHeight } = e.target
  if (scrollTop + clientHeight >= scrollHeight) {

    if (productStore.count > 20) {
      productStore.getPage()
    }

    // e.target.scrollBy(0, -150);
  }



  // console.log(e.target.scrollTop + " //////////////////")
  // console.log(e.target.scrollHeight + " scrollHeight")
  // console.log(e.target.offsetHeight + " offsetHeight")
  // if (Math.ceil(e.target.scrollTop) >= e.target.scrollHeight - e.target.offsetHeight) {
  //   console.log(Math.ceil(e.target.scrollTop) == e.target.scrollHeight - e.target.offsetHeight)
  // }

}


</script>

<template>
  <div class="scroll" @scroll="scroll">
    <teleport to="body">
      <Notifee v-if="authStore.notifeeMsg" />
    </teleport>
    <RouterView />
  </div>
</template>
<style lang="scss" scoped>
.scroll {
  height: 100vh;
  overflow: scroll;
  position: relative;
}
</style>
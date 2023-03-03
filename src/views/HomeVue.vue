<script setup lang="ts">
import Header from '@/components/header.vue';
import { onMounted, ref } from 'vue';

import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'

const sort = ref('all')
const productStore = useProductStore();
const cartStore = useCartStore();

onMounted(() => {
    productStore.getProduct()
    cartStore.loadCart()
    if (localStorage.getItem("tags")) {
        productStore.tags = JSON.parse(localStorage.getItem("tags") as string);
    }
    if (localStorage.getItem("sort")) {
        sort.value = JSON.parse(localStorage.getItem("sort") as string);
        productStore.params.delete("sort");
        productStore.params.append("sort", sort.value);
    }
})
</script>

<template>
    <Header />
    <router-view v-slot="{ Component }">
        <component :is="Component" />
    </router-view>
</template>
<style scoped lang="scss"></style>
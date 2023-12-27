
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter();

</script>
<template>
    <div class="cart">
        <div class="cart-header">
            <div class="logo" @click="router.push({ name: 'home', path: '/' })">
                <p>Online
                    Shopping store</p>
                <img src="@/assets/logo.jpg" alt="">
            </div>
        </div>
        <router-view v-slot="{ Component }">
            <component :is="Component" />
        </router-view>
    </div>
</template>
<style scoped lang="scss">

@import '@/assets/variables.scss';
.cart {
    background-color: $backGround;
    min-height: 100%;
    position: relative;

    .cart-header {
        width: 100%;
        height: 75px;
        background-color: $white;
        box-shadow: $dOp-2 0px 1px 4px;
        position: sticky;
        top: 0;
        z-index: 300;

        .logo {
            width: 20%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: 400;
            color: $green;
            text-decoration: none;
            cursor: pointer;

            >img {
                width: 70px;
                height: 70px;
            }

            p {
                width: 40%;

            }
        }
    }
}
</style>
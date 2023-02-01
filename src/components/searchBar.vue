<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
const router = useRouter();
</script>
<template>
    <div class="search-Bar">
        <div class="search-Bar-Container">
            <div class="logo" @click="router.go(-1)">
                <p>Online
                    Shopping store</p>
                <img src="@/assets/logo.jpg" alt="">
            </div>
            <div class="search-bar">
                <input type="text" class="search-input" placeholder="Search">
                <button class="search-button"><vue-feather type="search" size="1.5em" fill="#159347" stroke="#ececec"
                        stroke-width="2"></vue-feather>Search</button>
            </div>
            <div class="cart">
                <RouterLink to="/cart">
                    <button>
                        <span class="cart-basket">
                            <vue-feather type="shopping-cart" size="1em" stroke="#159347"
                                stroke-width="2"></vue-feather>
                            <span>32</span>
                        </span>
                        <span>Cart</span>
                    </button>
                </RouterLink>
            </div>
        </div>
    </div>
</template>
<style scoped>
.search-Bar {
    width: 100%;
    height: 75px;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 4px;
    position: sticky;
    top: 0;
    z-index: 100;
}

.search-Bar-Container {
    max-width: 1366px;
    width: 100%;
    height: 75px;
    margin: auto;
    display: flex;
    display: grid;
    background-color: rgb(255, 255, 255);
    grid-template-columns: 2.5fr 8fr 1.3fr;
    position: sticky;
    top: 0;
    z-index: 100;
}

img {
    width: 70px;
    height: 70px;
}

.logo {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 400;
    color: #159347;
    text-decoration: none;
    cursor: pointer;
}

.logo p {
    width: 40%;
}

.search-bar {
    display: flex;
    flex: 1;
    align-items: center;

}

.search-bar .search-input {
    height: 36px;
    color: #c4c4c4;
    outline: none;
    width: 100%;
    background: #ffffff;
    border: 1px solid #c2c2c2;
    padding-left: 10px;
    margin-left: 10px;
    font-size: 1em;
    font-weight: 500;
    border-radius: 2px 0 0 2px;
    line-height: 34px;
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
}

.search-bar .search-button {
    height: 36px;
    color: #ffffff;
    padding: 0 1.5em;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    border: none;
    outline: none;
    background-color: #159347;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.search-bar .search-button i {
    margin: 5px;
}

.cart {
    display: flex;
    justify-content: center;
    align-items: center;
}

.cart button {
    width: 110px;
    height: 2.2em;
    /* font-size: 1em; */
    background-color: transparent;
    border: none;
    outline: 1px solid #159347;
    border-radius: 3px;
    cursor: pointer;
    color: #159347;
}

.cart-basket {
    position: relative;
    margin: 1em;
}

.cart-basket span {
    position: absolute;
    background-color: rgb(163, 6, 6);
    color: #ffffff;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    bottom:10px;
    left: 10px;
}

</style>


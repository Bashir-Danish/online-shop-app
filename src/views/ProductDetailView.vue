<script setup lang="ts">
import axios from '@/plugins/axios';
import { ref, onBeforeMount } from 'vue';
const url = window.location.href;
const lastParam = url.split("/").slice(-1)[0];
const product = ref<any>();

const showImg = ref();
const changeImg = (img: any) => {
    showImg.value = img;
}
onBeforeMount(async() => {
   await axios.get(`/product/${lastParam}`)
        .then((res:any) => {
            product.value = res.product
            showImg.value = product.value.img[0]
        })
       .catch((err) => {
            console.log(err.response.data)
       })
})


</script>

<template>
        <div class="background-container">
            <div class="prd-path">
                Home > {{ product.category }} > {{ product.name }}
            </div>
            <div class="prd-details">
                <div class="col-1">
                    <div class="img-list">
                        <div class="img" v-for="img in product.img">
                            <img :src="'http://localhost:4000' + img" :alt="img" @mouseover="changeImg(img)">
                        </div>
                    </div>
                    <div class="img-slider">
                        <img :src="'http://localhost:4000' + showImg" :alt="showImg">
                    </div>
                </div>
                <div class="divider"></div>
                <div class="col-2">


                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est corporis quo ea tempora hic inventore,
                    earum labore ipsam aspernatur dignissimos obcaecati ipsa tempore illo perferendis, eaque neque.
                    Officiis, fuga aperiam!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est corporis quo ea tempora hic inventore,
                    earum labore ipsam aspernatur dignissimos obcaecati ipsa tempore illo perferendis, eaque neque.
                    Officiis, fuga aperiam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Est corporis quo ea
                    tempora hic inventore,
                    earum labore ipsam aspernatur dignissimos obcaecati ipsa tempore illo perferendis, eaque neque.
                    Officiis, fuga aperiam!
                    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est repellat corrupti velit placeat
                    </h1>
                </div>
            </div>

        </div>
</template>

<style scoped>
.background-container {
    position: relative;
    height: 100%;
    width: 100%;
    padding: 0 1em;
    background-color: rgba(46, 55, 97, 0.05);
    ;
}

.prd-path {
    padding: .5em .5em;
    font-size: 1.2em;
    color: rgb(121, 121, 121);
    max-width: 1366px;
    margin: 0 auto;
}

.divider {
    border-top: 0.3px solid #e5e6e9;
    border-left: 0.3px solid #e5e6e9;
}

.prd-details {
    position: relative;

    max-width: 1366px;
    display: flex;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);
    margin: 0.4em auto;
}

.prd-details .col-1 {
    position: sticky;
    top: 75px;
    width: 41%;
    display: flex;
}

.col-1 .img-list img {
    width: 5em;
    height: 5em;
}

.col-1 .img-list .img {
    width: 6em;
    height: 6em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    border: #e5e6e9 1px solid;
}

.prd-details .col-2 {
    width: 59%;
}


.img-list {
    width: 5em;
    margin: 2em 2em;
}

.img-slider {
    height: 65vh;
    width: 30vw;
    border: #e5e6e9 1px solid;
    border-radius: 10px;
    padding: 0.3em 1em;
    margin: 2em .5em;
}

.img-slider img {
    height: 100%;
    width: 100%;
}
</style>
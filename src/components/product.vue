<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">

import { useRouter } from 'vue-router'
defineProps([
    'data',
    'listViewProduct']
)
const router = useRouter()
const addToCart = () => {
    console.log("add to cart")
}
</script>
<template>
    <div :class="listViewProduct ? 'product-2' : 'product'">
        <div :class="listViewProduct ? 'product-2-details' : 'product-details'"
            @click="router.push({ path: '/product/' + data._id })">
            <div :class="listViewProduct ? 'product-2-img' : 'product-img'">
                <span class="heart" @click.stop="addToCart()"><vue-feather type="heart" size="1.1em" stroke="#414e5a"
                        stroke-width="2"></vue-feather></span>
                <img :src="'http://localhost:4000' + data.img[0]" :alt="data.img[0]">
            </div>
            <div :class="listViewProduct ? 'desc-wrapper-2' : 'desc-wrapper'">
                <div class="row1">
                    <div class="product-name">{{ data.name }}</div>
                    <div class="price">
                        <span>$</span>
                        <span class="amount">{{ data.price }}</span>
                    </div>
                </div>
                <div class="row2">
                    <div class="add-btn" @click.stop="addToCart()">
                        <span><vue-feather type="shopping-cart" size="1em" stroke="#fff"
                                stroke-width="2"></vue-feather></span>
                        <span>Add</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="listViewProduct" class="product-divider"></div>
    </div>
</template>
<style scoped lang="scss">


.product {
    min-width: 255px;
    max-width: 270px;
    padding: 0;
    color: #212121;
    border: 0;
    border-radius: 3%;
    flex: 1;
    transition: box-shadow 1s ease;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
   
    &:hover {
        box-shadow: 0px 5px 10px 5px rgba(0, 0, 0, 0.1);
        cursor: pointer;


        img {
            transform: scale(1.05);
            transition: all 1s ease;
        }

        .product-img .heart {
            transition: all 1s ease;
            opacity: 1;
            transform: translateY(0px);
            z-index: 1000;
        }
    }

    .product-details {
        padding: 20px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;

        .product-img {
            border: 1px solid #e5e6e9;
            border-radius: 5%;
            width: 100%;
            height: 14em;
            cursor: pointer;

            span {
                position: absolute;
                background-color: #ffffff79;
                padding: .3em;
                border-radius: 50%;
                display: flex;
                top: 1.7em;
                right: 1.7em;
                z-index: 10;
                opacity: 0;
                transform: translateY(-30px);
            }

            img {
                height: 100%;
                width: 100%;
                margin: auto auto;
                border-radius: 5%;
            }
        }

        .desc-wrapper {
            display: flex;
            width: 100%;
            flex-direction: column;

            .row1 {
                display: flex;
                flex-direction: column;
                padding: 1em 0;
                min-height: 6em;
                cursor: pointer;

                .product-name {
                    max-width: 100%;
                    max-height: 2.5em;

                    font-size: 1.1em;
                    white-space: wrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: #414e5a;
                }

                .price {
                    color: #414e5a;
                    margin: .5em 0;
                }
            }

            .row2 {
                flex-grow: 1;
                margin-top: 0;

                .add-btn {
                    background-color: #159347;
                    width: 100px;
                    border-radius: 15px;
                    padding: 0.4em 0;
                    // margin: 0 0.5em;
                    color: #fff;
                    display: flex;
                    justify-content: space-evenly;
                    cursor: pointer;
                }
            }
        }

    }

}

/* /////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////// */
.product-2 {
    width: 100%;
    padding: 0;
    color: #212121;
    border: 0;
    border-radius: 3%;
    transition: box-shadow 0.7s ease;

    .product-2-details {
        padding: 1.5em;
        position: relative;
        display: flex;

        .desc-wrapper-2 {
            width: 100%;
            padding: 0 2em;
            display: flex;
            flex-direction: column;

            // justify-content: space-evenly;
            .row1 {

                .price {
                    margin: 1.5em 0;
                }
            }

            .row2 {

                .add-btn {
                    background-color: #159347;
                    width: 100px;
                    border-radius: 15px;
                    padding: 0.4em 0;
                    // margin: 0 0.5em;
                    color: #fff;
                    display: flex;
                    justify-content: space-evenly;
                    cursor: pointer;
                }
            }
        }

        .product-2-img {
            transition: max-height .25s ease-out;
            border: 1px solid #e5e6e9;
            position: relative;
            border-radius: 10px;
            padding: 0.7em;
            display: flex;
            align-items: center;
            flex-basis: 12em;
            height: 10em;

            img {
                height: 100%;
                width: 100%;
            }

            span {
                position: absolute;
                background-color: #ffffff;
                padding: .5em;
                border-radius: 50%;
                display: flex;
                top: .5em;
                right: .5em;
                z-index: 100;
            }
        }
    }
}






.product-divider {
    border-bottom: 1px solid #e5e6e9;
    width: 95%;
    margin: 0.5em auto 1.5em auto;
}
</style>
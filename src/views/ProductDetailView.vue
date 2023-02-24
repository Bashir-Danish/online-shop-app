<script setup lang="ts">
import axios from "@/plugins/axios";
import Product from "@/components/product.vue";
import Header from '@/components/header.vue';

import { ref, computed, onBeforeMount } from "vue";
import { useCartStore } from "@/stores/cart";


const cartStore = useCartStore()
const url = window.location.href;
const lastParam = url.split("/").slice(-1)[0];
const product = ref<any>();
const similar = ref<any[]>([]);

const showImg = ref();
const bgImg = ref()
const changeImg = (img: any) => {
    showImg.value = img;
    bgImg.value = 'url(http://localhost:4000' + img + ')';
};


onBeforeMount(async () => {
    await axios
        .get(`/product/${lastParam}`)
        .then((res: any) => {
            product.value = res.data.product;
            showImg.value = product.value.img[0];
            bgImg.value = 'url(http://localhost:4000' + product.value.img[0] + ')';
        })
        .catch((err) => {
            console.log(err);
        });

    if (product.value) {
        similar.value = [];
        await axios
            .get(`/product/match/${product.value.category}`)
            .then((res: any) => {
                similar.value = res.data.products;
            })
            .catch((err) => {
                console.log(err);
            });
    }
});
cartStore.loadCart()

const existItem = computed(() => {
    let item = cartStore.items.find(el => el._id == product.value._id)
    return item
})
const scrollSide = (e: any) => {
    const list = document.getElementById("product-list");
    console.log(list?.scrollIntoView({ behavior: "smooth" }));
    list?.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
    <Header />
    <div class="background-container">
        <div class="prd-path">
            Home > {{ product.category }} > {{ product.name }}
        </div>
        <div class="product-details-div">
            <div class="col-1">
                <div class="img-list">
                    <div class="img" v-for="img in product.img" @mouseover="changeImg(img)">
                        <img :src="'http://localhost:4000' + img" :alt="img" />
                    </div>
                </div>
                <div class="img-slider">
                    <span class="bg-filter"
                        :style="{ backgroundImage: 'url(http://localhost:4000' + showImg + ')' }"></span>
                    <span class="heart"><vue-feather type="heart" size="1.5em" stroke="#414e5a"
                            stroke-width="2"></vue-feather></span>
                    <img :src="'http://localhost:4000' + showImg" :alt="showImg" />
                </div>
            </div>
            <div class="divider"></div>
            <div class="col-2">
                <div class="header">
                    <div class="productText">
                        <h2>{{ product.name }}</h2>
                        <span>
                            <vue-feather type="share" size="2em" stroke-width="1.5" stroke="#414e5a"></vue-feather>
                            <span>SHARE</span>
                        </span>
                    </div>
                    <div class="preview">
                        <span>
                            <vue-feather v-for="i in 5" :id="i" type="star" size="1.2em" fill="#F1F6F5" stroke-width="1"
                                stroke="#DDDDDD"></vue-feather>
                        </span>
                        <span>Be the First to Review</span>
                    </div>
                    <div class="price">
                        <h1>${{ product.price }}</h1>
                    </div>
                </div>
                <div class="delivery-details">
                    <h4>Delivery</h4>
                    <div class="pinCode">
                        <span class="icon"><vue-feather type="map-pin" size=".8em" stroke-width="2"
                                stroke="#423F3E"></vue-feather></span>
                        <input type="text" placeholder="Enter pincode" />
                        <button>CHECK</button>
                    </div>
                    <div>Delivery by Feb 5, Sunday by 01:00 PM</div>
                    <div>Enter pincode for exact delivery dates and charge</div>
                </div>
                <div class="delivery-action">
                    <div v-if="existItem" class="add-btn-2">
                        <span class="decrease" @click.stop="cartStore.changeQuantity('decrease', product._id)">
                            <vue-feather type="minus" stroke="#fff" size="1em" stroke-width="3"></vue-feather></span>
                        <span class="count">{{ existItem.quantity }}</span>
                        <span class="increase" @click.stop="cartStore.changeQuantity('increase', product._id)">
                            <vue-feather type="plus" stroke="#fff" size="1em" stroke-width="3"></vue-feather>
                        </span>
                    </div>
                    <div v-else class="add-btn-1" @click.stop="cartStore.addToCart(product)">
                        <span><vue-feather type="shopping-cart" size=".9em" stroke-width="3"
                                stroke="#fff"></vue-feather></span>
                        <span>Add To Cart</span>
                    </div>
                    <div>
                        <span><img src="@/assets/photos/shield.png" alt="" /></span>
                        <span>Safe and Secure payments.100% Authentic products</span>
                    </div>
                </div>
                <div class="Specifications">
                    <h2>Specifications</h2>
                    <ul>
                        <li v-for="spec in product.Specifications.slice().reverse()" :key="spec._id">
                            <span class="name">{{ spec.name }}</span>
                            <span class="value">{{ spec.value }}</span>
                        </li>
                    </ul>
                </div>
                <div class="rate-action">
                    <h2>Reviews & Ratings</h2>
                    <div>
                        <div class="rate">
                            <span>
                                <vue-feather v-for="i in 5" :id="i" type="star" size="1.2em" fill="#F1F6F5" stroke-width="1"
                                    stroke="#DDDDDD"></vue-feather>
                            </span>
                            <span>Be the First to Review</span>
                        </div>
                        <div class="rate-review">
                            <span>Have You Used this Product ?</span>
                            <button>Rate and Write Review</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="similar-products">
            <h2>Similar Products</h2>
            <div class="product-list" id="product-list">
                <button class="next" @click="scrollSide">add</button>
                <Product :data="product" v-for="product in similar" />
                <button class="prev" @click="scrollSide">add</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.background-container {
    position: relative;
    width: 100%;
    padding: 0 1em 1em 1em;
    background-color: rgba(46, 55, 97, 0.05);

    .prd-path {
        padding: 0.5em 0.5em;
        color: rgb(121, 121, 121);
        max-width: 1366px;
        margin: 0 auto;
    }

    .divider {
        border-top: 0.3px solid #e5e6e9;
        border-left: 0.3px solid #e5e6e9;
    }

    .product-details-div {
        position: relative;
        max-width: 1366px;
        display: flex;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);
        margin: 0 auto;

        .col-1 {
            position: sticky;
            top: 60px;
            height: fit-content;
            width: 45%;
            display: flex;

            .img-list {
                width: 15%;
                margin: 2em 0 2em 1.5em;
                overflow-y: auto;
                @include hideScrollbar();
                max-height: 28em;

                &:hover {
                    // box-shadow: inset 0px -19px 21px -14px rgba(0, 0, 0, 0.1);
                }

                .img {
                    width: 100%;
                    height: 5em;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 0.5em;
                    border-radius: 3px;
                    border: #e5e6e9 1px solid;

                    &:hover {
                        border: #84a3ff 1px solid;
                    }
                }

                img {
                    max-width: 100%;
                    height: 4em;
                }
            }

            .img-slider {
                height: 28em;
                width: 80%;
                border: #e5e6e9 1px solid;
                border-radius: 5px;
                margin: 2em 0.5em;
                position: relative;
                display: flex;
                justify-content: center;
                position: relative;

                .bg-filter {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    background-position: center;
                    background-size: cover;
                    background-repeat: no-repeat;
                    filter: blur(3px);
                    opacity: (.3);
                    z-index: -100;
                }

                .heart {
                    position: absolute;
                    top: 1em;
                    right: 1em;
                    z-index: 10;
                    width: 2em;
                    height: 2em;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background-color: rgba(255, 255, 255, 0.473);
                }

                img {
                    max-height: 100%;
                    max-width: 100%;
                    border-radius: 5px;
                }
            }
        }

        .col-2 {
            width: 55%;

            .header {
                padding: 1em;

                .productText {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    h2 {
                        font-weight: 400;
                        font-size: 1.4em;
                        line-height: 1.4em;
                        width: 90%;
                    }

                    span {
                        display: block;
                        text-align: center;
                        color: #414e5a;
                        font-size: 14px;
                        position: absolute;
                        right: 1em;
                        cursor: pointer;

                        span {
                            font-size: 10px;
                            right: 0;
                        }
                    }
                }

                .preview {
                    display: flex;
                    align-items: center;
                    margin: 0.5em 0;

                    span {
                        cursor: pointer;

                        &:last-child {
                            margin: 0 1em;
                            color: #0086ff;

                            &:hover {
                                text-decoration: underline;
                                cursor: pointer;
                            }
                        }
                    }
                }

                .price {
                    height: 4em;
                    display: flex;
                    align-items: center;
                }
            }

            .delivery-details {
                background: rgba(46, 55, 97, 0.05);
                padding: 1em 1em;

                h4 {
                    font-weight: 400;
                    color: #414e5a;
                }

                .pinCode {
                    display: flex;
                    height: 2.2em;
                    border-radius: 3px;
                    background: #ffffff;
                    width: fit-content;
                    border: 1px solid rgb(0 0 0 / 20%);
                    margin: 0.5em 0;

                    input {
                        height: 100%;
                        width: 200px;
                        background: transparent;
                        border: none;
                        outline: none;
                    }

                    button {
                        height: 100%;
                        border: none;
                        outline: none;
                        background: rgb(94, 94, 94);
                        border-top-right-radius: 3px;
                        border-bottom-right-radius: 3px;
                        color: #fff;
                        padding: 0.5em 1.5em;
                        font-weight: 800;
                    }

                    span {
                        display: flex;
                        align-items: center;
                        padding: 0 0.5em;
                    }
                }

                div {
                    color: #414e5a;
                }
            }

            .delivery-action {
                background: rgba(46, 55, 97, 0.05);
                padding: 2em 1em 1em 1em;

                .add-btn-1 {
                    background: #159347;
                    width: fit-content;
                    box-shadow: 0 0 5px 0 rgb(0 0 0 / 20%);
                    color: #ffffff;
                    font-weight: 550;
                    font-size: 14px;
                    padding: 1.2em 2em;
                    border-radius: 5px;
                    transition: all 0.4s ease;
                    cursor: pointer;

                    &:hover {
                        background: #0b65a8;
                    }
                }

                .add-btn-2 {
                    display: flex;
                    align-items: center;
                    font-weight: 700;
                    transition: all 0.4s ease;

                    .count {
                        width: 1.5em;
                        margin: 0 1em;
                        font-size: 1.5em;
                        text-align: center;
                    }

                    .decrease,
                    .increase {
                        background-color: #159347;
                        font-size: 1em;
                        padding: .85em;
                        color: #e5e6e9;
                        border-radius: 5px;
                        margin: 0;
                        transition: all 0.4s ease;
                        cursor: pointer;

                        &:hover {
                            background-color: #0b65a8;
                        }
                    }
                }

                div {
                    display: flex;
                    margin: 1em 0 1em 0;

                    span {
                        margin-right: 1em;
                    }

                    img {
                        width: 1.5em;
                        height: 1.5em;
                    }
                }
            }

            .Specifications {
                padding: 1em;

                h2 {
                    border-bottom: 1px dashed #e5e6e9;
                    padding: 0.9em 0;
                }

                ul {
                    padding: 1em 0;

                    li {
                        display: flex;
                        justify-content: space-between;
                        padding: 1em 0;

                        .name {
                            width: 30%;
                            color: rgb(141, 141, 141);
                        }

                        .value {
                            width: 70%;
                            color: #414e5a;
                        }
                    }
                }
            }

            .rate-action {
                padding: 1em;

                h2 {
                    border-bottom: 1px dashed #e5e6e9;
                    padding: 0.9em 0;
                }

                div {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 2em;

                    .rate {
                        width: 50%;
                        flex-direction: column;
                        border-right: 1px solid #e5e6e9;

                        span {
                            margin: 0.25em 0;
                            color: #414e5a;
                        }
                    }

                    .rate-review {
                        width: 50%;
                        flex-direction: column;

                        span {
                            margin: 0.25em 0;
                            color: #414e5a;
                        }

                        button {
                            background: #159347;
                            box-shadow: 0 0 5px 0 rgb(0 0 0 / 20%);
                            border: none;
                            outline: none;
                            font-size: 1em;
                            color: #ffffff;
                            font-weight: 600;
                            padding: 1em;
                            border-radius: 5px;
                            transition: all 0.4s ease;

                            &:hover {
                                background: #0b65a8;
                            }
                        }
                    }
                }
            }
        }
    }

    .similar-products {
        position: relative;
        background-color: #fff;
        max-width: 1366px;
        height: fit-content;
        border-radius: 10px;
        box-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);
        margin: 0 auto;
        padding: 1em 1em;
        margin: 1em auto 0 auto;
        position: relative;

        h2 {
            padding: 0.5em 0 0 0;
            font-weight: 400;
            font-size: 23px;
        }

        .product-list {
            padding: 1em;
            display: flex;
            gap: 1em;
            overflow-x: scroll;

            .next {
                position: absolute;
                left: 1em;
                top: 50%;
                //   left: 50%;
                // margin: auto 0;
                z-index: 100;
            }

            .prev {
                position: absolute;
                right: 1em;
                top: 50%;
                //   left: 50%;
                // margin: auto 0;
                z-index: 100;
            }
        }
    }
}
</style>

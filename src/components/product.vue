<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed } from 'vue';
import { IosHeartEmpty } from '@vicons/ionicons4/'
import { useRouter } from 'vue-router'
import { useCartStore } from "@/stores/cart";
import { useAuthStore } from "@/stores/auth";

// const liked = ref(false)
const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()


const props = defineProps([
    'data',
    'listViewProduct']
)
const existItem = computed(() => {
    let item = cartStore.items.find(el => el._id == props.data._id)
    return item
})

const liked = computed(() => {
    let like;
    if (authStore.isLoggedIn == true) {
        like = authStore.user.wishList.some((item: any) => item._id == props.data._id)
    } else {
        like = false
    }
    return like
})

const img = 'url(http://localhost:4000' + props.data.img[0] + ')'

</script>
<template>
    <div :class="listViewProduct ? 'product-2' : 'product'">
        <div :class="listViewProduct ? 'product-2-details' : 'product-details'"
            @click.native="router.push({ path: '/product/' + data._id })">
            <div :class="listViewProduct ? 'product-2-img' : 'product-img'">
                <span class="heart" @click.stop="authStore.addToWishlist(data, liked)">
                    <div class="heart-icon" v-if="liked">
                    </div>
                    <Icon v-else :size="listViewProduct ? '1em' : '1.2em'">
                        <IosHeartEmpty />
                    </Icon>
                </span>
                <img :src="'http://localhost:4000' + data.img[0]" :alt="img[0]">
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
                    <div v-if="existItem" class="add-btn-2">
                        <span class="decrease" @click.stop="cartStore.changeQuantity('decrease', data._id)">-</span>
                        <span class="count">{{ existItem.quantity }}</span>
                        <span class="increase" @click.stop="cartStore.changeQuantity('increase', data._id)">+</span>
                    </div>
                    <div v-else class="add-btn" @click.stop="cartStore.addToCart(data)">
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
@import '@/assets/variables.scss';
@import '@/assets/mixin.scss';



.product {
    max-width: 25%;
    flex-grow: 1;
    padding: 0;
    color: $gray-18;
    border: 0;
    border-radius: 3%;
    transition: box-shadow .5s ease;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

    @include medium-down {
        max-width: 33.33%;
        width: 33.33%;
    }

    &:hover {
        box-shadow: 0px 5px 10px 5px $dOp-1;
        cursor: pointer;

        img {
            transform: scale(1.04);
            transition: all 1s ease;
        }
    }

    .product-details {
        padding: 20px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;

        .product-img {
            position: relative;
            width: 100%;
            height: 13em;
            padding: .3em;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            &::after {
                content: '';
                position: absolute;
                top: .3em;
                left: .3em;
                width: 95%;
                height: 95%;
                background-image: v-bind(img);
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
                filter: blur(3px);
                opacity: (.3);
                z-index: -100;
            }

            &::before {
                content: '';
                border: 1px solid $gray-1;
                position: absolute;
                border-radius: 5%;
                background: transparent;
                width: 100%;
                height: 100%;
                z-index: 100;
            }

            .heart {
                position: absolute;
                background: $bgOp-4;
                width: 2em;
                height: 2em;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                top: .5em;
                right: .5em;
                z-index: 100;
                cursor: pointer;

                &:hover {
                    color: $red;
                }
            }


            .heart-icon {
                background: url("@/assets/photos/heart.png") no-repeat;
                height: 55px;
                width: 55px;
                background-position: left;
                background-size: 2900%;
                position: absolute;
                animation: like-anim .5s steps(28) forwards;
            }

            @keyframes like-anim {
                to {
                    background-position: right;
                }
            }

            img {
                max-height: 100%;
                max-width: 100%;
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
                    min-height: 2.5em;
                    font-size: 15px;
                    white-space: wrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .price {
                    margin-top: .5em;
                }
            }

            .row2 {
                .add-btn {
                    background: $green;
                    width: 100px;
                    border-radius: 15px;
                    padding: 0.4em 0;
                    color: $white;
                    display: flex;
                    align-items: center;
                    justify-content: space-evenly;
                    cursor: pointer;
                    transition: all .2s;

                    &:hover {
                        background: $blue;
                    }
                }

                .add-btn-2 {
                    background: $white;
                    width: 100px;
                    border-radius: 15px;
                    border: 1px solid $green;
                    display: flex;
                    align-items: center;
                    justify-content: space-evenly;
                    cursor: pointer;

                    .increase,
                    .decrease {
                        height: 100%;
                        padding: .4em 1em;
                        border-radius: 5px;
                        transition: all .3s ease;
                        cursor: pointer;
                    }
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
    color: $gray-18;
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

            .row1 {

                .price {
                    margin: 1.5em 0;
                }
            }

            .row2 {

                .add-btn {
                    background: $green;
                    width: 100px;
                    border-radius: 15px;
                    padding: 0.4em 0;
                    color: $white;
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    transition: all .2s;
                    cursor: pointer;

                    &:hover {
                        background: $blue;
                    }
                }

                .add-btn-2 {
                    background: $white;
                    width: 100px;
                    border-radius: 15px;
                    border: 1px solid $green;
                    display: flex;
                    align-items: center;
                    justify-content: space-evenly;
                    cursor: pointer;

                    .increase,
                    .decrease {
                        height: 100%;
                        padding: .4em 1em;
                        border-radius: 5px;
                        transition: all .3s ease;
                        cursor: pointer;

                    }
                }
            }
        }

        .product-2-img {
            transition: max-height .25s ease-out;
            position: relative;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-basis: 12em;
            height: 10em;

            &::after {
                content: '';
                position: absolute;
                top: .3em;
                left: .3em;
                width: 95%;
                height: 95%;
                background-image: v-bind(img);
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
                filter: blur(3px);
                opacity: (.3);
                z-index: -100;
            }

            &::before {
                content: '';
                border: 1px solid $gray-2;
                position: absolute;
                border-radius: 5%;
                background: transparent;
                width: 100%;
                height: 100%;
                z-index: 100;
            }


            img {
                max-height: 100%;
                max-width: 100%;
            }

            .heart {
                position: absolute;
                background: $bgOp-4;
                width: 1.5em;
                height: 1.5em;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                top: .5em;
                right: .5em;
                z-index: 100;
                cursor: pointer;

                &:hover {
                    color: $red;
                }
            }

            .heart-icon {
                background: url("@/assets/photos/heart.png") no-repeat;
                height: 45px;
                width: 45px;
                background-position: left;
                background-size: 2900%;
                animation: like-anim .5s steps(28) forwards;
                position: absolute;
            }

            @keyframes like-anim {
                to {
                    background-position: right;
                }
            }
        }
    }
}

.product-divider {
    border-bottom: 1px solid $gray-2;
    width: 95%;
    margin: 0.5em auto 1.5em auto;
}
</style>
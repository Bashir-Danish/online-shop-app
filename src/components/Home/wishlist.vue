<script setup lang="ts">
import { IosArrowRtl24Regular } from '@vicons/fluent/'
import { useAuthStore } from "@/stores/auth";
import { useRouter } from 'vue-router'
import { useCartStore } from "@/stores/cart";
import wishListSkeleton from '@/components/vueSkeleton/wishListSkeleton.vue'

const cartStore = useCartStore()

const router = useRouter()
const authStore = useAuthStore();

const addToCart = (item: any) => {
    cartStore.addToCart(item)
    authStore.addToWishlist(item, true)
}

</script>
<template>
    <div class="background-color">
        <div class="path">
            <span>My Account</span>
            <span class="icon">
                <Icon size="10">
                    <IosArrowRtl24Regular />
                </Icon>
            </span>
            <span>Wishlist
                <span v-if="authStore.user?.wishList.length">({{ authStore.user?.wishList.length }} items)</span>
            </span>
        </div>
        <div class="wishlist" v-if="!authStore.loading">
            <div class="items" v-if="authStore.user?.wishList.length > 0">
                <div v-for="item in authStore.user?.wishList" :key="item._id" class="wish-item"
                    @click.native="router.push({ path: '/product/' + item._id })">
                    <div class="item-img">
                        <span
                            :style="{ backgroundImage: 'url(http://api.kdanish.com' + item.img[0] ?? item.img + ')' }"></span>
                        <img :src="'http://api.kdanish.com' + (item.img[0] ?? item.img)" :alt="item?.img[0]">
                    </div>
                    <div class="details">
                        <div class="desc">
                            <p class="name">{{ item.name }}</p>
                            <p class="price">${{ item.price }}</p>
                        </div>
                        <div class="action">
                            <div class="add-btn" @click.stop="addToCart(item)">
                                <span><vue-feather type="shopping-cart" size="1em" stroke="#fff"
                                        stroke-width="2"></vue-feather></span>
                                <span>Add</span>
                            </div>
                            <div class="remove" @click.stop="authStore.addToWishlist(item, true)">
                                Remove from List
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="no-items">
                <img src="@/assets/photos/emptyWishlist_1903251516.webp" alt="">
                <h3>Your Wishlist is Empty</h3>
                <span>Save your favourite items here</span>
                <button @click="router.push({ name: 'home', path: '/' })">Start Shopping Now</button>
            </div>
        </div>
        <wishListSkeleton v-else />

    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

.background-color {
    height: fit-content;
    width: 100%;
    padding: 0 1em 1em 1em;
    background: $backGround;

    .path {
        font-size: 14px;
        display: flex;
        padding: .4em 0;
        display: flex;
        align-items: center;
        color: $gray-13;
        max-width: 1366px;
        margin: 0 auto;

        .icon {
            padding: .5em;
        }
    }

    .wishlist {
        max-width: 1366px;
        margin: 0 auto;
        min-height: 75vh;
        max-height: fit-content;
        background: $white;
        box-shadow: $dOp-2 0px 0px 8px;
        border-radius: 10px;

        .items {
            .wish-item {
                display: flex;
                margin: 0 1.5em;
                cursor: pointer;

                .item-img {
                    width: 150px;
                    height: 150px;
                    display: flex;
                    position: relative;
                    margin: 1.4em 0;
                    cursor: pointer;

                    img {
                        max-width: 100%;
                        max-height: 100%;
                        padding: .1em 0;
                        margin: 0 auto;
                        z-index: 100;
                    }

                    span {
                        width: 90%;
                        height: 90%;
                        position: absolute;
                        top: .5em;
                        left: .5em;
                        background-position: center;
                        background-size: cover;
                        background-repeat: no-repeat;
                        filter: blur(3px);
                        opacity: (.3);
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

                }

                .details {
                    padding: 0 1.5em;

                    .desc {
                        color: $gray-16;
                        margin: 1.4em 0;

                        .name {
                            &:hover {
                                color: $lightBlue;
                            }
                        }

                        .price {
                            font-weight: 600;
                            margin: .5em 0;
                        }
                    }
                }

                .action {
                    font-size: 14px;
                    color: $gray-11;
                    font-weight: 600;
                    display: flex;

                    .add-btn {
                        background: $green;
                        color: $white;
                        font-size: 14px;
                        display: flex;
                        justify-content: space-evenly;
                        padding: 0.4em 0;
                        width: 80px;
                        border-radius: 15px;
                        transition: all .2s;
                        cursor: pointer;

                        &:hover {
                            background: $blue;
                        }
                    }

                    .remove {
                        display: flex;
                        align-items: center;
                        border-left: 1px solid $gray-5;
                        margin: 0 1em;
                        padding: 0 1em;

                        &:hover {
                            color: $lightBlue;
                        }
                    }
                }

                border-bottom: $gray-2 1px solid;
            }
        }

        .no-items {
            min-height: 55vh;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: auto 0;

            img {
                width: 7em;
            }

            h3 {
                color: $gray-15;
            }

            span {
                color: $gray-15;
                padding: .5em;
            }

            button {
                background: $green;
                color: $white;
                transition: all .5s ease;
                padding: .8em 4em;
                margin: .5em;
                border-radius: 5px;
                border: none;
                cursor: pointer;

                &:hover {
                    background: $blue;
                }
            }
        }


    }

}
</style>
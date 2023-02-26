<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import { onMounted, ref } from "vue";
import BaseInput from "@/components/smallComponents/BaseInput.vue";

const router = useRouter();
const cartStore = useCartStore();

const pinCode = ref()
const pinCodeModal = ref(false)
onMounted(() => {
    cartStore.loadCart()
})
</script>

<template>
    <div v-if="cartStore.items.length" class="cart-div">
        <div class="cart-items">
            <div class="cart-items-count">
                <div class="count">
                    <span>My Cart({{ cartStore.items.length }} items)</span>
                    <span @click.stop="cartStore.removeAll">CLEAR CART</span>
                </div>
                <div class="pinCode">
                    <div>
                        <vue-feather type="map-pin" size="1em" stroke-width="1"></vue-feather>
                        <span>Enter Delivery Pincode</span>
                    </div>
                    <button @click="pinCodeModal = true">ADD</button>
                </div>
            </div>
            <div class="cart-table">
                <table v-if="cartStore.items" cellspacing="0" cellpadding="0">
                    <thead>
                        <th>Item(s) Details</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                    </thead>
                    <tbody>
                        <tr v-for="item in cartStore.items">
                            <td @click.native="router.push({ path: '/product/' + item._id })">
                                <div class="item-img">
                                    <!-- <span :style="{ backgroundImage: 'url(http://localhost:4000' + item.img + ')' }"></span> -->
                                    <img :src="'http://localhost:4000' + item.img" alt="" srcset="">
                                </div>
                                <div class="item-desc">
                                    <span class="name">{{ item.name }}</span>
                                    <span class="price">${{ item.price }}</span>

                                    <div class="action">
                                        <span class="wishlist" @click.stop="">
                                            <span><vue-feather type="heart" size="1.2em"
                                                    stroke-width="2"></vue-feather></span>
                                            <span>MOVE TO WISHLIST</span>
                                        </span>
                                        <span class="remove" @click.stop="cartStore.removeItem(item._id)">
                                            <span><vue-feather type="x" size="1.5em"
                                                    stroke-width="1.5"></vue-feather></span>
                                            <span>REMOVE</span>
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td class="quantity">
                                <div>
                                    <span class="decrease"
                                        @click.stop="cartStore.changeQuantity('decrease', item._id)">-</span>
                                    <span class="count">{{ item.quantity }}</span>
                                    <span class="increase"
                                        @click.stop="cartStore.changeQuantity('increase', item._id)">+</span>
                                </div>
                            </td>
                            <td class="amount">
                                <span class="totalPrice">${{ item.price * item.quantity }}</span>
                            </td>
                            <div class="divider"></div>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="continueBtn">
                <button @click.stop="router.push({ name: 'home', path: '/' })">
                    <span>
                        <vue-feather type="chevron-left" size="1.5em" stroke-width="2"></vue-feather>
                    </span>
                    <span>
                        CONTINUE SHOPPING
                    </span>
                </button>
            </div>
        </div>
        <div class="items-check">
            <div class="apply-coupon">
                <div class="border">
                    <span class="col-1">
                        <img src="@/assets/photos/6320434.svg" alt="" srcset="">
                        <span>Apply Coupon</span>
                    </span>
                    <span>
                        <vue-feather type="chevron-right" size="1.5em" stroke-width="2"></vue-feather>
                    </span>
                </div>
            </div>


            <div class="payment">
                <div class="row-1">
                    <span class="total">
                        <span>Item(s) Total</span>
                        <span>${{ cartStore.total }}</span>
                    </span>
                    <span class="approx">
                        <span>Approx. Delivery Charge <vue-feather type="info" size="1em" stroke-width="2"
                                title="These are approximate delivery charges please enter your pincode for
                                                                                                    exact charge"></vue-feather>
                        </span>
                        <span>Free</span>
                    </span>
                </div>
                <div class="row-2">
                    <span class="total">
                        <span>Amount Payable</span>
                        <span>${{ cartStore.total }}</span>
                    </span>
                    <span class="checkout">
                        <span>Prices may change based on shipping address</span>
                        <button @click="router.push({ name: 'checkout', path: '/checkout-flow' })">CHECKOUT</button>
                    </span>
                </div>
            </div>

        </div>
    </div>
    <div v-else class="no-items">
        <img src="@/assets/photos/cart-icon.webp" alt="">
        <h3>Your Cart is Empty</h3>
        <span>Looks Like You haven't made Your Choice Yet</span>
        <button @click="router.push({ name: 'home', path: '/' })">Start Shopping</button>
    </div>
    <TransitionGroup name="pincode" mode="out-in">
        <div class="pincode-modal" v-if="pinCodeModal">
            <div class="modal-header">
                <button @click="pinCodeModal = false" type="button" class="close"><vue-feather type="x" size="1.8em"
                        stroke="#000" stroke-width="1"></vue-feather></button>
            </div>
            <div class="body">
                <div class="header">Enter Pincode to Check Availability & Delivery Options
                </div>
                <BaseInput v-model="pinCode" input-type="pincode" input-id="Enter Pincode" :is-required="true" />
                <button>Apply</button>
            </div>
        </div>
    </TransitionGroup>
    <div class="container" v-if="pinCodeModal" @click="pinCodeModal = false"></div>
</template>
<style scoped lang="scss">
@import '@/assets/variables.scss';

.cart-div {
    padding: 1.3em 2em;
    display: flex;
    position: relative;
    color: $gray-7;

    .cart-items {
        position: relative;
        width: 75%;
        min-height: 80vh;
        background: $white;
        box-shadow: $dOp-2 0px 0px 8px;
        border-radius: 3px;

        .cart-items-count {
            display: flex;
            justify-content: space-between;

            .count {
                margin: 1em .7em;

                span {
                    margin: 0.5em;
                    color: $gray-6;

                    &:last-child {
                        font-size: 12px;
                        color: $lightBlue;

                        &:hover {
                            text-decoration: underline;
                            cursor: pointer;
                        }
                    }
                }
            }

            .pinCode {
                margin: 0 1.5em;
                font-size: 14px;
                display: flex;
                align-items: center;

                div {
                    margin: 1em;
                    display: flex;
                    align-items: center;

                    i {
                        color: $lightBlue;
                        background: $white;

                    }

                    span {
                        color: $gray-6;
                        font-weight: 700;
                        margin: 0 .5em;
                    }
                }

                button {
                    background: transparent;
                    color: $lightBlue;
                    font-size: 12px;
                    border: $gray-3 1px solid;
                    border-radius: 5px;
                    padding: .4em 1.5em;
                    cursor: pointer;

                    &:hover {
                        color: $white;
                        background: $lightBlue;
                    }
                }
            }
        }

        .cart-table {
            min-height: 60vh;

            table {
                width: 100%;

                thead {
                    background: rgba(241, 242, 246, .5);
                    color: #414e5a86;
                    text-align: left;
                    font-size: 14px;

                    th {
                        padding: 1em;

                        &:last-child {
                            text-align: right;
                        }

                        &:nth-child(2) {
                            text-align: center;
                        }
                    }
                }

                tbody {

                    tr {
                        position: relative;

                        .divider {
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            margin: 0 auto;
                            width: 95%;
                            border-bottom: $gray-2 1px solid;

                        }


                        td {
                            &:first-child {
                                display: flex;
                            }

                            padding:1.5em;

                            .item-img {
                                max-width: 80px;
                                max-height: 80px;
                                min-width: 80px;
                                display: flex;
                                position: relative;
                                cursor: pointer;

                                img {
                                    max-width: 80px;
                                    max-height: 80px;
                                    padding: .1em 0;
                                    margin: 0 auto;
                                    z-index: 100;
                                }

                                span {
                                    width: 100%;
                                    height: 100%;
                                    position: absolute;
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

                            .item-desc {
                                display: flex;
                                width: 100%;
                                flex-direction: column;
                                justify-content: space-between;
                                padding: 0 1em;
                                cursor: pointer;

                                .name {
                                    font-size: 14px;

                                    &:hover {
                                        color: $lightBlue;
                                    }
                                }

                                .price {
                                    font-weight: 800;
                                    font-size: 14px;
                                }

                                .action {
                                    font-size: 12px;
                                    display: flex;

                                    .wishlist {
                                        font-weight: 700;
                                        display: flex;
                                        align-items: center;

                                        i {
                                            margin: 0 3px;
                                        }

                                        margin-right: 1em;

                                        &:hover {
                                            color: $lightBlue;

                                            i {
                                                color: $red;
                                            }

                                        }
                                    }

                                    .remove {
                                        font-weight: 700;
                                        display: flex;
                                        align-items: center;

                                        i {
                                            margin: 0 2px;
                                        }

                                        &:hover {
                                            color: $lightBlue;

                                            i {
                                                color: $lightBlue;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                }

                .quantity {
                    width: 20%;
                    vertical-align: top;
                    text-align: center;

                    div {
                        margin: 0 auto;
                        height: 2em;
                        width: fit-content;
                        display: flex;
                        border: $gray-2 1px solid;
                        border-radius: 5px;

                        .count {
                            height: 1em;
                            width: 2.5em;
                            padding: .5em;
                        }

                        .increase,
                        .decrease {
                            height: 100%;
                            width: 1.5em;
                            font-size: 1.5em;
                            transition: all .3s ease;
                            cursor: pointer;

                            &:hover {
                                background: $gray-2;
                            }
                        }
                    }
                }

                .amount {
                    width: 20%;
                    text-align: right;
                    vertical-align: top;
                }
            }
        }

        .continueBtn {
            background: $white;
            box-shadow: $dOp-2 0px 1px 10px;
            clip-path: inset(-15px 0px 0px 0px);
            position: sticky;
            bottom: 0px;
            padding: 1em 1.3em;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            z-index: 100;

            button {
                background: transparent;
                font-size: 14px;
                color: $green;
                padding: .6em 2.5em;
                border-radius: 4px;
                border: 1px solid $green;
                outline: none;
                display: flex;
                align-items: center;
                transition: all .3s;
                cursor: pointer;

                &:hover {
                    border: 1px solid $blue;
                    background: $blue;
                    color: $white;
                }
            }
        }
    }

    .items-check {
        width: calc(25% - 1em);
        height: fit-content;
        position: sticky;
        top: 80px;

        .apply-coupon {
            background: $white;
            margin: 0 1em;
            width: 100%;
            padding: 1em;
            box-shadow: $dOp-2 0px 0px 8px;
            border-radius: 3px;

            .border {
                width: 100%;
                height: 2.5em;
                padding: .3em;
                display: flex;
                justify-content: space-between;
                border-radius: 3px;
                border: $gray-6 1px dashed;

                .col-1 {
                    display: flex;
                    align-items: center;
                    font-size: 14px;

                    span {
                        &:last-child {
                            margin: 0 1em;
                        }
                    }
                }

                img {
                    height: 100%;
                }

                &:hover {
                    color: $lightBlue;
                    border: 1px dashed $lightBlue;
                    cursor: pointer;
                }
            }

        }

        .payment {
            background: $white;
            margin: 1em;
            width: 100%;
            padding: 1em;
            border-radius: 3px;
            box-shadow: $dOp-2 0px 0px 8px;

            .row-1 {
                display: flex;
                flex-direction: column;
                color: $gray-6;
                font-size: 14px;
                border-bottom: 1px dashed $gray-6 ;
                padding: 1em 0;
                position: relative;

                .total {
                    display: inherit;
                    justify-content: space-between;
                    font-weight: 600;
                    margin-bottom: 1em;
                }

                .approx {
                    display: inherit;
                    justify-content: space-between;
                    align-items: center;

                    span {
                        display: inherit;
                        align-items: center;

                        i {
                            margin: 0 .5em;
                            cursor: pointer;

                            &:hover {
                                color: $black;
                            }
                        }

                        &:last-child {
                            color: $green;
                        }
                    }
                }
            }

            .row-2 {
                padding-top: .5em;

                .total {
                    display: flex;
                    justify-content: space-between;
                    color: $black;
                    font-size: 14px;
                    font-weight: 600;
                    padding: .5em 0 0;
                }

                .checkout {
                    font-size: 10px;
                    color: $gray-6;

                    button {
                        width: 100%;
                        padding: .9em;
                        margin-top: 1em;
                        border-radius: 5px;
                        background: $green;
                        color: $white;
                        border: none;
                        cursor: pointer;

                        &:hover {
                            background: $blue;
                        }
                    }
                }
            }
        }
    }
}

.no-items {
    min-height: 83vh;
    background: $white;
    box-shadow: $dOp-2 0px 0px 8px;
    margin: 1em;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
        width: 12em;
    }

    h3 {
        color: $gray-6;
    }

    span {
        color: $gray-6;
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

@keyframes FadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.container {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: $dOp-5;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 300;
    animation: 0.5s ease-in-out 0s 1 FadeIn;
}

.pincode-modal {
    height: 14em;
    width: 25%;
    position: absolute;
    top: 20%;
    left: 0;
    right: 0;
    margin: auto;
    background: $white;
    border-radius: 10px;
    box-shadow: $dOp-1 0px 0px 25px;
    z-index: 1000;

    .modal-header {
        position: relative;

        button {
            position: absolute;
            right: 0;
            padding: .5em;
            background: transparent;
            border: none;
            cursor: pointer;
        }
    }

    .body {
        display: flex;
        flex-direction: column;

        .header {
            font-size: 14px;
            margin: 2em 1em;
        }

        button {
            position: absolute;
            width: 100%;
            height: 3em;
            bottom: 0;
            left: 0;
            background: $green;
            color: $white;
            border: none;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            cursor: pointer;

            &:hover {
                background: $blue;
            }
        }
    }
}




.pincode-enter-from {
    opacity: 0;
    transform: scale(0);
}

.pincode-enter-to {
    opacity: 1;
    transform: scale(1);
}

.pincode-enter-active {
    transition: all 0.5s ease-in-out;
}

.pincode-leave-from {
    opacity: 1;
    transform: scale(1);
}

.pincode-leave-to {
    opacity: 0;
    transform: scale(0);
}

.pincode-leave-active {
    transition: all 0.5s ease;
}

.pincode-move {
    transition: all 0.5s ease;
}
</style>
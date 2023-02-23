<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from '@/plugins/axios';
import { HalfCircleSpinner } from 'epic-spinners'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'

const productStore = useProductStore()
const cartStore = useCartStore()
const router = useRouter();
const loader = ref(false)
const search = ref('')
const names = ref([])

const searchName = async (value: string, name: string) => {
    names.value = []
    productStore.productLoading = true
    productStore.filterLoading = true
    if (value == 'searchInput') {
        await axios.get(`/product/search/${name}`)
            .then((res: any) => {
                productStore.product = res.data.products
                productStore.count = productStore.product.length
            })
            .catch((err) => {
                console.log(err)
            });
    }
    if (value == 'nameInput') {
        search.value = name
        productStore.params.delete('name')
        productStore.params.append('name', name.toString())
        productStore.getProduct()
    }
    setTimeout(() => {
        productStore.productLoading = false
        productStore.filterLoading = false
        loader.value = false
    }, 300);
}

const getNames = async () => {
    loader.value = true
    names.value = []
    if (search.value) {
        await axios.get(`/product/search/${search.value}`)
            .then((res: any) => {
                names.value = res.data.products
            })
            .catch((err) => {
                console.log(err)
            });
        console.log(names.value)
    }
    setTimeout(() => {
        loader.value = false
    }, 300);
}

const highlight = (str: string, char: string) => {
    const re = new RegExp(char, "gi");
    return str.replace(re, `<span style="color:#313131c2; font-weight: bolder; padding-right:1px">${char}</span>`);
}
const deleteName = () => {
    search.value = '';
    names.value = [];
    productStore.params.delete('name')
    productStore.getProduct()
}

</script>
<template>
    <div class="search-Bar">
        <div class="search-Bar-Container">
            <div class="logo" @click="router.push({ name: 'home', path: '/' })">
                <p>Online
                    Shopping store</p>
                <img src="@/assets/logo.jpg" alt="">
            </div>
            <div class="search-bar">
                <div class="search-input">
                    <input v-model="search" @input="getNames" @keydown.enter="searchName('searchInput', search)" type="text"
                        class="input" placeholder="Search">
                    <Transition name="list" mode="out-in" appear>
                        <ul class="auto-complete-container" v-if="!loader">
                            <li v-for="{ name } in names" @click="searchName('nameInput', name)">
                                <span class="span"><vue-feather type="search" size="1.1em" stroke="#414e5a"
                                        stroke-width="2"></vue-feather>
                                    <p v-html="highlight(name, search)"></p>
                                </span>
                            </li>
                        </ul>
                    </Transition>
                    <div class="loader">
                        <half-circle-spinner v-if="loader" :animation-duration="1000" :size="20" color="#0b65a8" />
                        <vue-feather @click="deleteName" type="x" v-if="search && !loader" size="1.3em" stroke="#000"
                            stroke-width="2"></vue-feather>
                    </div>
                </div>
                <button @click.stop="searchName('searchInput', search)" class="search-button"><vue-feather type="search"
                        size="1.5em" stroke="#ececec" stroke-width="2"></vue-feather>Search</button>

            </div>
            <div class="cart">
                <RouterLink to="/cart">
                    <button>
                        <span class="cart-basket">
                            <vue-feather type="shopping-cart" size="1em" stroke-width="2"></vue-feather>
                            <span v-if="cartStore.items.length">{{ cartStore.items.length }}</span>
                        </span>
                        <span>Cart</span>
                    </button>
                </RouterLink>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
@import '@/assets/variables.scss';

.search-Bar {
    width: 100%;
    height: 75px;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 4px;
    position: sticky;
    top: 0;
    z-index: 100;

    .search-Bar-Container {
        max-width: 1366px;
        width: 100%;
        height: 75px;
        margin: auto;
        display: flex;
        background-color: rgb(255, 255, 255);
        position: sticky;
        top: 0;
        z-index: 100;

        .logo {
            width: 20%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: 400;
            color: #159347;
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

        .search-bar {
            display: flex;
            flex: 1;
            align-items: center;

            .search-input {
                width: 100%;
                position: relative;

                .input {
                    height: 36px;
                    color: #919191;
                    outline: none;
                    width: 100%;
                    background: #ffffff;
                    border: 1px solid #c2c2c2;
                    padding-left: 10px;
                    font-size: 1.1em;
                    border-radius: 2px 0 0 2px;
                    line-height: 34px;
                    border-bottom-left-radius: 4px;
                    border-top-left-radius: 4px;
                }

                .auto-complete-container {
                    background: #ffffff;
                    width: calc(100%);
                    position: absolute;
                    height: fit-content;
                    max-height: 30em;
                    top: 36px;
                    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 10px;
                    clip-path: inset(0px -10px -10px -10px);
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                    overflow: auto;
                    @include hideScrollbar();

                    &:hover {
                        @include scrollbar()
                    }

                    li {
                        padding: 0 0.5em;
                        transition: all 0.5s ease;
                        display: flex;
                        align-items: center;
                        color: #313131;
                        cursor: pointer;

                        span {
                            padding: 0.5em;
                            width: 100%;
                            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                            display: flex;
                            align-items: center;

                            i {
                                margin-right: 1em;
                                padding: 0.5em;
                            }
                        }

                        &:last-child {
                            border-bottom-left-radius: 5px;
                            border-bottom-right-radius: 5px;
                        }

                        &:hover {
                            background: linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(192, 193, 194, 0.9416141456582633) 0%, rgba(207, 208, 209, 1) 0%, rgba(228, 229, 229, 1) 0%, rgba(235, 236, 236, 1) 0%, rgba(245, 245, 245, 1) 0%, rgba(255, 255, 255, 1) 84%);
                        }
                    }
                }

                .loader {
                    position: absolute;
                    top: 0.5em;
                    right: 0.5em;
                    cursor: pointer;
                }
            }

            .search-button {
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

                &:hover {
                    background: #0b65a8;
                }

                i {
                    background: transparent;
                    margin: 5px;
                }
            }


        }

        .cart {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 12%;

            button {
                width: 8em;
                height: 2.5em;
                //  font-size: 1em; 
                background-color: transparent;
                border: none;
                outline: 1px solid #159347;
                color: #159347;
                border-radius: 3px;
                cursor: pointer;

                &:hover {
                    background: #0b65a8;
                    outline: 1px solid #0b65a8;

                    color: #fff;

                    .cart-basket i {

                        color: #fff;

                    }
                }
            }

            .cart-basket {
                position: relative;
                margin: 1em;

                i {
                    color: #159347;
                }

                span {
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
                    bottom: 10px;
                    left: 10px;
                }
            }
        }
    }
}

.list-enter-from {
    transform: scaleY(0);
}

.list-enter-to {
    transform: scaleY(1);
}

.list-enter-active {
    transition: all 0.2s ease;
    transform-origin: top;
}

.list-leave-from {
    transform: scaleY(1)
}

.list-leave-to {
    transform: scaleY(0);
}

.list-leave-active {
    transition: all .3s ease;
    transform-origin: top;
}

.list-move {
    transition: all 0.3s ease;
}
</style>


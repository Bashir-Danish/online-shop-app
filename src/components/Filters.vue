<script setup lang="ts">
import { useProductStore } from '@/stores/product'
import { onMounted, defineAsyncComponent, ref } from 'vue';
import filterSkeletonVue from './vueSkeleton/filterSkeleton.vue';
const productStore = useProductStore();

const categoryModal = ref(false);


const category = defineAsyncComponent(() =>
  import('@/components/Categories.vue')
)


onMounted(() => {
    productStore.fetchBrandAndPrice()
})

</script>
<template>
    <div v-if="productStore.filterLoading">
        <filterSkeletonVue />
    </div>
    <div class="side-bar" v-else>

        <div class="header-section">
            <div class="filter-header">
                <span>FILTERS</span>
            </div>
            <div class="all-category">
                <span>CATEGORY</span>
                <div class="category">
                    <span class="cat-icon"><vue-feather type="grid" size="1.1em" stroke="#969494"
                            stroke-width="2"></vue-feather></span>
                    <span @click="categoryModal = true">All Categories</span>
                    <span><vue-feather type="chevron-right" size="1.5em" stroke="#969494"
                            stroke-width="2"></vue-feather></span>
                </div>
            </div>
        </div>
        <div class="filter-section">
            <div class="price">
                <div class="header">PRICE</div>
                <ul class="price-ul">
                    <li class="price-li" v-for="price in productStore.priceData">
                        <input type="radio" name="p" :id="price._id"
                            @change="productStore.getFilters('price', price.price, $event)" :key="price._id"
                            :checked="price.checked">
                        <label :for="price._id">{{ price.price }} _ Afg</label>
                    </li>
                </ul>
            </div>
            <div class="brand">
                <div class="header">BRAND</div>
                <div class="brand-search">
                    <vue-feather type="search" size="1.5em" stroke="#969494" stroke-width="1"></vue-feather>
                    <input type="text" placeholder="Search" v-model="productStore.search">
                </div>

                <ul class="brand-ul">
                    <li class="brand-li" v-for="brand in productStore.brandsData">
                        <input type="checkbox" :id="brand._id"
                            @change="productStore.getFilters('brand', brand.brandName, $event)" :checked="brand.checked">
                        <label :for="brand._id">{{ brand.brandName }}</label>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <TransitionGroup name="category">
        <div class="category-modal" v-if="categoryModal">
            <div class="modal-header">
                <div class="header">Select Category</div>
                <button type="button" class="close" @click="categoryModal = false"><vue-feather type="x" size="2em"
                        stroke="#000" stroke-width="1"></vue-feather></button>
            </div>
            <category @closeModal="categoryModal = false" />
        </div>
    </TransitionGroup>
    <div class="container" v-if="categoryModal && !productStore.productLoading" @click="categoryModal = false"></div>
</template>

<style scoped lang="scss">
@import '@/assets/variables.scss';
@import '@/assets/mixin.scss';


.side-bar {
    position: sticky;
    top: 75px;
    max-width: 220px;
    min-width: 220px;
    height: 88vh;
    outline: none;
    color: $gray-15;
    border-top-left-radius: 10px;
    box-shadow: none;
    z-index: 80;

    .header-section {
        .filter-header {
            display: flex;
            justify-content: space-between;
            margin: 1em 1em 0 1em;
            align-items: baseline;

            span {
                font-weight: 600;
                font-size: 12px;
            }
        }

        .all-category {
            background: $white;
            width: 100%;
            padding: 10px;
            margin-top: 0.5em;
            color: $gray-5;
            box-sizing: border-box;

            span {
                font-weight: 600;
                margin: 0 0.3em;
                font-size: 14px;

                &:first-child {
                    font-size: 12px;
                }
            }

            .category {
                display: flex;
                align-items: center;
                font-size: 14px;
                justify-content: flex-start;
                padding: 10px 0;
                color: $gray-15;

                .cat-icon {
                    border: 1px solid $gray-4;
                    display: inline-flex;
                    padding: 2px;
                    border-radius: 5px;
                }

                span {
                    display: inline-flex;
                }

                &:nth-child(2):hover {
                    text-decoration: underline;
                    cursor: pointer;
                }
            }
        }
    }

    .filter-section {
        border-top: 1px solid $gray-2;

        .price,
        .brand {
            padding: 0.8em 1.3em;
            border-bottom: 1px solid $gray-2;

            label {
                cursor: pointer;
                font-size: 14px;
            }

            .header {
                font-size: 12px;
            }

            .price-ul {
                display: flex;
                flex-direction: column;
                height: 120px;
                font-size: 14px;
                margin: 0.5em 0;
            }

            .brand-ul {
                display: flex;
                flex-direction: column;
                max-height: 180px;
                min-height: 180px;
                margin: 0 .5em;
                overflow-y: scroll;
                @include hideScrollbar();
                -ms-overflow-style: none;

                &:hover {
                    @include scrollbar();

                }
            }

            .price-li input[type=radio],
            .brand-li input[type=checkbox] {
                width: 1.25em;
                height: 1.25em;
                margin: 0.6em;
                vertical-align: middle;
                cursor: pointer;
                background: transparent;
                border: 0;
                margin-top: 2px;
                outline: none;
            }

            .brand-search {
                display: flex;
                align-items: center;
                border-bottom: 2px solid $gray-2;
                width: fit-content;
                margin: .5em 0;
                padding: .5em 0;

                input {
                    width: calc(100% - 1em);
                    border: none;
                    outline: none;
                    padding-left: 1em;
                }
            }

        }
    }
}







/* //////////////////////////////////  Category /////////////////////////////////// */

.category-modal {
    position: fixed;
    width: 24%;
    height: 70%;
    max-height: 70%;
    left: 0;
    right: 0;
    margin: 0 auto;
    background: $white;
    box-shadow: 2px 2px 20px $gray-15;
    transition: box-shadow 1.5s ease;
    border-radius: 2%;
    z-index: 300;

    &:hover {
        .modal-header {
            box-shadow: 0px 0px 10px 0px $dOp-1;
            clip-path: inset(0px 0px -10px 0px);
        }
    }

    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid $gray-2;
        .header {
            margin: 1em;
        }

        button {
            background: transparent;
            border: none;
            width: 2em;
            height: 2em;
            margin: 1em;
            cursor: pointer;

            &:hover {
                background: $gray-1;
                border-radius: 25%;
            }
        }
    }
}

.modal-header {
    max-width: 100%;
}

.modal-header .close {
    margin: 0 1em;
}

.category-enter-from {
    opacity: 0;
    transform: scale(0);
}

.category-enter-to {
    opacity: 1;
    transform: scale(1);
}

.category-enter-active {
    transition: all 0.5s ease-in-out;
}

.category-leave-from {
    opacity: 1;
    transform: scale(1);
}

.category-leave-to {
    opacity: 0;
    transform: scale(0);
}

.category-leave-active {
    transition: all 0.5s ease;
}

.category-move {
    transition: all 0.5s ease;
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
    width: 100%;
    height: 120vh;
    background:$dOp-5;
    box-shadow: 10px 10px 10px 10000px $dOp-5;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(-200px);
    z-index: 200;
    animation: 0.5s ease-in-out 0s 1 FadeIn;
}
</style>
<script setup lang="ts">

import { useProductStore } from '@/stores/product'
const productStore = useProductStore();


const closeAll = (item: any) => {

    if (!item.open) {
        productStore.category.forEach((el: any) => el.open = false);
    }
    item.open = !item.open
}
</script>
<template>
    <div class="cat-wrapper">
        <div class="cat-field" v-for=" category in productStore.category" :key="category._id">
            <div class="open-cat">
                <div class="main-cat" @click="closeAll(category)">
                    <span>{{ category.category }}</span>
                    <vue-feather type="plus" size="1rem" stroke="#5e5e5e" stroke-width="2"
                        v-if="!category.open"></vue-feather><vue-feather type="minus" size="1rem" stroke="#5e5e5e"
                        stroke-width="1" v-if="category.open"></vue-feather>
                </div>
                <span class="cat-divider"></span>
                <ul :class="category.open ? 'visible' : 'invisible'">
                    <li @click="productStore.getFilters('category', category.category, $event); $emit('closeModal')">All
                        {{
                            category.category
                        }}</li>

                    <li v-for="parent in category.parent"
                        @click="productStore.getFilters('subcategory', parent.name, $event); $emit('closeModal')">
                        {{ parent.name }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import '@/assets/variables';
@import '@/assets/mixin.scss';

.cat-wrapper {
    overflow-y: scroll;
    height: calc(100% - 70px);
    max-height: calc(100% - 70px);
    width: 100%;
    border-bottom-left-radius: 2%;
    border-bottom-right-radius: 2%;
    @include hideScrollbar();

    &:hover {
        @include scrollbar()
    }

    .main-cat {
        padding: 1em 25px;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        transition: 0.3s ease all;

        i {
            width: 1rem;
            height: 1rem;
            position: absolute;
            right: 1rem;
            cursor: pointer;
        }

        &:hover {
            background: $white;
            background: linear-gradient(90deg, $white 0%, rgba(192, 193, 194, 0.9416141456582633) 0%, rgba(207, 208, 209, 1) 0%, rgba(228, 229, 229, 1) 0%, rgba(235, 236, 236, 1) 0%, rgba(245, 245, 245, 1) 0%, rgba(255, 255, 255, 1) 84%);
        }

        span {
            color: $gray-18;
            font-size: 14px;
            font-weight: 600;
        }
    }


}

.invisible {
    transform: scaleY(0);
    transition: transform 0.3s ease-in-out;
    height: auto;
    transform: scaleY(0);
    transform-origin: top;

    li {
        display: none;
    }
}


.open-cat ul {
    text-align: right;
    width: 100%;
    height: auto;
    font-size: 14px;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
}

.visible {
    overflow: hidden;
    transition: transform 0.3s ease;
    height: auto;
    transform: scaleY(1);
    transform-origin: top;

    li {
        color: $gray-18;
        width: 70%;
        padding: .9rem 1em;
        border-bottom: 1px solid $gray-2;
        text-align: left;
        cursor: pointer;

        &:hover {
            background: $white;
            background: linear-gradient(90deg, $white 0%, rgba(192, 193, 194, 0.9416141456582633) 0%, rgba(207, 208, 209, 1) 0%, rgba(228, 229, 229, 1) 0%, rgba(235, 236, 236, 1) 0%, rgba(245, 245, 245, 1) 0%, rgba(255, 255, 255, 1) 84%);
        }
    }

    span {
        width: 70%;
        padding: 1rem;
        border-bottom: 1px solid $gray-2;
        text-align: left;
        cursor: pointer;
    }
}

.cat-divider {
    border-bottom: 1px solid $gray-2;
    width: 80%;
    display: flex;
    float: right;
}
</style>
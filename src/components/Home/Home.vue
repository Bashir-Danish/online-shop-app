<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue';
import Filters from '@/components/Filters.vue'
import Product from '@/components/product.vue';
import { useProductStore } from '@/stores/product'

import { useCartStore } from '@/stores/cart'


const listViewSkeleton = defineAsyncComponent(() =>
  import('@/components/vueSkeleton/listViewSkeleton.vue')
)
const ProductSkeleton = defineAsyncComponent(() =>
  import('@/components/vueSkeleton/productsSkeleton.vue')
)
const sort = ref('all')
const productStore = useProductStore();
const cartStore = useCartStore();

onMounted(() => {
  productStore.getProduct()
  cartStore.loadCart()
  if (localStorage.getItem("tags")) {
    productStore.tags = JSON.parse(localStorage.getItem("tags") as string);
  }
  if (localStorage.getItem("sort")) {
    sort.value = JSON.parse(localStorage.getItem("sort") as string);
    productStore.params.delete("sort");
    productStore.params.append("sort", sort.value);
  }
})

</script>
<template>
  <div class="content">
    <main>
      <Filters />
      <div class="divider-border"></div>
      <div class="main-content">
        <div class="product-headers">
          <div class="first-header">
            <div class="count">
              <div class="cat-name">All Items</div>
              <span>( {{ productStore.count }} items )</span>
            </div>
            <div class="sort">
              <span>Sort By</span>
              <select name="sort" v-model="sort" id="sort" @change="productStore.getFilters('sort', sort, $event)">
                <option value="all">All</option>
                <!-- <option value="popular">Popularity</option> -->
                <option value="newest">Newest</option>
                <option value="low">Price Low to High</option>
                <option value="high">Price High to Low</option>
              </select>
              <div class="view-buttons">
                <span class="view-icon" @click.stop="productStore.listView = true">
                  <vue-feather type="list" size="1.1em" :stroke="productStore.listViewData ? 'black' : '#ccc'"
                    :stroke-width="productStore.listViewData ? '2' : '3'"></vue-feather>
                </span>
                <span class="view-icon" @click.stop="productStore.listView = false">
                  <vue-feather type="grid" size="1.1em" :fill="productStore.listViewData ? '#ccc' : '#474747'"
                    :stroke="productStore.listViewData ? '#ccc' : '#474747'" stroke-width="1"></vue-feather>
                </span>
              </div>
            </div>
          </div>
          <div class="second-header">
            <TransitionGroup name="tag" appear>
              <div v-if="productStore.tags" v-for="tag in productStore.tags" class="pro-filter-item">
                <span class="tag">{{ Object.values(tag).toString() }}</span>
                <span class="tag-close" @click="productStore.removeTag(tag)"><vue-feather type="x" size="1em"
                    stroke="#000" stroke-width="2"></vue-feather></span>
              </div>
            </TransitionGroup>
          </div>
        </div>
        <div class="main-content" v-if="productStore.productLoading">
          <listViewSkeleton v-if="productStore.listViewData" />
          <ProductSkeleton v-else />
        </div>
        <div v-else :class="productStore.listViewData ? 'listViewProduct' : 'products-container'">
          <Product :list-view-product="productStore.listViewData" v-for="product in productStore.product"
            :data="product" />
        </div>
      </div>
    </main>
  </div>
</template>
<style scoped lang="scss">
@import '@/assets/variables.scss';
@import '@/assets/mixin.scss';

.content {
  padding: 0 1em;

  main {
    display: flex;
    max-width: 1366px;
    min-height: 100vh;
    min-width: 770px;
    margin-top: 20px;
    position: relative;
    margin: 20px auto 0 auto;
    box-shadow: $dOp-2 0px 0px 8px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;

    .divider-border {
      border-right: 1px solid $gray-2;
    }

    .main-content {
      width: 100%;
      background: $white;
      border-top-right-radius: 10px;
      position: relative;
      z-index: 90;

      .product-headers {
        margin: 0 1.5em;
        border-bottom: 1px solid $gray-2;
        transition: all .5s ease;

        .first-header {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .count {
            display: flex;
            font-size: 15px;
            color: $gray-18;
          }

          .sort {
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: end;

            select {
              outline: none;
              width: 30%;
              border: 1px solid $gray-2;
              border-radius: 5px;
              position: relative;
              cursor: pointer;
              padding: .3em 5px .3em 5px !important;
              
              option {
                transition: .5s all ease;
                color: $gray-18;
                min-height: 3em;
              }

            }

            span {
              color: $gray-18;
              font-size: 14px;
              margin-right: 1em;
            }

            .view-buttons {
              display: flex;
              justify-content: end;
              align-items: center;
              width: 15%;
              margin: 0 0 .5em .5em;
              cursor: pointer;

              .view-icon {
                width: 2.5em;
                height: 2.2em;
                padding: .5em;
                margin: .5em 0 0 .1em;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;

                &::after {
                  content: '';
                  width: 100%;
                  height: 100%;
                  background: $gray-1;
                  position: absolute;
                  top: 0;
                  left: 0;
                  bottom: 0;
                  right: 0;
                  z-index: -1;
                  border-radius: 5px;
                  transform: scale(0);
                  transition: all .4s ease;
                }

                &:hover:after {
                  transform: scale(1);
                }

                i {
                  font-size: 20px;
                }
              }


            }
          }
        }

        .second-header {
          display: flex;
          flex-wrap: wrap;
          transition: all .5s ease;

          .pro-filter-item {
            transition: all .5s ease;
            min-width: 4em;
            margin: 0 .5em .5em .5em;
            padding: 5px;
            border-radius: 5px;
            position: relative;
            color: $gray-18;
            transition: all .5s ease;
            box-shadow: 0px 0px 10px 0px $gray-2;
            cursor: pointer;

            &:hover {
              box-shadow: 0 0 10px 0 $gray-2;
            }

            .tag-close {
              position: absolute;
              background: $white;
              width: 1.5em;
              height: 1.5em;
              border-radius: 50%;
              top: 0em;
              right: 0em;
              display: flex;
              justify-content: center;
              align-items: center;
              transition: all .5s ease;
              opacity: 0;

              &:hover {
                opacity: 1;
              }

            }

            .tag {

              &:hover~.tag-close {
                opacity: 1;
              }
            }
          }
        }

      }

      .products-container {
        display: flex;
        flex-wrap: wrap;
        row-gap: 1.5em;
        margin: 0 1.5em 1em 1.5em;
      }

      .listViewProduct {
        display: block;

        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
  }
}

.tag-enter-from {
  opacity: 0;
  transform: scale(0);
}

.tag-enter-to {
  opacity: 1;
  transform: scale(1);
}

.tag-enter-active {
  transition: all 0.5s ease-in-out;
}

.tag-leave-from {
  opacity: 1;
  transform: scale(1);
}

.tag-leave-to {
  opacity: 0;
  transform: scale(0);
}

.tag-leave-active {
  transition: all 0.5s ease-in-out;
  position: absolute;
}

.tag-move {
  transition: all 0.3s ease;
}
</style>

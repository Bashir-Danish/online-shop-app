<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Filters from '@/components/Filters.vue'
import Product from '@/components/product.vue';
import ProductSkeleton from '@/components/vueSkeleton/productsSkeleton.vue';
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'
import listViewSkeleton from '@/components/vueSkeleton/listViewSkeleton.vue';
import Header from '@/components/header.vue';

const sort = ref('all')
const productStore = useProductStore();
const cartStore = useCartStore();

onMounted(() => {
  if (localStorage.getItem("tags")) {
    productStore.tags = JSON.parse(localStorage.getItem("tags") as string);
  }
  if (localStorage.getItem("sort")) {
    sort.value = JSON.parse(localStorage.getItem("sort") as string);
    productStore.params.delete("sort");
    productStore.params.append("sort", sort.value);
  }
  cartStore.loadCart()
  productStore.getProduct()
})
</script>
<template>
  <Header />

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
              <select name="sort" v-model="sort" id="sort" @change="productStore.getFilters('sort', 't', $event)">
                <option value="all">All</option>
                <!-- <option value="popular">Popularity</option> -->
                <option value="newest">Newest</option>
                <option value="low">Price Low to High</option>
                <option value="high">Price High to Low</option>
              </select>
              <div class="view-buttons">
                <vue-feather type="list" size="1.2em" :stroke="productStore.listViewData ? 'black' : '#ccc'"
                  :stroke-width="productStore.listViewData ? '2' : '3'"
                  @click.stop="productStore.listView = true"></vue-feather>
                <vue-feather type="grid" size="1.2em" :fill="productStore.listViewData ? '#ccc' : '#474747'"
                  :stroke="productStore.listViewData ? '#ccc' : '#474747'" stroke-width="1"
                  @click.stop="productStore.listView = false"></vue-feather>
              </div>
            </div>
          </div>
          <div class="second-header">
            <TransitionGroup name="tag" mode="out-in" appear>
              <div v-if="productStore.tags" v-for="tag in productStore.tags" class="pro-filter-item">
                <span class="tag">{{ Object.values(tag).toString() }}</span>
                <span class="tag-close" @click="productStore.removeTag(tag)"><vue-feather type="x" size="1em"
                    stroke="#000" stroke-width="2"></vue-feather></span>
              </div>
            </TransitionGroup>
          </div>
        </div>
        <div v-if="!productStore.productLoading && productStore.product"
          :class="productStore.listViewData ? 'listViewProduct' : 'products-container'">
          <Product :list-view-product="productStore.listViewData" v-for="product in productStore.product"
            :data="product" />
        </div>
        <div class="main-content" v-else>
          <listViewSkeleton v-if="productStore.listViewData" />
          <ProductSkeleton v-else />
        </div>
      </div>
    </main>
  </div>
</template>
<style scoped lang="scss">

@import '@/assets/variables.scss';

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
      border-right: 1px solid $gray-3;
    }

    .main-content {
      width: 100%;
      background: $white;
      border-top-right-radius: 10px;
      position: relative;
      z-index: 90;

      .product-headers {
        margin: 0 1.5em;
        border-bottom: 1px solid $gray-3;

        .first-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: .5em .5em;

          .count {
            display: flex;
            color: $gray-7;
          }

          .sort {
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: end;

            select {
              outline: none;
              width: 30%;
              border: 1px solid $gray-4;
              border-radius: 5px;
              position: relative;
              cursor: pointer;
              padding: .3em 5px .3em 5px !important;

              option {
                transition: .5s all ease;
                color: $gray-7;
                min-height: 3em;
              }

            }

            span {
              color: $gray-7;
              margin-right: 1em;
            }

            .view-buttons {
              display: inline-flex;
              justify-content: space-evenly;
              width: 80px;
              cursor: pointer;

              i {
                padding: .5em;
                transition: all .3s ease-in-out;
                border-radius: 5px;

                &:hover {
                  background: $gray-1;
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
            color: $gray-7;
            transition: all .5s ease;
            box-shadow: 0px 0px 10px 0px $gray-2;
            cursor: pointer;

            &:hover {
              box-shadow: 0 0 10px 0 $gray-3;
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
        // flex-basis: (100 / 4) * 1%;
        flex-wrap: wrap;
        // flex-grow: 1;
        // flex-shrink: 1;
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

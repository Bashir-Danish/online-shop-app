<script setup lang="ts">
import Filters from '@/components/Filters.vue'
import Product from '@/components/product.vue';
import ProductSkeleton from '@/components/vueSkeleton/productsSkeleton.vue';
import { useProductStore } from '@/stores/product'
import { ref } from 'vue';

const productStore = useProductStore();


</script>
<template>
  <div class="content">
    <main>
      <Filters />
      <div class="divider-border"></div>
      <div class="main-content" v-if="!productStore.productLoading && productStore.product">
        <div class="product-headers">
          <div class="first-header">
            <div class="count">
              <div class="cat-name">All Items</div>
              <span>( {{ productStore.product.length }} items )</span>
            </div>
            <div class="sort">
              <span>Sort By</span>
              <select name="sort" id="sort" @change="productStore.getFilters('sort','test',$event)">
                <option value=""></option>
                <option value="all">All</option>
                <!-- <option value="popular">Popularity</option> -->
                <option value="newest">Newest</option>
                <option value="low">Price Low to High</option>
                <option value="high">Price High to Low</option>
              </select>
              <div class="view-buttons">
                <vue-feather type="list" size="1em" stroke="gray" stroke-width="2"
                  @click="productStore.listView = true"></vue-feather>
                <vue-feather type="grid" size="1em" fill="gray" stroke="gray" stroke-width="2"
                  @click="productStore.listView = false"></vue-feather>
              </div>
            </div>
          </div>
          <div class="second-header">
            <div v-if="productStore.tags" v-for="tag in productStore.tags" class="pro-filter-item">
              <span class="tag">{{ Object.values(tag).toString() }}</span>    
              <span class="tag-close" @click="productStore.removeTag(tag)"><vue-feather type="x" size="1em" stroke="#000" stroke-width="2"
                  @click="productStore.listView = false"></vue-feather></span>
            </div>
          </div>
        </div>
        <div :class="productStore.listView ? 'listViewProduct' : 'products-container'">
          <Product :list-view-product="productStore.listView" v-for="product in productStore.product" :data="product" />
        </div>
      </div>
      <div class="main-content" v-else>
        <ProductSkeleton />
      </div>
    </main>
  </div>
</template>
<style scoped>
.content {
  padding: 0 1em;
}

.main-content {
  width: 100%;
  background-color: #ffffff;
  border-top-right-radius: 10px;
  position: relative;
  z-index: 90;
}

.filters-p {
  margin-left: 10px;
}

main {
  display: flex;
  max-width: 1366px;
  min-height: 100vh;
  min-width: 770px;
  margin-top: 20px;
  position: relative;
  margin: 20px auto 0 auto;
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}

.divider-border {
  border-right: 1px solid #d8d8d8;
}

.product-headers {
  margin: 0 1.5em;
  border-bottom: 1px solid #e5e6e9;
}

.first-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5em;
}

.first-header .count {
  display: flex;
}

.count .cat-name,
.count span {  
  color: #414e5a;
  margin-right: 1em;
}

.sort {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: end;
}

.view-buttons {
  display: inline-flex;
  justify-content: space-evenly;
  width: 80px;
  cursor: pointer;
}

.view-buttons i {
  padding: 0.5em;
  transition: all 0.3s ease-in-out;
  border-radius: 5px;

}

.view-buttons i:hover {
  background-color: #e5e6e9;
}

.sort span {
  color: #414e5a;
  margin-right: 1em;
}

.sort select {
  width: 30%;
  border: 1px solid #d8d8d8;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
  padding: .3em 5px .3em 5px !important;

}

.sort select option {
  transition: 0.5s all ease;
  color: #414e5a;
  min-height: 3em;
}

.second-header {
  display: flex;
  flex-wrap: wrap;
}
.second-header div{
  min-width: 4em;
  margin: 0.5em;
  padding: 5px;
  border-radius: 5px;
  position: relative;
  color: #414e5a;
  transition: all .5s ease;
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 5%);
  cursor: pointer;
}
.second-header div:hover{
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 10%);
}
.tag-close{
  position: absolute;
  background-color: #ffffff;
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
}
.tag-close:hover{
  opacity: 1;
}

.tag:hover ~ .tag-close{
  opacity: 1;
}

.products-container {
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  row-gap: 1.5em;
  margin: 0 1.5em;
}

.listViewProduct {
  display: block;

}

.listViewProduct img {
  max-width: 100%;
  max-height: 100%;
}
</style>

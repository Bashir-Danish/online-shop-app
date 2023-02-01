import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import axios from "@/plugins/axios";
import _axios from "axios";

export const useProductStore = defineStore("product", () => {
  const product = ref<any[]>([]);
  const brands = ref<any[]>([]);
  const price = ref<any[]>([]);
  const category = ref<any[]>([]);
  const search = ref("");
  const listView = ref(false);

  const productLoading = ref(false);
  const filterLoading = ref(false);
  let tags = <any>ref([]);

  const brandsData = computed(() => {
    if (search.value) {
      return brands.value.filter((item) =>
        item.brandName.includes(search.value.toLowerCase())
      );
    }
    return brands.value;
  });
  let params = new URLSearchParams();
  const filters = ref({
    category: <string[]>[],
    subCategory: <string[]>[],
    brand: <string[]>[],
    price: 0,
    sort: "all",
  });

  const getFilters = (type: string, value: any, event: any) => {
    // console.log(filters.value);
    tags.value = [];
    if (type === "category") {
      filters.value.category.push(value);
    } else if (type === "subcategory") {
      filters.value.subCategory.push(value);
    } else if (type === "brand") {
      if (event.target.checked) {
        filters.value.brand.push(value);
      } else {
        filters.value.brand.splice(filters.value.brand.indexOf(value), 1);
        tags.value.splice(tags.value.indexOf(value), 1);
      }
    } else if (type === "sort") {
      // filters.value.sort=''
      // filters.value.sort = event.target.value
      params.delete("sort");
      if (event.target.value !== "all") {
        params.append("sort", event.target.value);
      }
    } else {
      filters.value.price = value;
    }
    let keys = Object.keys(filters.value);
    let values = Object.values(filters.value);

    for (let i = 0; i < values.length; i++) {
      let value = values[i];
      let key = keys[i];
      if (Array.isArray(value)) {
        value.map((el) => {
          var obj = <any>{};
          obj[key] = el;
          tags.value.push(obj);
        });
      } else {
        var obj = <any>{};
        obj[key] = value;
        // if(typeof value === 'string')tags.value.push(obj);
        if (value > 0) tags.value.push(obj);
      }
    }
    // console.log(tags.value);
  };
  // access ann search on brands
  const removeTag = (tag: {}) => {
    const key = Object.keys(tag).toString();
    const value = Object.values(tag).toString();
    tags.value = tags.value.filter((item: any) => {
      return item[key] != value;
    });
    if (Object.keys(tag).toString() === "brand") {
      filters.value.brand.splice(
        filters.value.brand.indexOf(Object.values(tag).toString()),
        1
      );
    }
    if (Object.keys(tag).toString() === "category") {
      filters.value.category.splice(
        filters.value.category.indexOf(Object.values(tag).toString()),
        1
      );
    }
    if (Object.keys(tag).toString() === "subCategory") {
      filters.value.subCategory.splice(
        filters.value.subCategory.indexOf(Object.values(tag).toString()),
        1
      );
    }
    if (Object.keys(tag).toString() === "price") {
      filters.value.price = 0
    }
  };
  watch(
    () => tags.value,
    () => {
      if (tags.value) {
        params.delete("category");
        params.delete("subCategory");
        params.delete("brand");
        params.delete("price");
        // params.delete("sort");

        tags.value.forEach((el: any) => {
          params.append(
            Object.keys(el).toString(),
            Object.values(el).toString()
          );
        });
      }
      productsFilter();
    }
  );

  async function productsFilter() {
    productLoading.value = true;
    filterLoading.value = true;
    let request = {
      params: params,
    };
    await axios
      .get("/product/allof", request)
      .then((res: any) => {
        product.value = res.products;
        console.log(product.value);
        setTimeout(() => {
          productLoading.value = false;
          filterLoading.value = false;
        }, 300);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function fetchBrandAndPrice() {
    productLoading.value = true;
    filterLoading.value = true;
    await _axios
      .all([
        axios.get("/category/all"),
        axios.get("/price/all"),
        axios.get("/brands/all"),
        axios.get("/product/all"),
      ])
      .then(
        _axios.spread(
          (categoryData: any, priceData, brandData, productData) => {
            brands.value = brandData.brands;
            price.value = priceData.price;
            category.value = categoryData.category;
            product.value = productData.products;
            if (brands.value && price.value && category.value) {
              filterLoading.value = false;
            }
            if (product.value) productLoading.value = false;
          }
        )
      );
  }

  return {
    listView,
    params,
    product,
    filterLoading,
    price,
    category,
    productLoading,
    filters,
    brandsData,
    search,
    tags,
    getFilters,
    removeTag,
    fetchBrandAndPrice,
    productsFilter,
  };
});

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
  const listView = ref<boolean>();
  const count = ref<number>(0);

  const productLoading = ref(false);
  const filterLoading = ref(false);
  let tags = ref<any[]>([]);

  let params = new URLSearchParams();

  ////////////////////////////////////////////
  //////////////// Getters ///////////////////
  ////////////////////////////////////////////

  const brandsData = computed(() => {
    let checked = <string[]>[];
    let allBrands = brands.value;
    if (search.value !== "") {
      allBrands = allBrands.filter((item) =>
        item.brandName.toLowerCase().includes(search.value.toLowerCase())
      );
    } else {
      allBrands = brands.value;
    }
    if (tags.value) {
      tags.value.find((el: any) => {
        if (Object.keys(el).toString() == "brand") {
          checked.push(el.brand);
        }
      });
    }
    allBrands.forEach((el: any) => {
      if (checked.includes(el.brandName)) {
        el["checked"] = true;
      } else {
        el["checked"] = false;
      }
    });

    return allBrands;
  });

  const priceData = computed(() => {
    let checked = 0;
    tags.value.find((el: any) => {
      if (Object.keys(el).toString() == "price") {
        checked = el.price;
      }
    });
    price.value.forEach((el: any) => {
      if (el.price === checked) {
        el["checked"] = true;
      } else {
        el["checked"] = false;
      }
    });
    return price.value;
  });
  const listViewData = computed(() => {
    if (listView.value == undefined) {
      listView.value =
        JSON.parse(localStorage.getItem("listView") as string) ?? false;
    } else {
      localStorage.setItem("listView", JSON.stringify(listView.value));
    }
    return listView.value;
  });

  ////////////////////////////////////////////
  //////////////// Actions ///////////////////
  ////////////////////////////////////////////
  const getFilters = (type: string, value: any, event: any) => {
    var obj = <any>{};
    if (type === "category") {
      obj["category"] = value;
      tags.value.push(obj);
    } else if (type === "subcategory") {
      obj["subcategory"] = value;
      tags.value.push(obj);
    } else if (type === "sort") {
      params.delete("sort");
      localStorage.setItem("sort", JSON.stringify(event.target.value));
      params.append("sort", event.target.value);
      getProduct();
    } else if (type === "price") {
      tags.value = tags.value.filter(
        (e) => Object.keys(e).toString() !== "price"
      );
      obj["price"] = value;
      tags.value.push(obj);
    } else if (type === "brand") {
      obj["brand"] = value;
      if (event.target.checked) {
        tags.value.push(obj);
      } else {
        tags.value.splice(
          tags.value.findIndex((a) => a.brand === value),
          1
        );
      }
    }
    localStorage.setItem("tags", JSON.stringify(tags.value));
  };

  // access ann search on brands
  const removeTag = (tag: {}) => {
    const key = Object.keys(tag).toString();
    const value = Object.values(tag).toString();
    tags.value = tags.value.filter((item: any) => {
      return item[key] != value;
    });
    localStorage.setItem("tags", JSON.stringify(tags.value));
  };
  watch(
    () => Object.values(tags.value),
    () => {
      params.delete("category");
      params.delete("subcategory");
      params.delete("brand");
      params.delete("price");
      tags.value.forEach((el: any) => {
        params.append(Object.keys(el).toString(), Object.values(el).toString());
      });
      getProduct();
    }
  );

  let offset = 0;
  async function getProduct() {
    productLoading.value = true;
    // filterLoading.value = true;
    params.delete("offset");
    offset = 0;
    let request = {
      params: params,
    };
    await axios
      .get("/product/all", request)
      .then((res: any) => {
        product.value = res.data.products;
        count.value = res.data.count;
        setTimeout(() => {
          productLoading.value = false;
          filterLoading.value = false;
        }, 400);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function getPage() {
    offset++;
    params.delete("offset");
    params.append("offset", offset.toString());
    let request = {
      params: params,
    };
    await axios
      .get("/product/all", request)
      .then((res: any) => {
        res.data.products.forEach((el: any) => {
          product.value.push(el);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function fetchBrandAndPrice() {
    filterLoading.value = true;
    await _axios
      .all([
        axios.get("/category/all"),
        axios.get("/price/all"),
        axios.get("/brands/all"),
      ])
      .then(
        _axios.spread((categoryData: any, priceData, brandData) => {
          brands.value = brandData.data.brands;
          price.value = priceData.data.price;
          category.value = categoryData.data.category;
          // product.value = productData.data.products;
          if (brands.value && price.value && category.value) {
            setTimeout(() => {
              filterLoading.value = false;
            }, 500);
          }
          // if (product.value) productLoading.value = false;
        })
      );
  }

  return {
    listView,
    params,
    product,
    filterLoading,
    priceData,
    category,
    productLoading,
    brandsData,
    search,
    tags,
    count,
    listViewData,
    getPage,
    getFilters,
    removeTag,
    fetchBrandAndPrice,
    getProduct,
  };
});

import { defineStore } from "pinia";
import { ref, watch } from "vue";

interface item {
  _id: string;
  name: string;
  price: number;
  img: string;
  quantity: number;
}

export const useCartStore = defineStore("cart", () => {
  let items = ref<item[]>([]);
  let total = ref<number>(0);

  function loadCart() {
    total.value = 0;
    const cart = localStorage.getItem("items");
    if (cart == null) {
      items.value = [];
      localStorage.setItem("items", JSON.stringify(items.value));
    } else {
      items.value = JSON.parse(cart);
      items.value.forEach((e) => {
        total.value += e.price * e.quantity;
      });
    }
  }

  function addToCart(product: any) {
    items.value = JSON.parse(localStorage.getItem("items") as string);

    let item: item = {
      _id: product._id,
      name: product.name,
      price: product.price,
      img: product.img[0],
      quantity: 1,
    };
    items.value.push(item);
    localStorage.setItem("items", JSON.stringify(items.value));
  }
  function changeQuantity(act: string, id: string) {
    total.value = 0
    items.value.find((i) => {
      if (i._id === id) {
        if (act == "increase") {
          i.quantity++;
        }
        if (act == "decrease") {
          i.quantity--;
          if (i.quantity < 1) {
            items.value = items.value.filter((i) => i._id !== id);
          }
        }
      }
    });
    items.value.forEach((e) => {
      total.value += (e.price * e.quantity);
    });
    localStorage.setItem("items", JSON.stringify(items.value));
  }

  function removeItem(id: string) {
    items.value = items.value.filter((item) => item._id !== id);
    localStorage.setItem("items", JSON.stringify(items.value));
  }
  function removeAll() {
    items.value = [];
    localStorage.setItem("items", JSON.stringify(items.value));
  }
  return {
    items,
    total,
    loadCart,
    addToCart,
    changeQuantity,
    removeItem,
    removeAll,
  };
});

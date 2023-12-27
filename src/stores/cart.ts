import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useAuthStore } from "@/stores/auth";

interface item {
  _id: string;
  name: string;
  price: number;
  img: any;
  quantity: number;
}

export const useCartStore = defineStore("cart", () => {
  let items = ref<item[]>([]);
  let total = ref<number>(0);
  const authStore = useAuthStore();

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
      img: [],
      quantity: 1,
    };
    authStore.notifeeMsg = "Item Added to Cart";
    item.img.push(product.img[0]);
    if (!items.value.find((e) => e._id == product._id)) {
      items.value.push(item);
      localStorage.setItem("items", JSON.stringify(items.value));
    }
  }
  function changeQuantity(act: string, id: string) {
    total.value = 0;
    items.value.find((i) => {
      if (i._id === id) {
        if (act == "increase") {
          i.quantity++;
        }
        if (act == "decrease") {
          i.quantity--;
          if (i.quantity < 1) {
            authStore.notifeeMsg = "Item removed from Cart";
            items.value = items.value.filter((i) => i._id !== id);
          }
        }
      }
    });
    items.value.forEach((e) => {
      total.value += e.price * e.quantity;
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

import { defineStore } from "pinia";
import { ref } from "vue";

interface Cart {
    product :Array<{id:number ,qty:number}>
}

const useCartStore = defineStore('cart', () => {
    const Cart = ref<Cart>();

    function loadCart() {
        const cart = localStorage.getItem('cart');
        if (!cart) {
            
        } else {
            Cart.value = JSON.parse(cart)
        }
    }

});
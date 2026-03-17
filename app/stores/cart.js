import { defineStore } from "pinia";
import { useUserStore } from "./auth";

export const useCartStore = defineStore("cart", {
  state: () => ({
    carts: {},
  }),

  getters: {
    currentUserCart(state) {
      const userStore = useUserStore();
      const email = userStore.user?.email;

      if (!email) return [];

      return state.carts[email] || [];
    },

    totalItems() {
      return this.currentUserCart.reduce(
        (total, item) => total + item.quantity,
        0,
      );
    },

    totalPrice() {
      return this.currentUserCart.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },

    totalOriginalPrice() {
      return this.currentUserCart.reduce((total, item) => {
        const original = item.originalPrice || item.price;
        return total + original * item.quantity;
      }, 0);
    },

    totalSavings() {
      return this.totalOriginalPrice - this.totalPrice;
    },
  },

  actions: {
    addToCart(product) {
      const userStore = useUserStore();
      const email = userStore.user?.email;

      if (!email) return;

      if (!this.carts[email]) {
        this.carts[email] = [];
      }

      const basePrice = product.originalPrice || product.price;

      const finalPrice =
        product.discount_percent > 0
          ? Math.round(basePrice - basePrice * (product.discount_percent / 100))
          : basePrice;

      const existingProduct = this.carts[email].find(
        (item) => item.id === product.id,
      );

      if (existingProduct) {
        if (existingProduct.quantity < (product.stock || 0)) {
          existingProduct.quantity++;

          // update latest pricing/details in case product changed
          existingProduct.price = finalPrice;
          existingProduct.originalPrice = basePrice;
          existingProduct.discount_percent = product.discount_percent || 0;
          existingProduct.stock = product.stock || 0;
          existingProduct.title = product.title || existingProduct.title;
          existingProduct.image = product.image || existingProduct.image;
        }
      } else {
        if ((product.stock || 0) > 0) {
          this.carts[email].push({
            ...product,
            price: finalPrice,
            originalPrice: basePrice,
            discount_percent: product.discount_percent || 0,
            quantity: 1,
          });
        }
      }
    },

    decreaseQuantity(productId) {
      const userStore = useUserStore();
      const email = userStore.user?.email;

      if (!email) return;

      const product = this.carts[email]?.find((item) => item.id === productId);

      if (!product) return;

      if (product.quantity > 1) {
        product.quantity--;
      } else {
        this.removeFromCart(productId);
      }
    },

    removeFromCart(productId) {
      const userStore = useUserStore();
      const email = userStore.user?.email;

      if (!email) return;

      this.carts[email] = this.carts[email].filter(
        (item) => item.id !== productId,
      );
    },

    clearCart() {
      const userStore = useUserStore();
      const email = userStore.user?.email;

      if (!email) return;

      this.carts[email] = [];
    },

    refreshCartPrices(products) {
      const userStore = useUserStore();
      const email = userStore.user?.email;

      if (!email || !this.carts[email]) return;

      this.carts[email] = this.carts[email].map((cartItem) => {
        const latestProduct = products.find(
          (p) => String(p.id) === String(cartItem.id),
        );

        if (!latestProduct) return cartItem;

        const basePrice = latestProduct.price;
        const finalPrice =
          latestProduct.discount_percent > 0
            ? Math.round(
                basePrice - basePrice * (latestProduct.discount_percent / 100),
              )
            : basePrice;

        return {
          ...cartItem,
          ...latestProduct,
          price: finalPrice,
          originalPrice: basePrice,
          discount_percent: latestProduct.discount_percent || 0,
        };
      });
    },
  },

  persist: true,
});

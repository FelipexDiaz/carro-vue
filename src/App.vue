<template>
  <div class="d-flex flex-column h-100">
    <!-- Navbar -->
    <Navbar
      :user="user"
      :cartCount="cartCount"
      @navigate="currentView = $event"
      @logout="logout"
    />

    <!-- Contenido -->
<main class="flex-grow-1 overflow-auto">
  <div v-if="currentView === 'login'">
    <Login @login-success="onLoginSuccess" />
  </div>
  <div v-else-if="currentView === 'products'">
    <ProductList @add-to-cart="addToCart" />
  </div>
  <div v-else-if="currentView === 'cart'">
    <Cart
      :cart="cart"
      @remove-from-cart="removeFromCart"
      @update-cart="updateCart"
      @checkout="checkout"
    />
  </div>
  <div v-else-if="currentView === 'orders'">
    <MisCompras />
  </div>
</main>

  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Login from "./components/Login.vue";
import ProductList from "./components/ProductList.vue";
import Cart from "./components/Cart.vue";
import { Auth } from "./api/auth";
import MisCompras from "./components/MisCompras.vue";



export default {
  components: { Navbar, Login, ProductList, Cart, MisCompras },
  data() {
    return {
      user: null,
      cart: [],
      currentView: "products",
    };
  },
  computed: {
    cartCount() {
      return this.cart.reduce((sum, item) => sum + item.cantidad, 0);
    },
  },
  methods: {
checkout() {
      if (this.cart.length === 0) return;

      const compra = {
        fecha: new Date().toLocaleString(),
        items: [...this.cart],
        total: this.cart.reduce(
          (sum, item) => sum + item.precio * item.cantidad,
          0
        ),
      };

      let compras = JSON.parse(localStorage.getItem("compras")) || [];
      compras.push(compra);
      localStorage.setItem("compras", JSON.stringify(compras));

      // limpiar carrito
      this.cart = [];

      // ir a mis compras
      this.currentView = "orders";
    },

    onLoginSuccess(user) {
      this.user = user;
      this.currentView = "products";
    },
    async logout() {
      await Auth.logout();
      this.user = null;
      this.currentView = "login";
    },
    addToCart(product) {
      const existing = this.cart.find((item) => item.id === product.id);
      if (existing) {
        existing.cantidad += product.cantidad;
      } else {
        this.cart.push(product);
      }
    },
    removeFromCart(id) {
      this.cart = this.cart.filter((item) => item.id !== id);
    },
    updateCart(updatedItem) {
      const item = this.cart.find((i) => i.id === updatedItem.id);
      if (item) item.cantidad = updatedItem.cantidad;
    },
  },
};
</script>

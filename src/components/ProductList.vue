<template>
  <div class="container-fluid py-4">
    <h2 class="mb-3">Productos</h2>

    <input
      v-model="search"
      type="text"
      placeholder="Buscar producto..."
      class="form-control mb-4"
    />

    <div class="row g-4">
      <div
        v-for="p in filteredProducts"
        :key="p.id"
        class="col-12 col-sm-6 col-lg-4"
      >
        <div class="card h-100 shadow-sm">
          <img
            :src="p.thumbnail"
            :alt="p.title"
            class="card-img-top"
            style="object-fit: cover; height: 200px;"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ p.title }}</h5>
            <p class="card-text text-muted small">{{ p.description }}</p>
            <p class="fw-bold">$ {{ p.price }}</p>
            <div class="mt-auto">
              <div class="input-group">
                <input
                  type="number"
                  class="form-control"
                  v-model.number="quantities[p.id]"
                  min="1"
                />
                <button class="btn btn-success" @click="addToCart(p)">
                  Añadir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading y error -->
    <div v-if="loading" class="text-center mt-4">
      <div class="spinner-border" role="status"></div>
    </div>
    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
  </div>
</template>

<script>
import { fetchProducts } from "../api/products";

export default {
  emits: ["add-to-cart"],
  data() {
    return {
      productos: [],
      search: "",
      quantities: {},
      loading: true,
      error: null,
    };
  },
  computed: {
    filteredProducts() {
      return this.productos.filter((p) =>
        p.title.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  async created() {
    try {
      this.loading = true;
      this.productos = await fetchProducts();
      this.productos.forEach((p) => (this.quantities[p.id] = 1));
    } catch (err) {
      this.error = "Error cargando productos";
    } finally {
      this.loading = false;
    }
  },
methods: {
  addToCart(product) {
    this.$emit("add-to-cart", {
      id: product.id,
      nombre: product.title,
      precio: product.price,
      cantidad: this.quantities[product.id],
      thumbnail: product.thumbnail, // 👈 miniatura añadida
    });
  },
},
};
</script>

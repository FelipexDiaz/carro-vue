<template>
  <div class="container-fluid py-4">
    <h2>Carrito de compras</h2>

    <div v-if="cart.length === 0" class="alert alert-info mt-3">
      Carrito vacío
    </div>

    <div v-else>
      <ul class="list-group mb-3">
        <li
          v-for="item in cart"
          :key="item.id"
          class="list-group-item d-flex align-items-center justify-content-between"
        >
          <!-- Miniatura -->
          <img
            :src="item.thumbnail"
            :alt="item.nombre"
            class="me-3"
            style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;"
          />

          <!-- Detalles -->
          <div class="flex-grow-1">
            <h6 class="mb-1">{{ item.nombre }}</h6>
            <small class="text-muted">Precio: ${{ item.precio.toFixed(2) }}</small>
          </div>

          <!-- Cantidad editable -->
          <div class="d-flex align-items-center">
            <input
              type="number"
              class="form-control form-control-sm me-2"
              style="width: 80px;"
              v-model.number="item.cantidad"
              min="1"
              @change="updateQuantity(item)"
            />
            <span class="fw-bold me-3">
              ${{ (item.precio * item.cantidad).toFixed(2) }}
            </span>
            <button
              class="btn btn-sm btn-danger"
              @click="$emit('remove-from-cart', item.id)"
            >
              Eliminar
            </button>
          </div>
        </li>
      </ul>

      <!-- Total -->
      <div class="text-end mb-3">
        <h4>Total: ${{ total }}</h4>
      </div>

      <!-- Botón Comprar -->
      <div class="text-end">
        <button class="btn btn-primary" @click="$emit('checkout')">
          Comprar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cart"],
  emits: ["update-cart", "remove-from-cart", "checkout"],
  computed: {
    total() {
      return (
        Math.round(
          this.cart.reduce(
            (sum, item) => sum + item.precio * item.cantidad,
            0
          ) * 100
        ) / 100
      ).toFixed(2);
    },
  },
  methods: {
    updateQuantity(item) {
      if (item.cantidad < 1) item.cantidad = 1;
      this.$emit("update-cart", { ...item });
    },
  },
};
</script>

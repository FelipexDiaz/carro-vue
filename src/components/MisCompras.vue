<template>
  <div class="container py-4">
    <h2>Mis Compras</h2>

    <div v-if="compras.length === 0" class="alert alert-info mt-3">
      Aún no has realizado compras.
    </div>

    <div v-else>
      <div
        v-for="(compra, index) in compras"
        :key="index"
        class="card mb-4 shadow-sm"
      >
        <div class="card-header">
          <strong>Compra #{{ index + 1 }}</strong> - 
          <small>{{ compra.fecha }}</small>
        </div>
        <ul class="list-group list-group-flush">
          <li
            v-for="item in compra.items"
            :key="item.id"
            class="list-group-item d-flex align-items-center justify-content-between"
          >
            <div class="d-flex align-items-center">
              <img
                :src="item.thumbnail"
                alt="miniatura"
                style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px; margin-right: 10px;"
              />
              <div>
                <h6 class="mb-0">{{ item.nombre }}</h6>
                <small>Cantidad: {{ item.cantidad }}</small>
              </div>
            </div>
            <span class="fw-bold">${{ (item.precio * item.cantidad).toFixed(2) }}</span>
          </li>
        </ul>
        <div class="card-footer text-end">
          <strong>Total: ${{ compra.total.toFixed(2) }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      compras: [],
    };
  },
  created() {
    const stored = localStorage.getItem("compras");
    if (stored) {
      this.compras = JSON.parse(stored);
    }
  },
};
</script>

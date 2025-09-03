<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Mi Tienda</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a
              href="#"
              class="nav-link"
              @click.prevent="$emit('navigate', 'products')"
              >Inicio</a
            >
          </li>
          <li class="nav-item position-relative">
            <a
              href="#"
              class="nav-link"
              @click.prevent="$emit('navigate', 'cart')"
            >
              Carrito
              <span
                v-if="cartCount > 0"
                class="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle"
              >
                {{ cartCount }}
              </span>
            </a>
          </li>
<li class="nav-item">
  <a
    href="#"
    class="nav-link"
    @click.prevent="$emit('navigate', 'orders')"
  >
    Mis Compras
  </a>
</li>

        </ul>

        <div class="d-flex">
          <a
            v-if="!user"
            href="#"
            class="btn btn-outline-light btn-sm"
            @click.prevent="$emit('navigate', 'login')"
          >
            Login
          </a>
          <div v-else class="text-white d-flex align-items-center">
            Bienvenido, <b class="ms-1">{{ user.name }}</b>
            <button class="btn btn-sm btn-danger ms-2" @click="$emit('logout')">
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    user: Object,
    cartCount: {
      type: Number,
      default: 0,
    },
  },
};
</script>

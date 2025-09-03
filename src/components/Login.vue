<template>
  <div class="container-fluid d-flex align-items-center justify-content-center vh-100">
    <div class="col-12 col-sm-8 col-md-6 col-lg-4">
      <div class="card shadow-lg p-4">
        <h2 class="text-center mb-4">Iniciar sesión</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label class="form-label">Correo</label>
            <input v-model="email" type="email" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input v-model="password" type="password" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Entrar</button>
        </form>
        <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Auth } from "../api/auth";

export default {
  emits: ["login-success"],
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async handleLogin() {
      try {
        const user = await Auth.login({
          email: this.email,
          password: this.password,
        });
        this.$emit("login-success", user);
      } catch (err) {
        this.error = err.message;
      }
    },
  },
};
</script>

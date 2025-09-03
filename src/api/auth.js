// api/auth.js
export const Auth = {
  login(creds) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          creds.email === "usuario1@mitienda.com" &&
          creds.password === "password"
        ) {
          resolve({ name: "Usuario 1", email: creds.email });
        } else {
          reject(new Error("Credenciales inválidas"));
        }
      }, 800); // simulamos retardo de API
    });
  },
  logout() {
    return Promise.resolve(true);
  },
};

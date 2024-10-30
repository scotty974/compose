<script setup></script>

<template>
  <div>
    <h1>Liste des utilisateurs</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.username }}
      </li>
    </ul>
  </div>
  <div>
    <h2>Inscrit toi bg</h2>
    <form method="post" @submit.prevent="addUser(username, email, password)">
      <label for="username">Nom d'utilisateur</label>
      <input type="text" name="username" id="username" v-model="username" />
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="email" />
      <label for="password">Mot de passe</label>
      <input type="password" name="password" id="password" v-model="password" />
      <button type="submit" >
        Inscription
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      email: "",
      username: "",
      password: "",
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      const resp = await fetch("http://localhost:3000/users");
      const data = await resp.json();
      this.users = data;
    },
    async addUser(username, email, password) {
      const resp = await fetch("http://localhost:3000/register", {
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (resp.ok) {
        this.getUsers();
      }
    },
  },
};
</script>

<script setup>
import { ref, onMounted } from "vue";
import { getUsers, addUser, deleteUser, updateUser } from "./service/service";

const users = ref([]);
const email = ref("");
const username = ref("");
const password = ref("");
const editingUser = ref(null); // Pour stocker l'utilisateur en cours d'édition
const editedUsername = ref(""); // Pour stocker le nouveau nom d'utilisateur

// Fonction pour récupérer les utilisateurs
async function fetchUsers() {
  users.value = await getUsers();
}

// Récupération des utilisateurs lors du montage du composant
onMounted(fetchUsers);

// Fonction pour ajouter un utilisateur
async function handleAddUser() {
  const response = await addUser(username.value, email.value, password.value);
  console.log(response);
  if (response) {
    await fetchUsers(); // Rafraîchir la liste des utilisateurs après ajout
    // Réinitialiser les champs du formulaire
    username.value = "";
    email.value = "";
    password.value = "";
  }
}

// Fonction pour supprimer un utilisateur
async function deleteUsers(id) {
  const response = await deleteUser(id);
  if (response) {
    await fetchUsers(); // Rafraîchir la liste des utilisateurs après suppression
  } else {
    console.error("Failed to delete user");
  }
}

// Fonction pour commencer l'édition d'un utilisateur
function startEdit(user) {
  editingUser.value = user; // Stocke l'utilisateur à modifier
  editedUsername.value = user.username; // Prend le nom actuel pour le modifier
}

// Fonction pour mettre à jour l'utilisateur
async function handleUpdateUser() {
  if (!editingUser.value) return; // Vérifier si un utilisateur est en cours d'édition
  const response = await updateUser(editingUser.value.id, editedUsername.value, editingUser.value.email); // Vous pouvez passer l'email si vous le souhaitez
  if (response && response.success) {
    await fetchUsers(); // Rafraîchir la liste après modification
    cancelEdit(); // Annuler l'édition
  } else {
    console.error("Failed to update user");
  }
}

// Fonction pour annuler l'édition
function cancelEdit() {
  editingUser.value = null; // Réinitialiser l'utilisateur en cours d'édition
  editedUsername.value = ""; // Réinitialiser le champ de nom d'utilisateur
}
</script>

<template>
  <div>
    <h1>Liste des utilisateurs</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        <span v-if="editingUser && editingUser.id === user.id">
          <input v-model="editedUsername" />
          <button @click="handleUpdateUser">✔️</button>
          <button @click="cancelEdit">❌</button>
        </span>
        <span v-else>
          {{ user.username }} 
          <button @click="startEdit(user)">✏️</button>
          <button @click="deleteUsers(user.id)">🗑</button>
        </span>
      </li>
    </ul>
  </div>

  <div>
    <h2>Inscris-toi bg</h2>
    <form @submit.prevent="handleAddUser">
      <label for="username">Nom d'utilisateur</label>
      <input type="text" name="username" id="username" v-model="username" />

      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="email" />

      <label for="password">Mot de passe</label>
      <input type="password" name="password" id="password" v-model="password" />

      <button type="submit">Inscription</button>
    </form>
  </div>
</template>

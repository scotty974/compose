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
  <div class="container">
    <h1>Liste des utilisateurs</h1>
    <ul class="user-list">
      <li v-for="user in users" :key="user.id" class="user-item">
        <span v-if="editingUser && editingUser.id === user.id">
          <input v-model="editedUsername" class="edit-input" />
          <button @click="handleUpdateUser" class="update-button">✔️</button>
          <button @click="cancelEdit" class="cancel-button">❌</button>
        </span>
        <span v-else>
          {{ user.username }} 
          <button @click="startEdit(user)" class="edit-button">✏️</button>
          <button @click="deleteUsers(user.id)" class="delete-button">🗑</button>
        </span>
      </li>
    </ul>

    <div class="form-container">
      <h2>Inscris-toi</h2>
      <form @submit.prevent="handleAddUser" class="signup-form">
        <label for="username">Nom d'utilisateur</label>
        <input type="text" name="username" id="username" v-model="username" class="input-field" required />

        <label for="email">Email</label>
        <input type="email" name="email" id="email" v-model="email" class="input-field" required />

        <label for="password">Mot de passe</label>
        <input type="password" name="password" id="password" v-model="password" class="input-field" required />

        <button type="submit" class="submit-button">Inscription</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1, h2 {
  color: #333;
}

.user-list {
  list-style-type: none;
  padding: 0;
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.user-item:last-child {
  border-bottom: none;
}

.edit-input {
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.edit-button, .delete-button, .update-button, .cancel-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #007BFF;
  font-size: 1rem;
  transition: color 0.3s;
}

.edit-button:hover, .delete-button:hover, .update-button:hover, .cancel-button:hover {
  color: #0056b3;
}

.form-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.signup-form {
  display: flex;
  flex-direction: column;
}

.input-field {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>

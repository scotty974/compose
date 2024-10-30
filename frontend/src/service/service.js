import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export async function getUsers() {
  try {
    const resp = await api.get("/users");
    if (resp) {
      return resp.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function addUser(username, email, password) {
  try {
    await api.post("/register", {
      username: username,
      email: email,
      password: password,
    });
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUser(id) {
  try {
    await api.delete(`/users/${id}`);
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(id, username, email, password) {
    try {
      const response = await api.patch(`/users/${id}`, {
        username: username,
        email: email,
        password: password,
      });
      
      if (response.status === 200) {
        console.log("Utilisateur mis à jour");
        return {
          success: true,
        };
      } else {
        console.error("Erreur lors de la mise à jour de l'utilisateur", response);
        return {
          success: false,
          error: response.data || "Erreur inconnue",
        };
      }
    } catch (error) {
      console.error("Erreur de requête", error);
      return {
        success: false,
        error: error.response ? error.response.data : "Erreur de connexion",
      };
    }
  }
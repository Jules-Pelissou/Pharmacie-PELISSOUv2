<script setup>
import { ref } from "vue";

// Ref de la photo
const photo = ref(null); // --> variable qui va contenir le fichier en base64

let medoc = {
  denomination: "",
  formepharmaceutique: "",
  qte: 1,
  photo: "",
};

// Permet de remettre à 0 les champs après un envoi
function resetChamps() {
  let champs = document.getElementsByTagName("input");
  for (let elmnt of champs) {
    elmnt.value = "";
  }
}

// Fonction permettant l'envoi d'images
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return; // Si l'utilisateur annule la sélection du fichier, on ne fait rien
  // FileReader est un objet JavaScript permettant de lire le contenu d'un fichier
  // de manière asynchrone.
  const reader = new FileReader();
  reader.onload = () => {
    // definir le traitement asynchrone du contenu du fichier
    photo.value = reader.result; // --> convertit le contenu du fichier en base64
    medoc.photo = photo.value;
  };
  reader.readAsDataURL(file); // lance la lecture du fichier et donc la conversion en base64
};
</script>
<template>
  <h2>Ajouter un medicament :</h2>
  <form
    @submit.prevent="
      $emit('eventFormAdd', medoc);
      resetChamps();
    "
  >
    <input
      type="text"
      placeholder="Médicament à ajouter"
      v-model="medoc.denomination"
      required
    />
    <input type="number" v-model="medoc.qte" required />
    <input
      type="text"
      placeholder="Forme pharmaceutique"
      v-model="medoc.formepharmaceutique"
      required
    />
    <input id="photo" @change="handleFileUpload" type="file" />
    <button>Envoyer</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

button {
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: #0056b3;
}

h2 {
  text-align: center;
}
</style>

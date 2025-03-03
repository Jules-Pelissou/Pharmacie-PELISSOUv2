<script setup>
import { reactive } from "vue";

let message = "";
</script>
<template>
  <header>
    <h4>Ma Pharmacie</h4>
    <div class="search-container">
      <input
        class="recherche"
        type="text"
        placeholder="Médicament à chercher"
        v-model="message"
      />
      <button @click="$emit('eventRechercheMedicament', message)">
        Rechercher
      </button>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  background: #007bff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: white;
}

h4 {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
}

input {
  flex-grow: 1;
  max-width: 300px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  margin: 0 10px;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

button {
  padding: 10px 15px;
  border: none;
  background: white;
  border-radius: 5px;
  font-size: 16px;
}

button:hover {
  background: #f0f0f0;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 10px; /* Espacement entre input et bouton */
}
</style>

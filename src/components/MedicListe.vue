<script setup>
import { onMounted, defineProps, reactive, defineEmits } from "vue";

import ModifForm from "/project/workspace/src/components/ModifForm.vue";

// Props

// Récupère la liste des médicaments
const props = defineProps(["listeMedocs", "medicSpe"]);

// Gestion de l'état d'affichage ou non de la modification
const etatModif = reactive({ etat: 0 });

// Mémoire de l'élément cliqué sinon tous les forms s'ouvrent et se ferment
const elmntClique = reactive({ id: 0 });

// Définition de l'émit pour récupérer les infos spé d'un médicament

let emit = defineEmits(["eventRecupMedicSpeListe", "eventModifMedic"]);

// Fonction qui gère le changemnt d'état
function modifForm(id) {
  if (etatModif.etat == 1 && elmntClique.id == id) {
    etatModif.etat = 0;
  } else {
    etatModif.etat = 1;
  }
  elmntClique.id = id;
}

function handleEmitGetMedicSpe(id) {
  console.log(id);
  emit("eventRecupMedicSpeListe", id);
}

function handlerEmitModifMedic(infos) {
  console.log(infos);
  emit("eventModifMedic", infos);
}
</script>

<template>
  <h1 class="titre">Liste des médicaments</h1>
  <table class="medicament-table">
    <thead>
      <tr>
        <th class="element-tab element-th-tab">Nom</th>
        <th class="element-tab element-th-tab">Forme</th>
        <th class="element-tab element-th-tab">Quantité</th>
        <th class="element-tab element-th-tab">Image</th>
        <th class="element-tab element-th-tab">Actions</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="medicament in props.listeMedocs" :key="medicament.id">
        <tr>
          <td class="element-tab">{{ medicament.denomination }}</td>
          <td class="element-tab">{{ medicament.formepharmaceutique }}</td>
          <td class="element-tab">{{ medicament.qte }}</td>
          <td class="element-tab">
            <img
              class="image"
              :src="
                medicament.photo
                  ? 'https://apipharmacie.pecatte.fr/images/' + medicament.photo
                  : '/project/workspace/src/assets/generique.jpg'
              "
              alt="Image du médicament"
            />
          </td>
          <td class="element-tab">
            <button class="qte" @click="$emit('eventAjoutQte', medicament.id)">
              +1
            </button>
            <button
              class="qte"
              @click="$emit('eventRetraitQte', medicament.id)"
            >
              -1
            </button>
            <button class="modifier" @click="modifForm(medicament.id)">
              Modifier
            </button>
            <button
              class="supprimer"
              @click="$emit('eventDeleteMedoc', medicament.id)"
            >
              Supprimer
            </button>
          </td>
        </tr>
        <tr
          v-if="etatModif.etat == 1 && elmntClique.id === medicament.id"
          class="form-row"
        >
          <td colspan="5" class="element-tab">
            <ModifForm
              :idMedic="elmntClique.id"
              :medicSpe="props.medicSpe"
              @eventRecupMedicSpe="handleEmitGetMedicSpe"
              @eventFormModif="handlerEmitModifMedic"
            />
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style scoped>
.titre {
  margin: auto;
  width: 80%;
}

.medicament-table {
  width: 75%;
  border-collapse: collapse;
  margin: auto;
}

.element-tab {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

.element-th-tab {
  background-color: #f4f4f4;
  font-weight: bold;
}

.image {
  width: 80px;
  height: 60px;
}

.supprimer {
  margin: 5px;
  padding: 5px 10px;
  border: none;
  background-color: #fa0000;
  color: white;
  border-radius: 5px;
}

.modifier {
  margin: 5px;
  padding: 5px 10px;
  border: none;
  background-color: #24f775;
  color: white;
  border-radius: 5px;
}

.qte {
  margin: 5px;
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
}

.qte:hover {
  background-color: #0056b3;
}

.modifier:hover {
  background-color: #24f775b2;
}

.supprimer:hover {
  background-color: #fa00009e;
}

.form-row td {
  background-color: #f9f9f9;
  padding: 15px;
  text-align: center;
}
</style>

<script setup>
import { onMounted, defineProps, defineEmits, ref, watch } from "vue";

// Props du num numPharma
const props = defineProps(["idMedic", "medicSpe"]);

// Ref de la photo
const photo = ref(null); // --> variable qui va contenir le fichier en base64

// Dico réactif qui permet de modifier l'affigage dès qu'on a les infos
const medocModif = ref({
  id: 0,
  denomination: "",
  formepharmaceutique: "",
  qte: 1,
  photo: "",
});

// Émit pour récupérer les informations du médicament choisi
let emit = defineEmits(["eventRecupMedicSpe"]);

onMounted(() => emit("eventRecupMedicSpe", props.idMedic));

// On observe et met à jour dès qu'on obtient les infos de medicSpé dans le formulaire
watch(
  // Ici props.medicSpe.value => est sous la variable infoMedicSpe
  () => props.medicSpe.value,
  (infoMedicSpe) => {
    // On vérifie si infoMedicSpe existe si oui on met les valeurs
    if (infoMedicSpe) {
      // La on renseigne toutes les valeurs du props dans notre dico si elles existent
      // sinon on les remplace par des valeurs génériques
      // On met pas la photo pour éviter d'avoir "médicament.XXX" dans photo et fausser la photo lors de la modif
      medocModif.value.id = infoMedicSpe.id || 1;
      medocModif.value.denomination = infoMedicSpe.denomination || "";
      medocModif.value.formepharmaceutique =
        infoMedicSpe.formepharmaceutique || "";
      medocModif.value.qte = infoMedicSpe.qte || 1;
    }
  }
);

console.log(medocModif);

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
    medocModif.value.photo = photo.value;
  };
  reader.readAsDataURL(file); // lance la lecture du fichier et donc la conversion en base64
};
</script>

<template>
  <h4>Modifier le medicament :</h4>
  <form @submit.prevent="$emit('eventFormModif', medocModif)">
    <input
      type="text"
      placeholder="Truc"
      v-model="medocModif.denomination"
      required
    />
    <input type="number" v-model="medocModif.qte" required />
    <input
      type="text"
      placeholder="Forme pharmaceutique"
      v-model="medocModif.formepharmaceutique"
      required
    />
    <input id="photo" @change="handleFileUpload" type="file" />
    <button>Modifier</button>
  </form>
</template>

<style scoped></style>

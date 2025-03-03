<script setup>
import { onMounted, defineProps, reactive } from "vue";

// Import des composants
import FormMedic from "./FormMedic.vue";
import MedicListe from "./MedicListe.vue";
import FormRechMedic from "./FormRechMedic.vue";

let numPharma = 40;

// Liste réactive des médicaments
const listeMedocs = reactive([]);

// Médicament Spécifique
const medicSpe = reactive({});

const etatAjout = reactive({ etat: 0 });

const motRecherche = reactive({ mot: "" });

// Fonction d'ajout des médicaments
function handleAddMedic(medoc) {
  const url = `https://apipharmacie.pecatte.fr/api/${numPharma}/medicaments`;
  console.log(medoc);
  console.log(url);

  // Vérification des données dans médoc,
  // si la qte n'est pas positive ou est à 0 on l'a met automatiquement à 1
  if (medoc.qte <= 0) {
    medoc.qte = 1;
  }
  // Idem, si la forme pharma n'est pas renseignée on met de base des gouttes
  if (medoc.formepharmaceutique == "") {
    medoc.formepharmaceutique = "Gouttes";
  }

  console.log("Données envoyées :", JSON.stringify(medoc));

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const fetchOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(medoc),
  };

  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      // Refresh la liste dans le front
      getMedic();
    });
}

// Fonction de suppression des médicaments
function handleDeleteMedic(id) {
  const url = `https://apipharmacie.pecatte.fr/api/${numPharma}/medicaments/${id}`;
  const fetchOptions = { method: "DELETE" };

  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      // Refresh la liste dans le front
      getMedic();
    });
}

// Fonction appelant la fonction getSpeMedic depuis ModifForm
function handleGetSpeMedic(id) {
  getSpeMedic(id);
}

// Fonction pour modifier un médicament
function handleModifMedic(infos) {
  console.log(infos);
  const url = `https://apipharmacie.pecatte.fr/api/${numPharma}/medicaments`;

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(infos),
  };

  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      // Refresh la liste dans le front
      getMedic();
    });
}

// Fonction ajout qte
function handleAjoutQte(id) {
  // On fait la méthode pour récup la Qte actu du médoc
  // Quand c'est fini on stocke dans qte et fait notre requête PUT
  getSpeMedicQte(id).then((qte) => {
    const url = `https://apipharmacie.pecatte.fr/api/${numPharma}/medicaments`;

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Ajout d'un à la Qte
    qte += 1;

    // Création d'un dico pour modifier le médoc avec l'id et la nv qte
    const nouveauMed = { id: id, qte: qte };

    const fetchOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(nouveauMed),
    };

    fetch(url, fetchOptions)
      .then((response) => response.json())
      .then((dataJSON) => {
        console.log(dataJSON);
        // Refresh la liste des médocs si aucun mot n'est recherché
        if (motRecherche.mot == "") {
          getMedic();
        } else {
          handleRechercheMedic(motRecherche.mot);
        }
      });
  });
}

function handleRetraitQte(id) {
  getSpeMedicQte(id).then((qte) => {
    const url = `https://apipharmacie.pecatte.fr/api/${numPharma}/medicaments`;

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Ajout d'un à la Qte
    qte -= 1;

    if (qte <= 0) {
      // Supprime le médoc si qte inf ou égale à 0
      handleDeleteMedic(id);
    }

    // Création d'un dico pour modifier le médoc avec l'id et la nv qte
    const nouveauMed = { id: id, qte: qte };

    const fetchOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(nouveauMed),
    };

    fetch(url, fetchOptions)
      .then((response) => response.json())
      .then((dataJSON) => {
        console.log(dataJSON);

        // Refresh la liste des médocs si aucun mot n'est recherché
        if (motRecherche.mot == "") {
          getMedic();
        } else {
          handleRechercheMedic(motRecherche.mot);
        }
      });
  });
}

// Fonction qui permet de récupérer les médicaments
function getMedic() {
  const url = `https://apipharmacie.pecatte.fr/api/${numPharma}/medicaments`;
  const fetchOptions = { method: "GET" };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      let result = dataJSON;
      listeMedocs.splice(0, listeMedocs.length);
      result.forEach((elmnt) => {
        listeMedocs.push(elmnt);
      });
    });
}

function getSpeMedic(id) {
  const url = `https://apipharmacie.pecatte.fr/api/${numPharma}/medicaments/${id}`;
  const fetchOptions = { method: "GET" };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      let result = dataJSON;
      medicSpe.value = result;
    });
}

function getSpeMedicQte(id) {
  const url = `https://apipharmacie.pecatte.fr/api/${numPharma}/medicaments/${id}`;
  const fetchOptions = { method: "GET" };
  return fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      return dataJSON.qte;
    });
}

// Fonction qui recherche un médicament en fonction du nom

function handleRechercheMedic(message) {
  motRecherche.mot = message;
  console.log(motRecherche);
  const url = `https://apipharmacie.pecatte.fr/api/${numPharma}/medicaments?search=${message}`;
  const fetchOptions = { method: "GET" };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      let result = dataJSON;
      listeMedocs.splice(0, listeMedocs.length);
      result.forEach((elmnt) => {
        listeMedocs.push(elmnt);
      });
    });
}

// Fonction d'affichage de l'ajout
function afficheAjout() {
  if (etatAjout.etat == 0) {
    etatAjout.etat = 1;
  } else {
    etatAjout.etat = 0;
  }
}

onMounted(() => {
  getMedic();
});
</script>
<template>
  <FormRechMedic
    @eventRechercheMedicament="handleRechercheMedic"
  ></FormRechMedic>
  <MedicListe
    @eventDeleteMedoc="handleDeleteMedic"
    @eventRecupMedicSpeListe="handleGetSpeMedic"
    @eventModifMedic="handleModifMedic"
    @eventAjoutQte="handleAjoutQte"
    @eventRetraitQte="handleRetraitQte"
    :listeMedocs="listeMedocs"
    :medicSpe="medicSpe"
  />

  <div v-if="etatAjout.etat == 0" class="placeBtn">
    <button class="formBouton" @click="afficheAjout">
      Ajouter un médicament
    </button>
  </div>
  <div v-if="etatAjout.etat == 1">
    <FormMedic @eventFormAdd="handleAddMedic" />
    <div class="placeBtn">
      <button class="formBouton" @click="afficheAjout">Annuler</button>
    </div>
  </div>
</template>

<style scoped>
.placeBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 50px;
}

.formBouton {
  width: 75%;
  margin: auto;
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  justify-content: center;
}

.formBouton:hover {
  background-color: #0056b3;
}
</style>

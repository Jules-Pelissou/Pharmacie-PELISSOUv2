// une chose
export default class Medicament {
  constructor(id, denomination, formepharmaceutique, qte, photo) {
    this._denomination = denomination;

    // Cas si la méthode de prise du médoc n'est pas précisée
    if (formepharmaceutique == undefined) {
      this._formepharmaceutique = "Voie orale";
    } else {
      this._formepharmaceutique = formepharmaceutique;
    }

    // Cas si la quantité n'est pas définie
    if (qte == undefined) {
      this._qte = 1;
    } else {
      this._qte = qte;
    }

    //  Cas si l'photo est pas remplie
    if (photo == undefined) {
      this._photo = "generique";
    } else {
      this._photo = photo;
    }

    this._id = id;
  }

  // ---- getters
  get denomination() {
    return this._denomination;
  }
  get id() {
    return this._id;
  }
  get formepharmaceutique() {
    return this._formepharmaceutique;
  }

  get qte() {
    return this._qte;
  }

  get photo() {
    return this._photo;
  }

  // ---- setter

  // modifier la denomination
  set denomination(denomination) {
    this._denomination = denomination;
  }

  set formepharmaceutique(formepharmaceutique) {
    this._formepharmaceutique = formepharmaceutique;
  }

  set qte(qte) {
    this._qte = qte;
  }

  set photo(photo) {
    this._photo = photo;
  }
  // -- toString
  toString() {
    return `--> ${this._denomination} (${this._formepharmaceutique} ${this._qte})`;
  }
}

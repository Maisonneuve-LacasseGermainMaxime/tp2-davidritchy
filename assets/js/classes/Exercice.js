export default class Exercice {
  constructor(exoInfos, conteneur, app) {
    const { id, type, duree, description, date, difficulte } = exoInfos;
    this.conteneur = conteneur;
    this.conteneur_liste = this.conteneur.querySelector(
      "[data-liste-exercices]"
    );
    this.app = app;

    this.id = id;
    this.type = type;
    this.duree = duree;
    this.description = description;
    this.date = date;
    this.difficulte = difficulte;

    this.gabarit = this.conteneur.querySelector("template#exercice");

    // console.log(id);

    this.injecterHTML(); // fonction qui injecte le contenu pour la liste des exercices
  }

  injecterHTML() {
    let clone = this.gabarit.content.cloneNode(true);

    this.conteneur_liste.appendChild(clone);

    this.conteneur_liste.innerHTML = this.conteneur_liste.innerHTML.replace(
      /{{date}}/g,
      this.date
    );
    this.conteneur_liste.innerHTML = this.conteneur_liste.innerHTML.replace(
      /{{type}}/g,
      this.type
    );
    this.conteneur_liste.innerHTML = this.conteneur_liste.innerHTML.replace(
      /{{id}}/g,
      this.id
    );
  }
}

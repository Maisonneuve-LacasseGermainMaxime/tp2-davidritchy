import Exercice from "./Exercice.js";
import Router from "./Router.js";
import ToastModale from "../components/ToastModale.js";
import Formulaire from "./Formulaire.js";

class App {
  static #instance;
  #listeExercices;
  #formulaire;

  //Permet d'accéder à l'instance de la classe de n'importe où dans le code en utilisant App.instance
  static get instance() {
    return App.#instance;
  }

  constructor() {
    if (App.#instance) {
      return App.#instance;
    } else {
      App.#instance = this;
    }

    this.#listeExercices = [];
    this.listeHTML = document.querySelector("[data-panneau ='liste']");
    this.conteneur_liste = document.querySelector("[data-liste-exercices]");
    this.titre = this.listeHTML.querySelector("h2");
    this.panneau_detail = document.querySelector('[ data-panneau="detail"]');
    this.bouton_detail = this.panneau_detail.querySelector("button");
    this.type = this.panneau_detail.querySelector("[data-type]");
    this.duree = this.panneau_detail.querySelector("[data-duree]");
    this.date = this.panneau_detail.querySelector("[data-date]");
    this.description = this.panneau_detail.querySelector("[data-description]");
    this.difficulte = this.panneau_detail.querySelector("[data-difficulte]");

    this.panneau_form = document.querySelector('[ data-panneau="formulaire"]');

    this.#formulaire = new Formulaire(this);
    this.router = new Router(this);


    // le bouton pour supprimer 
    this.bouton_detail.addEventListener("click", (evenement) => {
      evenement.preventDefault();
      this.supprimerUn(this.bouton_detail.id);

    });
  }

  async supprimerUn(id) {
    const requete = await fetch(`/api/exercices/supprimerUn.php?id=${id}`);
    const reponse = await requete.json();

    if (requete.ok) {
      let message = "Exercice supprimé avec succès";
      new ToastModale(message, "success");

      history.pushState({}, "", "/afficher");
      this.router.miseAJourURL();
    }
  }

  async recupererTout() {
   

    try {
      const reponse = await fetch("/api/exercices/lireTout.php");

      if (!reponse.ok) {
        throw new Error(`${reponse.statusText}`);
      }

      const exos = await reponse.json();

      this.conteneur_liste.innerHTML = "";
      this.#listeExercices = [];

      exos.forEach((exo) => {
        this.#listeExercices.push(exo);
        console.log(exo);
        new Exercice(exo, this.listeHTML, this);
      });
    } catch (error) {
      let message = "Erreur lors de la recuperation des exercices";

      new ToastModale(message, "error");
    }
  }

  cacherTout() {
    this.listeHTML.classList.add("invisible");
    this.panneau_detail.classList.add("invisible");
    this.panneau_form.classList.add("invisible");
  }

  afficherPanneauListe() {
    this.cacherTout();
    this.listeHTML.classList.remove("invisible");
    this.recupererTout();
  }

  afficherFormulaire() {
    this.cacherTout();
    this.panneau_form.classList.remove("invisible");
  }

  async ajouterUn() {
    let message = "Ajout réussi";
    new ToastModale(message, "success");
  }

  async recupererUn(id) {
    const requete = await fetch(`/api/exercices/lireUn.php?id=${id}`);
    const reponse = await requete.json();

    this.cacherTout();
    this.panneau_detail.classList.remove("invisible");
    this.type.textContent = reponse.type;
    this.duree.textContent = reponse.duree;
    this.date.textContent = reponse.date;
    this.description.textContent = reponse.description;
    this.difficulte.textContent = reponse.difficulte;

    this.bouton_detail.setAttribute("id", `${id}`);
  }
}

export default App;

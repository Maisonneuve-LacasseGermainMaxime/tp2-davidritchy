export default class Router {
  constructor(app) {
    this.app = app;
    this.routes = {
      acceuil: app.cacherTout.bind(this.app),
      afficher: app.afficherPanneauListe.bind(this.app),
      ajouter: app.afficherFormulaire.bind(this.app),
      ajouterUn: app.ajouterUn.bind(this.app),
      detail: (id) => {
        this.app.recupererUn(id);
      },
      supprimer: (id) => {
        this.app.supprimerUn(id);
        
      },
    };

    window.addEventListener("popstate", this.miseAJourURL.bind(this));
    document.addEventListener("click", this.onClicLien.bind(this));

    this.miseAJourURL();
  }

  miseAJourURL() {
    const url = window.location.pathname.slice(1); //On récupère l'URL sans le /
    const parts = url.split("/"); //On découpe l'URL en parties distinctes dans un tableau
    let route = parts[0]; //On récupère le premier élément du tableau. Il n'y a pas de # dans l'URL
    let id = parts[1]; //On récupère le deuxième élément du tableau
    const fonctionRoute = this.routes[route]; // fonction dans une constante
    
    //si id existe
    if (id) {
      fonctionRoute(id);

     

    } 
    else if (fonctionRoute) { //sinon lance la fonction
      fonctionRoute();
    } else {
      this.routes["acceuil"](); // sinon retourne a l'acceuil
    }
  }

  onClicLien(evenement) {
    const elementClique = evenement.target.closest("a");

    console.log(elementClique);
    if (elementClique !== null) {
      evenement.preventDefault();
      const url = elementClique.href;

      history.pushState({}, "", url);

      this.miseAJourURL();
    }
  }
}

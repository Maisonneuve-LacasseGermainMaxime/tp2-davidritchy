import ToastModale from "../components/ToastModale.js";

export default class Formulaire {
  constructor(app) {
    this.app = app;
    this.form = document.querySelector("form");
    this.input = this.form.querySelector("input[type='submit']");
    this.type = this.form.querySelector("#type");
    this.inputs = this.form.querySelectorAll("input[name]");
    this.area = this.form.querySelector("textarea");
    this.difficulte = this.form.querySelector("input[name='difficulte']");
    this.duree = this.form.querySelector("input[name='duree']");
    this.parentElement_duree = this.duree.parentElement;
    this.parentElement = this.difficulte.parentElement;
    this.error_duree = this.parentElement_duree.querySelector("#error");
    this.error = this.parentElement.querySelector("#error");

    //ca active le bouton
    this.input.classList.remove("disabled");

    this.form.addEventListener("submit", this.soumettre.bind(this));

    this.verifier();// fonction qui verifie les inputs et desactive le bouton submit 
  }

  async soumettre(evenement) {
    evenement.preventDefault();


    let niveau = parseInt(this.form.difficulte.value); // variable qui contient la valeur du niveau
    let duree = parseInt(this.form.duree.value); // variable qui contient la duree


    
    if (this.form.checkValidity() && niveau <= 5 && duree % 60 == 0) {
      const body = {
        type: this.form.type.value,
        description: this.form.description.value,
        date: this.form.date.value,
        duree: this.form.duree.value,
        difficulte: this.form.difficulte.value,
      };

   

      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };

      const reponse = await fetch("/api/exercices/ajouterUn.php", config);
      const message = await reponse.json();

      //Rediriger vers la liste après
      history.pushState({}, "", "/afficher");
      this.app.router.miseAJourURL();
      this.form.reset();

      // lance la boite modale
      let sms = "Ajout réussi";
      new ToastModale(sms, "success");

    } else {

    // lance la boite modale
      let message = "Veuillez corriger le formulaire";
      new ToastModale(message, "error");

      this.verifierNiveau(niveau, duree); // fonction qui affiche et cache la boite (le messsage) d'erreur  selon la source de l'erreur 
    }
  }

  async verifierNiveau(niveau, duree) {
    if (niveau > 5 && duree % 60 !== 0) {
      this.error.classList.remove("invisible");
      this.error.innerHTML = "Par echelle de 1 a 5";
      this.error_duree.classList.remove("invisible");
      this.error_duree.innerHTML = "Par tranche de 60 minutes";
      this.duree.setAttribute("step", "60");
    } else if (duree % 60 !== 0) {
      this.error_duree.classList.remove("invisible");
      this.error_duree.innerHTML = "Par tranche de 60 minutes";
      this.duree.setAttribute("step", "60");
    } else if (niveau > 5) {
      this.error.classList.remove("invisible");
      this.error.innerHTML = "Sur une echelle de 1 a 5";
    }
  }

  async verifier() {
    this.inputs.forEach(
      function (input) {
       
        input.addEventListener("input", () => {
          if (!input.validity.valid) {
            this.input.classList.add("disabled");

            if (input.name == "duree") {
              let parentElement = input.parentElement;

              let error = parentElement.querySelector("#error");
              error.classList.remove("invisible");
              error.innerHTML = "Par tranche de 60 minutes";
            } else if (input.name == "difficulte") {
              let parentElement = input.parentElement;

              let error = parentElement.querySelector("#error");
              error.classList.remove("invisible");
              error.innerHTML = "Sur une echelle de 1 a 5";
            }
          } else {
            let parentElement = input.parentElement;

            let error = parentElement.querySelector("#error");
            error.classList.add("invisible");
            this.input.classList.remove("disabled");
          }
        });
      }.bind(this)
    );
  }
}

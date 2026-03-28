console.log("bonjour")

//On récupère le formulaire qui était dans le html
const form = document.getElementById('formConnexion');
const name = document.getElementById('prenom');
const email = document.getElementById('email');
const password = document.getElementById('password');
const error = document.getElementById('error');




//On écoute quand on envoie le formulaire
form.addEventListener('submit', (event) => {
    console.log("Formulaire soumis")
    //evite de recharger la page qd on envoie le formulaire
    event.preventDefault();

    if (name.value.length >= 3 && email.value.length >= 3 && password.value.length >= 5) {
        //on enregistre l'utilisateur
    } else {
        //insére le texte dans l'élément/la balise
        //pour envoyer du text html c'est innerhtml et texte pur c'est textcontent
        error.textContent = 'Veuillez saisir tous les champs'
    }




});










console.log("bonjour")

//On récupère le formulaire qui était dans le html
const form = document.getElementById('formConnexion');
const nameInput = document.getElementById('prenom');
const email = document.getElementById('email');
const password = document.getElementById('password');
const error = document.getElementById('error');




//On écoute quand on envoie le formulaire
form.addEventListener('submit', (event) => {
    console.log("Formulaire soumis")
    //evite de recharger la page qd on envoie le formulaire
    event.preventDefault();

    if (nameInput.value.length >= 3 && email.value.length >= 3 && password.value.length >= 5) {
        //on enregistre l'utilisateur avec l'API
        fetch('http://localhost:3000/index', {
            method: "POST",
            Headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ //contenu de la requête qui doit être en json
                name: nameInput.value,
                email: email.value,
                password: password.value,
            })
        }).then(() => { //réponse de l'api
            window.location.href = './index.html'
        })

    } else {
        //insére le texte dans l'élément/la balise
        //pour envoyer du text html c'est innerhtml et texte pur c'est textcontent
        error.textContent = 'Veuillez saisir tous les champs'
    }




});










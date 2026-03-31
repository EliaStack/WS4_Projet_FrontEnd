console.log("phase connexion");
const error = document.getElementById('errorConnexion');

//On récupère le formulaire qui était dans le html
const form = document.querySelector('#formConnexion')
const email = document.querySelector('#email');
const password = document.querySelector('#password');


//On écoute quand on envoie le formulaire
form.addEventListener('submit', (event) => {
    console.log("Formulaire connexion soumis")
    //evite de recharger la page qd on envoie le formulaire
    event.preventDefault();

    //on connecte l'utilisateur avec l'API
    fetch('http://localhost:3000/login', {
        method: "POST",
        Headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ //contenu de la requête qui doit être en json
            email: email.value,
            password: password.value
        })
    })
        .then(data => data.json()) //réponse de l'api et conversion sous forme d'objet
        .then(data => {
            console.log('Récupération des données')
            console.log(data);
            if (data.accessToken) { //Si il est connecté il faut le rediriger Token c'est l'utilisateur
                localStorage.setItem('token', data.accessToken); //on enregistre l'utilisateur
                window.location.href = './gestionDesTaches.html'
            } else {
                error.textContent = 'Identifiants invalides';
            }
        })
        .catch(err => { //gestion des car d'erreur
            error.textContent = 'Identifiants invalides';
        })
});






















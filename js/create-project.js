const form = document.getElementById('project-form');
const nameInput = document.getElementById('project-name');
const descriptionInput = document.getElementById('projet-description');
const error = document.getElementById('error');




form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (nameInput.Value.length < 4) {
        error.textContent = 'Nom du projet invalide';
        return;
    }

    //enregistrement de la nouvelle tâche
    fetch('http://localhost:3000/todos', {
        method: 'POST',
        
        headers:{
            /* MISE EN COMMENTAIRE CAUSE PROJET
            'Authorization': 'Bearer' + token */
            'content-type': 'application/json'
        }, 
         body: JSON.stringify({
            text: nameInput.value,
            Tags: descriptionInput.value
         })
    })
    .then(data => data.json()) //réponse API
    .then(project => {
        window.location.href = './projet.html?id=' + project.id; //Lié à l'id u projet
    })
})









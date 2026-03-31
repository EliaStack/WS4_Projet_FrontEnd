//-- Mise en commentaire pour le travail
/*const token = localStorage.getItem('token');
const logout = document.getElementById('logout')


//suppresion du token (utilisateur connecté) qd j'appuie sur logout
logout.addEventListener('click', function () {
    localStorage.removeItem('token');
    window.location.href = './index.html';
})
////////////////////////////*/


//récupération des données du serveur
fetch('http://localhost:3000/todos', {
    /* MISE EN COMMENTAIRE POUR TRAVAIL
    headers:{
        'Authorization':'Bearer' + token
    } */

})

    .then(data => data.json())
    .then(projects => {
        console.log('serveur récupère data');
        console.log(projects);
        /*/////////////////////////////////*/
        const projectsContainer = document.querySelector('#tachesEnCours');

        //pour chacun des projets
        projects.forEach(project => {  //array à été add mais pas ds vidéo
            //Création de la balise div avec la classe
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');
            console.log('je suis rentré dans la boucle foreach');

            //on créer le titre de la tâche raccordé à "text" du serveur
            const h3 = document.createElement('h3');
            h3.textContent = project.text;
            console.log('création de h3');

            //on créer p pour la description raccordé à "Tags" du serveur
            const p = document.createElement('p');
            p.textContent = project.Tags;
            console.log('création de p');

            const a = document.createElement('a');
            a.textContent = 'Voir le projet';
            a.href = 'detailsTaches?id=' + project.id; //Lié à l'id u projet
            console.log('création de a');


            //association des enfants
            projectCard.appendChild(h3);
            projectCard.appendChild(p);
            projectCard.appendChild(a);

            //ajout de l'ensemble ds le html
            projectsContainer.appendChild(projectCard);

            //debug
            projectCard.style.border = '2px solid red';
            projectCard.style.color = 'white';


        });
    });


























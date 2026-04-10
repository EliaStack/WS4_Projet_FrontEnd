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
fetch('https://ws4projetbackend-production.up.railway.app:8080/todos', {
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
        const projectsContainer = document.querySelector('#tachesJS');

        //pour chacun des projets
        projects[0].todolist.forEach(project => {
            //Création de la balise div avec la classe
            const baliseTachesJS = document.createElement('div');
            baliseTachesJS.classList.add('baliseTachesJS');

            const baliseNumProjet = document.createElement('div');
            baliseNumProjet.classList.add('baliseNumProjet');

            const baliseSujet = document.createElement('div');
            baliseSujet.classList.add('baliseSujet');

            /* const baliseDescription = document.createElement('div');
             baliseDescription.classList.add('baliseDescription'); 
 
             const baliseDate = document.createElement('div');
             baliseDate.classList.add('baliseDate');*/

            const baliseStatus = document.createElement('div');
            baliseStatus.classList.add('baliseStatus');
            /*//////////////////////////////////////////////////////////////////////*/
            //Text du numéro du projet
            const textnumprojet = document.createElement('span');
            textnumprojet.textContent = 'Numéro du projet : ';

            //Numéro du projet
            const numprojet = document.createElement('span');
            numprojet.textContent = project.id;

            ////////// Concerne que le BP ////////// 
            //Bouton affichage détails
            const bpdetail = document.createElement('button');
            bpdetail.classList.add('btn-details');
            bpdetail.dataset.projectId = project.id

            // bouton → image
            const img = document.createElement('img');
            img.src = '../images/bp plus.png';
            img.alt = 'Voir détails';
            bpdetail.appendChild(img);
            ////////////////////////////////////

            //Text du sujet
            const textsujet = document.createElement('span');
            textsujet.textContent = 'Sujet : ';

            //Sujet de la tâche raccordé à "text" du serveur
            const sujet = document.createElement('span');
            sujet.textContent = project.text;

            /* //Text de la description
             const textdescription = document.createElement('span');
             textdescription.textContent = 'Description : ';
 
             //on créer p pour la description raccordé à "Tags" du serveur
             const description = document.createElement('span');
             description.textContent = project.Tags; 
 
             //Text date de création
             const textdatecreation = document.createElement('span');
             textdatecreation.textContent = 'Date de création : '; 
 
             //Date de création
             const datecreation = document.createElement('span');
             datecreation.textContent = project.created_at;*/

            //Text status
            const textstatus = document.createElement('span');
            textstatus.textContent = 'Status : ';

            //Status
            const status = document.createElement('span');
            status.textContent = project.is_complete;


            //Association Parent/Enfant//
            baliseTachesJS.appendChild(baliseNumProjet);
            baliseNumProjet.appendChild(textnumprojet);
            baliseNumProjet.appendChild(numprojet);
            baliseNumProjet.appendChild(bpdetail);

            baliseTachesJS.appendChild(baliseSujet);
            baliseSujet.appendChild(textsujet);
            baliseSujet.appendChild(sujet);

            /*   baliseTachesJS.appendChild(baliseDescription);
               baliseDescription.appendChild(textdescription);
               baliseDescription.appendChild(description);
   
               baliseTachesJS.appendChild(baliseDate);
               baliseDate.appendChild(textdatecreation);
               baliseDate.appendChild(datecreation);*/


            baliseTachesJS.appendChild(baliseStatus);
            baliseStatus.appendChild(textstatus);
            baliseStatus.appendChild(status);


            //Ajout de l'ensemble dans le html
            projectsContainer.appendChild(baliseTachesJS);

            /*//////////////////////////////////////////////////////////////////////////////////////////////*/

            bpdetail.addEventListener('click', (event) => {
                event.preventDefault();

                const detailsTask = document.querySelector('.detailsTask');

                detailsTask.innerHTML = ''; // reset

                //Création de la balise div avec la classe
                const baliseDetail = document.createElement('div');
                baliseDetail.classList.add('baliseDetail');

                baliseDetail.innerHTML = `
    <p><strong>Numéro :</strong> ${project.id}</p>
    <p><strong>Description :</strong> ${project.Tags}</p>
    <p><strong>Date :</strong> ${project.created_at}</p>
    <p><strong>Status :</strong> ${project.is_complete}</p>
  `;

                ////////// Affichage de la vue des détails ////////// 
                //Bouton affichage détails
                const bpdetailview = document.createElement('button');
                bpdetailview.classList.add('btn-detailsview');
                bpdetailview.textContent = 'Détails';

                //Association Parent/Enfant//
                detailsTask.appendChild(baliseDetail);
                detailsTask.appendChild(bpdetailview);

                //récupérer l'id sui a été mis dans l'url ds le fichier create_task et l'autre
                const params = new URLSearchParams(window.location.search);
                const id = params.get('id'); //on récupère la variable ID dans l'url
                console.log(id);

                bpdetailview.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.location.href = `./ws4_detailsTaches.html?id=${project.id}`;
                    

                })

            })

        });

    });

/* const a = document.createElement('a');
a.textContent = 'Voir le projet';
a.href = 'detailsTaches?id=' + project.id; //Lié à l'id u projet */






















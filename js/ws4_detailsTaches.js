//récupérer l'id sui a été mis dans l'url ds le fichier create_task et l'autre
const params = new URLSearchParams(window.location.search);
const id = params.get('id'); //on récupère la variable ID dans l'url
console.log(id);




//  if (!id) {
//  window.location.href = './gestionDesTaches.html';
//   }

//`./ws4_detailsTaches.html?id=${project.id}` http://localhost:3000/tasks


//Récupération des donnnées en f° de l'ID du projet
function Recup_Data() {
    fetch('http://localhost:3000/todos', {
        headers: {
            /* MISE EN COMMENTAIRE CAUSE PROJET
            'Authorization': 'Bearer' + token */

        },
    })
        .then(data => data.json())
        .then(projects => {
            console.log(projects);
            /*/////////////////////////////////*/
            const projectsContainer = document.querySelector('.detailsTask');

            //pour chacun des projets
            projects[0].todolist
                .filter(project => project.id === Number(id))
                .forEach(project => {

                    //Création de la balise div avec la classe
                    const baliseTachesJS = document.createElement('div');
                    baliseTachesJS.classList.add('baliseTachesJS');

                    const baliseNumProjet = document.createElement('div');
                    baliseNumProjet.classList.add('baliseNumProjet');

                    const baliseSujet = document.createElement('div');
                    baliseSujet.classList.add('baliseSujet');

                    const baliseDescription = document.createElement('div');
                    baliseDescription.classList.add('baliseDescription');

                    const baliseDate = document.createElement('div');
                    baliseDate.classList.add('baliseDate');

                    const baliseStatus = document.createElement('div');
                    baliseStatus.classList.add('baliseStatus');
                    /*//////////////////////////////////////////////////////////////////////*/
                    //Text du numéro du projet
                    const textnumprojet = document.createElement('span');
                    textnumprojet.textContent = 'Numéro du projet : ';

                    //Numéro du projet
                    const numprojet = document.createElement('span');
                    numprojet.textContent = project.id;

                    //Text du sujet
                    const textsujet = document.createElement('span');
                    textsujet.textContent = 'Sujet : ';

                    //Sujet de la tâche raccordé à "text" du serveur
                    const sujet = document.createElement('span');
                    sujet.textContent = project.text;

                    //Text de la description
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
                    datecreation.textContent = project.created_at;

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

                    baliseTachesJS.appendChild(baliseSujet);
                    baliseSujet.appendChild(textsujet);
                    baliseSujet.appendChild(sujet);

                    baliseTachesJS.appendChild(baliseDescription);
                    baliseDescription.appendChild(textdescription);
                    baliseDescription.appendChild(description);

                    baliseTachesJS.appendChild(baliseDate);
                    baliseDate.appendChild(textdatecreation);
                    baliseDate.appendChild(datecreation);


                    baliseTachesJS.appendChild(baliseStatus);
                    baliseStatus.appendChild(textstatus);
                    baliseStatus.appendChild(status);


                    //Ajout de l'ensemble dans le html
                    projectsContainer.appendChild(baliseTachesJS);
                    /*////////////////////////////////////////////////////////////////////////*/
                    //BOUTON DELETE (créé ici)
                    const taskDelete = document.querySelector('.TaskDelete');

                    const bpdelete = document.createElement('button');
                    bpdelete.textContent = 'Supprimer';

                    bpdelete.classList.add('bpDelete');
                    bpdelete.dataset.projectId = project.id

                    // bouton → image
                    const img_delete = document.createElement('img');
                    img_delete.src = '../images/bp_delete.png';
                    img_delete.alt = 'Suppression de la tâche';
                    bpdelete.appendChild(img_delete);

                    bpdelete.addEventListener('click', () => {
                        delete_data(project.id);
                    });

                    //BOUTON MODIFIER (créé ici)
                    const taskModif = document.querySelector('.TaskModif')

                    const bpreopen = document.createElement('button');
                    bpreopen.textContent = 'Réouvrir';

                    bpreopen.classList.add('btnReouverture');
                    bpreopen.dataset.projectId = project.id

                    // bouton → image
                    const img_reopen = document.createElement('img');
                    img_reopen.src = '../images/bp_modifier.png';
                    img_reopen.alt = 'Réouverture de la tâche';
                    bpreopen.appendChild(img_reopen);

                    bpreopen.addEventListener('click', () => {
                        modif_data(project);
                    });

                    //BOUTON TACHE DONE (créé ici)
                    const taskDone = document.querySelector('.TaskDone')

                    const bpdone = document.createElement('button');
                    bpdone.textContent = 'Tache done';

                    bpdone.classList.add('btnDone');
                    bpdone.dataset.projectId = project.id

                    // bouton → image
                    const img_done = document.createElement('img');
                    img_done.src = '../images/bp_done.png';
                    img_done.alt = 'Réouverture de la tâche';
                    bpdone.appendChild(img_done);

                    bpdone.addEventListener('click', () => {
                        done_data(project);
                    });

                    //ON LES INSÈRE DANS LA TÂCHE
                    taskDelete.appendChild(bpdelete);
                    taskModif.appendChild(bpreopen);
                    taskDone.appendChild(bpdone);

                })
        });
}

//Marquer la tâche comme terminée
function delete_data(id) {
    // EventListener + DELETE + refresh
    const confirmDelete = confirm('Voulez-vous vraiment supprimer cette tâche ?');
    if (!confirmDelete) return;

    fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la suppression');
            }

            // ✅ REFRESH automatique de la page
            window.location.reload();
        })
        .catch(error => {
            console.error(error);
            alert('Impossible de supprimer la tâche');
        });
}

function modif_data(project) {
    ////////////////// EventListener + PUT + refresh automatique
    fetch(`http://localhost:3000/todos/${project.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: project.id,
            text: project.text,
            is_complete: false,
            created_at: project.created_at
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur modification tâche');
            }

            //Refresh automatique de la page
            window.location.reload();
        })
        .catch(error => {
            console.error(error);
            alert('Impossible de modifier la tâche');
        });
}

function done_data(project) {
    ////////////////// EventListener + PUT + refresh automatique
    fetch(`http://localhost:3000/todos/${project.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: project.id,
            text: project.text,
            is_complete: true,
            created_at: project.created_at
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur modification tâche');
            }

            //Refresh automatique de la page
            window.location.reload();
        })
        .catch(error => {
            console.error(error);
            alert('Impossible de modifier la tâche');
        });
}

Recup_Data();
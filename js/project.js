//récupérer l'id sui a été mis dans l'url ds le fichier create_task et l'autre
const params = new URLSearchParams(window.location.search);
const id = params.get('id'); //on récupère la variable ID dans l'url
console.log(id);
/////////// QD ON CLIQUE SUR MODIFIER //////////////////
const taskFormTitle = document.getElementById('task-form-title');
const taskFormButton = document.getElementById('task-form-button');
let editTaskId = null;
//////////////////////////////////
const titleTask = document.getElementById('task-title');
const descriptionTask = document.getElementById('task-description');
const statusTask = document.getElementById('task-status');
////////////
function getData() { //récupère les données de la page
    const description = document.getElementById('desccription');
    const title = document.getElementById('title');
    const taskList = document.querySelector('.task-list');


    if (!id) {
        window.location.href = './gestionDesTaches.html';
    }


    fetch('http://localhost:3000/todos/' + id, {
        headers: {
            /* MISE EN COMMENTAIRE CAUSE PROJET
            'Authorization': 'Bearer' + token */

        },
    })
        .then(data => data.json())
        .then(project => {
            console.log(project);
            title.textContent = project.title;
            description.textContent = project.description;

        })
        .catch(err => { //err parece que ce n'est plus le bon token
            localStorage.removeItem('token');
            window.location.href = './index.html' //renvoie sur la page de connexion
        })

    //récupérer une tâche par rapport à l'id du projet
    fetch('http://localhost:3000/tasks?projectId=' + id, {
        headers: {
            /* MISE EN COMMENTAIRE CAUSE PROJET
            'Authorization': 'Bearer' + token */

        }
    })
        .then(data => data.json())
        .then(tasks => {
            console.log(tasks);
            taskList.innerHTML = ''; //Vide pour éviter les doublons de tâche vu que la fct est appelé pls fois
            console.log('récup tâches');

            tasks.forEach(task => {
                const taskIten = document.createElement('div');
                taskIten.classList.add('task-item');

                const taskTitle = document.createElement('div');
                taskTitle.classList.add('task-title');
                taskTitle.textContent = task.title;

                const taskStatus = document.createElement('span');
                taskStatus.classList.add('chip'); //forme de l'élément
                //type de tâche
                if (task.status === 'à faire')
                    taskStatus.classList.add('todo');
                else if (task.status === 'en cours')
                    taskStatus.classList.add('doing');
                else
                    taskStatus.classList.add('done')
                taskStatus.textContent = taskStatus;

                const taskAction = document.createElement('div');
                taskAction.classList.add('task-actions');

                const editButton = document.createElement('button');
                editButton.classList.add('edit');
                editButton.textContent = 'Modifier';

                //pour modifier une tâche
                editButton.addEventListener('click', function () {
                    console.log('cest quand on clique sur le bp modifier');
                    console.log(task);

                    taskFormTitle.textContent = 'Modifer la tâche';
                    taskFormButton.textContent = 'Modifier la tâche';
                    titleTask.value = task.title;
                    descriptionTask.value = task.description;
                    statusTask.value = task.status;
                    editTaskId = task.id; //evite de recréer la tâche vu qu'on est en mode édition
                });

                const deleteButton = document.createElement('button');
                deleteButton.classList.add('delete');
                deleteButton.textContent = 'Supprimer';

                //pour supprimer une tâche
                deleteButton.addEventListener('click', function () {
                    const confirmDelete = confirm('Voulez-vous vraiment supprimer la tâche' + task.title + '') //fait apparaître un message pour l'op si yes=true
                    if (confirmDelete) {
                        fetch('http://localhost:3000/task' + taskId, {
                            method: 'DELETE',

                            headers: {
                                /* MISE EN COMMENTAIRE CAUSE PROJET
                                'Authorization': 'Bearer' + token */
                            },
                        }).then(data => {
                            getData() //mettre à jour la liste de tâche pour qu'elle n'apparaisse plus
                        });
                    }
                });
                taskAction.appendChild(editButton);
                taskAction.appendChild(deleteButton);

                taskIten.appendChild(taskTitle);
                taskIten.appendChild(taskStatus);
                taskIten.appendChild(taskAction);


                taskList.appendChild(taskIten);
            })
                .catch(err => { //err parece que ce n'est plus le bon token
                    localStorage.removeItem('token');
                    window.location.href = './index.html' //renvoie sur la page de connexion
                })
        });
}

function createTask() {
    const form = document.getElementById('task-form');


    form.addEventListener('submit', function (event) {
        event.preventDefault();

        //création de la tâche
        fetch('http://localhost:3000/task' + (editTaskId ? ('/' + editTaskId) : ''), {
            method: editTaskId ? 'PUT' : 'POST', //comparaison ternaire, on work sur ajout task et modifier task qui sont ensemble

            headers: {
                /* MISE EN COMMENTAIRE CAUSE PROJET
                'Authorization': 'Bearer' + token */
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title: titleTask.value,
                description: descriptionTask.value,
                status: statusTask.value,
                projectid: id,
            })
        }).then(data => data.json())
            .then(task => {
                titleTask.value = ''; //vider le formulaire
                descriptionTask.value = '';
                statusTask.value = 'à faire';
                editTaskId = null;
                taskFormTitle.textContent = 'Ajouter une tâche';
                taskFormButton.textContent = 'Ajouter la tâche';
                getData() //on réapelle la fonction pour recharger la page et afficher les dernières tâches ajoutés
            });
    });
}








getData()
createTask()

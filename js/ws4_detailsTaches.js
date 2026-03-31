//récupérer l'id sui a été mis dans l'url ds le fichier create_task et l'autre
const params = new URLSearchParams(window.location.search);
const id = params.get('id'); //on récupère la variable ID dans l'url
console.log(id);




//  if (!id) {
//  window.location.href = './gestionDesTaches.html';
//   }

//`./ws4_detailsTaches.html?id=${project.id}` http://localhost:3000/tasks


//Récupération des donnnées en f° de l'ID du projet
function Recup_Data (){
fetch(`http://localhost:3000/todos?id=${id}`, {
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


            })
    });
}

//Marquer la tâche comme terminée
function Done_Data(){
    
}



Recup_Data();
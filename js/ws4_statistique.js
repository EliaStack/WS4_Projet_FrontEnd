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
        const projectsContainer = document.querySelector('#tachesJS');

        //pour chacun des projets
        projects[0].todolist.forEach(project => {
            Count_TaskComplete();

        });

    });


function Count_TaskComplete(todolist) {
    const nbComplete = todolist.filter(task => task.is_complete === true).length;
    compteur = task.is_complete;
    return compteur;
};
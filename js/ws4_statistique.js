
fetch('https://ws4projetbackend-production.up.railway.app:8080/todos', {
    /* MISE EN COMMENTAIRE POUR TRAVAIL
    headers:{
        'Authorization':'Bearer' + token
    } */

})
    .then(data => data.json())
    .then(projects => {
        console.log('serveur récupère data');

        const todolist = projects[0].todolist;

        updateStats(todolist);
    });



function Compteur_TaskComplete(todolist) {
    const nbComplete = todolist.filter(task => task.is_complete === true).length;
    return nbComplete;
};

function Compteur_TaskEnCours(todolist) {
    const nbEnCours = todolist.filter(task => task.is_complete === false).length;
    return nbEnCours;
};

function updateStats(todolist) {

    // Nettoyage des anciennes stats
    document.querySelector('.NbreTacheEnCours').innerHTML = "";
    document.querySelector('.NbreTacheDone').innerHTML = "";
    document.querySelector('.NbreTacheTotal').innerHTML = "";

    /* === TÂCHES EN COURS === */
    const Count_TaskEnCours = Compteur_TaskEnCours(todolist);

    const stat_TaskEnCours = document.querySelector('.NbreTacheEnCours');
    const divTextEnCours = document.createElement('div');
    const divImgEnCours = document.createElement('div');

    const textEnCours = document.createElement('span');
    textEnCours.textContent = 'Nombre de tâches en cours : ';

    const nbEnCours = document.createElement('span');
    nbEnCours.textContent = Count_TaskEnCours + '/' + todolist.length;

    const imgEnCours = document.createElement('img');
    imgEnCours.src = '../images/statistique/nbre_tache_faire.png';
    imgEnCours.alt = 'Tâches en cours';

    divTextEnCours.appendChild(textEnCours);
    divTextEnCours.appendChild(nbEnCours);
    divImgEnCours.appendChild(imgEnCours);

    stat_TaskEnCours.appendChild(divTextEnCours);
    stat_TaskEnCours.appendChild(divImgEnCours);


    /* === TÂCHES TERMINÉES === */
    const CountTaskComplete = Compteur_TaskComplete(todolist);

    const stat_TaskDone = document.querySelector('.NbreTacheDone');
    const divTextDone = document.createElement('div');
    const divImgDone = document.createElement('div');

    const textDone = document.createElement('span');
    textDone.textContent = 'Nombre de tâches terminées : ';

    const nbDone = document.createElement('span');
    nbDone.textContent = CountTaskComplete + '/' + todolist.length;

    const imgDone = document.createElement('img');
    imgDone.src = '../images/statistique/nbr_tache_done.png';
    imgDone.alt = 'Tâches terminées';

    divTextDone.appendChild(textDone);
    divTextDone.appendChild(nbDone);
    divImgDone.appendChild(imgDone);

    stat_TaskDone.appendChild(divTextDone);
    stat_TaskDone.appendChild(divImgDone);


    /* === TOTAL === */
    const CountTaskTotal = todolist.length;

    const stat_TaskTotal = document.querySelector('.NbreTacheTotal');
    const divTextTotal = document.createElement('div');
    const divImgTotal = document.createElement('div');

    const textTotal = document.createElement('span');
    textTotal.textContent = 'Nombre de tâches total : ';

    const nbTotal = document.createElement('span');
    nbTotal.textContent = CountTaskTotal;

    const imgTotal = document.createElement('img');
    imgTotal.src = '../images/statistique/nbre_tache_total.png';
    imgTotal.alt = 'Tâches total';

    divTextTotal.appendChild(textTotal);
    divTextTotal.appendChild(nbTotal);
    divImgTotal.appendChild(imgTotal);

    stat_TaskTotal.appendChild(divTextTotal);
    stat_TaskTotal.appendChild(divImgTotal);


    /*Graphique*/
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'Tâche terminées',
                'Tâche en cours'
            ],
            datasets: [{
                label: 'Graphique des tâches',
                data: [CountTaskComplete, Count_TaskEnCours],
                backgroundColor: [
                    'rgb(13, 240, 81)',
                    'rgb(54, 162, 235)',
                ],
                hoverOffset: 4
            }]
        },
        
  options: {
            responsive: true,
            maintainAspectRatio: false   // ✅ LA CLÉ
        }

    });
}




const formulaireNom = document.getElementById('formName');
const formulairePassword = document.getElementById('formPassword');
const formulaireError = document.getElementById('errorConnexion')
const bpConnexion = document.getElementById('BpConnexion');

bpConnexion.addEventListener('click', (event)=>{
event.preventDefault();

if(formulaireNom.value !== ''){
    window.localStorage.setItem('user', formulaireNom.value);
    console.log(localStorage.getItem('user'));
    window.location.href ='./ws4_listeDesTaches.html';
} else{
formulaireError.textContent = 'Veuillez renseigner un nom'
};

});















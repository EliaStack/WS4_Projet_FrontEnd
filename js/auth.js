const token = localStorage.getItem('token');

if(!token){
    window.location.href = 'ws4_index.html';
}
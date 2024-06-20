
function chargerJSON() {
    fetch('https://vachibox.netlify.app/data.json')  // Assurez-vous que l'URL est correcte
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur HTTP ' + response.status);
            }
            return response.json();
        })
        .then(data => genererClassement(data))
        .catch(error => {
            console.error('Erreur lors du chargement du fichier JSON:', error);
        });
}

// Fonction pour générer le HTML à partir des données JSON
function genererClassement(data) {
    var html = '<ol>';
    data.forEach(function(joueur) {
        html += '<li>' + joueur.playerName + ' - Score: ' + joueur.score + '</li>';
    });
    html += '</ol>';
    document.getElementById('classement_tableau').innerHTML = html;
}

// Appel de la fonction au chargement de la page
window.onload = function() {
    chargerJSON();
};

function chargerJSON() {
    fetch('https://vachibox.vercel.app/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur HTTP ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Trier les joueurs par score (du plus grand au plus petit)
            data.sort((a, b) => b.score - a.score);
            genererClassement(data);
        })
        .catch(error => {
            console.error('Erreur lors du chargement du fichier JSON:', error);
        });
}

// Fonction pour générer le HTML à partir des données JSON triées par score
function genererClassement(data) {
    var html = '<ol>';
    data.forEach(function(joueur, index) {
        // index + 1 pour afficher les positions à partir de 1 (index est 0-based)
        var position = index + 1;
        html += '<li>' + position + '. ' + joueur.playerName + ' - Score: ' + joueur.score + '</li>';
    });
    html += '</ol>';
    document.getElementById('classement_tableau').innerHTML = html;
}

// Appel de la fonction au chargement de la page
window.onload = function() {
    chargerJSON();
};
